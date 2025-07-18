<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Skill;
use App\Services\TranslationService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class SkillController extends Controller
{
    protected TranslationService $translator;

    public function __construct(TranslationService $translator)
    {
        $this->translator = $translator;
    }

    public function store(Request $request) : RedirectResponse
    {
        Skill::create([
            'name' => $this->translator->translate($request->name),
        ]);

        return redirect()->route('config.index');
    }

    public function destroy(Skill $skill) : RedirectResponse
    {
        foreach ($skill->categories as $category) {
            $skill->categories()->detach($category->id);
        }

        foreach ($skill->projects as $project) {
            $skill->projects()->detach($project->id);
        }

        $skill->delete();

        return redirect()->route('config.index');
    }
}
