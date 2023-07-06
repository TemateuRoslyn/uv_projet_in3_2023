<?php

namespace App\Http\Controllers\API;


use Illuminate\Support\Facades\Queue;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Notification;

use App\Http\Controllers\Controller;
use App\Jobs\SendEmailJob;

use App\Models\SanctionPrevu;
use App\Models\Eleve;
use App\Models\Faute;
use App\Models\Convocation;
use App\Models\Regle;

class SanctionPrevuController extends Controller
{

    /**
     * @OA\Get(
     *     path="/api/sanctionprevus/findAll",
     *     summary="Get all sanctionprevus",
     *     description="Retrieve a list of all sanctionprevus",
     *     operationId="sanctionprevusIndex",
     *     @OA\Parameter(
     *         name="Authorization",
     *         in="header",
     *         required=true,
     *         @OA\Schema(
     *             type="string",
     *             example="Bearer {your_token}"
     *         ),
     *         description="JWT token"
     *     ),
     *     security={{"bearerAuth":{}}},
     *     tags={"sanctionprevus"},
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Permission updated successfully"),
     *             @OA\Property(property="content", type="array", @OA\Items(ref="#/components/schemas/SanctionPrevu"))
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Error - Unauthorized",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string", example="Unauthorized")
     *         )
     *     )
     * )
     */
    public function index()
    {
        $sanctionprevus = SanctionPrevu::with('eleve', 'convocation', 'regle', 'faute')->get();

        return response()->json([
            'message' => 'Liste des sanctions prevus',
            'success' => true,
            'content' => $sanctionprevus
        ]);
    }

    /**
     * @OA\Get(
     *     path="/api/sanctionprevus/findOne/{id}",
     *     summary="Get sanctionprevu information",
     *     description="Get information about a specific sanctionprevu",
     *     operationId="viewSanctionPrevu",
     *     tags={"sanctionprevus"},
     *     @OA\Parameter(
     *         name="Authorization",
     *         in="header",
     *         required=true,
     *         @OA\Schema(
     *             type="string",
     *             default="Bearer {your_token}"
     *         ),
     *         description="JWT token"
     *     ),
     *      @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of sanctionprevu to get information for",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Error - Unauthorized",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string", example="Unauthorized")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Error - Not found",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="SanctionPrevu not found"),
     *             @OA\Property(property="success", type="boolean", example="false"),
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="SanctionPrevu trouvé(e)"),
     *             @OA\Property(property="success", type="boolean", example="true"),
     *             @OA\Property(property="content", type="object", ref="#/components/schemas/SanctionPrevu")
     *         )
     *     )
     * )
     */
    public function view($sanctionprevuId)
    {
        $sanctionprevu = SanctionPrevu::with('eleve')
            ->has('convocation')->with('convocation')
            ->has('regle')->with('regle')
            ->has('faute')->with('faute')
            ->find($sanctionprevuId);

        if ($sanctionprevu) {
            $sanctionprevuData = $sanctionprevu->toArray();

            return response()->json([
                'message' => 'sanctionprevu trouvé(e)',
                'success' => true,
                'content' => $sanctionprevuData
            ], 200);
        } else {
            return response()->json([
                'message' => 'SanctionPrevu non trouvé',
                'success' => false,
            ], 404);
        }
    }




