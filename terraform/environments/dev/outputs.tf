output "cloud_run_url" {
  description = "Public URL of the deployed Cloud Run service"
  value       = module.compute.cloud_run_url
}

output "swagger_ui_url" {
  description = "Swagger UI endpoint for the deployed API"
  value       = module.compute.swagger_ui_url
}

output "cloud_run_service_name" {
  description = "Cloud Run service name"
  value       = module.compute.service_name
}

output "cloud_sql_instance_name" {
  description = "Cloud SQL instance name"
  value       = module.database.instance_name
}

output "cloud_sql_connection_name" {
  description = "Cloud SQL connection name (for local Cloud SQL Auth Proxy)"
  value       = module.database.connection_name
}
