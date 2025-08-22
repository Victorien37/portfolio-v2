<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\ProfileUpdateRequest;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Show the user's profile settings page.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('settings/profile', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Update the user's profile settings.
     */
    // public function update(ProfileUpdateRequest $request): RedirectResponse
    public function update(Request $request): RedirectResponse
    {
        $user = $request->user();
        if ($request->file('avatar')) {
            $path = "images";
            $filename = "avatar." . $request->file('avatar')->extension();
            Storage::disk('public')->putFileAs($path, $request->file('avatar'), $filename);
            $fullPath = "/storage/$path/$filename";

            $user->avatar = $fullPath;
        }

        $user->firstname = $request->firstname;
        $user->lastname  = $request->lastname;
        $user->birthday  = $request->birthday;
        $user->tel       = $request->tel;
        $user->email     = $request->email;

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $user->save();

        return to_route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
