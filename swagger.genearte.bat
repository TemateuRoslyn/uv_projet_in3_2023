cd resources\api\swagger

java -jar swagger-codegen-cli.jar generate -i ..\..\..\src\backend\laravel-app\storage\api-docs\api-docs.json -l typescript-axios -o ..\..\..\src\frontend\web\react-admin\src\api 
java -jar swagger-codegen-cli.jar generate -i ..\..\..\src\backend\laravel-app\storage\api-docs\api-docs.json -l typescript-axios -o ..\..\..\src\frontend\web\react-site\src\api 


REM Locate the package.json file for the WebSite
set "PACKAGE_JSON_WEB=../../../src/frontend/web/react-site/src/generated/package.json"

REM Check if the package.json file exists for the WebSite
if exist "%PACKAGE_JSON_WEB%" (
  REM Find and replace the path for the WebSite
  powershell -Command "(Get-Content '%PACKAGE_JSON_WEB%') -replace '\"main\": \"\.\\dist\\index\.js\"', '\"main\": \"\.\\index\.js\"' | Set-Content '%PACKAGE_JSON_WEB%'"
  powershell -Command "(Get-Content '%PACKAGE_JSON_WEB%') -replace '\"typings\": \"\.\\dist\\index\.d\.ts\"', '\"typings\": \"\.\\index\.d\.ts\"' | Set-Content '%PACKAGE_JSON_WEB%'"

  echo Replaced paths in WebSite package.json
) else (
  echo package.json not found for WebSite
)

REM Locate the package.json file for the Admin
set "PACKAGE_JSON_ADMIN=../../../src/frontend/web/react-admin/src/generated/package.json"

REM Check if the package.json file exists for the Admin
if exist "%PACKAGE_JSON_ADMIN%" (
  REM Find and replace the path for the Admin
  powershell -Command "(Get-Content '%PACKAGE_JSON_ADMIN%') -replace '\"main\": \"\.\\dist\\index\.js\"', '\"main\": \"\.\\index\.js\"' | Set-Content '%PACKAGE_JSON_ADMIN%'"
  powershell -Command "(Get-Content '%PACKAGE_JSON_ADMIN%') -replace '\"typings\": \"\.\\dist\\index\.d\.ts\"', '\"typings\": \"\.\\index\.d\.ts\"' | Set-Content '%PACKAGE_JSON_ADMIN%'"

  echo Replaced paths in Admin package.json
) else (
  echo package.json not found for Admin
)