<?php

namespace App\Models;

use App\Models\Traits\Commentable;
use App\Models\Traits\Imageable;
use App\Models\Traits\Likeable;
use Cesargb\Database\Support\CascadeDelete;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory, CascadeDelete, Imageable, Likeable, Commentable;

    protected array $cascadeDeleteMorph = ['image', 'likes', 'comments'];

    /**
     * Set default order
     *
     * @return void
     */
    protected static function boot(): void
    {
        parent::boot();

        static::addGlobalScope('order', function (Builder $builder) {
            $builder->orderBy('created_at', 'desc');
        });
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'description',
        'user_id',
    ];

    protected $with = ['image', 'likes', 'comments'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
