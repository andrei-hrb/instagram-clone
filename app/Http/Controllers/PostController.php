<?php

namespace App\Http\Controllers;

use App\Http\Requests\Post\PostStoreRequest;
use App\Models\Post;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    /**
     * Display the post's form.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('Post/Create', [
            'status' => session('status'),
        ]);
    }

    /**
     * Store the post.
     */
    public function store(PostStoreRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $post = Post::create([
            'description' => $validated['description'],
            'user_id' => $request->user()->id,
        ]);

        $post->image()->create([
            'url' => env('DO_URL').Storage::putFile('instagram/images/posts', $request->file('image')),
            'user_id' => $request->user()->id,
        ]);

        return Redirect::route('posts.create');
    }

    /**
     * Display the post.
     */
    public function show(Post $post): Response
    {
        return Inertia::render('Post/Show', [
            'status' => session('status'),
            'post' => $post->load('user'),
        ]);
    }

    /**
     * Delete the post.
     */
    public function destroy(Post $post): RedirectResponse
    {
        $post->delete();

        return Redirect::to('/');
    }
}
