<?php

use App\Http\Controllers\API\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    // ...
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);
    // ...
});

Route::get('/text', function () {
    return response('Texte brut de MAESTROS', 200)
        ->header('Content-Type', 'text/plain');
});

// Route::get('/admin/dashboard', function () {
//     // Cette route est accessible uniquement pour les utilisateurs avec le rôle "admin"
// })->middleware('admin');

Route::prefix('auth')->group(function () {
    // ...
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('user', [AuthController::class, 'user']);
    // ...
});

