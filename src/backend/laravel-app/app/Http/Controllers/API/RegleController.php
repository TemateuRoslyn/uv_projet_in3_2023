<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use App\Models\Regle;

class RegleController extends Controller
{

    /**
     * @OA\Get(
     *     path="/api/regles/findAll",
     *     summary="Find all regles",
     *     description="Retrieve a list of all regles with associated reglementInterieur",
     *     operationId="findAllRegles",
     *     tags={"Regles"},
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
     *             @OA\Property(property="data", type="array", @OA\Items(ref="#/components/schemas/Regle"))
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
    public function showAll()
    {
        $regles = Regle::has('reglementInterieur')->with('reglementInterieur')->get();
        //$regles = Regle::all();

        return response()->json([
            'success' => true,
            'data' => $regles
        ], 200);
    }


    /**
     * @OA\Post(
     *     path="/api/regle/create",
     *     summary="Create a new Regle",
     *     description="Create a new Regle resource",
     *     operationId="createRegle",
     *     tags={"Regles"},
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
     *         @OA\JsonContent(
     *             required={"libelle"},
     *             @OA\Property(property="libelle", type="string", example="Ne pas bavarder en salle de cours"),
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error - Invalid request data",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="The given data was invalid"),
     *             @OA\Property(property="errors", type="object", example={
     *                 "libelle": {
     *                     "The libelle field is required."
     *                 }
     *             }),
     *             @OA\Property(property="success", type="boolean", example=false)
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Regle created successfully"),
     *             @OA\Property(property="data", ref="#/components/schemas/Regle")
     *         )
     *     )
     * )
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'libelle' => 'required|string|max:255',
            'reglement_interieur_id' => 'required|integer'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'The given data was invalid',
                'errors' => $validator->errors(),
                'success' => false
            ], 400);
        }

        $regles = Regle::create([
            'libelle' => $request->libelle,
            'reglement_interieur_id' => $request->reglement_interieur_id
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Regle created successfully',
            'data' => $regles
        ], 201);
    }


    /**
     * @OA\Get(
     *     path="/api/regle/findOne/{id}",
     *     summary="Get regle information",
     *     description="Get information about a specific regle",
     *     operationId="findOneRegle",
     *     tags={"Regles"},
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
     *         description="ID of regle to get information for",
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
     *             @OA\Property(property="error", type="string", example="Regle not found")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Regle trouvé(e)"),
     *             @OA\Property(property="success", type="boolean", example="true"),
     *             @OA\Property(property="data", type="object", ref="#/components/schemas/Regle")
     *         )
     *     )
     * )
     */
    public function showIndex(string $id)
    {
        $regle = Regle::with('reglementInterieur')->find($id);
        //$regle = Regle::find($id);

        if (!$regle) {
            return response()->json([
                'message' => 'Regle not found',
                'success' => false
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $regle
        ], 200);
    }

    /**
     * @OA\Post(
     *     path="/api/regle/update",
     *     summary="Update a regle's information",
     *     description="Update a regle's information",
     *     operationId="updateRegle",
     *     tags={"Regles"},
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
     *              required={"libelle", "reglement_interieur_id"},
     *             @OA\Property(property="libelle", type="string", format="text", example="Ne pas sortir sans avoir eu la permission"),
     *             @OA\Property(property="reglement_interieur_id", type="integer", example=1)
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error - Invalid request data",
     *         @OA\JsonContent(
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
     *             @OA\Property(property="error", type="string", example="Regle not found")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="regle", type="object", ref="#/components/schemas/Regle"),
     *         )
     *     )
     * )
     */

    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'libelle' => 'required|string|max:255',
            'reglement_interieur_id' => 'required|integer'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'The given data was invalid',
                'errors' => $validator->errors(),
                'success' => false
            ], 400);
        }

        $regle = Regle::find($request->id);

        if (!$regle) {
            return response()->json([
                'message' => 'Regle not found',
                'success' => false
            ], 404);
        }

        $regle->update([
            'libelle' => $request->libelle,
            'reglement_interieur_id' => $request->reglement_interieur_id,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Regle updated successfully',
            'data' => $regle
        ], 200);
    }

    /**
     * @OA\Delete (
     *     path="/api/regle/delete/{id}",
     *     summary="Delete a regle",
     *     description="Delete a regle resource",
     *     operationId="deleteRegle",
     *     tags={"Regles"},
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
     *         description="ID of regle to delete",
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
     *             @OA\Property(property="error", type="string", example="Regle not found")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *     )
     * )
     */
    public function delete(string $id)
    {
        $regle = Regle::find($id);

        if (!$regle) {
            return response()->json([
                'message' => 'Regle not found',
                'success' => false
            ], 404);
        }

        $regle->delete();

        return response()->json([
            'success' => true,
            'message' => 'Regle deleted successfully'
        ], 200);
    }
}
