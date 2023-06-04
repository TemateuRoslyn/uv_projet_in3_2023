<?php

// third party libs...
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// controllers
use App\Http\Controllers\API\EleveController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\NotificationController;

// maestros
Route::prefix('auth')->group(function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('user', [AuthController::class, 'user']);
});

// lucie
Route::prefix('eleves')->group(function () {
    Route::post('create', [EleveController::class, 'store']);
    Route::post('update', [EleveController::class, 'update']);
    Route::delete('delete/{eleve}', [EleveController::class, 'delete']);
    Route::get('findOne/{eleveId}', [EleveController::class, 'view']);
    Route::get('findAll', [EleveController::class, 'index']);
});

// Route::prefix('students')->middleware('auth:api')->group(function () {
//     Route::post('/eleves', [EleveController::class, 'store']);
//     Route::put('/eleves/{eleve}', [EleveController::class, 'update']);
//     Route::delete('/eleves/{eleve}', [EleveController::class, 'delete']);
// });

// midas
Route::prefix('notification')->group(function () {
    Route::get('/', [NotificationController::class, 'showAll']);
    Route::post('/', [NotificationController::class, 'store']);
    Route::get('/{id}', [NotificationController::class, 'showIndex']);
    Route::put('/{id}', [NotificationController::class, 'update']);
    Route::delete('/{id}', [NotificationController::class, 'delete']);
});
