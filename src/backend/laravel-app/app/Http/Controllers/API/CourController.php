<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Models\Cour;
use Illuminate\Http\Request;

class CourController extends Controller
{
    private $avatar_path = "assets/avatars/cours";

    /**
     * @OA\Get(
     *     path="/api/cours/findAll",
     *     summary="Get all cours",
     *     description="Retrieve a list of all cours",
     *     operationId="findAllcours",
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
     *     tags={"cours"},
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="cours", type="array", @OA\Items(ref="#/components/schemas/Cour"))
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
        $cours = Cour::all();

        return response()->json([
            'success' => true,
            'message' => 'Course retrieved successfully',
            'data' => $cours
        ], 200);
    }

    /**
     * @OA\Get(
     *     path="/api/cours/findOne/{id}",
     *     summary="Get cour information",
     *     description="Get information about a specific cour",
     *     operationId="findOneCours",
     *     tags={"cours"},
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
     *         description="ID of cour to get information for",
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
     *             @OA\Property(property="error", type="string", example="Cour not found")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Cour trouvé"),
     *             @OA\Property(property="success", type="boolean", example="true"),
     *             @OA\Property(property="data", type="object", ref="#/components/schemas/Cour")
     *         )
     *     )
     * )
     */

    public function show($coursId)
    {
        $cour = Cour::find($coursId);

        if (!$cour) {
            return response()->json([
                'message' => 'Course not found',
                'success' => false
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Course retrieved successfully',
            'data' => $cour
        ], 200);
    }

    /**
     * @OA\Post(
     *     path="/api/cours/create",
     *     summary="Create a new course",
     *     description="Create a new course resource",
     *     operationId="createCours",
     *     tags={"cours"},
     *     @OA\Parameter(
     *         name="Authorization",
     *         in="header",
     *         required=true,
     *         @OA\Schema(
     *             type="string",
     *             default="Bearer {your_token}"
     *         ),
     *         description="JWT token"
     *      ),
     *      @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"libelle", "date_cour", "heure_debut", "heure_fin"},
     *             @OA\Property(property="libelle", type="string", example="Mathematics"),
     *             @OA\Property(property="date_cour", type="string", format="date", example="2023-06-05"),
     *             @OA\Property(property="heure_debut", type="string", example="09:00"),
     *             @OA\Property(property="heure_fin", type="string", example="10:30"),
     *
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error - Invalid request data",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Could not create this Course"),
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="error", type="object", example={
     *                 "libelle": {
     *                     "The libelle field is required."
     *                 },
     *                 "date_cour": {
     *                     "The date_cour field is required."
     *                 }
     *             })
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Course created successfully"),
     *             @OA\Property(property="data", ref="#/components/schemas/Cour")
     *         )
     *     )
     * )
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'libelle' => 'required|unique:cours',
            'date_cour' => 'required|date',
            'heure_debut' => 'required',
            'heure_fin' => 'required',
            //'professeur_id' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Could not create this Course',
                'success' => false,
                'error' => $validator->errors()
            ], 400);
        }
        $cour = Cour::create([
            'libelle' => $request->libelle,
            'date_cour' => $request->date_cour,
            'heure_debut' => $request->heure_debut,
            'heure_fin' => $request->heure_fin,
            //  'professeur_id' => $request->professeur_id,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Course created successfully',
            'data' => $cour
        ], 200);
    }



    /**
     * @OA\Post(
     *     path="/api/cours/update",
     *     summary="Update a cour's information",
     *     description="Update a cour's information",
     *     operationId="updateCours",
     *     tags={"cours"},
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
     *      @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *              required={"libelle", "date_cour", "heure_debut", "heure_fin"},
     *             @OA\Property(property="libelle", type="string", format="text", example="Histoire"),
     *             @OA\Property(property="date_cour", type="string", format="date", example="1990-01-01"),
     *             @OA\Property(property="heure_debut", type="string", example="12-03-34"),
     *             @OA\Property(property="heure_fin", type="string", example="12-03-34"),
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error - Invalid request data",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="object", example={
     *                "heure_debut": {
     *                     "The heure_debut field is required."
     *                 },
     *                 "heure_fin": {
     *                     "The heure_fin field is required."
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
     *             @OA\Property(property="error", type="string", example="Cour not found")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="cour", type="object", ref="#/components/schemas/Cour"),
     *         )
     *     )
     * )
     */

    public function update(Request $request)
    {
        // on récupère le cour associé
        $courFound = Cour::find($request->id);
        if ($courFound) {

            $validator = Validator::make($request->all(), [
                'libelle' => 'required|unique:cours',
                'date_cour' => 'required|date',
                'heure_debut' => 'required',
                'heure_fin' => 'required',
                // 'professeur_id' => 'required|integer',
            ]);
        } else {
            return response()->json([
                'message' => 'Course not exists',
                'success' => false,
            ], 400);
        }

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Could not update this course',
                'success' => false,
                'error' => $validator->errors()
            ], 400);
        }


        // Mise à jour des champs de l'objet Cour
        $courFound->libelle = $request->input('libelle');
        $courFound->date_cour = $request->input('date_cour');
        $courFound->heure_debut = $request->input('heure_debut');
        $courFound->heure_fin = $request->input('heure_fin');
        //   $courFound->professeur_id = $request->input('professeur_id');

        $courFound->save();

        return response()->json([
            'message' => 'Course updated successfully',
            'success' => true,
            'data' => $courFound
        ]);
    }

    /**
     * @OA\Delete (
     *     path="/api/cours/delete/{id}",
     *     summary="Delete a cour",
     *     description="Delete a cour resource",
     *     operationId="deleteCours",
     *     tags={"cours"},
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
     *         description="ID of cour to delete",
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
     *             @OA\Property(property="error", type="string", example="Cour not found")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *     )
     * )
     */

    public function delete($coursId)
    {
        $cour = Cour::find($coursId);

        if (!$cour) {
            return response()->json([
                'message' => 'Course not found',
                'success' => false
            ], 404);
        }

        $cour->delete();

        return response()->json([
            'success' => true,
            'message' => 'Course deleted successfully'
        ], 200);
    }
}
