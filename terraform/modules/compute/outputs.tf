output "cloud_run_url" {
  description = "Public URL of the Cloud Run service"
  value       = google_cloud_run_v2_service.app.uri
}

output "swagger_ui_url" {
  description = "Swagger UI URL for the deployed API"
  value       = "${google_cloud_run_v2_service.app.uri}/api/swagger-ui.html"
}

output "service_name" {
  description = "Cloud Run service name"
  value       = google_cloud_run_v2_service.app.name
}
