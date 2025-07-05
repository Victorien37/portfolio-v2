<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Spatie\Translatable\HasTranslations;

class Project extends Model
{
    use HasTranslations;

    protected $fillable = [
        'title',
        'description_short',
        'description_long',
        'url',
        'side',
        'in_progress'
    ];

    public $translatable = [
        'title',
        'description_short',
        'description_long',
    ];

    public function experience() : HasOne
    {
        return $this->hasOne(Experience::class);
    }

    public function technologies() : BelongsToMany
    {
        return $this->belongsToMany(Technology::class);
    }
}
