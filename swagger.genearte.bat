cd resources\api\swagger

java -jar swagger-codegen-cli.jar generate -i ..\..\..\src\backend\laravel-app\storage\api-docs\api-docs.json -l typescript-axios -o ..\..\..\src\frontend\web\react-admin\src\generated 
<<<<<<< HEAD
java -jar swagger-codegen-cli.jar generate -i ..\..\..\src\backend\laravel-app\storage\api-docs\api-docs.json -l typescript-axios -o ..\..\..\src\frontend\web\react-site\src\generated 
=======
java -jar swagger-codegen-cli.jar generate -i ..\..\..\src\backend\laravel-app\storage\api-docs\api-docs.json -l typescript-axios -o ..\..\..\src\frontend\web\react-site\src\generated 
>>>>>>> 0b7e9d7 (Testing)
