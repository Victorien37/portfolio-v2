<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateConfigJobRequest;
use App\Http\Requests\UpdateConfigThemeRequest;
use App\Models\Config;
use App\Models\Interest;
use App\Models\Language;
use App\Models\Skill;
use App\Models\SkillCategory;
use App\Models\User;
use App\Services\TranslationService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;

class ConfigController extends Controller
{

    protected TranslationService $translator;

    public function __construct(TranslationService $translator)
    {
        $this->translator = $translator;
    }

    public function index() : Response
    {
        $config             = Config::first();
        $user               = User::first();
        $languages          = Language::all();
        $interests          = Interest::all();
        $skills             = Skill::all();

        $skillCategories = SkillCategory::with('skills:id')->get()
        ->map(function ($category) {
            // Remplace la relation par un tableau des IDs
            $category->skill_ids = $category->skills->pluck('id')->toArray();
            return $category;
        });



        return Inertia::render('admin/config', [
            'config'            => $config,
            'user'              => $user,
            'languages'         => $languages,
            'interests'         => $interests,
            'skillCategories'   => $skillCategories,
            'skills'            => $skills,
        ]);
    }

    public function theme(UpdateConfigThemeRequest $request) : RedirectResponse
    {
        $config = Config::first();

        if ($request->mode === 'light') {
            $config->update([
                'light_background'  => $request->background,
                'light_primary'     => $request->primary,
                'light_secondary'   => $request->secondary,
            ]);
        } else {
            $config->update([
                'dark_background'  => $request->background,
                'dark_primary'     => $request->primary,
                'dark_secondary'   => $request->secondary,
            ]);
        }

        return redirect()->route('config.index');
    }

    public function job(UpdateConfigJobRequest $request) : RedirectResponse
    {
        $config = Config::first();

        $config->update([
            'job'           => $this->translator->translate($request->job),
            'description'   => $this->translator->translate($request->description),
        ]);

        $user = User::first();

        if ($request->hasFile('cv')) {

            $path = "files/pdf";
            $filename = "cv-" . Str::lower($user->firstname) . '-' . Str::lower($user->lastname) . '.pdf';
            // Store the file as 'files/pdf/cv.pdf' in the 'public' disk
            Storage::disk('public')->putFileAs($path, $request->file('cv'), $filename);

            $fullPath = "/storage/$path/$filename";


            if ($user->cv !== $fullPath) {
                $user->update([
                    'cv' => $fullPath,
                ]);
            }
        }

        $user->update([
            'github'    => $request->github,
            'gitlab'    => $request->gitlab,
            'linkedin'  => $request->linkedin,
        ]);

        return redirect()->route('config.index');
    }
}
