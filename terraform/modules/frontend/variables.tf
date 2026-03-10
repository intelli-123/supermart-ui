variable "project_id" {
  description = "GCP project ID"
  type        = string
}

variable "region" {
  description = "GCP region"
  type        = string
}

variable "environment" {
  description = "Deployment environment (dev / stage / prod)"
  type        = string
}

variable "image" {
  description = "Full Docker image reference for the Angular/nginx frontend"
  type        = string
}

variable "api_url" {
  description = "Backend Cloud Run URL nginx will reverse-proxy /api/* to"
  type        = string
}
