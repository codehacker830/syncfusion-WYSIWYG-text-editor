<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Mail\ResetPasswordMail;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use App\User;


class ResetPasswordController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset requests
    | and uses a simple trait to include this behavior. You're free to
    | explore this trait and override any methods you wish to tweak.
    |
    */

    // use ResetsPasswords;

    /**
     * Where to redirect users after resetting their password.
     *
     * @var string
     */
    // protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    /*
    public function __construct()
    {
        $this->middleware('guest');
    }
    */

    public function saveToken($token, $email) {
        DB::table('password_resets')->insert([
            'email' => $email,
            'token' => $token,
            'created_at' => Carbon::now()
        ]);
    }

    public function createToken($email)
    {
        $old = DB::table('password_resets')->where('email', $email)->first();
        if($old) {
            return $old;
        } else {
            $token = str_random(60);
            $this->saveToken($token, $email);
            return $token;
        }
    }

    public function send($email)
    {
        $token = $this->createToken($email);
        Mail::to($email)->send(new ResetPasswordMail($token));

    }

    public function validateEmail($email)
    {
        // with !! the result is just true or false
        return !!User::where('email', $email)->first();
    }

    public function sendEmail(Request $request)
    {
        if(!$this->validateEmail($request->email)) {
            return $this->failedResponse();
        } else {
            $this->send($request->email);
            return $this->successResponse();
        }
    }

    public function successResponse()
    {
        return response()->json([
            'success' => 'Email spedita correttamente. Per favore controlla la tua casella.'
        ], Response::HTTP_OK);
    }

    public function failedResponse()
    {
        return response()->json([
            'error' => 'Email non presente nel nostro DB.'
        ], Response::HTTP_NOT_FOUND);
    }

}
