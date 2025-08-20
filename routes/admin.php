<?php

use App\Http\Controllers\Admin\ConfigController;
use App\Http\Controllers\Admin\ExperienceController;
use App\Http\Controllers\Admin\LanguageController;
use App\Http\Controllers\Admin\InterestController;
use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\Admin\SkillCategoryController;
use App\Http\Controllers\Admin\SkillController;
use App\Http\Controllers\Admin\StudyController;
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
                Route::post('/', [SkillController::class, 'store'])->name('skill.store');
                Route::delete('/{skill}', [SkillController::class, 'destroy'])->name('skill.destroy');
                Route::group(['prefix' => 'categories'], function () {
                    Route::post('/', [SkillCategoryController::class, 'store'])->name('skill.category.store');
                    Route::put('/{skillCategory}', [SkillCategoryController::class, 'attach'])->name('skill.category.attach');
                    Route::delete('/{skillCategory}', [SkillCategoryController::class, 'destroy'])->name('skill.category.destroy');
                });
            });
        });
        Route::group(['prefix' => 'studies'], function() {
            Route::get('/', [StudyController::class, 'index'])->name('study.index');
            Route::post('/', [StudyController::class, 'store'])->name('study.store');
            Route::put('/{study}', [StudyController::class, 'update'])->name('study.update');
            Route::delete('/{study}', [StudyController::class, 'destroy'])->name('study.destroy');
        });
        Route::group(['prefix' => 'experiences'], function() {
            Route::get('/', [ExperienceController::class, 'index'])->name('experience.index');
            Route::post('/', [ExperienceController::class, 'store'])->name('experience.store');
            Route::put('/{experience}', [ExperienceController::class, 'update'])->name('experience.update');
            Route::delete('/{experience}', [ExperienceController::class, 'destroy'])->name('experience.destroy');
        });
        Route::group(['prefix' => 'projects'], function() {
            Route::post('/', [ProjectController::class, 'store'])->name('project.store');
            Route::put('/{project}', [ProjectController::class, 'update'])->name('project.update');
            Route::delete('/{project}', [ProjectController::class, 'destroy'])->name('project.destroy');
        });
        Route::group(['prefix' => 'side-projects'], function() {
            Route::get('/', [ProjectController::class, 'sideProjects'])->name('project.side.index');
        });
    });
});
