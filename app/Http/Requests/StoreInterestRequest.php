<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreInterestRequest extends FormRequest
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
            'emoji' => ['string', 'required'],
            'name'  => ['string', 'required'],
        ];
    }

    public function messages(): array
    {
        return [
            'emoji.required'    => "L'émoji est obligatoire",
            'emoji.string'      => "L'émoji doit être une chaine de caractère",
            'name.required'     => "L'intérêt est obligatoire",
            'name.string'       => "L'intérêt doit être une chaine de caractère",
        ];
    }
}
