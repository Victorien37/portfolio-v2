<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ConfigResource;
use App\Models\Config;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ConfigController extends Controller
{
    public function index() : Response
    {
        $config = Config::first();

        return Inertia::render('admin/config', [
            'config' => new ConfigResource($config),
        ]);
    }
}
