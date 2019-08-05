<?php

namespace App\Http\Controllers;

use App\Http\Requests\SaveArticleDraftRequest;
use App\Http\Requests\PublishArticleRequest;
use App\Http\Requests\UploadImageRequest;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class BlogArticleController extends Controller
{
    
    /**
     * Create a new BlogArticleController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' =>
            ['article', 'articles', 'mostRecentArticles', 'articlesWithPagination', 'howManyPages', 'uploadEJSImage']]);
    }

    /*
     * Get all articles published
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function articles()
    {
        return DB::table('articles')
            ->where('draft', false)
            ->orderBy('id', 'desc')
            ->get();
    }

    public function mostRecentArticles()
    {
        return DB::table('articles')
            ->where('draft', false)
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();
    }

    public function articlesWithPagination(Request $request)
    {
        $page_number = $request->input('page');
        if(is_numeric($page_number) && $page_number > 0) {
            $offset = ($page_number - 1)*10;
            return DB::table('articles')
                ->where('draft', false)
                ->orderBy('created_at', 'desc')
                ->offset($offset)
                ->limit(10)
                ->get();
        } else {
            return response()->json([
                'error' => 'C\'è stato un problema durante la pubblicazione dell\'articolo.'
            ], Response::HTTP_FORBIDDEN);
        }
    }

    public function howManyPages()
    {
        $number_articles = DB::table('articles')
                            ->where('draft', false)
                            ->count();
        if($number_articles%10 == 0) {
            return intdiv($number_articles, 10);
        } else {
            return intdiv($number_articles, 10) + 1;
        }
    }

    /*
     * Get article published
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function article(Request $request)
    {
        return DB::table('articles')
            ->where('draft', false)
            ->where('id', $request->input('id'))
            ->get();
    }

    /*
     * Get the draft from the server
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getdraft()
    {
        return DB::table('articles')->where('draft', true)->get();
    }

    public function howManyDrafts()
    {
        return DB::table('articles')->where('draft', true)->count();
    }

    public function deleteDraft()
    {
        $drafts = $this->howManyDrafts();
        while($drafts) {
            DB::table('articles')->where('draft', true)->delete();
            $drafts = $this->howManyDrafts();
        }
        return $this->deleteDraftSuccessResponse();
    }

    /*
     * Save the draft of a new newsletter
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function saveArticlesDraft(SaveArticleDraftRequest $request)
    {
        $drafts = $this->howManyDrafts();
        if($drafts == 1) {
            DB::table('articles')->where('draft', true)->update(array(
                'content' => $request->content,
                'draft' => $request->draft
            ));
        } else if($drafts == 0) {
            DB::table('articles')->insert(array(
                'title' => $request->title,
                'description' => $request->description,
                'content' => $request->content,
                'draft' => $request->draft
            ));
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
    public function publishArticle(PublishArticleRequest $request)
    {
        $drafts = $this->howManyDrafts();
        if($request->draft == true) {
            return $this->sendNewsletterFailedResponse();
        } else {
            if($this->howManyDrafts() > 0) {
                $this->deleteDraft();
            }
            DB::table('articles')->insert(array(
                'content' => $request->content,
                'draft' => false,
                'description' => $request->description,
                'title' => $request->title
            ));
            return $this->sendNewsletterSuccessResponse();
        }
    }

    public function updateArticle(PublishArticleRequest $request)
    {
        DB::table('articles')->where('id', $request->id)->update(array(
            'content' => $request->content,
            'draft' => false,
            'description' => $request->description,
            'title' => $request->title
        ));
        return $this->sendNewsletterSuccessResponse();
    }

    public function deleteArticle(PublishArticleRequest $request)
    {
        DB::table('articles')->where('id', $request->id)->delete();
        return $this->sendNewsletterSuccessResponse();
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
            'success' => 'Pubblicazione articolo avvenuta con successo'
        ], Response::HTTP_OK);
    }

    public function sendNewsletterFailedResponse()
    {
        return response()->json([
            'error' => 'C\'è stato un problema durante la pubblicazione dell\'articolo.'
        ], Response::HTTP_FORBIDDEN);
    }

    public function getImage($id)
    {
        return DB::table('images')->where('id', $id)->select('content')->get();
    }

    public function uploadImage(UploadImageRequest $request)
    {
        /***
         * 
         * 
         * UploadImageRequest should be 'file'
         * 
         * It should return this format
         * 
         * {
         * "url": "https://location-of-image"
         * }
         */
            return $request->file;
        $hash = hash('sha256', $request->file);
        $result = DB::table('images')->where('sha256Image', $hash)->count();
        if($result == 0) {
            DB::table('images')->insert(array(
                'sha256Image' => $hash,
                'size' => getimagesize($request->file),
                'width' => imagesx($request->file),
                'height' => imagesy($request->file),
                'content' => $request->file
            ));
        }
        $id = DB::table('images')->where('sha256Image', $hash)->select('id')->get();
        $url = 'http://localhost:8000/api/getimage/' . $id;
        return response()->json([
            'url' => $url
        ], Response::HTTP_OK);
     }

     public function uploadEJSImage(Request $request) {
        if ($request->UploadFiles->isValid()) {
            $file = $request->UploadFiles;
            $pathfolder = public_path().'/uploads';
                
            // create foler if not exist
            if(!file_exists($pathfolder)) {
                mkdir($pathfolder);   
            }
            $filename = $file->getClientOriginalName();
            // $part = explode('.', $filename);
            // $current_timestamp = Carbon::now()->timestamp; // Produces something like 1552296328
            // $filename = 'img_' . $current_timestamp . '.' . $part[1];

            $file->move(base_path().'/public/uploads/', $filename);

            $path = '/public/uploads/'.$filename;
            return response()->json(['success'=> true, 'url' => $path ,'filename' => $filename ], 200); 
        } else {
            return response()->json(['message'=>"File key doesn't match"], 401); 
        }
     }
}
