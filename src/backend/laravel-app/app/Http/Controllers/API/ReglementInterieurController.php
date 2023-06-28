<?php

namespace App\Http\Controllers\API;

use App\Models\ReglementInterieur;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ReglementInterieurController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/reglement/findAll",
     *     summary="Get all disciplinary councils",
     *     description="Retrieve a list of all disciplinary councils with associated eleve",
     *     operationId="reglementInterieursIndex",
     *     tags={"ReglementInterieurs"},
     *     security={{"bearerAuth":{}}},
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
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Reglement Interieurs retrieved successfully"),
     *             @OA\Property(property="content", type="array", @OA\Items(ref="#/components/schemas/ReglementInterieur"))
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
        $reglements = ReglementInterieur::all();

        return response()->json([
            'message' => 'Reglement Interieurs retrieved successfully',
            'success' => true,
            'content' => $reglements
        ], 200);
    }


    /**
     * @OA\Post(
     *     path="/api/reglement/create",
     *     summary="Create a new reglementInterieur",
     *     description="Create a new reglementInterieur resource",
     *     operationId="createReglementInterieur",
     *     tags={"ReglementInterieurs"},
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
     *             required={"libelle"},
     *             @OA\Property(property="libelle", type="string", example="Etre ponctuel"),
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error - Invalid request data",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Could not create this Reglement Interieur"),
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="error", type="object", example={
     *                 "libelle": {
     *                     "The libelle field is required."
     *                 },
     *             })
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="ReglementInterieur created successfully"),
     *             @OA\Property(property="content", ref="#/components/schemas/ReglementInterieur")
     *         )
     *     )
     * )
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'libelle' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'The given data was invalid',
                'errors' => $validator->errors(),
                'success' => false
            ], 400);
        }

        $reglement = ReglementInterieur::create([
            'libelle' => $request->libelle,
        ]);
        $reglement->save();

        return response()->json([
            'success' => true,
            'message' => 'ReglementInterieur created successfully',
            'content' => $reglement
        ], 200);
    }

    /**
     * @OA\Get(
     *     path="/api/reglement/findOne/{id}",
     *     summary="Get reglement information",
     *     description="Get information about a specific reglementInterieur",
     *     operationId="viewReglementInterieur",
     *     tags={"ReglementInterieurs"},
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
     *         description="ID of reglementInterieur to get information for",
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
     *             @OA\Property(property="success", type="boolean", example="false"),
     *             @OA\Property(property="message", type="string", example="reglementInterieur not found")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example="true"),
     *             @OA\Property(property="content", type="object", ref="#/components/schemas/ReglementInterieur")
     *         )
     *     )
     * )
     */
    public function view(string $id)
    {
        $reglement = ReglementInterieur::find($id);

        if (!$reglement) {
            return response()->json([
                'message' => 'ReglementInterieur not found',
                'success' => false
            ], 404);
        }

        return response()->json([
            'success' => true,
            'content' => $reglement
        ], 200);
    }


    /**
     * @OA\Post(
     *     path="/api/reglement/update",
     *     summary="Update a reglementInterieur's information",
     *     description="Update a reglementInterieur's information",
     *     operationId="updateReglementInterieur",
     *     tags={"ReglementInterieurs"},
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
     *              required={"libelle"},
     *             @OA\Property(property="libelle", type="string", format="text", example="Etre assidue"),
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error - Invalid request data",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="The given data was invalid"),
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="error", type="object", example={
     *                "libelle": {
     *                     "The libelle field is required."
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
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="ReglementInterieur not found")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Reglement Interieur updated successfully"),
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="content", type="object", ref="#/components/schemas/ReglementInterieur"),
     *         )
     *     )
     * )
     */

    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'libelle' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'The given data was invalid',
                'error' => $validator->errors(),
                'success' => false
            ], 400);
        }

        $reglement = ReglementInterieur::find($request->id);

        if (!$reglement) {
            return response()->json([
                'message' => 'ReglementInterieur not found',
                'success' => false
            ], 404);
        }

        $reglement->update([
            'libelle' => $request->libelle,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'ReglementInterieur updated successfully',
            'content' => $reglement
        ], 200);
    }


    /**
     * @OA\Delete (
     *     path="/api/reglement/delete/{id}",
     *     summary="Delete a reglementInterieur",
     *     description="Delete a reglementInterieur resource",
     *     operationId="deleteReglementInterieur",
     *     tags={"ReglementInterieurs"},
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
     *         description="ID of reglementInterieur to delete",
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
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="ReglementInterieur not found")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Reglement Interieur deleted successfully"),
     *         )
     *     )
     * )
     */
    public function delete(string $id)
    {
        $reglement = ReglementInterieur::find($id);

        if (!$reglement) {
            return response()->json([
                'message' => 'ReglementInterieur not found',
                'success' => false
            ], 404);
        }

        $reglement->delete();

        return response()->json([
            'success' => true,
            'message' => 'ReglementInterieur deleted successfully'
        ], 200);
    }
}
