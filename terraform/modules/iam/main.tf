# ─── Service Account for Cloud Run ───────────────────────────────────────────
resource "google_service_account" "ui_run_sa" {
  project      = var.project_id
  account_id   = "ui-run-sa-${var.environment}"
  display_name = "UI Cloud Run SA (${var.environment})"
}

# Cloud SQL Client — allows Cloud SQL Auth Proxy sidecar to open connections
resource "google_project_iam_member" "ui_run_sa_sql_client" {
  project = var.project_id
  role    = "roles/cloudsql.client"
  member  = "serviceAccount:${google_service_account.ui_run_sa.email}"
}

# Metric Writer — allows Cloud Run to emit custom metrics
resource "google_project_iam_member" "ui_run_sa_metric_writer" {
  project = var.project_id
  role    = "roles/monitoring.metricWriter"
  member  = "serviceAccount:${google_service_account.ui_run_sa.email}"
}

# Log Writer — allows Cloud Run to write structured logs
resource "google_project_iam_member" "ui_run_sa_log_writer" {
  project = var.project_id
  role    = "roles/logging.logWriter"
  member  = "serviceAccount:${google_service_account.ui_run_sa.email}"
}
