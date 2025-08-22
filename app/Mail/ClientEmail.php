<?php

namespace App\Mail;

use App\Http\Requests\StoreContactRequest;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Mail\Mailables\Address;

class ClientEmail extends Mailable
{
    use Queueable, SerializesModels;

    protected string $firstname;
    protected string $lastname;
    protected string $email;
    protected string $sujet;
    protected string $message;

    /**
     * Create a new message instance.
     */
    public function __construct(StoreContactRequest $request)
    {
        $this->firstname    = $request->firstname;
        $this->lastname     = $request->lastname;
        $this->email        = $request->email;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Merci pour votre message',
            from: new Address(User::first()->email, User::first()->firstname . ' ' . User::first()->lastname),
            to: new Address($this->email)
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'mails.client',
            with: [
                'firstname' => $this->firstname,
                'lastname'  => $this->lastname,
            ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
