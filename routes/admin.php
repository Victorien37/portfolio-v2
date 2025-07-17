<?php

use App\Http\Controllers\Admin\ConfigController;
use App\Http\Controllers\Admin\LanguageController;
use App\Http\Controllers\Admin\InterestController;
use App\Http\Controllers\Admin\SkillTypeController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::group(['prefix' => 'admin'], function () {
        Route::group(['prefix' => 'configs'], function () {
            Route::get('/', [ConfigController::class, 'index'])->name('config.index');
            Route::put('/theme', [ConfigController::class, 'theme'])->name('config.theme');
            Route::put('/job', [ConfigController::class, 'job'])->name('config.job');
            Route::group(['prefix' => 'languages'], function () {
                Route::post('/', [LanguageController::class, 'store'])->name('language.store');
                Route::put('/{language}', [LanguageController::class, 'update'])->name('language.update');
                Route::delete('/{language}', [LanguageController::class, 'destroy'])->name('language.destroy');
            });
            Route::group(['prefix' => 'interests'], function() {
                Route::post('/', [InterestController::class, 'store'])->name('interest.store');
                Route::put('/{interest}', [InterestController::class, 'update'])->name('interest.update');
                Route::delete('/{interest}', [InterestController::class, 'destroy'])->name('interest.destroy');
            });
            Route::group(['prefix' => 'skills'], function () {
                Route::group(['prefix' => 'types'], function () {
                    Route::post('/', [SkillTypeController::class, 'store'])->name('skill.type.store');
                    Route::delete('/{skillType}', [SkillTypeController::class, 'destroy'])->name('skill.type.destroy');
                });
            });
        });
    });
});
