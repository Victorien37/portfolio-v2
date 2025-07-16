<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ConfigResource;
use App\Models\Config;
use App\Models\Interest;
use App\Models\Language;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ConfigController extends Controller
{
    public function index() : Response
    {
        $config     = Config::first();
        $languages  = Language::all();
        $interests  = Interest::all();

        return Inertia::render('admin/config', [
            'config'    => $config,
            'languages' => $languages,
            'interests' => $interests,
        ]);
    }
}
