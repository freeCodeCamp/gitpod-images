# Configure and deploy the application
NAME := gitpod-images
SHELL := /bin/bash

# Load environment variables
include .env

# Functions
define logger
	@echo "[$(shell date +'%Y-%m-%d %H:%M:%S')] $(1)"
endef

.DEFAULT_GOAL := help

.PHONY: help
help:
	@echo "Usage: make [Target] [Environment Variables]"
	@echo ""
	@echo "Targets:"
	@echo "  help             			Show this help message"
	@echo "  build            			Build all images"
	@echo "  push             			Push all images"
	@echo ""
	@echo "Environment Variables:"
	@echo "  See .env.sample and create a .env file with all the environment variables"
	@echo ""
	@echo "Example:"
	@echo "  make build"
	@echo ""
	@echo "Warning:"
	@echo "  Make sure you have the .env file with all the environment variables"
	@echo "  required by the application & login to the docker registry"

.PHONY: build
build:
	@$(call logger, "Building images")
	DOCKER_BUILDKIT=$(DOCKER_BUILDKIT) docker buildx bake

.PHONY: push
push:
	@$(call logger, "Pushing images")
	DOCKER_BUILDKIT=$(DOCKER_BUILDKIT) docker buildx bake --push

all: build push