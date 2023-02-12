<?php

namespace App\Models\Traits;

use App\Models\Like;

trait Likeable
{
    public function likes(): \Illuminate\Database\Eloquent\Relations\morphMany
    {
        return $this->morphMany(Like::class, 'likeable');
    }
}
