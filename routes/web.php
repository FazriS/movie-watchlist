<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Semua request akan diarahkan ke app.blade.php
| agar ditangani oleh React Router di frontend.
|
*/

Route::get('{any}', function () {
    return view('app');
})->where('any', '.*');