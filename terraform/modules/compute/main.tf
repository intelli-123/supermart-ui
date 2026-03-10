# ─── Cloud Run v2 Service ─────────────────────────────────────────────────────
# Multi-container setup:
#   - ui-api              : Spring Boot app (ingress container, port 8080)
#   - ui-cloud-sql-proxy  : Cloud SQL Auth Proxy v2 sidecar (TCP on 127.0.0.1:3306)
#
# The Spring Boot app connects to MySQL via 127.0.0.1:3306 (the sidecar).
# The sidecar authenticates to Cloud SQL using the attached service account (IAM).
#
# Note: `depends_on` between containers requires the google-beta provider.
# Instead we configure Spring Boot to start without a live DB connection so
# the startup probe passes before the proxy tunnel is established.
# ─────────────────────────────────────────────────────────────────────────────
resource "google_cloud_run_v2_service" "app" {
  name     = "svc-ui-${var.environment}"
  location = var.region
  project  = var.project_id

  template {
    service_account = var.service_account_email

    scaling {
      min_instance_count = 0
      max_instance_count = 3
    }

    # ── Sidecar container: Cloud SQL Auth Proxy v2 ───────────────────────────
    # Listens on 127.0.0.1:3306 and authenticates to Cloud SQL via IAM.
    # Starts concurrently with ui-api; Spring Boot is configured to retry the
    # DB connection so it doesn't fail if the proxy tunnel isn't ready yet.
    containers {
      name  = "ui-cloud-sql-proxy"
      image = "gcr.io/cloud-sql-connectors/cloud-sql-proxy:2"
      args  = ["--address=127.0.0.1", "--port=3306", var.db_connection_name]

      resources {
        limits = {
          cpu    = "0.5"
          memory = "256Mi"
        }
      }
    }

    # ── Ingress container: Spring Boot API ───────────────────────────────────
    containers {
      name  = "ui-api"
      image = var.image

      ports {
        container_port = 8080
      }

      # Activates application-docker.properties which sets:
      #   - com.mysql.cj.jdbc.Driver (not H2)
      #   - spring.h2.console.enabled=false
      #   - spring.jpa.hibernate.ddl-auto=none
      #   - spring.sql.init.mode=never
      env {
        name  = "SPRING_PROFILES_ACTIVE"
        value = "docker"
      }

      # JDBC URL points to the Cloud SQL Auth Proxy sidecar on localhost
      env {
        name  = "SPRING_DATASOURCE_URL"
        value = "jdbc:mysql://127.0.0.1:3306/${var.db_name}?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC"
      }

      env {
        name  = "SPRING_DATASOURCE_USERNAME"
        value = var.db_user
      }

      env {
        name  = "SPRING_DATASOURCE_PASSWORD"
        value = var.db_password
      }

      env {
        name  = "APP_JWT_SECRET"
        value = var.jwt_secret
      }

      env {
        name  = "APP_JWT_ACCESS_TOKEN_EXPIRATION_MS"
        value = "3600000"
      }

      env {
        name  = "APP_JWT_REFRESH_TOKEN_EXPIRATION_MS"
        value = "86400000"
      }

      env {
        name  = "APP_TELEMETRY_RATE_LIMIT_PER_MINUTE"
        value = "60"
      }

      # Allow HikariCP to initialise even if the proxy tunnel isn't ready yet;
      # it will keep retrying connections once the proxy becomes available.
      env {
        name  = "SPRING_DATASOURCE_HIKARI_INITIALIZATION_FAIL_TIMEOUT"
        value = "-1"
      }

      # Enable /actuator/health/liveness + /actuator/health/readiness endpoints
      env {
        name  = "MANAGEMENT_HEALTH_PROBES_ENABLED"
        value = "true"
      }

      resources {
        limits = {
          cpu    = "1"
          memory = "512Mi"
        }
      }

      # startup_probe checks /liveness (app alive, not DB-dependent)
      # so it passes even while HikariCP is still connecting to the proxy
      startup_probe {
        http_get {
          path = "/api/actuator/health/liveness"
          port = 8080
        }
        initial_delay_seconds = 30
        period_seconds        = 10
        failure_threshold     = 12
        timeout_seconds       = 5
      }

      liveness_probe {
        http_get {
          path = "/api/actuator/health/liveness"
          port = 8080
        }
        period_seconds    = 30
        failure_threshold = 3
        timeout_seconds   = 5
      }
    }
  }
}

# ─── Allow unauthenticated (public) access to the API ────────────────────────
resource "google_cloud_run_v2_service_iam_member" "public_invoker" {
  project  = var.project_id
  location = var.region
  name     = google_cloud_run_v2_service.app.name
  role     = "roles/run.invoker"
  member   = "allUsers"
}
