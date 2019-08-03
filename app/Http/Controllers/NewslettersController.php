<?php

namespace App\Http\Controllers;

use Mail;
use App\Http\Requests\SaveNewsletterDraftRequest;
use App\Http\Requests\SendNewsletterRequest;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class NewslettersController extends Controller
{
    /**
     * Create a new NewslettersController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => '']);
    }

    /*
     * Get all newsletters send from this server
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function newsletters()
    {
        return DB::table('newsletters')->where('draft', false)->orderBy('id', 'desc')->get();
    }

    /*
     * Get the draft from the server
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getdraft()
    {
        return DB::table('newsletters')->where('draft', true)->get();
    }

    public function howManyDrafts() {
        return DB::table('newsletters')->where('draft', true)->count();
    }

    public function deleteDraft() {
        $drafts = $this->howManyDrafts();
        while($drafts) {
            DB::table('newsletters')->where('draft', true)->delete();
            $drafts = $this->howManyDrafts();
        }
        return $this->deleteDraftSuccessResponse();
    }

    /*
     * Save the draft of a new newsletter
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function saveNewsletterDraft(SaveNewsletterDraftRequest $request)
    {
        $drafts = $this->howManyDrafts();
        if($drafts == 1) {
            DB::table('newsletters')->where('draft', true)->update(array('content' => $request->content, 'draft' => $request->draft));
        } else if($drafts == 0) {
            DB::table('newsletters')->insert(array('content' => $request->content, 'draft' => $request->draft));
        } else {
            return $this->saveDraftFailedResponse();
        }
        return $this->saveDraftSuccessResponse();
    }

    /*
     * Send a new newsletter to all subscribers
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function sendNewsletter(SendNewsletterRequest $request)
    {
        $drafts = $this->howManyDrafts();
        if($request->draft == true) {
            return $this->sendNewsletterFailedResponse();
        } else {
            if($this->howManyDrafts() > 0) {
                $this->deleteDraft();
            }
            DB::table('newsletters')->insert(array('content' => $request->content, 'draft' => false, 'object' => $request->object));
            $emails = DB::table('subscribers')->select('email', 'name')->get();
            foreach ($emails as $email) {
                // allegati - $data tra content e function
                Mail::raw($request->content, function($message) use ($email, $request) {
                    $message->from('noreply@viacolventoexperience.it', 'NoReply Viacolvento Experience');
                    $message->to($email->email, $email->name);
                    $message->subject($request->object);
                });
            }
            return $this->sendNewsletterSuccessResponse();
        }
    }

    public function deleteDraftSuccessResponse()
    {
        return response()->json([
            'success' => 'Cancellazione avvenuta con successo'
        ], Response::HTTP_OK);
    }

    public function deleteDraftFailedResponse()
    {
        return response()->json([
            'error' => 'C\'è stato un problema durante la cancellazione della bozza.'
        ], Response::HTTP_FORBIDDEN);
    }

    public function saveDraftSuccessResponse()
    {
        return response()->json([
            'success' => 'Salvataggio avvenuto con successo'
        ], Response::HTTP_OK);
    }

    public function saveDraftFailedResponse()
    {
        return response()->json([
            'error' => 'C\'è stato un problema durante il salvataggio della bozza.'
        ], Response::HTTP_FORBIDDEN);
    }

    public function sendNewsletterSuccessResponse()
    {
        return response()->json([
            'success' => 'Invio agli iscritti avvenuto con successo'
        ], Response::HTTP_OK);
    }

    public function sendNewsletterFailedResponse()
    {
        return response()->json([
            'error' => 'C\'è stato un problema durante l\'invio della newsletter.'
        ], Response::HTTP_FORBIDDEN);
    }

}
