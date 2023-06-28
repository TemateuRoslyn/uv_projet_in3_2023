:: !/bin/bash

cd src\backend\laravel-app

set port=8000

set running=no
for /f "skip=1" %%p in ('netstat -aon ^| findstr "%port%"') do (
  set running=yes
  taskkill /pid %%p /f
)
if %running% == yes (
  php artisan migrate:fresh --seed
  php artisan l5-swagger:generate
  php artisan serve
) else (
  php artisan migrate:fresh --seed
  php artisan l5-swagger:generate
  php artisan serve
)

