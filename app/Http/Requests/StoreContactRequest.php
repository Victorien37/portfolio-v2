<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreContactRequest extends FormRequest
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
            'firstname' => ['required', 'string'],
            'lastname'  => ['required', 'string'],
            'email'     => ['required', 'string'],
            'honeypot'  => ['nullable', 'string'],
            'subject'   => ['required', 'string'],
            'message'   => ['required', 'string'],
        ];
    }

    public function messages(): array
    {
        return [
            'firstname.required' => 'Le prénom est obligatoire.',
            'lastname.required'  => 'Le nom est obligatoire.',
            'email.required'     => 'L\'email est obligatoire.',
            'subject.required'   => 'Le sujet est obligatoire.',
            'message.required'   => 'Le message est obligatoire.',
        ];
    }
}
