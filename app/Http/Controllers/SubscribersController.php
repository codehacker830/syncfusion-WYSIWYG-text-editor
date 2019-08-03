<?php

namespace App\Http\Controllers;

use App\Http\Requests\UnsubscribeRequest;
use App\Http\Requests\SubscribeRequest;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class SubscribersController extends Controller
{
    /**
     * Create a new SubscribersController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['subscribe', 'unsubscribe']]);
    }

    /*
     * Get all users which have the subscription
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function subscribers()
    {
        return DB::table('subscribers')->get();
    }

    public function validateEmail($email)
    {
        // with !! the result is just true or false
        return !!DB::table('subscribers')->where('email', $email)->first();
    }

    public function stats1() {
        return DB::table('subscribersStats')->get();
    }

    public function stats2() {
        return DB::table('subscribersStats')
            ->select(DB::raw('avg(subscribers) as subs, month'))
            ->groupBy('month')
            ->get();
    }

    public function successResponse()
    {
        return response()->json([
            'success' => 'Subscription/Unsubscription completed.'
        ], Response::HTTP_OK);
    }

    public function failedResponse()
    {
        return response()->json([
            'error' => 'Something went wrong.'
        ], Response::HTTP_NOT_FOUND);
    }

    /*
     * Unsubscribe from our newsletter
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function unsubscribe(UnsubscribeRequest $request)
    {
        if(!$this->validateEmail($request->email)) {
            return $this->failedResponse();
        } else {
            DB::table('subscribers')->where('email', $request->email)->delete();
            $now = Carbon::now();
            $stats = DB::table('subscribersStats')
                ->where('week', $now->weekOfYear)
                ->where('month', $now->month)
                ->where('year', $now->year)
                ->value('subscribers');
            if($stats) {
                DB::table('subscribersStats')
                    ->where('week', $now->weekOfYear)
                    ->where('month', $now->month)
                    ->where('year', $now->year)
                    ->update(['subscribers' => $stats - 1]);
            } else {
                $total = DB::table('subscribers')->count();
                DB::table('subscribersStats')->insert(array(
                    'week' => $now->weekOfYear,
                    'month' => $now->month,
                    'year' => $now->year,
                    'subscribers' => $total)
                );
            }
            return $this->successResponse();
        }
    }

    /*
     * Subscribe to our newsletter
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function subscribe(SubscribeRequest $request)
    {
        if(!$this->validateEmail($request->email)) {
            DB::table('subscribers')
                ->insert(array('name' => $request->name, 'email' => $request->email));
            $now = Carbon::now();
            $stats = DB::table('subscribersStats')
                ->where('week', $now->weekOfYear)
                ->where('month', $now->month)
                ->where('year', $now->year)
                ->value('subscribers');
            if($stats) {
                DB::table('subscribersStats')
                    ->where('week', $now->weekOfYear)
                    ->where('month', $now->month)
                    ->where('year', $now->year)
                    ->update(['subscribers' => $stats + 1]);
            } else {
                $total = DB::table('subscribers')->count();
                DB::table('subscribersStats')->insert(array(
                    'week' => $now->weekOfYear, 
                    'month' => $now->month, 
                    'year' => $now->year, 
                    'subscribers' => $total)
                );
            }
            return $this->successResponse();
        } else {
            return $this->failedResponse();
        }
    }

}
