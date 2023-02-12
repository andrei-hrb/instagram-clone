<?php

namespace App\Models\Traits;

use App\Models\Comment;

trait Commentable
{
    public function comments(): \Illuminate\Database\Eloquent\Relations\morphMany
    {
        return $this->morphMany(Comment::class, 'commentable');
    }
}
