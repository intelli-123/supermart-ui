# ─── Cloud Run v2 — Angular / nginx frontend ──────────────────────────────────
# Serves the built Angular SPA and reverse-proxies /api/* to the backend
# Cloud Run service via the $API_URL env var (consumed by nginx.conf.template).
resource "google_cloud_run_v2_service" "frontend" {
  name     = "svc-ui-frontend-${var.environment}"
  location = var.region
  project  = var.project_id

  template {
    scaling {
      min_instance_count = 0
      max_instance_count = 3
    }

    containers {
      name  = "ui-frontend"
      image = var.image

      ports {
        container_port = 8080
      }

      # Injected into the nginx.conf.template by envsubst at container start.
      env {
        name  = "API_URL"
        value = var.api_url
      }

      resources {
        limits = {
          cpu    = "1"
          memory = "512Mi"
        }
      }

      startup_probe {
        http_get {
          path = "/healthz"
          port = 8080
        }
        initial_delay_seconds = 5
        period_seconds        = 5
        failure_threshold     = 12
        timeout_seconds       = 3
      }

      liveness_probe {
        http_get {
          path = "/healthz"
          port = 8080
        }
        period_seconds    = 30
        failure_threshold = 3
        timeout_seconds   = 3
      }
    }
  }
}

# ─── Allow unauthenticated (public) access to the frontend ───────────────────
resource "google_cloud_run_v2_service_iam_member" "frontend_public" {
  project  = var.project_id
  location = var.region
  name     = google_cloud_run_v2_service.frontend.name
  role     = "roles/run.invoker"
  member   = "allUsers"
}
