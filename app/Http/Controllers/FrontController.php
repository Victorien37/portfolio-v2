<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\Config;
use App\Models\Experience;
use App\Models\Interest;
use App\Models\Language;
use App\Models\Project;
use App\Models\Skill;
use App\Models\SkillCategory;
use App\Models\Study;
use App\Models\User;
use Error;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
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
        $skills         = SkillCategory::with('skills')->get();
        $sides          = Project::where('side', true)->get();
        $studies        = Study::all();
        $languages      = Language::all();
        $interests      = Interest::all();

        return Inertia::render('welcome', [
            'user'          => $user,
            'config'        => $this->config,
            'experiences'   => $experiences,
            'skillCategories' => $skills,
            'interests'     => $interests,
            'languages'     => $languages,
            'sides'         => $sides,
            'studies'       => $studies,
        ]);
    }

    public function experience(string $companyName, string $start) : Response
    {
        $company    = Company::where('name', $companyName)->first();
        $experience = Experience::where('start', $start)
            ->where('company_id', $company->id)
            ->with('company', 'projects')
            ->first();

        return Inertia::render('experience', [
            'config'        => $this->config,
            'experience'    => $experience,
        ]);
    }

    public function contact(Request $request) : RedirectResponse | JsonResponse
    {
        if ($request->honeypot !== "") {
            return response()->json([
                'message' => 'Erreur interne simulée depuis le backend 🚨'
            ], 500);
        } 

        return redirect()->route('home');
    }
}
