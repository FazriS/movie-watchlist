<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\WatchlistController; 

/*
|--------------------------------------------------------------------------
| PUNYA USER
|--------------------------------------------------------------------------
*/

// PUBLIC
Route::get('/users', [UserController::class, 'index']);
Route::get('/users/{id}', [UserController::class, 'show']);
Route::get('/profiles/{id}', [ProfileController::class, 'show']);

// PROTECTED (Custom Middleware)
Route::middleware('user.auth')->group(function () {
    Route::post('/users', [UserController::class, 'store']);
});

/*
|--------------------------------------------------------------------------
| PUNYA WATCHLIST
|--------------------------------------------------------------------------
*/

// PROTECTED (Sanctum Middleware)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/watchlists', [WatchlistController::class, 'index']);
    Route::get('/watchlists/{id}', [WatchlistController::class, 'show']);
    Route::post('/watchlists', [WatchlistController::class, 'store']);
});