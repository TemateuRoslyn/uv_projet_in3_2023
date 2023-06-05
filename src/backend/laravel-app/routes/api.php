<?php

// third party libs...
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// controllers
use App\Http\Controllers\API\EleveController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\NotificationController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\PermissionController;
use App\Http\Controllers\API\RoleController;




/*
|--------------------------------------------------------------------------
| api Routes
|--------------------------------------------------------------------------
|
| Here is where you can register api routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/



/**
 * publics routes
 */
Route::prefix('auth')->group(function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);
    Route::middleware('jwt.verify')->post('logout', [AuthController::class, 'logout']);
    Route::middleware('jwt.verify')->post('user', [AuthController::class, 'user']);
});




/**
 * secured routes
 */
Route::middleware('jwt.verify')->group(function () {
   
    // users
    Route::prefix('users')->group(function () {
        Route::get('/findAll', [UserController::class, 'index']);
        Route::get('/findOne/{userId}', [UserController::class, 'show']);
        Route::post('/create', [UserController::class, 'store']);
        Route::put('/update/{userId}', [UserController::class, 'update']);
        Route::delete('/delete/{userId}', [UserController::class, 'destroy']);
    });

    // permissions
    Route::prefix('permissions')->group(function () {
        Route::get('/findAll', [PermissionController::class, 'index']);
        Route::get('/findOne/{permissionId}', [PermissionController::class, 'show']);
        Route::post('/create', [PermissionController::class, 'store']);
        Route::put('/update/{permissionId}', [PermissionController::class, 'update']);
        Route::delete('/delete/{permissionId}', [PermissionController::class, 'destroy']);
    });

    // roles
    Route::prefix('roles')->group(function () {
        Route::get('/findAll', [RoleController::class, 'index']);
        Route::get('/findOne/{roleId}', [RoleController::class, 'show']);
        Route::post('/create', [RoleController::class, 'store']);
        Route::put('/update/{roleId}', [RoleController::class, 'update']);
        Route::delete('/delete/{roleId}', [RoleController::class, 'destroy']);
    });
    
    // eleves
    Route::prefix('eleves')->group(function () {
        Route::post('create', [EleveController::class, 'store']);
        Route::post('update', [EleveController::class, 'update']);
        Route::delete('delete/{eleve}', [EleveController::class, 'delete']);
        Route::get('findOne/{eleveId}', [EleveController::class, 'view']);
        Route::get('findAll', [EleveController::class, 'index']);
    });

    // notifications
    Route::prefix('notification')->group(function () {
        Route::get('/', [NotificationController::class, 'showAll']);
        Route::post('/', [NotificationController::class, 'store']);
        Route::get('/{id}', [NotificationController::class, 'showIndex']);
        Route::put('/{id}', [NotificationController::class, 'update']);
        Route::delete('/{id}', [NotificationController::class, 'delete']);
    });

});


