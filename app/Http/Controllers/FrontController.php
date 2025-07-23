<?php

namespace App\Http\Controllers;

use App\Models\Config;
use App\Models\Experience;
use App\Models\Project;
use App\Models\Study;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;

class FrontController extends Controller
{
    public function index() : Response
    {
        $user           = User::first();
        $config         = Config::first();
        $experiences    = Experience::whereHas('company')->with('company', 'projects')->get();
        $sides          = Project::where('side', true)->get();
        $studies        = Study::all();

        return Inertia::render('welcome', [
            'user'          => $user,
            'config'        => $config,
            'experiences'   => $experiences,
            'sides'         => $sides,
            'studies'       => $studies,
        ]);
    }
}
