<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Spatie\Translatable\HasTranslations;

class Technology extends Model
{
    use HasTranslations;

    protected $fillable = [
        'name',
        'type'
    ];

    public $translatable = [
        'name'
    ];

    public function projects() : BelongsToMany
    {
        return $this->belongsToMany(Project::class);
    }

    public function skills() : BelongsToMany
    {
        return $this->belongsToMany(Skill::class);
    }
}
