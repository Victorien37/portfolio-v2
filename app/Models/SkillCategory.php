<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Spatie\Translatable\HasTranslations;

class SkillCategory extends Model
{
    use HasTranslations;

    protected $fillable = [
        'svg',
        'name',
    ];

    public $translatable = [
        'name'
    ];

    public function skills() : BelongsToMany
    {
        return $this->belongsToMany(Skill::class);
    }
}
