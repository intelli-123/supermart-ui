# ─── Cloud SQL — MySQL 8 instance ────────────────────────────────────────────
resource "google_sql_database_instance" "ui_mysql" {
  name             = "ui-mysql-${var.environment}"
  project          = var.project_id
  region           = var.region
  database_version = "MYSQL_8_0"

  deletion_protection = false # set to true before using in production

  settings {
    tier              = "db-f1-micro"
    availability_type = "ZONAL"
    disk_autoresize   = true
    disk_size         = 10
    disk_type         = "PD_SSD"

    backup_configuration {
      enabled            = true
      binary_log_enabled = true # required for PITR on MySQL
    }

    ip_configuration {
      # Public IP is required for Cloud SQL Auth Proxy to reach the instance
      # from Cloud Run. Auth is handled by IAM — no username/password over the wire.
      ipv4_enabled = true
    }

    insights_config {
      query_insights_enabled = true
    }
  }
}

# ─── Database ─────────────────────────────────────────────────────────────────
resource "google_sql_database" "ui_db" {
  name     = "ui-supermartdb"
  instance = google_sql_database_instance.ui_mysql.name
  project  = var.project_id
}

# ─── Application user ────────────────────────────────────────────────────────
resource "google_sql_user" "ui_app_user" {
  name     = "ui-app"
  instance = google_sql_database_instance.ui_mysql.name
  project  = var.project_id
  password = var.db_password
  host     = "%"
}
