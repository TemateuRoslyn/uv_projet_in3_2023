:: !/bin/bash

cd src/backend/laravel-app


set port=8000

set running=no
for /f "skip=1" %%p in ('netstat -aon ^| findstr "%port%"') do (
  set running=yes
  taskkill /pid %%p /f
)
if %running% == yes (
  composer install
  php artisan migrate:fresh --seed
  php artisan passport:install
  php artisan serve
) else (
  composer install
  php artisan migrate:fresh --seed
  php artisan passport:install
  php artisan serve
)
