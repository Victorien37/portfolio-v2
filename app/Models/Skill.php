<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Spatie\Translatable\HasTranslations;

class Skill extends Model
{
    use HasTranslations;

    protected $fillable = [
        'svg',
        'name',
    ];

    public $translatable = [
        'name'
    ];

    public function technologies() : BelongsToMany
    {
        return $this->belongsToMany(Technology::class);
    }

    public function type() : HasOne
    {
        return $this->hasOne(SkillType::class);
    }
}
