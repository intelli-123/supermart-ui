variable "project_id" {
  description = "GCP project ID"
  type        = string
  default     = "proven-country-485607-p6"
}

variable "region" {
  description = "GCP region for all resources"
  type        = string
  default     = "us-central1"
}

variable "image" {
  description = "Full Docker image reference built by CI (e.g. gcr.io/project/ui-supermart-api:abc1234)"
  type        = string
}

variable "db_password" {
  description = "Password for the Cloud SQL application user (ui-app)"
  type        = string
  sensitive   = true
}

variable "jwt_secret" {
  description = "JWT signing secret for the Spring Boot API"
  type        = string
  sensitive   = true
}
