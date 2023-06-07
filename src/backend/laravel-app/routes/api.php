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
use App\Http\Controllers\API\ParentsController;
use App\Http\Controllers\API\PersonnelController;
use App\Http\Controllers\API\RegleController;
use App\Http\Controllers\API\ReglementInterieurController;

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

    Route::middleware('role:admin')->group(function () {

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
    });

    // eleves
    Route::prefix('eleves')->group(function () {
        Route::get('findOne/{eleveId}', [EleveController::class, 'view']);
        Route::get('findAll', [EleveController::class, 'index']);
        
        Route::middleware('permission:modifier_eleve')->post('update', [EleveController::class, 'update']);
        Route::middleware('permission:supprimer_eleve')->delete('delete/{eleve}', [EleveController::class, 'delete']);
        Route::middleware('permission:creer_eleve')->post('create', [EleveController::class, 'store']);
       
    });

    // notifications
    Route::prefix('notification')->group(function () {
        Route::get('/', [NotificationController::class, 'showAll']);
        Route::post('/', [NotificationController::class, 'store']);
        Route::get('/{id}', [NotificationController::class, 'showIndex']);
        Route::put('/{id}', [NotificationController::class, 'update']);
        Route::delete('/{id}', [NotificationController::class, 'delete']);
    });

    // parents
    Route::prefix('parents')->group(function () {
        Route::get('findAll', [ParentsController::class, 'showAll']);
        Route::get('findOne/{parentId}', [ParentsController::class, 'showIndex']);
        
        Route::middleware('permission:creer_parent')->post('create', [ParentsController::class, 'store']);
        Route::middleware('permission:modifier_parent')->post('update', [ParentsController::class, 'update']);
        Route::middleware('permission:supprimer_parent')->delete('delete/{parentId}', [ParentsController::class, 'delete']);
    });

    // Reglement Interieur
    Route::prefix('reglement')->group(function () {
        Route::get('findAll', [ReglementInterieurController::class, 'showAll']);
        Route::post('create', [ReglementInterieurController::class, 'store']);
        Route::get('findOne/{reglementId}', [ReglementInterieurController::class, 'showIndex']);
        Route::post('update', [ReglementInterieurController::class, 'update']);
        Route::delete('delete/{reglementId}', [ReglementInterieurController::class, 'delete']);
    });

    // Regle
    Route::prefix('regle')->group(function () {
        Route::get('findAll', [RegleController::class, 'showAll']);
        Route::post('create', [RegleController::class, 'store']);
        Route::get('findOne/{regleId}', [RegleController::class, 'showIndex']);
        Route::post('update', [RegleController::class, 'update']);
        Route::delete('delete/{regleId}', [RegleController::class, 'delete']);
    });

    // personnel
    Route::prefix('personnel')->group(function () {
        Route::get('findAll', [PersonnelController::class, 'showAll']);
        Route::get('findOne/{personnelId}', [PersonnelController::class, 'showIndex']);
        
        Route::middleware('permission:creer_personnel')->post('create', [PersonnelController::class, 'store']);
        Route::middleware('permission:modifier_personnel')->post('update', [PersonnelController::class, 'update']);
        Route::middleware('permission:supprimer_personnel')->delete('delete/{personnelId}', [PersonnelController::class, 'delete']);
    });
});
