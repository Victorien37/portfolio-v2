<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class Interest extends Model
{
    use HasTranslations;

    protected $fillable = [
        'emoji',
        'name'
    ];

    public $translatable = [
        'name'
    ];
}
