<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateConfigJobRequest;
use App\Http\Requests\UpdateConfigThemeRequest;
use App\Models\Config;
use App\Models\Interest;
use App\Models\Language;
use App\Models\Skill;
use App\Models\SkillType;
use App\Services\TranslationService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ConfigController extends Controller
{

    protected TranslationService $translator;

    public function __construct(TranslationService $translator)
    {
        $this->translator = $translator;
    }

    public function index() : Response
    {
        $config     = Config::first();
        $languages  = Language::all();
        $interests  = Interest::all();
        $skills     = Skill::all();
        $skillTypes = SkillType::all();

        return Inertia::render('admin/config', [
            'config'    => $config,
            'languages' => $languages,
            'interests' => $interests,
            'skills'    => $skills,
            'skillTypes' => $skillTypes,
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

        return redirect()->route('config.index');
    }
}
