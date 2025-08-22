<?php

use App\Http\Controllers\FrontController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['check_user'])->group(function () {
    Route::get('/', [FrontController::class, 'index'])->name('home');
    Route::get('/experience/{companyName}/{start}', [FrontController::class, 'experience'])->name('experience.show');
    Route::post('/contact', [FrontController::class, 'contact'])->name('contact');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/admin.php';
