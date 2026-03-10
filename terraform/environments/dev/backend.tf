terraform {
  backend "gcs" {
    bucket = "tfstate-ui-dev"
    prefix = "terraform/state"
  }
}
