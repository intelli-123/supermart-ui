output "service_account_email" {
  description = "Email of the Cloud Run service account"
  value       = google_service_account.ui_run_sa.email
}

output "service_account_id" {
  description = "Full resource ID of the Cloud Run service account"
  value       = google_service_account.ui_run_sa.id
}
