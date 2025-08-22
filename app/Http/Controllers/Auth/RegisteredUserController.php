<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Config;
use App\Models\User;
use App\Services\TranslationService;
use Exception;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    protected TranslationService $translator;

    public function __construct(TranslationService $translator)
    {
        $this->translator = $translator;
    }

    /**
     * Show the registration page.
     */
    public function create(): Response | RedirectResponse
    {
        $hasUser = User::first();

        if ($hasUser) {
            if (request()->user()) {
                return redirect()->route('config.index');
            } else {
                return redirect()->route('login');
            }
        } else {
            return Inertia::render('auth/register');
        }
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'avatar'    => 'required|file|max:2048',
            'firstname' => 'required|string|max:255',
            'lastname'  => 'required|string|max:255',
            'birthday'  => 'required|date',
            'tel'       => 'required|string',
            'email'     => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password'  => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $path = 'images';
        $filename = 'avatar.' . $request->file('avatar')->extension();
        $fullPath = "/storage/$path/$filename";
        try {
            $request->file('avatar')->storeAs($path, $filename);
        } catch (Exception $e) {
            return back()->withErrors('message', "Une erreur s'est produite lors de l'enregistrement de l'image");
        }


        $user = User::create([
            'avatar'    => $fullPath,
            'firstname' => $request->firstname,
            'lastname'  => $request->lastname,
            'birthday'  => $request->birthday,
            'tel'       => $request->tel,
            'email'     => $request->email,
            'password'  => Hash::make($request->password),
        ]);

        Config::create([
            'job'               => $this->translator->translate("Développeur web et mobile"),
            'description'       => $this->translator->translate("Passionné par le développement d'applications modernes et performantes, je crée des expériences digitales innovantes qui allient design et fonctionnalité."),
            'dark_background'   => "#343A40", // dark
            'dark_primary'      => "#FFC107", // yellow
            'dark_secondary'    => "#E3E3E3", // grey
            'light_background'  => "#FFFFFF", // white
            'light_primary'     => "#884DA7", // purple
            'light_secondary'   => "#212529", // black
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect()->intended(route('config.index', absolute: false));
    }
}
