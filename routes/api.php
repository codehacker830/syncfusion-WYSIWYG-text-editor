<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([

    'middleware' => 'api',

], function ($router) {

    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    // Route::post('me', 'AuthController@me');
    // Route::post('signup', 'AuthController@signup');
    Route::post('sendpasswordresetlink', 'ResetPasswordController@sendEmail');
    Route::post('resetpassword', 'ChangePasswordController@process');
    // subscribers APIs
    Route::post('subscribe', 'SubscribersController@subscribe');
    Route::get('subscribers', 'SubscribersController@subscribers');
    Route::post('unsubscribe', 'SubscribersController@unsubscribe');
    Route::get('subscriberstats', 'SubscribersController@stats1');
    Route::get('subscriberstatsgroupby', 'SubscribersController@stats2');
    // newsletter APIs
    Route::get('getnewsletters', 'NewslettersController@newsletters');
    Route::get('getnewsletterdraft', 'NewslettersController@getdraft');
    Route::get('deletedraft', 'NewslettersController@deleteDraft');
    Route::post('savenewsletterdraft', 'NewslettersController@saveNewsletterDraft');
    Route::post('sendnewsletter', 'NewslettersController@sendNewsletter');
    // blog article APIs
    Route::get('getarticledraft', 'BlogArticleController@getdraft');
    Route::get('deletearticledraft', 'BlogArticleController@deleteDraft');
    Route::get('getarticle', 'BlogArticleController@article');
    Route::get('getallarticles', 'BlogArticleController@articles');
    Route::get('getmostrecent', 'BlogArticleController@mostRecentArticles');
    Route::get('getarticles', 'BlogArticleController@articlesWithPagination');
    Route::get('pages', 'BlogArticleController@howManyPages');
    Route::post('savearticledraft', 'BlogArticleController@saveArticlesDraft');
    Route::post('publisharticle', 'BlogArticleController@publishArticle');
    Route::post('updatearticle', 'BlogArticleController@updateArticle');
    Route::post('deletearticle', 'BlogArticleController@deleteArticle');
    Route::post('uploadimage', 'BlogArticleController@uploadImage');
    Route::get('getimage/{id}', 'BlogArticleController@getImage');

});
