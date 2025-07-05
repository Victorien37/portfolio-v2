<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Spatie\Translatable\HasTranslations;

class Achivement extends Model
{
    use HasTranslations;

    protected $fillable = [
        'name'
    ];

    protected $translatable = [
        'name'
    ];

    public function projects() : BelongsToMany
    {
        return $this->belongsToMany(Project::class);
    }
}
