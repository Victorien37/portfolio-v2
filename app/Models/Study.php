<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class Study extends Model
{
    use HasTranslations;

    protected $fillable = [
        'start',
        'end',
        'name',
        'school',
        'full_name',
        'obtained',
        'mention'
    ];

    public $translatable = [
        'name',
        'school',
        'full_name'
    ];
}
