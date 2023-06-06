#!/bin/bash

cd src/backend/laravel-app

port=8000

if sudo netstat -tulpn | grep "$port" > /dev/null
then
    sudo kill -9 `sudo lsof -t -i:8000`
    composer install
    composer dumpautoload
    php artisan l5-swagger:generate
    php artisan migrate:fresh --seed
    php artisan jwt:secret
    php artisan serve
else
    composer install
    composer dumpautoload
    php artisan l5-swagger:generate
    php artisan migrate:fresh --seed
    php artisan jwt:secret
    php artisan serve
fi
