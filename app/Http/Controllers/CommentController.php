<?php

namespace App\Http\Controllers;

use App\Events\NewComment;
use App\Events\UpdatePost;
use App\Http\Requests\Comment\CommentDestroyRequest;
use App\Http\Requests\Comment\CommentStoreRequest;
use App\Http\Requests\Comment\CommentUpdateRequest;
use App\Models\Comment;
use App\Models\Post;
use Illuminate\Support\Facades\Redirect;

class CommentController extends Controller
{
    /**
     * Store the comment.
     */
    public function store(Post $post, CommentStoreRequest $request): \Illuminate\Http\RedirectResponse
    {
        $validated = $request->validated();

        $post->comments()->create([
            'content' => $validated['content'],
            'user_id' => $request->user()->id,
        ]);

        if ($post->user_id !== $request->user()->id) {
            NewComment::dispatch($post->user, $post);
        }

        UpdatePost::dispatch($post);

        return Redirect::back();
    }

    /**
     * Update the comment.
     */
    public function update(Comment $comment, CommentUpdateRequest $request): \Illuminate\Http\RedirectResponse
    {
        $validated = $request->validated();

        $comment->update([
            'content' => $validated['content'],
        ]);

        UpdatePost::dispatch($comment->commentable);

        return Redirect::back();
    }

    /**
     * Update the comment.
     */
    public function destroy(Comment $comment, CommentDestroyRequest $request): \Illuminate\Http\RedirectResponse
    {
        $request->validated();

        $comment->delete();

        UpdatePost::dispatch($comment->commentable);

        return Redirect::back();
    }
}
