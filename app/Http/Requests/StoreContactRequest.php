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
            'firstname' => ['required', 'string', 'max:255'],
            'lastname'  => ['required', 'string', 'max:255'],
            'email'     => ['required', 'email', 'max:255'],
            'honeypot'  => ['nullable', 'string', 'max:0'], // Must be empty (bot trap)
            'subject'   => ['required', 'string', 'max:255'],
            'message'   => ['required', 'string', 'max:5000'],
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
