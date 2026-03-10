output "connection_name" {
  description = "Cloud SQL instance connection name (used by Cloud SQL Auth Proxy)"
  value       = google_sql_database_instance.ui_mysql.connection_name
}

output "db_name" {
  description = "Database name"
  value       = google_sql_database.ui_db.name
}

output "db_user" {
  description = "Database application username"
  value       = google_sql_user.ui_app_user.name
}

output "instance_name" {
  description = "Cloud SQL instance name"
  value       = google_sql_database_instance.ui_mysql.name
}
