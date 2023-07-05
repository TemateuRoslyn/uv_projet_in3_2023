<?php

// third party libs...
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// controllers
use App\Http\Controllers\API\EleveController;
use App\Http\Controllers\API\ClassesController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\NotificationController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\PermissionController;
use App\Http\Controllers\API\RoleController;
use App\Http\Controllers\API\ParentsController;
use App\Http\Controllers\API\CourController;
use App\Http\Controllers\API\ProfesseurController;
use App\Http\Controllers\API\PersonnelController;
use App\Http\Controllers\API\RegleController;
use App\Http\Controllers\API\ReglementInterieurController;
use App\Http\Controllers\API\ConseilDisciplineController;
use App\Http\Controllers\API\UploadController;
use App\Http\Controllers\API\FauteController;
use App\Http\Controllers\API\ConvocationController;
use App\Http\Controllers\API\MembreConseilController;
use App\Http\Controllers\API\ReparationController;
use App\Http\Controllers\API\SanctionPrevuController;
use App\Http\Controllers\API\SuggestionsController;
use App\Http\Controllers\API\AvoirMembreConseilDisciplineController;

/*
|--------------------------------------------------------------------------
| api Routes
|--------------------------------------------------------------------------
|Closes #215 - convocation,fautes,professeurs
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

Route::prefix('files')->group(function () {
    // file download
    Route::prefix('download')->group(function () {
        Route::get('/', [UploadController::class, 'downloadUserAvatar']);
    });
});

/**
 * secured routes
 */
