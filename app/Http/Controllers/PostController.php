<?php

namespace App\Http\Controllers;

use App\Events\NewLike;
use App\Events\NewPost;
use App\Events\UpdatePost;
use App\Http\Requests\Post\PostDestroyRequest;
use App\Http\Requests\Post\PostStoreRequest;
use App\Http\Requests\Post\PostUpdateRequest;
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

        $request->user()->followers->each(fn ($follower) => NewPost::dispatch($follower, $post));

        return Redirect::route('posts.create');
    }

    /**
     * Display the post.
     */
    public function show(Post $post): Response
    {
        return Inertia::render('Post/Show', [
            'status' => session('status'),
            'post' => $post->load(['user', 'likes', 'comments']),
        ]);
    }

    public function update(Post $post, PostUpdateRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $post->update([
            'description' => $validated['description'],
        ]);

        return Redirect::back();
    }

    /**
     * Delete the post.
     */
    public function destroy(Post $post, PostDestroyRequest $request): RedirectResponse
    {
        $request->validated();

        UpdatePost::dispatch($post);

        $post->delete();

        return Redirect::to('/');
    }

    /**
     * Like the post.
     */
    public function like(Post $post, Request $request): RedirectResponse
    {
        if ($post->likes()->where('user_id', $request->user()->id)->exists()) {
            $post->likes()->where('user_id', $request->user()->id)->delete();
        } else {
            $post->likes()->create([
                'user_id' => $request->user()->id,
            ]);

            if ($post->user_id !== $request->user()->id) {
                NewLike::dispatch($post->user, $post);
            }
        }

        UpdatePost::dispatch($post);

        return Redirect::back();
    }
}
