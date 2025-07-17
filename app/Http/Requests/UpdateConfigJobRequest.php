<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateConfigJobRequest extends FormRequest
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
            'job'           => ['required', 'string'],
            'description'   => ['required', 'string'], 
        ];
    }

    public function messages(): array
    {
        return [
            'job.required'          => "Le nom du métier est obligatoire",
            'job.string'            => "Le nom du métier doit être une chaine de caractère",
            'description.required'  => "La description est obligatoire",
            'description.string'    => "La description doit être une chaine de caractère",
        ];
    }
}
