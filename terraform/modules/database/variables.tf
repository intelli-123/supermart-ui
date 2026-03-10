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

variable "db_password" {
  description = "Password for the ui-app database user"
  type        = string
  sensitive   = true
}
