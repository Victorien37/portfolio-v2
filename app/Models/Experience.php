<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Translatable\HasTranslations;

class Experience extends Model
{
    use HasTranslations;

    protected $fillable = [
        'start',
        'end',
        'job',
        'description',
        'contract',
    ];

    public $translatable = [
        'job',
        'description'
    ];

    public function company() : BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    public function projects() : HasMany
    {
        return $this->hasMany(Project::class);
    }
}
