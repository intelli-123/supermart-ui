variable "project_id" {
  description = "GCP project ID"
  type        = string
}

variable "region" {
  description = "GCP region"
  type        = string
}

variable "environment" {
  description = "Deployment environment (dev, stage, prod)"
  type        = string
}

variable "image" {
  description = "Full Docker image reference to deploy (e.g. gcr.io/project/ui-supermart-api:abc1234)"
  type        = string
}

variable "db_connection_name" {
  description = "Cloud SQL instance connection name (project:region:instance)"
  type        = string
}

variable "db_name" {
  description = "Database name inside the Cloud SQL instance"
  type        = string
}

variable "db_user" {
  description = "Database username"
  type        = string
}

variable "db_password" {
  description = "Database password"
  type        = string
  sensitive   = true
}

variable "jwt_secret" {
  description = "JWT signing secret"
  type        = string
  sensitive   = true
}

variable "service_account_email" {
  description = "Email of the service account attached to Cloud Run"
  type        = string
}
