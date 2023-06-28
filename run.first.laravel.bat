:: !/bin/bash

cd src\backend\laravel-app

set port=8000

set running=no
for /f "skip=1" %%p in ('netstat -aon ^| findstr "%port%"') do (
  set running=yes
  taskkill /pid %%p /f
)
if %running% == yes (
  composer install
  composer dumpautoload
  php artisan l5-swagger:generate
  php artisan migrate:fresh --seed
  php artisan jwt:secret
  php artisan serve
) else (
  composer update
  composer dumpautoload
  php artisan l5-swagger:generate
  php artisan migrate:fresh --seed
  php artisan jwt:secret
  php artisan serve
)


