@component('mail::message')
# Thalia Guest House - Prenotazione

Ha ricevuto questa email perché di recente ha prenotato presso la nostra struttura.
Ecco i dettagli:
<ul>
  <li>Soggiorno: {{$DataStart}} => {{$DataEnd}}</li>
  <li>Nome e cognome: {{$Nome}} {{$Cognome}}</li>
  <li>Nome camera: {{$NomeCamera}}</li>
  <li>Prezzo totale: {{$PrezzoTotale}}€</li>
  <li>Acconto da saldare: {{$Acconto}}€</li>
  <li>Ultima data per recesso: {{$DataUltimaRecesso}}</li>
  <li>Email: {{$Email}}</li>
  <li>Telefono: {{$Telefono}}</li>
</ul> 
In caso di recesso entro il termine limite, contattare support@thaliamarzamemi.it

Grazie,<br>
{{ config('app.name') }}
<br><br>

<small>Con questo messaggio, non è iscritto ad alcuna newsletter</small>
@endcomponent
