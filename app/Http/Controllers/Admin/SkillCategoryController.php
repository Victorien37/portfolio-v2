<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSkillRequest;
use App\Models\SkillCategory;
use App\Services\TranslationService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class SkillCategoryController extends Controller
{
    protected TranslationService $translator;

    public function __construct(TranslationService $translator)
    {
        $this->translator = $translator;
    }

    public function store(StoreSkillRequest $request) : RedirectResponse
    {
        SkillCategory::create([
            'svg'   => $request->svg,
            'name'  => $this->translator->translate($request->name),
        ]);

        return redirect()->route('config.index');
    }

    public function attach(Request $request, SkillCategory $skillCategory) {
        foreach ($skillCategory->skills as $skill) {
            $skillCategory->skills()->detach($skill->id);
        }

        foreach ($request->skills as $skillId) {
            $skillCategory->skills()->attach($skillId);
        }

        return redirect()->route('config.index');
    }

    public function destroy(SkillCategory $skillCategory) : RedirectResponse
    {
        foreach ($skillCategory->skills as $skill) {
            $skillCategory->skills()->detach($skill->id);
        }

        $skillCategory->delete();

        return redirect()->route('config.index');
    }
}
