<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateConfigThemeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'mode'          => ['required', 'string', 'in:light,dark'],
            'background'    => ['required', 'string'],
            'primary'       => ['required', 'string'],
            'secondary'     => ['required', 'string'],
        ];
    }

    public function messages(): array
    {
        return [
            'mode.required'          => 'Le mode est obligatoire',
            'mode.string'            => 'Le mode doit être une chaine de caractères',
            'mode.in'                => 'Le mode doit être soit "light" soit "dark"',
            'background.required'    => 'La couleur de fond est obligatoire',
            'background.string'      => 'La couleur de fond doit être une chaine de caractères',
            'primary.required'       => 'La couleur primaire est obligatoire',
            'primary.string'         => 'La couleur primaire doit être une chaine de caractères',
            'secondary.required'     => 'La couleur secondaire est obligatoire',
            'secondary.string'       => 'La couleur secondaire doit être une chaine de caractères',
        ];
    }
}
