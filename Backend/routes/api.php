<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\EtablissementController;
use App\Http\Controllers\Api\ClasseController;
use App\Http\Controllers\Api\FiliereController;
use App\Http\Controllers\Api\AnneeScolaireController;
use App\Http\Controllers\Api\StatsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
| Routes API de l'application EDUSMART.
*/

// ─────────────────────────────────────────────────────────────────────────
// ROUTES PUBLIQUES
// ─────────────────────────────────────────────────────────────────────────
Route::post('/login', [AuthController::class, 'login']);

// ─────────────────────────────────────────────────────────────────────────
// ROUTES PROTÉGÉES (Nécessitent un Token Bearer Sanctum valide)
// ─────────────────────────────────────────────────────────────────────────
Route::middleware('auth:sanctum')->group(function () {
    
    // 👤 Gestion du Profil Utilisateur
    Route::get('/user', function (Request $request) { return $request->user(); });
    Route::get('/profile', [AuthController::class, 'profile']);
    Route::put('/profile/update', [AuthController::class, 'updateProfile']);
    Route::put('/profile/password', [AuthController::class, 'changePassword']);

    // 🏢 Gestion des Établissements
    Route::apiResource('etablissements', EtablissementController::class);

    // // 📚 Gestion Académique (Activée)
    // Route::apiResource('classes', ClasseController::class);
    // Route::apiResource('filieres', FiliereController::class);
    // Route::apiResource('annees-scolaires', AnneeScolaireController::class);

    // // 📊 Statistiques (Endpoints dédiés)
    Route::prefix('stats')->group(function () {
        Route::get('/', [StatsController::class, 'index']);
        Route::get('/repartition-region', [StatsController::class, 'getRepartitionParRegion']);
        Route::get('/evolution', [StatsController::class, 'getEvolutionParAnnee']);
        Route::get('/utilisateurs', [StatsController::class, 'getUserStats']);
        Route::get('/filieres', [StatsController::class, 'getFiliereStats']);
    });

    // 👥 Gestion des Membres du groupe MINESEC
    Route::get('/minesec/members', [AuthController::class, 'indexMembers']);
    Route::post('/minesec/members', [AuthController::class, 'createMember']);
    Route::delete('/minesec/members/{id}', [AuthController::class, 'deleteMember']);

    // 🔒 Déconnexion
    Route::post('/logout', [AuthController::class, 'logout']);
    
});