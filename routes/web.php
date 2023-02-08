<?php

use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::redirect('/', '/feed');

Route::get('/feed', function () {
    return Inertia::render('Feed');
})->middleware(['auth', 'verified'])->name('feed');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::prefix('posts')->group(function () {
        Route::get('create', [PostController::class, 'create'])->name('posts.create');
        Route::post('/', [PostController::class, 'store'])->name('posts.store');
        Route::get('{post}', [PostController::class, 'show'])->name('posts.show');
        Route::get('{post}/edit', [PostController::class, 'edit'])->name('posts.edit');
        Route::patch('{post}', [PostController::class, 'update'])->name('posts.update');
        Route::delete('{post}', [PostController::class, 'destroy'])->name('posts.destroy');
    });
});

require __DIR__.'/auth.php';
