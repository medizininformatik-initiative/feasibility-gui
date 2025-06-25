#!/bin/bash -e

# Define tag or get from environment
ONTOLOGY_GIT_TAG="${ONTOLOGY_GIT_TAG:-v3.8.1}"

echo "Downloading ontology backend.zip for tag: $ONTOLOGY_GIT_TAG"

# Create necessary folders
mkdir -p .github/integration-test/ontology/ui_profiles
mkdir -p .github/integration-test/ontology/migration

# Download and unzip
curl -L "https://github.com/medizininformatik-initiative/fhir-ontology-generator/releases/download/${ONTOLOGY_GIT_TAG}/backend.zip" -o .github/integration-test/ontology/backend.zip

# Extract flat into ui_profiles
unzip -jod .github/integration-test/ontology/ui_profiles/ .github/integration-test/ontology/backend.zip

# Move SQL file
mv .github/integration-test/ontology/ui_profiles/R__Load_latest_ui_profile.sql .github/integration-test/ontology/migration/

# Optionally copy to the root-level `ontology/` for Docker compatibility
mkdir -p ontology/ui_profiles ontology/migration
cp .github/integration-test/ontology/ui_profiles/* ontology/ui_profiles/
cp .github/integration-test/ontology/migration/* ontology/migration/

# Clean up
rm .github/integration-test/ontology/backend.zip

echo "Ontology files are ready."
