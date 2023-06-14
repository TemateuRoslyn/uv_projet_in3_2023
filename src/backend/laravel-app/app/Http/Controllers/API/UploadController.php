<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Response;

class UploadController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/files/download/{filename}",
     *     summary="Get an imgage by file name",
     *     description="Retourner l'avatar d'un user",
     *     operationId="downloadUserAvatar",
     *     tags={"users"},
     *      @OA\Parameter(
     *         name="filename",
     *         in="path",
     *         description="Name of user avatar",
     *         required=true,
     *         @OA\Schema(
     *             type="string"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="L'avatar",
     *         @OA\MediaType(
     *             mediaType="image/*"
     *         )   
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Not found",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example="false"),
     *             @OA\Property(property="message", type="string", example="User avatar not Found"),
     *         )
     *     )
     * )
     */
    public function downloadUserAvatar(Request $request){

        $filename = $request->query('filekey');

        $path = storage_path('app/' . $filename);

        // verifie si le fichier existe
        if(!File::exists($path)){
            return response()->json([
                'message' => 'L\'image de profile de cet utilisateur n\'exeiste pas sur le serveur !',
                'success' => false,
            ], 404);
        }

        // Renvoyer l'image
        $file = File::get($path);
        $type = File::mimeType($path);

        $response = Response::make($file, 200);
        $response->header("Content-Type", $type);

        return $response;
    }
    
}
