output "frontend_url" {
  description = "Public URL of the Angular frontend Cloud Run service"
  value       = google_cloud_run_v2_service.frontend.uri
}
