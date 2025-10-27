#!/usr/bin/env bash
set -euo pipefail

# Set the correct container name used by Keycloak
KEYCLOAK_CONTAINER="keycloak-auth"  # <-- Change this if needed

# Admin login
docker exec -u0 "$KEYCLOAK_CONTAINER" /opt/keycloak/bin/kcadm.sh config credentials \
  --server http://localhost:8080 \
  --realm master \
  --user keycloakadmin \
  --password keycloak

# Create user
docker exec -u0 "$KEYCLOAK_CONTAINER" /opt/keycloak/bin/kcadm.sh create users \
  -s username=testuser \
  -s email=test@example.com \
  -s enabled=true \
  -s emailVerified=true \
  -r dataportal

# Assign role
docker exec -u0 "$KEYCLOAK_CONTAINER" /opt/keycloak/bin/kcadm.sh add-roles \
  --uusername testuser \
  --rolename DataportalUser \
  -r dataportal

# Set password
docker exec -u0 "$KEYCLOAK_CONTAINER" /opt/keycloak/bin/kcadm.sh set-password \
  -r dataportal \
  --username testuser \
  --new-password testpassword

echo "Keycloak user 'testuser' created and configured."
