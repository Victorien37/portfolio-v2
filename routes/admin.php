<?php

use App\Http\Controllers\Admin\ConfigController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::group(['prefix' => 'admin'], function () {
        Route::group(['prefix' => 'configs'], function () {
            Route::get('/', [ConfigController::class, 'index'])->name('config.index');
        });
    });
});
