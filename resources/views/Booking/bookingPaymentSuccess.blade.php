@component('mail::message')
# Thalia Guest House - Prenotazione

Hai ricevuto questa mail perché hai richiesto il ripristino della password.
Clicca sul bottone in basso per resettarla.

Ha ricevuto questa email perché di recente ha prenotato presso la nostra struttura.
Ecco i dettagli:
<ul>
  <li>Soggiorno: $DataStart => $DataEnd</li>
  <li></li>
  <li>Telefono: $</li>
</ul> 

@component('mail::button', ['url' => 'http://localhost:4200/response-password-reset?token=' . $token])
Reset password
@endcomponent

Grazie,<br>
{{ config('app.name') }}
<br><br>

<small><a href="http://localhost:4200/unsubscribe">Unsubscribe ViacolventoExperience</a></small>
@endcomponent
