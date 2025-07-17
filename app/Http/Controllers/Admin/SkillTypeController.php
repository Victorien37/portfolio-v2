<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SkillType;
use App\Services\TranslationService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class SkillTypeController extends Controller
{
    protected TranslationService $translator;

    public function __construct(TranslationService $translator)
    {
        $this->translator = $translator;
    }

    public function store(Request $request) : RedirectResponse
    {
        SkillType::create([
            'name' => $this->translator->translate($request->name),
        ]);

        return redirect()->route('config.index');
    }

    public function destroy(SkillType $skillType) : RedirectResponse
    {
        if ($skillType->skills()->count() > 0) {
            return back()->with('error', "Impossible de supprimer un type de compétence si celui-ci est affilié à une compétence");
        } else {
            $skillType->delete();
            return redirect()->route('config.index');
        }
    }
}
