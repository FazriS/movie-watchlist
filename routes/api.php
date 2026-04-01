<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\FilmController;

////PUNYA USER
// PUBLIC
Route::get('/users', [UserController::class, 'index']);
Route::get('/users/{id}', [UserController::class, 'show']);
Route::get('/profiles/{id}', [ProfileController::class, 'show']);
// FILM
Route::get('/films', [FilmController::class, 'index']);
Route::get('/films/{id}', [FilmController::class, 'show']);
Route::get('/films/{id}/genres', [FilmController::class, 'genres']);

// PROTECTED
Route::middleware('user.auth')->group(function () {
    Route::post('/users', [UserController::class, 'store']);
    Route::middleware('user.auth')->group(function () {
    Route::post('/users', [UserController::class, 'store']);

    // FILM
    Route::post('/films', [FilmController::class, 'store']);
});
});