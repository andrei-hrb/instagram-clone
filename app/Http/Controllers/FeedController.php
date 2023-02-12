<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class FeedController extends Controller
{
    public function show(): \Inertia\Response
    {
        $followingIds = Auth::user()->following->pluck('id');
        $posts = Post::whereIn('user_id', $followingIds)->orderBy('created_at', 'desc')->with('user')->get();

        return Inertia::render('Feed', [
            'posts' => $posts,
        ]);
    }
}
