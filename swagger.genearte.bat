cd resources\api\swagger

java -jar swagger-codegen-cli.jar generate -i ..\..\..\src\backend\laravel-app\storage\api-docs\api-docs.json -l typescript-axios -o ..\..\..\src\frontend\web\react-admin\src\generated 
java -jar swagger-codegen-cli.jar generate -i ..\..\..\src\backend\laravel-app\storage\api-docs\api-docs.json -l typescript-axios -o ..\..\..\src\frontend\web\react-site\src\generated 
