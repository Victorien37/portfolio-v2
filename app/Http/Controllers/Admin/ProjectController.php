<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Services\TranslationService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    protected TranslationService $translator;

    public function __construct(TranslationService $translator)
    {
        $this->translator = $translator;
    }

    public function store(Request $request) : RedirectResponse
    {
        Project::create([
            'title'             => $this->translator->translate($request->title),
            'description_short' => $this->translator->translate($request->description_short),
            'description_long'  => $this->translator->translate($request->description_long),
            'experience_id'     => $request?->experience_id ?? null,
            'url'               => $request->url,
            'side'              => $request->side,
            'in_progress'       => $request->in_progress,
        ]);

        return redirect()->route('experience.index');
    }

    public function update(Request $request, Project $project) : RedirectResponse
    {
        $project->update([
            'title'             => $this->translator->translate($request->title),
            'description_short' => $this->translator->translate($request->description_short),
            'description_long'  => $this->translator->translate($request->description_long),
            'url'               => $request->url,
            'in_progress'       => $request->in_progress, 
        ]);

        return redirect()->route('experience.index');
    }

    public function destroy(Project $project) : RedirectResponse
    {
        $project->delete();

        return redirect()->route('experience.index');
    }

    /// Side ///
    public function sideProjects() : Response
    {
        $projects = Project::where('side', true)->get();

        return Inertia::render('admin/sides', [
            'projects' => $projects,
        ]);
    }
}
