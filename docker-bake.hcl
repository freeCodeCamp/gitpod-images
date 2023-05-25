variable "MONGOSH_VERSION"  { default = "1.8.0" }
variable "MONGODB_VERSION"  { default = "6.0.4" }
variable "UBUNTU_VERSION"   { default = "ubuntu2204" }
variable "PUBLISH_TAG_VERSION_MAJOR" { default = "0" }
variable "PUBLISH_TAG_VERSION_MINOR" { default = "0" }
variable "PUBLISH_TAG_VERSION_PATCH" { default = "0" }

group "default" {
  targets = ["base"]
}

target "base" {
  dockerfile = "Dockerfile"
  context    = "./base"
  args = {
    "MONGOSH_VERSION" = MONGOSH_VERSION
    "MONGODB_VERSION" = MONGODB_VERSION
    "UBUNTU_VERSION"  = UBUNTU_VERSION
  }
  tags = [
    "freecodecamp/gitpod-base:latest",
    "freecodecamp/gitpod-base:${PUBLISH_TAG_VERSION_MAJOR}.${PUBLISH_TAG_VERSION_MINOR}.${PUBLISH_TAG_VERSION_PATCH}",
    "freecodecamp/gitpod-base:${PUBLISH_TAG_VERSION_MAJOR}.${PUBLISH_TAG_VERSION_MINOR}",
    "freecodecamp/gitpod-base:${PUBLISH_TAG_VERSION_MAJOR}",
  ]
}
