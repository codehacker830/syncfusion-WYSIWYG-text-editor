<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class BookingSuccessMail extends Mailable
{
    use Queueable, SerializesModels;

    // not sure if it can be also private or protected instead of public, must see
    public $DataStart;
    public $DataEnd;
    public $Nome;
    public $Cognome;
    public $NomeCamera;
    public $Email;
    public $Telefono;
    public $PrezzoTotale;
    public $Acconto;
    public $DataUltimaRecesso;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($DataStart,
        $DataEnd,
        $Nome,
        $Cognome,
        $NomeCamera,
        $Email,
        $Telefono,
        $PrezzoTotale,
        $Acconto,
        $DataUltimaRecesso
        )
    {
        $this->DataStart = $DataStart;
        $this->DataEnd = $DataEnd;
        $this->Nome = $Nome;
        $this->Cognome = $Cognome;
        $this->NomeCamera = $NomeCamera;
        $this->Email = $Email;
        $this->Telefono = $Telefono;
        $this->PrezzoTotale = $PrezzoTotale;
        $this->Acconto = $Acconto;
        $this->DataUltimaRecesso = $DataUltimaRecesso;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from('noreply@thaliamarzamemi.it')
            ->subject('Thalia Guest House - Prenotazione camera')
            ->markdown('Booking.bookingSuccess')
            ->with([
                'DataStart' => $this->DataStart,
                'DataEnd' => $this->DataEnd,
                'Nome' => $this->Nome,
                'Cognome' => $this->Cognome,
                'NomeCamera' => $this->NomeCamera,
                'Email' => $this->Email,
                'Telefono' => $this->Telefono,
                'PrezzoTotale' => $this->PrezzoTotale,
                'Acconto' => $this->Acconto,
                'DataUltimaRecesso' => $this->DataUltimaRecesso
        ]);
    }
}
