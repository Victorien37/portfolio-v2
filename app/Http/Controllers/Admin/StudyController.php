<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Study;
use App\Services\TranslationService;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class StudyController extends Controller
{
    protected TranslationService $translator;

    public function __construct(TranslationService $translator)
    {
        $this->translator = $translator;
    }

    public function index() : Response
    {
        $studies = Study::all()->sortBy(function ($study) {
            return $study->end ? abs(Carbon::parse($study->end)->diffInDays(now(), false)) : -1;
        })->values();

        return Inertia::render('admin/studies', [
            'studies' => $studies,
        ]);
    }

    public function store(Request $request) : RedirectResponse
    {
        Study::create([
            'start'     => Carbon::parse($request->start),
            'end'       => $request?->end ? Carbon::parse($request->end) : null,
            'name'      => $this->translator->translate($request->name),
            'full_name' => $this->translator->translate($request->full_name),
            'school'    => $this->translator->translate($request->school),
            'obtained'  => $request->obtained,
            'mention'   => $request->mention,
        ]);

        return redirect()->route('study.index');
    }

    public function update(Request $request, Study $study) : RedirectResponse
    {
        $study->update([
            'start'     => Carbon::parse($request->start),
            'end'       => $request?->end ? Carbon::parse($request->end) : null,
            'name'      => $this->translator->translate($request->name),
            'full_name' => $this->translator->translate($request->full_name),
            'school'    => $this->translator->translate($request->school),
            'obtained'  => $request->obtained,
            'mention'   => $request->mention
        ]);

        return redirect()->route('study.index');
    }

    public function destroy(Study $study) : RedirectResponse
    {
        $study->delete();

        return redirect()->route('study.index');
    }
}
