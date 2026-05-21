<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\WatchlistController;
use App\Http\Controllers\Api\FilmController;
use App\Http\Controllers\Api\AuthController; 
use App\Http\Controllers\GenreController as ControllersGenreController;

/*
|--------------------------------------------------------------------------
| AUTH ROUTES (Public)
|--------------------------------------------------------------------------
*/
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

/*
|--------------------------------------------------------------------------
| PROTECTED ROUTES (Must Login with JWT)
|--------------------------------------------------------------------------
*/
Route::middleware('auth:api')->group(function () {

    // Auth Actions
    Route::get('/me', [AuthController::class, 'getUserProfile']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // --- USERS & PROFILE ---
    // User biasa hanya bisa lihat, Admin bisa tambah/kelola
    Route::get('/users', [UserController::class, 'index']);
    Route::get('/users/{id}', [UserController::class, 'show']);
    Route::post('/users', [UserController::class, 'store'])->middleware('role:admin');
    Route::get('/profiles/{id}', [ProfileController::class, 'show']);

    // --- FILM ---
    Route::get('/films', [FilmController::class, 'index']);
    Route::get('/films/{id}', [FilmController::class, 'show']);
    Route::get('/films/{id}/genres', [FilmController::class, 'genres']);
    Route::put('/films/{id}', [FilmController::class, 'update']);
    Route::delete('/films/{id}', [FilmController::class, 'destroy']);
    
    // Admin & Manager bisa tambah/update film
    Route::post('/films', [FilmController::class, 'store'])->middleware('role:admin,manager');
    Route::put('/films/{id}', [FilmController::class, 'update'])->middleware('role:admin,manager');
    Route::delete('/films/{id}', [FilmController::class, 'destroy'])->middleware('role:admin');

    // --- GENRE ---
    Route::get('/genres', [ControllersGenreController::class, 'getAllGenres']);
    Route::get('/genres/{id}', [ControllersGenreController::class, 'getGenreById']);
    
    // Modifikasi Genre biasanya hak Admin/Manager
    Route::post('/genres', [ControllersGenreController::class, 'createGenre'])->middleware('role:admin,manager');
    Route::put('/films/{id}/genre/{genreId}', [ControllersGenreController::class, 'attachGenre'])->middleware('role:admin,manager');

    // --- WATCHLIST ---
    // Semua user yang login bisa akses watchlist mereka sendiri
    Route::get('/watchlists', [WatchlistController::class, 'index']);
    Route::get('/watchlists/{id}', [WatchlistController::class, 'show']);
    Route::post('/watchlists', [WatchlistController::class, 'store']);
    Route::put('/watchlists/{id}', [WatchlistController::class, 'update']); // <-- Jalur API untuk Ubah Status
});