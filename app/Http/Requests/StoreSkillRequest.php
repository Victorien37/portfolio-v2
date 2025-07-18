<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSkillRequest extends FormRequest
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
            'svg'  => ['required', 'string'],
            'name' => ['required', 'string'],
        ];
    }

    public function messages(): array
    {
        return [
            'svg.required' => 'Le niveau est obligatoire',
            'svg.string'   => 'Le niveau doit être une chaine de caractères',

            'name.required'  => 'Le nom est obligatoire',
            'name.string'    => 'Le nom doit être une chaine de caractères',
        ];
    }
}
