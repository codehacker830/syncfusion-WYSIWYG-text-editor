@component('mail::message')
# Viacolvento Experience - Password Reset

Hai ricevuto questa mail perché hai richiesto il ripristino della password.
Clicca sul bottone in basso per resettarla.

@component('mail::button', ['url' => 'http://localhost:4200/response-password-reset?token=' . $token])
Reset password
@endcomponent

Grazie,<br>
{{ config('app.name') }}
<br><br>

<small><a href="http://localhost:4200/unsubscribe">Unsubscribe ViacolventoExperience</a></small>
@endcomponent
