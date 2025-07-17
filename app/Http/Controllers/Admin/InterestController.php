<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreInterestRequest;
use App\Http\Requests\UpdateInterestRequest;
use App\Models\Interest;
use App\Services\TranslationService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class InterestController extends Controller
{
    protected TranslationService $translator;

    public function __construct(TranslationService $translator)
    {
        $this->translator = $translator;
    }

    public function store(StoreInterestRequest $request) : RedirectResponse
    {
        Interest::create([
            'emoji' => $request->emoji,
            'name'  => $this->translator->translate($request->name),
        ]);

        return redirect()->route('config.index');
    }

    public function update(UpdateInterestRequest $request, Interest $interest) : RedirectResponse
    {
        $interest->update([
            'emoji' => $request->emoji,
            'name'  => $this->translator->translate($request->name),
        ]);

        return redirect()->route('config.index');
    }

    public function destroy(Interest $interest) : RedirectResponse
    {
        $interest->delete();
        return redirect()->route('config.index');
    }
}
