<?php

namespace App\Models\Traits;

use App\Models\Image;

trait Imageable
{
    public function image(): \Illuminate\Database\Eloquent\Relations\MorphOne
    {
        return $this->morphOne(Image::class, 'imageable');
    }
}
