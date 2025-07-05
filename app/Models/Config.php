<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class Config extends Model
{
    use HasTranslations;

    protected $fillable = [
        'job',
        'description',
        'dark_background',
        'dark_primary',
        'dark_secondary',
        'light_background',
        'light_primary',
        'light_secondary'
    ];

    public $translatable = [
        'job',
        'description'
    ];
}
