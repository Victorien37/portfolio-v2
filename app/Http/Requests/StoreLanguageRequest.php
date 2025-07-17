<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreLanguageRequest extends FormRequest
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
            'name'  => ['required', 'string'],
            'level' => ['required', 'string', 'in:A1,A2,B1,B2,C1,C2'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required'  => 'Le nom est obligatoire',
            'name.string'    => 'Le nom doit être une chaine de caractères',

            'level.required' => 'Le niveau est obligatoire',
            'level.string'   => 'Le niveau doit être une chaine de caractères',
            'level.in'       => 'Le niveau doit être inclus dans: A1, A2, B1, B2, C1, C2.',
        ];
    }
}
