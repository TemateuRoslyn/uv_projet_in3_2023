<?php

namespace App\Http\Controllers\API;


use Illuminate\Support\Facades\Queue;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Notification;

use App\Http\Controllers\Controller;
use App\Jobs\SendEmailJob;

use App\Models\MembreConseil;
use App\Models\ConseilDiscipline;
use App\Models\AvoirMembreConseilDiscipline;

class AvoirMembreConseilDisciplineController extends Controller
{

    /**
     * @OA\Get(
     *     path="/api/avoirmembreconseildisciplines/findAll",
     *     summary="Get all avoirmembreconseildisciplines",
     *     description="Retrieve a list of all avoirmembreconseildisciplines",
     *     operationId="avoirmembreconseildisciplinesIndex",
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
     *     tags={"avoirmembreconseildisciplines"},
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Liste des elements de l'entite avoirmembreconseildisciplines"),
     *             @OA\Property(property="content", type="array", @OA\Items(ref="#/components/schemas/AvoirMembreConseilDiscipline"))
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
        $avoirmembreconseildisciplines = AvoirMembreConseilDiscipline::with('membreconseil', 'conseildiscipline')->get();

        return response()->json([
            'message' => 'Liste des elements de l\'entite avoirmembreconseildisciplines',
            'success' => true,
            'content' => $avoirmembreconseildisciplines
        ]);
    }

    /**
     * @OA\Get(
     *     path="/api/avoirmembreconseildisciplines/findOne/{id}",
     *     summary="Get avoirmembreconseildiscipline information",
     *     description="Get information about a specific avoirmembreconseildiscipline",
     *     operationId="viewAvoirMembreConseilDiscipline",
     *     tags={"avoirmembreconseildisciplines"},
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
     *         description="ID of avoirmembreconseildiscipline to get information for",
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
     *             @OA\Property(property="message", type="string", example="AvoirMembreConseilDiscipline not found"),
     *             @OA\Property(property="success", type="boolean", example="false"),
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="avoirmembreconseildiscipline trouvé(e)"),
     *             @OA\Property(property="success", type="boolean", example="true"),
     *             @OA\Property(property="content", type="object", ref="#/components/schemas/AvoirMembreConseilDiscipline")
     *         )
     *     )
     * )
     */
    public function view($avoirmembreconseildisciplineId)
    {
        $avoirmembreconseildiscipline = MembreConseil::with('conseildiscipline')
                        ->has('membreconseil')->with('membreconseil')
                        ->find($avoirmembreconseildisciplineId);

        if ($avoirmembreconseildiscipline) {
            $avoirmembreconseildisciplineData = $avoirmembreconseildiscipline->toArray();

            return response()->json([
                'message' => 'avoirmembreconseildiscipline trouvé(e)',
                'success' => true,
                'content' => $avoirmembreconseildisciplineData
            ], 200);
        } else {
            return response()->json([
                'message' => 'avoirmembreconseildiscipline non trouvé',
                'success' => false,
            ], 404);
        }
    }