    /**
     * @OA\Post(
     *     path="/api/sanctionprevus/create",
     *     summary="Create a new sanctionprevu",
     *     description="Create a new sanctionprevu resource",
     *     operationId="createSanctionPrevu",
     *     tags={"sanctionprevus"},
     *     @OA\Parameter(
     *         name="Authorization",
     *         in="header",
     *         required=true,
     *         @OA\Schema(
     *             type="string",
     *             default="Bearer {your_token}"
     *         ),
     *         description="JWT token"
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(
     *                 required={"libelle", "niveauGravite", "motif","dureeValidite","eleveId","convocationId","regleId","fauteId"},
     *                 @OA\Property(property="libelle", type="string", example="libelle de la sanction"),
     *                 @OA\Property(property="niveauGravite", type="string", example="niveau de la Gravite"),
     *                 @OA\Property(property="motif", type="string", example="motif de la sanction"),
     *                 @OA\Property(property="dureeValidite", type="date", example="duree de la Validite de la sanction"),
     *                 @OA\Property(property="eleveId", type="integer", example=1),
     *                 @OA\Property(property="convocationId", type="integer", example=1),
     *                 @OA\Property(property="regleId", type="integer", example=1),
     *                 @OA\Property(property="fauteId", type="integer", example=1),
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error - Invalid request data",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="object", example={
     *                 "libelle": {
     *                     "The libelle field is required."
     *                 },
     *                 "regleId": {
     *                     "The regleId field is required."
     *                 }
     *             })
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Error - Unauthorized",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string", example="Unauthorized")
     *         )
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Error - Validation failed",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="object", example={
     *                 "regleId": {
     *                     "The regleId must be a positive number."
     *                 },
     *                 "libelle": {
     *                     "The libelle must be at least 8 characters."
     *                 },
     *                 "dureeValidite": {
     *                     "The dureeValidite field is required."
     *                 }
     *             })
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="SanctionPrevu créé(e)"),
     *             @OA\Property(property="success", type="boolean", example="true"),
     *             @OA\Property(property="content", type="object", ref="#/components/schemas/SanctionPrevu")
     *         )
     *     )
     * )
     */
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'libelle' => 'required|string',
            'niveauGravite' => 'required|string',
            'motif' => 'required|string',
            'dureeValidite' => 'required|date',
            'eleveId' => 'required|integer|unique:eleve',
            'convocationId' => 'required|integer|unique:convocation',
            'regleId' => 'required|integer|unique:regle',
            'fauteId' => 'required|integer|unique:faute',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Could not create this sanctionprevu',
                'success' => false,
                'error' => $validator->errors()
            ], 400);
        }

        $sanctionprevu = SanctionPrevu::create([
            'eleveId' => $request->input('eleveId'),
            'convocationId' => $request->input('convocationId'),
            'regleId' => $request->input('regleId'),
            'fauteId' => $request->input('fauteId'),
            'libelle' => $request->input('libelle'),
            'niveauGravite' => $request->input('niveauGravite'),
            'motif' => $request->input('motif'),
            'dureeValidite' => $request->input('dureeValidite'),
        ]);

        $eleve = Eleve::find($request->eleveId);
        $convocation = Convocation::find($request->convocationId);
        $regle = Regle::find($request->regleId);
        $faute = Faute::find($request->fauteId);

        $sanctionprevu->eleve = $eleve;
        $sanctionprevu->convocation = $convocation;
        $sanctionprevu->regle = $regle;
        $sanctionprevu->faute = $faute;

        return response()->json([
            'message' => 'SanctionPrevu created successfully',
            'success' => true,
            'content' => $sanctionprevu,
        ]);
    }


    /**
     * @OA\put(
     *     path="/api/sanctionprevus/update/{sanctionprevuId}",
     *     summary="Update a sanctionprevu's information",
     *     description="Update a sanctionprevu's information",
     *     operationId="updateSanctionPrevu",
     *     tags={"sanctionprevus"},
     *      @OA\Parameter(
     *         name="sanctionprevuId",
     *         in="path",
     *         description="ID of sanctionprevu to update in this request",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Parameter(
     *         name="Authorization",
     *         in="header",
     *         required=true,
     *         @OA\Schema(
     *             type="string",
     *             default="Bearer {your_token}"
     *         ),
     *         description="JWT token"
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(
     *                 required={"libelle", "niveauGravite", "motif","dureeValidite","eleveId","convocationId","regleId","fauteId"},
     *                 @OA\Property(property="libelle", type="string", example="libelle de la sanction"),
     *                 @OA\Property(property="niveauGravite", type="string", example="niveau de la Gravite"),
     *                 @OA\Property(property="motif", type="string", example="motif de la sanction"),
     *                 @OA\Property(property="dureeValidite", type="date", example="duree de la Validite de la sanction"),
     *                 @OA\Property(property="eleveId", type="integer", example=1),
     *                 @OA\Property(property="convocationId", type="integer", example=1),
     *                 @OA\Property(property="regleId", type="integer", example=1),
     *                 @OA\Property(property="fauteId", type="integer", example=1),
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error - Invalid request data",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="SanctionPrevu non trouve(e)"),
     *             @OA\Property(property="success", type="boolean", example="false"),
     *             @OA\Property(property="error", type="object", example={
     *                 "eleveId": {
     *                     "The eleveId field is required."
     *                 },
     *                 "convocationId": {
     *                     "The convocationId field is required."
     *                 }
     *             })
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Error - Unauthorized",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string", example="Unauthorized")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Error - Not found",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="SanctionPrevu non trouve(e)"),
     *             @OA\Property(property="success", type="boolean", example="false"),
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="SanctionPrevu modifié qvec succèss"),
     *             @OA\Property(property="success", type="boolean", example="true"),
     *             @OA\Property(property="content", type="object", ref="#/components/schemas/SanctionPrevu")
     *          )
     *     )
     * )
     */
    public function update(Request $request, $id)
    {

        // on récupère la sanctionprevu associé
        $sanctionprevuFound = SanctionPrevu::find($id);
        if ($sanctionprevuFound) {
            $validator = Validator::make($request->all(), [
                'libelle' => 'required|string',
                'niveauGravite' => 'required|string',
                'motif' => 'required|string',
                'dureeValidite' => 'required|date',
                'eleveId' => 'required|integer|unique:eleve',
                'convocationId' => 'required|integer|unique:convocation',
                'regleId' => 'required|integer|unique:regle',
                'fauteId' => 'required|integer|unique:faute',
            ]);
        } else {
            return response()->json([
                'message' => 'SanctionPrevu not exists',
                'success' => false,
            ], 404);
        }

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Could not update this sanctionprevu',
                'success' => false,
                'error' => $validator->errors()
            ], 400);
        }

        // Mise à jour des champs de l'objet SanctionPrevu
        $sanctionprevuFound->libelle = $request->input('libelle');
        $sanctionprevuFound->niveauGravite = $request->input('niveauGravite');
        $sanctionprevuFound->motif = $request->input('motif');
        $sanctionprevuFound->dureeValidite = $request->input('dureeValidite');
        $sanctionprevuFound->eleveId = $request->input('eleveId');
        $sanctionprevuFound->convocationId = $request->input('convocationId');
        $sanctionprevuFound->regleId = $request->input('regleId');
        $sanctionprevuFound->fauteId = $request->input('fauteId');

        $sanctionprevuFound->save();

        $eleve = Eleve::find($request->eleveId);
        $convocation = Convocation::find($request->convocationId);
        $regle = Regle::find($request->regleId);
        $faute = Faute::find($request->fauteId);

        $sanctionprevuFound->eleve = $eleve;
        $sanctionprevuFound->convocation = $convocation;
        $sanctionprevuFound->regle = $regle;
        $sanctionprevuFound->faute = $faute;

        return response()->json([
            'message' => 'SanctionPrevu updated successfully',
            'success' => true,
            'content' => $sanctionprevuFound
        ]);
    }

    /**
     * @OA\Delete (
     *     path="/api/sanctionprevus/delete/{id}",
     *     summary="Delete an sanctionprevu",
     *     description="Delete an sanctionprevu resource",
     *     operationId="deleteSanctionPrevu",
     *     tags={"sanctionprevus"},
     *     @OA\Parameter(
     *         name="Authorization",
     *         in="header",
     *         required=true,
     *         @OA\Schema(
     *             type="string",
     *             default="Bearer {your_token}"
     *         ),
     *         description="JWT token"
     *     ),
     *      @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of sanctionprevu to delete",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=401,
     *         description="Error - Unauthorized",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string", example="Unauthorized")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Error - Not found",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string", example="SanctionPrevu not found")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Permission deleted successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="SanctionPrevu deleted successfully")
     *         )
     *     ),
     * )
     */
    public function delete($sanctionprevuId)
    {
        $sanctionprevuFound = SanctionPrevu::find($sanctionprevuId);

        if ($sanctionprevuFound) {

            //suppression du sanctionprevu
            $sanctionprevuFound->delete();

            return response()->json([
                'message' => 'SanctionPrevu deleted successfully',
                'success' => true,
            ], 200);
        } else {
            return response()->json([
                'message' => 'SanctionPrevu to delete was not found',
                'success' => false,
            ], 404);
        }
    }
}
