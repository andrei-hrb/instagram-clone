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
     * Store the post.
     */
    public function store(PostStoreRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $fileName = Storage::putFile('public/images/posts', $request->file('image'));

        $post = Post::create([
            'image' => str_replace('public', 'storage', $fileName),
            'description' => $validated['description'],
            'user_id' => $request->user()->id,
        ]);

        $post->save();

        return Redirect::route('posts.create');
    }

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
     * Delete the post.
     */
    public function destroy(Post $post): RedirectResponse
    {
        $post->delete();

        return Redirect::to('/');
    }
}
