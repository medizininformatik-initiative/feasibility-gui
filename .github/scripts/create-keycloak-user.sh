#!/usr/bin/env bash
set -euo pipefail

# Set the correct container name used by Keycloak
KEYCLOAK_CONTAINER="keycloak-auth"  # <-- Change this if needed

# Wait for Keycloak to be up inside the container using wget
echo "Waiting for Keycloak to be healthy inside container..."
docker exec -u0 "$KEYCLOAK_CONTAINER" bash -c '
  until wget --spider -q http://localhost:8080/auth/health; do
    echo "Keycloak not ready yet..."
    sleep 5
  done
  echo "Keycloak is ready!"
'
# Admin login
docker exec -u0 "$KEYCLOAK_CONTAINER" /opt/keycloak/bin/kcadm.sh config credentials \
  --server http://localhost:8080/auth \
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