Route::middleware('jwt.verify')->group(function () {

    Route::middleware('role:' . ADMIN_ROLE['name'])->group(function () {

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
            Route::put('/update/status/{permisionId}', [PermissionController::class, 'updateStatus']);
            Route::delete('/delete/{permissionId}', [PermissionController::class, 'destroy']);
        });

        // roles
        Route::prefix('roles')->group(function () {
            Route::get('/findAll', [RoleController::class, 'index']);
            Route::get('/findOne/{roleId}', [RoleController::class, 'show']);
            Route::post('/create', [RoleController::class, 'store']);
            Route::put('/update/{roleId}', [RoleController::class, 'update']);
            Route::put('/update/status/{roleId}', [RoleController::class, 'updateStatus']);
            Route::delete('/delete/{roleId}', [RoleController::class, 'destroy']);
        });
    });

    // classes
    Route::prefix('classes')->group(function () {
        Route::get('findOne/{classeId}', [ClassesController::class, 'show']);
        Route::get('findAll', [ClassesController::class, 'index']);
        Route::get('records/{keyword}', [ClassesController::class, 'records']);

        Route::middleware('permission:modifier_classe')->put('update/{classeId}', [ClassesController::class, 'update']);
        Route::middleware('permission:supprimer_classe')->delete('delete/{classeId}', [ClassesController::class, 'destroy']);
        Route::middleware('permission:creer_classe')->post('create', [ClassesController::class, 'store']);
    });

    // eleves
    Route::prefix('eleves')->group(function () {
        Route::get('findOne/{eleveId}', [EleveController::class, 'view']);
        Route::get('findAll', [EleveController::class, 'index']);
        Route::get('records/{keyword}', [EleveController::class, 'records']);

        Route::middleware('permission:modifier_eleve')->put('update/{eleveId}', [EleveController::class, 'update']);
        Route::middleware('permission:supprimer_eleve')->delete('delete/{eleveId}', [EleveController::class, 'delete']);
        Route::middleware('permission:creer_eleve')->post('create', [EleveController::class, 'store']);
    });

    // sanctionprevus
    Route::prefix('sanctionprevus')->group(function () {
        Route::get('findOne/{sanctionprevuId}', [SanctionPrevuController::class, 'view']);
        Route::get('findAll', [SanctionPrevuController::class, 'index']);

        Route::middleware('permission:modifier_sanction')->put('update/{sanctionprevuId}', [SanctionPrevuController::class, 'update']);
        Route::middleware('permission:supprimer_sanction')->delete('delete/{sanctionprevuId}', [SanctionPrevuController::class, 'delete']);
        Route::middleware('permission:creer_sanction')->post('create', [SanctionPrevuController::class, 'store']);
    });

    // membreconseils
    Route::prefix('membreconseils')->group(function () {
        Route::get('findOne/{membreconseilId}', [MembreConseilController::class, 'view']);
        Route::get('findAll/', [MembreConseilController::class, 'index']);

        Route::middleware('permission:modifier_conseil')->put('update/{eleveId}', [MembreConseilController::class, 'update']);
        Route::middleware('permission:supprimer_conseil')->delete('delete/{eleveId}', [MembreConseilController::class, 'delete']);
        Route::middleware('permission:creer_conseil')->post('create/', [MembreConseilController::class, 'store']);
    });

    // notifications
    Route::prefix('notification')->group(function () {
        Route::get('findOne/{notificationId}', [NotificationController::class, 'view']);
        Route::get('findAll/', [NotificationController::class, 'index']);

        Route::middleware('permission:modifier_notification')->put('update/{notificationId}', [NotificationController::class, 'update']);
        Route::middleware('permission:supprimer_notification')->delete('delete/{notificationId}', [NotificationController::class, 'delete']);
        Route::middleware('permission:creer_notification')->post('create/', [NotificationController::class, 'store']);
    });

    // parents
    Route::prefix('parents')->group(function () {
        Route::get('findAll', [ParentsController::class, 'index']);
        Route::get('findOne/{parentId}', [ParentsController::class, 'view']);

        Route::middleware('permission:modifier_parent')->put('update/{parentId}', [ParentsController::class, 'update']);
        Route::middleware('permission:creer_parent')->post('create', [ParentsController::class, 'store']);
        Route::middleware('permission:supprimer_parent')->delete('delete/{parentId}', [ParentsController::class, 'delete']);
    });

    // Reglement Interieur
    Route::prefix('reglement')->group(function () {
        Route::get('findAll', [ReglementInterieurController::class, 'index']);
        Route::get('findOne/{reglementId}', [ReglementInterieurController::class, 'view']);
        Route::middleware('permission:creer_reglement_interieure')->post('create', [ReglementInterieurController::class, 'store']);
        Route::middleware('permission:modifier_reglement_interieure')->post('update/{reglementId}', [ReglementInterieurController::class, 'update']);
        Route::middleware('permission:supprimer_reglement_interieure')->delete('delete/{reglementId}', [ReglementInterieurController::class, 'delete']);
    });

    // Regle
    Route::prefix('regle')->group(function () {
        Route::get('findAll', [RegleController::class, 'index']);
        Route::get('findOne/{regleId}', [RegleController::class, 'view']);
        Route::middleware('permission:creer_regle')->post('create', [RegleController::class, 'store']);
        Route::middleware('permission:modifier_regle')->post('update/{regleId}', [RegleController::class, 'update']);
        Route::middleware('permission:supprimer_regle')->delete('delete/{regleId}', [RegleController::class, 'delete']);
    });

    // cours
    Route::prefix('cours')->group(function () {
        Route::middleware('permission:creer_cours')->post('create', [CourController::class, 'store']);
        Route::middleware('permission:modifier_cours')->put('update/{coursId}', [CourController::class, 'update']);
        Route::middleware('permission:supprimer_cours')->delete('delete/{coursId}', [CourController::class, 'delete']);
        Route::get('findOne/{coursId}', [CourController::class, 'show']);
        Route::get('findAll', [CourController::class, 'index']);

        Route::get('records/{keyword}', [CourController::class, 'records']);
    });

    // personnel
    Route::prefix('personnel')->group(function () {
        Route::get('findAll', [PersonnelController::class, 'index']);
        Route::get('findOne/{personnelId}', [PersonnelController::class, 'view']);

        Route::middleware('permission:creer_personnel')->post('create', [PersonnelController::class, 'store']);
        Route::middleware('permission:modifier_personnel')->put('update/{personnelId}', [PersonnelController::class, 'update']);
        Route::middleware('permission:supprimer_personnel')->delete('delete/{personnelId}', [PersonnelController::class, 'delete']);
    });

    //professeurs
    Route::prefix('professeurs')->group(function () {
        Route::middleware('permission:creer_professeur')->post('create', [ProfesseurController::class, 'store']);
        Route::middleware('permission:modifier_professeur')->post('update/{professeurId}', [ProfesseurController::class, 'update']);
        Route::middleware('permission:supprimer_professeur')->delete('delete/{professeurId}', [ProfesseurController::class, 'delete']);
        Route::get('findOne/{professeurId}', [ProfesseurController::class, 'view']);
        Route::get('findAll', [ProfesseurController::class, 'index']);
    });

    // conseil_disciplines
    Route::prefix('conseil_discipline')->group(function () {
        Route::middleware('permission:creer_conseil')->post('create', [ConseilDisciplineController::class, 'store']);
        Route::middleware('permission:modifier_conseil')->put('update/{conseil_disciplineId}', [ConseilDisciplineController::class, 'update']);
        Route::middleware('permission:supprimer_conseil')->delete('delete/{conseil_disciplineId}', [ConseilDisciplineController::class, 'delete']);

        Route::get('findOne/{conseil_disciplineId}', [ConseilDisciplineController::class, 'view']);
        Route::get('findAll', [ConseilDisciplineController::class, 'index']);
        Route::get('findAll/eleve/{eleveId}', [ConseilDisciplineController::class, 'viewConseilDisciplineEleve']);
    });

    // avoirmembreconseildisciplines
    Route::prefix('avoirmembreconseildisciplines')->group(function () {
        Route::middleware('permission:creer_conseil_discipline')->post('create', [AvoirMembreConseilDisciplineController::class, 'store']);
        Route::middleware('permission:modifier_conseil_discipline')->put('update/{conseil_disciplineId}', [AvoirMembreConseilDisciplineController::class, 'update']);
        Route::middleware('permission:supprimer_conseil_discipline')->delete('delete/{conseil_disciplineId}', [AvoirMembreConseilDisciplineController::class, 'delete']);

        Route::get('findOne/{conseil_disciplineId}', [AvoirMembreConseilDisciplineController::class, 'view']);
        Route::get('findAll', [AvoirMembreConseilDisciplineController::class, 'index']);
    });

    //fautes
    Route::prefix('fautes')->group(function () {
        Route::middleware('permission:creer_faute')->post('create', [FauteController::class, 'store']);
        Route::middleware('permission:modifier_faute')->put('update/{fauteId}', [FauteController::class, 'update']);
        Route::middleware('permission:supprimer_faute')->delete('delete/{fauteId}', [FauteController::class, 'delete']);
        Route::get('findOne/{fauteId}', [FauteController::class, 'view']);
        Route::get('findAll', [FauteController::class, 'index']);
        Route::get('findAll/eleve/{eleveId}', [FauteController::class, 'viewFautesEleve']);
        Route::get('findAll/eleveAndKeyword/{eleveId}/{keyword}', [FauteController::class, 'viewFautesEleveAndKeyword']); //

    });

    //convocation
    Route::prefix('convocation')->group(function () {
        Route::middleware('permission:creer_convocation')->post('create', [ConvocationController::class, 'store']);
        Route::middleware('permission:modifier_convocation')->put('update/{convocationId}', [ConvocationController::class, 'update']);
        Route::middleware('permission:supprimer_convocation')->delete('delete/{convocationId}', [ConvocationController::class, 'delete']);
        Route::get('findOne/{convocationId}', [ConvocationController::class, 'view']);
        Route::get('findAll', [ConvocationController::class, 'index']);
        Route::get('findAll/eleve/{eleveId}', [ConvocationController::class, 'viewConvocationEleve']);
    });


    // suggestion
    Route::prefix('suggestion')->group(function () {
        Route::post('create', [SuggestionsController::class, 'store']);
        Route::put('update/{suggestionId}', [SuggestionsController::class, 'update']);
        Route::delete('delete/{suggestionId}', [SuggestionsController::class, 'delete']);
        Route::get('findOne/{suggestionId}', [SuggestionsController::class, 'view']);
        Route::get('findAll', [SuggestionsController::class, 'index']);
    });



    //Reparations
    Route::prefix('reparations')->group(function () {
        Route::middleware('permission:creer_reparation')->post('create', [ReparationController::class, 'store']);
        Route::middleware('permission:modifier_reparation')->put('update/{reparationId}', [ReparationController::class, 'update']);
        Route::middleware('permission:supprimer_reparation')->delete('delete/{reparationId}', [ReparationController::class, 'delete']);
        Route::get('findOne/{reparationId}', [ReparationController::class, 'view']);
        Route::get('findAll', [ReparationController::class, 'index']);
    });
});
