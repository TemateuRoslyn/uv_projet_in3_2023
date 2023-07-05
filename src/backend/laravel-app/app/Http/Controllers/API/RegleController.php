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
     *     path="/api/regle/findAll",
     *     summary="Get all regles",
     *     description="Retrieve a list of all regles with associated reglementInterieur",
     *     operationId="reglesIndex",
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
     *             @OA\Property(property="message", type="string", example="Regles retrieved successfully"),
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="content", type="array", @OA\Items(ref="#/components/schemas/Regle"))
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
        $regles = Regle::has('reglementInterieur')->with('reglementInterieur')->get();
        //$regles = Regle::all();

        return response()->json([
            'message' => 'Regles retrieved successfully',
            'success' => true,
            'content' => $regles
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
     *           required={"libelle", "reglementInterieurId"},
     *             @OA\Property(property="libelle", type="string", format="text", example="Ne pas sortir sans avoir eu la permission"),
     *             @OA\Property(property="reglementInterieurId", type="integer", example=1)
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error - Invalid request data",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="The given data was invalid"),
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="errors", type="object", example={
     *                 "libelle": {
     *                     "The libelle field is required."
     *                 },
     *                 "reglementInterieurId": {
     *                     "The id of the reglement interieur is required."
     *                 },
     *             }),
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Regle created successfully"),
     *             @OA\Property(property="content", ref="#/components/schemas/Regle")
     *         )
     *     )
     * )
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'libelle' => 'required|string|max:255',
            'reglementInterieurId' => 'required|integer|exists:reglement_interieurs,id',
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
            'reglementInterieurId' => $request->reglementInterieurId
        ]);
        //information sur le reglement interieur associe a la regle
        $regles->load('reglementInterieur');

        return response()->json([
            'success' => true,
            'message' => 'Regle created successfully',
            'content' => $regles
        ], 200);
    }

    /**
     * @OA\Get(
     *     path="/api/regle/findOne/{id}",
     *     summary="Get regle information",
     *     description="Get information about a specific regle",
     *     operationId="viewRegle",
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
     *             @OA\Property(property="success", type="boolean", example="false"),
     *             @OA\Property(property="message", type="string", example="Regle not found")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Regle trouvée"),
     *             @OA\Property(property="success", type="boolean", example="true"),
     *             @OA\Property(property="content", type="object", ref="#/components/schemas/Regle")
     *         )
     *     )
     * )
     */
    public function view(string $id)
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
            'message' => 'Regle trouvée',
            'success' => true,
            'content' => $regle
        ], 200);
    }

    /**
     * @OA\post(
     *     path="/api/regle/update/{regleId}",
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
     *              required={"libelle", "reglementInterieurId"},
     *             @OA\Property(property="libelle", type="string", format="text", example="Ne pas sortir sans avoir eu la permission"),
     *             @OA\Property(property="reglementInterieurId", type="integer", example=1)
     *         )
     *     ),
     * @OA\Parameter(
     *         name="regleId",
     *         in="path",
     *         description="ID of eleve to update in this request",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
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
     *                 },
     *                "reglementInterieurId": {
     *                     "The id of the reglementInterieur is required."
     *                 },
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
     *             @OA\Property(property="message", type="string", example="Regle not found")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Regle updated successfully"),
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="content", type="object", ref="#/components/schemas/Regle"),
     *         )
     *     )
     * )
     */

    public function update(Request $request, $regleid)
    {
        $validator = Validator::make($request->all(), [
            'libelle' => 'required|string|max:255',
            'reglementInterieurId' => 'required|integer|exists:reglement_interieurs,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'The given data was invalid',
                'errors' => $validator->errors(),
                'success' => false
            ], 400);
        }

        $regle = Regle::find($regleid);

        if (!$regle) {
            return response()->json([
                'message' => 'Regle not found',
                'success' => false
            ], 404);
        }

        $regle->update([
            'libelle' => $request->libelle,
            'reglementInterieurId' => $request->reglementInterieurId,
        ]);
        //information sur le reglement interieur associe a la regle
        $regle->load('reglementInterieur');

        return response()->json([
            'success' => true,
            'message' => 'Regle updated successfully',
            'content' => $regle
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
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="Regle not found")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Regle deleted successfully"),
     *         )
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
