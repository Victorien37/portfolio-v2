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
            'cv'            => ['nullable', 'file', 'mimes:pdf', 'max:2048'],
            'github'        => ['nullable', 'url'],
            'gitlab'        => ['nullable', 'url'],
            'linkedin'      => ['nullable', 'url'],
        ];
    }

    public function messages(): array
    {
        return [
            'job.required'          => "Le nom du métier est obligatoire",
            'job.string'            => "Le nom du métier doit être une chaine de caractère",
            'description.required'  => "La description est obligatoire",
            'description.string'    => "La description doit être une chaine de caractère",
            'cv.file'               => "Le CV doit être un fichier valide",
            'cv.mimes'              => "Le CV doit être au format PDF",
            'cv.max'                => "Le CV ne doit pas dépasser 2 Mo",
            'github.url'            => "Le lien GitHub doit être une URL valide",
            'gitlab.url'            => "Le lien GitLab doit être une URL valide",
            'linkedin.url'          => "Le lien LinkedIn doit être une URL valide",
        ];
    }
}
