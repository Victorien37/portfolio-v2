<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreContactRequest;
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
use Illuminate\Support\Facades\RateLimiter;
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
        $studies        = Study::orderBy('end', 'DESC')->get();
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

    public function contact(StoreContactRequest $request) : RedirectResponse
    {
        // Note: Honeypot validation is handled automatically by StoreContactRequest rules (max:0)

        $key = 'contact-form:' . $request->ip();
        $maxAttempts = 1;
        $decaySeconds = 86400; // 24 hours (1 day)

        // Check rate limit
        if (RateLimiter::tooManyAttempts($key, $maxAttempts)) {
            $seconds = RateLimiter::availableIn($key);
            $hours = ceil($seconds / 3600);

            return back()->withErrors([
                'form' => "Vous avez déjà envoyé un message. Veuillez réessayer dans {$hours} heure(s)."
            ]);
        }

        // Hit the rate limiter (1 message per day)
        RateLimiter::hit($key, $decaySeconds);

        // TODO: Send email or save message to database
        // Example: Mail::to(config('mail.admin'))->send(new ContactMail($request->validated()));

        return back()->with('success', 'Message envoyé avec succès !');
    }
}
