<?php

namespace App\Http\Controllers;

use App\Http\Requests\ChangePasswordRequest;
use App\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Response;

class ChangePasswordController extends Controller
{

    public function tokenNotFoundResponse() {
        return response()->json(['error' => 'Email o token non validi!'],
            Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    public function changePassword($request) {
        $user = User::whereEmail($request->email)->first();
        $user->update(['password' => $request->password]);
        $this->getPasswordResetTableRow($request)->delete();
        return response()->json(['success' => 'Password cambiata con successo!'],
            Response::HTTP_CREATED);
    }

    public function getPasswordResetTableRow($request) {
        return DB::table('password_resets')->where([
            'email' => $request->email,
            'token' => $request->resetToken
        ]);
    }

    public function process(ChangePasswordRequest $request) {
        return $this->getPasswordResetTableRow($request)->count() > 0 ?
            $this->changePassword($request) : $this->tokenNotFoundResponse();
    }
}
