terraform {
  required_version = ">= 1.7.5"

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

# ─── IAM — service account + role bindings ───────────────────────────────────
module "iam" {
  source      = "../../modules/iam"
  project_id  = var.project_id
  environment = "dev"
}

# ─── Database — Cloud SQL (MySQL 8) ──────────────────────────────────────────
module "database" {
  source      = "../../modules/database"
  project_id  = var.project_id
  region      = var.region
  environment = "dev"
  db_password = var.db_password
}

# ─── Compute — Cloud Run v2 (API + Cloud SQL Auth Proxy sidecar) ──────────────
module "compute" {
  source = "../../modules/compute"

  project_id            = var.project_id
  region                = var.region
  environment           = "dev"
  image                 = var.image
  db_connection_name    = module.database.connection_name
  db_name               = module.database.db_name
  db_user               = module.database.db_user
  db_password           = var.db_password
  jwt_secret            = var.jwt_secret
  service_account_email = module.iam.service_account_email
}
