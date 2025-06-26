#!/bin/bash -e

# 1. Authenticate kcadm.sh inside the 'auth' container
docker exec -u0 auth /opt/keycloak/bin/kcadm.sh config credentials \
  --server http://localhost:8080/auth \
  --realm master \
  --user keycloakadmin \
  --password keycloak

# 2. Create a user in the 'dataportal' realm
docker exec -u0 auth /opt/keycloak/bin/kcadm.sh create users \
  -s username=testuser \
  -s email=test@example.com \
  -s enabled=true \
  -s emailVerified=true \
  -r dataportal

# 3. Assign the 'DataportalUser' role to the new user
docker exec -u0 auth /opt/keycloak/bin/kcadm.sh add-roles \
  --uusername testuser \
  --rolename DataportalUser \
  -r dataportal

# 4. Set the user's password
docker exec -u0 auth /opt/keycloak/bin/kcadm.sh set-password \
  -r dataportal \
  --username test \
  --new-password test1
