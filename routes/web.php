<?php

use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SearchController;
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
    Route::prefix('profile')->group(function () {
        Route::get('/{user}', [ProfileController::class, 'show'])->name('profile.show');
        Route::get('/', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::post('/', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/', [ProfileController::class, 'destroy'])->name('profile.destroy');

        Route::post('/follow', [ProfileController::class, 'follow'])->name('profile.follow');
        Route::post('/unfollow', [ProfileController::class, 'unfollow'])->name('profile.unfollow');
    });

    Route::prefix('search')->group(function () {
        Route::get('/', [SearchController::class, 'index'])->name('search.index');
        Route::post('/', [SearchController::class, 'query'])->name('search.query');
    });

    Route::prefix('posts')->group(function () {
        Route::get('create', [PostController::class, 'create'])->name('posts.create');
        Route::post('/', [PostController::class, 'store'])->name('posts.store');
        Route::get('{post}', [PostController::class, 'show'])->name('posts.show');
        Route::get('{post}/edit', [PostController::class, 'edit'])->name('posts.edit');
        Route::patch('{post}', [PostController::class, 'update'])->name('posts.update');
        Route::delete('{post}', [PostController::class, 'destroy'])->name('posts.destroy');

        Route::get('{post}/like', [PostController::class, 'like'])->name('posts.like');
    });
});

require __DIR__.'/auth.php';
