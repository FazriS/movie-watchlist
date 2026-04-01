<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ProfileController;

////PUNYA USER
// PUBLIC
Route::get('/users', [UserController::class, 'index']);
Route::get('/users/{id}', [UserController::class, 'show']);
Route::get('/profiles/{id}', [ProfileController::class, 'show']);

// PROTECTED
Route::middleware('user.auth')->group(function () {
    Route::post('/users', [UserController::class, 'store']);
});