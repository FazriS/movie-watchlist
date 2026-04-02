<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\FilmController;
use App\Http\Controllers\Api\GenreController;
use App\Http\Controllers\GenreController as ControllersGenreController;

////PUNYA USER
// PUBLIC
Route::get('/users', [UserController::class, 'index']);
Route::get('/users/{id}', [UserController::class, 'show']);
Route::get('/profiles/{id}', [ProfileController::class, 'show']);
// FILM
Route::get('/films', [FilmController::class, 'index']);
Route::get('/films/{id}', [FilmController::class, 'show']);
Route::get('/films/{id}/genres', [FilmController::class, 'genres']);

// PUBLIC
Route::post('/genres', [ControllersGenreController::class, 'createGenre']);
Route::get('/genres', [ControllersGenreController::class, 'getAllGenres']);
Route::get('/genres/{id}', [ControllersGenreController::class, 'getGenreById']);


// PROTECTED
Route::middleware('user.auth')->group(function () {
    Route::post('/users', [UserController::class, 'store']);
    Route::middleware('user.auth')->group(function () {
    Route::post('/users', [UserController::class, 'store']);

    // FILM
    Route::post('/films', [FilmController::class, 'store']);
});
});
