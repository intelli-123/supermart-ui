# ─── Cloud Run v2 Service ─────────────────────────────────────────────────────
# Multi-container setup:
#   - ui-api              : Spring Boot app (ingress container, port 8080)
#   - ui-cloud-sql-proxy  : Cloud SQL Auth Proxy v2 sidecar (TCP on 127.0.0.1:3306)
#
# The Spring Boot app connects to MySQL via 127.0.0.1:3306 (the sidecar).
# The sidecar authenticates to Cloud SQL using the attached service account (IAM).
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
    # Starts FIRST (required when ui-api uses depends_on this container).
    # Listens on 127.0.0.1:3306 for MySQL connections.
    # Health server runs on 0.0.0.0:9090 — endpoints /readyz, /healthz.
    containers {
      name  = "ui-cloud-sql-proxy"
      image = "gcr.io/cloud-sql-connectors/cloud-sql-proxy:2"
      # --health-check   enables the HTTP health server
      # --http-address   0.0.0.0 so Cloud Run's probe infra can reach it
      #                  (localhost/127.0.0.1 only is not reachable by the probe)
      # --http-port      9090 — where /readyz and /healthz are served
      args  = ["--health-check", "--http-address=0.0.0.0", "--http-port=9090", "--address=127.0.0.1", "--port=3306", var.db_connection_name]

      resources {
        limits = {
          cpu    = "0.5"
          memory = "256Mi"
        }
      }

      # Cloud Run requires a startup probe on any container referenced in depends_on
      # cloud-sql-proxy v2 health paths: /liveness, /readiness, /startup
      startup_probe {
        http_get {
          path = "/readiness"
          port = 9090
        }
        initial_delay_seconds = 2
        period_seconds        = 5
        failure_threshold     = 10
        timeout_seconds       = 5
      }
    }

    # ── Ingress container: Spring Boot API ───────────────────────────────────
    # depends_on ensures the proxy sidecar starts before this container.
    containers {
      name       = "ui-api"
      image      = var.image
      depends_on = ["ui-cloud-sql-proxy"]

      ports {
        container_port = 8080
      }

      env {
        name  = "SPRING_PROFILES_ACTIVE"
        value = "cloud"
      }

      # The JDBC URL points to the Cloud SQL Auth Proxy sidecar on localhost
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

      # Allow HikariCP to keep retrying the DB connection on startup
      # instead of failing immediately if the proxy tunnel isn't ready yet.
      env {
        name  = "SPRING_DATASOURCE_HIKARI_INITIALIZATION_FAIL_TIMEOUT"
        value = "-1"
      }

      # Enable Spring Boot liveness/readiness probes at separate endpoints
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

      # startup_probe uses /liveness so it passes even while DB is connecting
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
