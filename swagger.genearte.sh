#!/bin/bash
cd resources/api/swagger

java -jar swagger-codegen-cli.jar generate -i ../../../src/backend/laravel-app/storage/api-docs/api-docs.json -l typescript-axios -o ../../../src/frontend/web/react-admin/src/generated 
java -jar swagger-codegen-cli.jar generate -i ../../../src/backend/laravel-app/storage/api-docs/api-docs.json -l typescript-axios -o ../../../src/frontend/web/react-site/src/generated 


# Locate the package.json file
PACKAGE_JSON_WEB="../../../src/frontend/web/react-site/src/generated/package.json"

# Check if the package.json file exists
if [ -f "$PACKAGE_JSON_WEB" ]; then
  # Find and replace the path
  sed -i 's/"main": "\.\/dist\/index\.js"/"main": "\.\/index\.js"/g' "$PACKAGE_JSON_WEB"
  sed -i 's/"typings": "\.\/dist\/index\.d\.ts"/"typings": "\.\/index\.d\.ts"/g' "$PACKAGE_JSON_WEB"

  echo "Replaced paths in WebSite package.json"
else
  echo "package.json not found"
fi

# Locate the package.json file
PACKAGE_JSON_ADMIN="../../../src/frontend/web/react-admin/src/generated/package.json"

# Check if the package.json file exists
if [ -f "$PACKAGE_JSON_ADMIN" ]; then
  # Find and replace the path
  sed -i 's/"main": "\.\/dist\/index\.js"/"main": "\.\/index\.js"/g' "$PACKAGE_JSON_ADMIN"
  sed -i 's/"typings": "\.\/dist\/index\.d\.ts"/"typings": "\.\/index\.d\.ts"/g' "$PACKAGE_JSON_ADMIN"

  echo "Replaced paths in Admin package.json"
else
  echo "package.json not found"
fi
