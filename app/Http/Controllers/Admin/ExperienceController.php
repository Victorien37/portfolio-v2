<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\Experience;
use App\Services\ImageService;
use App\Services\TranslationService;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ExperienceController extends Controller
{
    protected TranslationService $translator;

    public function __construct(TranslationService $translator)
    {
        $this->translator = $translator;
    }

    public function index() : Response
    {
        $experiences = Experience::with('company')->get();

        return Inertia::render('admin/experiences', [
            'experiences' => $experiences,
        ]);
    }

    public function store(Request $request, ImageService $imageService) : RedirectResponse
    {
        if ($request->company['name']) {
            if ($request->company['image']) {
                $imagePath = $imageService->upload($request->company['image']);
            } else {
                $imagePath = null;
            }
            $company = Company::create([
                'name'      => $request->company['name'],
                'address'   => $request->company['address'],
                'city'      => $request->company['city'],
                'zipcode'   => $request->company['zipcode'],
                'image'     => $imagePath,
            ]);
        } else {
            $company = null;
        }

        Experience::create([
            'start'         => Carbon::parse($request->experience['start']),
            'end'           => $request->experience['end'] ? Carbon::parse($request->experience['end']) : null,
            'company_id'    => $company?->id,
            'job'           => $this->translator->translate($request->experience['job']),
            'description'   => $this->translator->translate($request->experience['description']),
            'contract'      => $request->experience['contract'],
        ]);

        return redirect()->route('experience.index');
    }
}
