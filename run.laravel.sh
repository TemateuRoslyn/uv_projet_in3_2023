#!/bin/bash

cd src/backend/laravel-app

port=8000

if sudo netstat -tulpn | grep "$port" > /dev/null
then
    sudo kill -9 `sudo lsof -t -i:8000`
    php artisan migrate:fresh --seed
    php artisan serve
else
    php artisan migrate:fresh --seed
    php artisan serve
fi