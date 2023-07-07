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
use App\Models\Personnel;
use App\Models\User;
use App\Models\Permission;
use App\Models\Parents;

class MembreConseilController extends Controller
{

    /**
     * @OA\Get(
     *     path="/api/membreconseils/findAll",
     *     summary="Get all membreconseils",
     *     description="Retrieve a list of all membreconseils",
     *     operationId="membreconseilsIndex",
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
     *     tags={"membreconseils"},
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Permission updated successfully"),
     *             @OA\Property(property="content", type="array", @OA\Items(ref="#/components/schemas/MembreConseil"))
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
        $membreconseils = MembreConseil::with('personnelC', 'personnelG', 'parent')->get();

        return response()->json([
            'message' => 'Liste des membres de conseil de discipline',
            'success' => true,
            'content' => $membreconseils
        ]);
    }

    /**
     * @OA\Get(
     *     path="/api/membreconseils/findOne/{id}",
     *     summary="Get membreconseil information",
     *     description="Get information about a specific membreconseil",
     *     operationId="viewMembreConseil",
     *     tags={"membreconseils"},
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
     *         description="ID of membreconseil to get information for",
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
     *             @OA\Property(property="message", type="string", example="MembreConseil not found"),
     *             @OA\Property(property="success", type="boolean", example="false"),
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="MembreConseil trouvé(e)"),
     *             @OA\Property(property="success", type="boolean", example="true"),
     *             @OA\Property(property="content", type="object", ref="#/components/schemas/MembreConseil")
     *         )
     *     )
     * )
     */
    public function view($membreconseilId)
    {
        $membreconseil = MembreConseil::with('personnelC')
                        ->has('personnelG')->with('personnelG')
                        ->has('parent')->with('parent')
                        ->find($membreconseilId);

        if ($membreconseil) {
            $membreconseilData = $membreconseil->toArray();

            return response()->json([
                'message' => 'membreconseil trouvé(e)',
                'success' => true,
                'content' => $membreconseilData
            ], 200);
        } else {
            return response()->json([
                'message' => 'MembreConseil non trouvé',
                'success' => false,
            ], 404);
        }
    }




