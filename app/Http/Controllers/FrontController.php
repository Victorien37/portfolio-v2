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
    protected Config $config;

    public function __construct()
    {
        $this->config = Config::first();
    }

    public function index() : Response
    {
        $user           = User::first();
        $experiences    = Experience::whereHas('company')
            ->orderBy('end', 'DESC')
            ->with('company', 'projects')
            ->get();
        
        $sides          = Project::where('side', true)->get();
        $studies        = Study::all();

        return Inertia::render('welcome', [
            'user'          => $user,
            'config'        => $this->config,
            'experiences'   => $experiences,
            'sides'         => $sides,
            'studies'       => $studies,
        ]);
    }
}