    /**
     * @OA\Post(
     *     path="/api/avoirmembreconseildisciplines/create",
     *     summary="Create a new avoirmembreconseildiscipline",
     *     description="Create a new avoirmembreconseildiscipline resource",
     *     operationId="createAvoirMembreConseilDiscipline",
     *     tags={"avoirmembreconseildisciplines"},
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
     *                 required={"idMembreConseil", "idConseilDiscipline"},
     *                 @OA\Property(property="idMembreConseil", type="integer", example=1),
     *                 @OA\Property(property="idConseilDiscipline", type="integer", example=1),
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error - Invalid request data",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="object", example={
     *                 "idMembreConseil": {
     *                     "The idMembreConseil field is required."
     *                 },
     *                 "idConseilDiscipline": {
     *                     "The idConseilDiscipline field is required."
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
     *                 "idMembreConseil": {
     *                     "The idMembreConseil must be a positive number."
     *                 },
     *                 "idConseilDiscipline": {
     *                     "The idConseilDiscipline field is required."
     *                 }
     *             })
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="AvoirMembreConseilDiscipline créé(e)"),
     *             @OA\Property(property="success", type="boolean", example="true"),
     *             @OA\Property(property="content", type="object", ref="#/components/schemas/AvoirMembreConseilDiscipline")
     *         )
     *     )
     * )
     */
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'idMembreConseil' => 'required|integer|unique:membre_conseils',
            'idConseilDiscipline' => 'required|integer|unique:conseil_disciplines',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Could not create this avoirmembreconseildiscipline',
                'success' => false,
                'error' => $validator->errors()
            ], 400);
        }

        $avoirmembreconseildiscipline = AvoirMembreConseilDiscipline::create([
            'idMembreConseil' => $request->input('idMembreConseil'),
            'idConseilDiscipline' => $request->input('idConseilDiscipline'),
        ]);

        $membreConseil = MembreConseil::find($request->idMembreConseil);
        $conseilDiscipline = ConseilDiscipline::find($request->idConseilDiscipline);

        $avoirmembreconseildiscipline->membreConseil = $membreConseil;
        $avoirmembreconseildiscipline->conseilDiscipline = $conseilDiscipline;

        return response()->json([
            'message' => 'AvoirMembreConseilDiscipline created successfully',
            'success' => true,
            'content' => $avoirmembreconseildiscipline,
        ]);
    }


    /**
     * @OA\Put(
     *     path="/api/avoirmembreconseildisciplines/update/{avoirmembreconseildisciplineId}",
     *     summary="Update a avoirmembreconseildiscipline's information",
     *     description="Update a avoirmembreconseildiscipline's information",
     *     operationId="updateAvoirMembreConseilDiscipline",
     *     tags={"avoirmembreconseildisciplines"},
     *      @OA\Parameter(
     *         name="avoirmembreconseildisciplineId",
     *         in="path",
     *         description="ID of avoirmembreconseildiscipline to update in this request",
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
     *                 required={"idMembreConseil", "idConseilDiscipline"},
     *                 @OA\Property(property="idMembreConseil", type="integer", example=1),
     *                 @OA\Property(property="idConseilDiscipline", type="integer", example=1),
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error - Invalid request data",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="AvoirMembreConseilDiscipline non trouve(e)"),
     *             @OA\Property(property="success", type="boolean", example="false"),
     *             @OA\Property(property="error", type="object", example={
     *                 "idMembreConseil": {
     *                     "The idMembreConseil field is required."
     *                 },
     *                 "idConseilDiscipline": {
     *                     "The idConseilDiscipline field is required."
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
     *             @OA\Property(property="message", type="string", example="AvoirMembreConseilDiscipline non trouve(e)"),
     *             @OA\Property(property="success", type="boolean", example="false"),
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="AvoirMembreConseilDiscipline modifié qvec succèss"),
     *             @OA\Property(property="success", type="boolean", example="true"),
     *             @OA\Property(property="content", type="object", ref="#/components/schemas/AvoirMembreConseilDiscipline")
     *          )
     *     )
     * )
     */
    public function update(Request $request, $id)
    {

        // on récupère l'avoirmembreconseildiscipline associé
        $avoirmembreconseildisciplineFound = AvoirMembreConseilDiscipline::find($id);
        if ($avoirmembreconseildisciplineFound) {
            $validator = Validator::make($request->all(), [
                'idMembreConseil' => 'required|integer|unique:membre_conseils',
                'idConseilDiscipline' => 'required|integer|unique:conseil_disciplines',
            ]);
        } else {
            return response()->json([
                'message' => 'AvoirMembreConseilDiscipline not exists',
                'success' => false,
            ], 404);
        }

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Could not update this avoirmembreconseildiscipline',
                'success' => false,
                'error' => $validator->errors()
            ], 400);
        }

        // Mise à jour des champs de l'objet MembreConseil
        $avoirmembreconseildisciplineFound->idMembreConseil = $request->input('idMembreConseil');
        $avoirmembreconseildisciplineFound->idConseilDiscipline = $request->input('idConseilDiscipline');

        $avoirmembreconseildisciplineFound->save();

        $membreConseil = MembreConseil::find($request->idMembreConseil);
        $conseilDiscipline = ConseilDiscipline::find($request->idConseilDiscipline);

        $avoirmembreconseildisciplineFound->membreConseil = $membreConseil;
        $avoirmembreconseildisciplineFound->conseilDiscipline = $conseilDiscipline;

        return response()->json([
            'message' => 'MembreConseil updated successfully',
            'success' => true,
            'content' => $avoirmembreconseildisciplineFound
        ]);
    }

    /**
     * @OA\Delete (
     *     path="/api/avoirmembreconseildisciplines/delete/{id}",
     *     summary="Delete an avoirmembreconseildiscipline",
     *     description="Delete an avoirmembreconseildiscipline resource",
     *     operationId="deleteAvoirMembreConseilDiscipline",
     *     tags={"avoirmembreconseildisciplines"},
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
     *         description="ID of avoirmembreconseildiscipline to delete",
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
     *             @OA\Property(property="error", type="string", example="AvoirMembreConseilDiscipline not found")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Permission deleted successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="AvoirMembreConseilDiscipline deleted successfully")
     *         )
     *     ),
     * )
     */
    public function delete($avoirmembreconseildisciplineId)
    {
        $avoirmembreconseildisciplineFound = AvoirMembreConseilDiscipline::find($avoirmembreconseildisciplineId);

        if ($avoirmembreconseildisciplineFound) {

            //suppression du avoirmembreconseildiscipline
            $avoirmembreconseildisciplineFound->delete();

            return response()->json([
                'message' => 'AvoirMembreConseilDiscipline deleted successfully',
                'success' => true,
            ], 200);
        } else {
            return response()->json([
                'message' => 'AvoirMembreConseilDiscipline to delete was not found',
                'success' => false,
            ], 404);
        }
    }
}