    /**
     * @OA\Post(
     *     path="/api/membreconseils/create",
     *     summary="Create a new membreconseil",
     *     description="Create a new membreconseil resource",
     *     operationId="createMembreConseil",
     *     tags={"membreconseils"},
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
     *                 required={"idChef", "idSurveillantG", "idRepresentantE"},
     *                 @OA\Property(property="idChef", type="integer", example=1),
     *                 @OA\Property(property="idSurveillantG", type="integer", example=1),
     *                 @OA\Property(property="idRepresentantE", type="integer", example=1),
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error - Invalid request data",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="object", example={
     *                 "idChef": {
     *                     "The idChef field is required."
     *                 },
     *                 "idSurveillantG": {
     *                     "The idSurveillantG field is required."
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
     *                 "idChef": {
     *                     "The idChef must be a positive number."
     *                 },
     *                 "idSurveillantG": {
     *                     "The idSurveillantG must gretter than 0."
     *                 },
     *                 "idRepresentantE": {
     *                     "The idRepresentantE field is required."
     *                 }
     *             })
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="MembreConseil créé(e)"),
     *             @OA\Property(property="success", type="boolean", example="true"),
     *             @OA\Property(property="content", type="object", ref="#/components/schemas/MembreConseil")
     *         )
     *     )
     * )
     */
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'idChef' => 'required|integer',
            'idSurveillantG' => 'required|integer',
            'idRepresentantE' => 'required|integer'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Could not create this membreconseil',
                'success' => false,
                'error' => $validator->errors()
            ], 400);
        }

        $membreconseil = MembreConseil::create([
            'idChef' => $request->input('idChef'),
            'idSurveillantG' => $request->input('idSurveillantG'),
            'idRepresentantE' => $request->input('idRepresentantE'),
        ]);

        $Chef = Personnel::find($request->idChef);
        $SurveillantG = Personnel::find($request->idSurveillantG);
        $RepresentantE = Parents::find($request->idRepresentantE);

        $membreconseil->chef = $Chef;
        $membreconseil->surveillantG = $SurveillantG;
        $membreconseil->representantE = $RepresentantE;

        return response()->json([
            'message' => 'MembreConseil created successfully',
            'success' => true,
            'content' => $membreconseil,
        ]);
    }


    /**
     * @OA\Put(
     *     path="/api/membreconseils/update/{membreconseilId}",
     *     summary="Update a membreconseil's information",
     *     description="Update a membreconseil's information",
     *     operationId="updateMembreConseil",
     *     tags={"membreconseils"},
     *      @OA\Parameter(
     *         name="membreconseilId",
     *         in="path",
     *         description="ID of membreconseil to update in this request",
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
     *                 required={"idChef", "idSurveillantG", "idRepresentantE"},
     *                 @OA\Property(property="idChef", type="integer", example=1),
     *                 @OA\Property(property="idSurveillantG", type="integer", example=1),
     *                 @OA\Property(property="idRepresentantE", type="integer", example=1),
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error - Invalid request data",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="MembreConseil non trouve(e)"),
     *             @OA\Property(property="success", type="boolean", example="false"),
     *             @OA\Property(property="error", type="object", example={
     *                 "idChef": {
     *                     "The idChef field is required."
     *                 },
     *                 "idSurveillantG": {
     *                     "The idSurveillantG field is required."
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
     *             @OA\Property(property="message", type="string", example="MembreConseil non trouve(e)"),
     *             @OA\Property(property="success", type="boolean", example="false"),
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="MembreConseil modifié qvec succèss"),
     *             @OA\Property(property="success", type="boolean", example="true"),
     *             @OA\Property(property="content", type="object", ref="#/components/schemas/MembreConseil")
     *          )
     *     )
     * )
     */
    public function update(Request $request, $id)
    {

        // on récupère l'membreconseil associé
        $membreconseilFound = MembreConseil::find($id);
        if ($membreconseilFound) {
            $validator = Validator::make($request->all(), [
                'idChef' => 'required|integer|unique:personnels',
                'idSurveillantG' => 'required|integer|unique:personnels',
                'idRepresentantE' => 'required|integer|unique:parents'
            ]);
        } else {
            return response()->json([
                'message' => 'MembreConseil not exists',
                'success' => false,
            ], 404);
        }

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Could not update this membreconseil',
                'success' => false,
                'error' => $validator->errors()
            ], 400);
        }

        // Mise à jour des champs de l'objet MembreConseil
        $membreconseilFound->idChef = $request->input('idChef');
        $membreconseilFound->idSurveillantG = $request->input('idSurveillantG');
        $membreconseilFound->idRepresentantE = $request->input('idRepresentantE');

        $membreconseilFound->save();

        $Chef = Personnel::find($request->idChef);
        $SurveillantG = Personnel::find($request->idSurveillantG);
        $RepresentantE = Parents::find($request->idRepresentantE);

        $membreconseilFound->chef = $Chef;
        $membreconseilFound->surveillantG = $SurveillantG;
        $membreconseilFound->representantE = $RepresentantE;

        return response()->json([
            'message' => 'MembreConseil updated successfully',
            'success' => true,
            'content' => $membreconseilFound
        ]);
    }

    /**
     * @OA\Delete (
     *     path="/api/membreconseils/delete/{id}",
     *     summary="Delete an membreconseil",
     *     description="Delete an membreconseil resource",
     *     operationId="deleteMembreConseil",
     *     tags={"membreconseils"},
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
     *         description="ID of membreconseil to delete",
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
     *             @OA\Property(property="error", type="string", example="MembreConseil not found")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Permission deleted successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="MembreConseil deleted successfully")
     *         )
     *     ),
     * )
     */
    public function delete($membreconseilId)
    {
        $membreconseilFound = MembreConseil::find($membreconseilId);

        if ($membreconseilFound) {

            //suppression du membreconseil
            $membreconseilFound->delete();

            return response()->json([
                'message' => 'MembreConseil deleted successfully',
                'success' => true,
            ], 200);
        } else {
            return response()->json([
                'message' => 'MembreConseil to delete was not found',
                'success' => false,
            ], 404);
        }
    }
}
