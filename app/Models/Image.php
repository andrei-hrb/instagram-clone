<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    protected $fillable = [
        'url',
        'user_id',
    ];

    public function imageable()
    {
        return $this->morphTo();
    }
}
