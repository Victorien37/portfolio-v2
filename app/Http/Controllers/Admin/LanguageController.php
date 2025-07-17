<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreLanguageRequest;
use App\Http\Requests\UpdateLanguageRequest;
use App\Models\Language;
use App\Services\TranslationService;
use Illuminate\Http\RedirectResponse;

class LanguageController extends Controller
{
    protected TranslationService $translator;

    public function __construct(TranslationService $translator)
    {
        $this->translator = $translator;
    }

    public function store(StoreLanguageRequest $request) : RedirectResponse
    {
        Language::create([
            'name'  => $this->translator->translate($request->name),
            'level' => $request->level,
        ]);
        return redirect()->route('config.index');
    }

    public function update(UpdateLanguageRequest $request, Language $language) : RedirectResponse
    {
        $language->update([
            'name'  => $this->translator->translate($request->name),
            'level' => $request->level,
        ]);
        return redirect()->route('config.index');
    }

    public function destroy(Language $language) : RedirectResponse
    {
        $language->delete();
        return redirect()->route('config.index');
    }
}
