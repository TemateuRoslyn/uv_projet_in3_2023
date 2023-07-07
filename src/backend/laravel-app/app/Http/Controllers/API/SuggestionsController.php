<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Suggestion;

class SuggestionsController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/suggestion/findAll",
     *     summary="Get all suggestions",
     *     description="Retrieve a list of all suggestions",
     *     operationId="SuggestionsIndex",
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
     *     tags={"Suggestions"},
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Suggestion retrieved successfully"),
     *             @OA\Property(property="success", type="boolean", example="true"),
     *             @OA\Property(property="content", type="array", @OA\Items(ref="#/components/schemas/Suggestion")),
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
        $suggestions = Suggestion::all();

        return response()->json([
            'success' => true,
            'message' => 'Suggestion retrieved successfully',
            'content' => $suggestions
        ], 200);
    }


    /**
     * @OA\Get(
     *     path="/api/suggestion/findOne/{id}",
     *     summary="Get suggestion information",
     *     description="Get information about a specific suggestion",
     *     operationId="viewSuggestion",
     *     tags={"Suggestions"},
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
     *         description="ID of suggestion to get information for",
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
     *             @OA\Property(property="error", type="string", example="Suggestion not found")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Suggestion trouvé"),
     *             @OA\Property(property="success", type="boolean", example="true"),
     *             @OA\Property(property="content", type="object", ref="#/components/schemas/Suggestion")
     *         )
     *     )
     * )
     */

    public function view($suggestionId)
    {
        $suggestion = Suggestion::find($suggestionId);

        if (!$suggestion) {
            return response()->json([
                'message' => 'suggestion not found',
                'success' => false
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'suggestion retrieved successfully',

            'content' => $suggestion
        ], 200);
    }

    /**
     * @OA\Post(
     *     path="/api/suggestion/create",
     *     summary="Create a new suggestion",
     *     description="Create a new suggestion resource",
     *     operationId="createSuggestion",
     *     tags={"Suggestions"},
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
     *             required={"description"},
     *             @OA\Property(property="description", type="string", example="moins de pause plus d'exercices"),

     *
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error - Invalid request data",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Could not create this suggestion"),
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="error", type="object", example={
     *                 "description": {
     *                     "The description field is required."
     *                 }
     *             })
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Suggestion created successfully"),
     *             @OA\Property(property="content", ref="#/components/schemas/Suggestion")
     *         )
     *     )
     * )
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'description' => 'required',

        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Could not create this suggestion',
                'success' => false,
                'error' => $validator->errors()
            ], 400);
        }
        $suggestion = Suggestion::create([
            'description' => $request->description,

        ]);

        return response()->json([
            'success' => true,
            'message' => 'suggestion created successfully',
            'content' => $suggestion
        ], 200);
    }

    /**
     * @OA\put(
     *     path="/api/suggestion/update/{suggestionId}",
     *     summary="Update a suggestion's information",
     *     description="Update a suggestion's information",
     *     operationId="updateSuggestion",
     *     tags={"Suggestions"},
     *      @OA\Parameter(
     *         name="suggestionId",
     *         in="path",
     *         description="ID of suggestion to update in this request",
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
     *      @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *              required={"description"},
     *             @OA\Property(property="description", type="string", format="text", example="prendre en compte l'ouverture de cantine"),
     *
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error - Invalid request data",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="The given data are invalid"),
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="error", type="object", example={
     *                "description": {
     *                     "The description field is required."
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
     *             @OA\Property(property="message", type="string", example="suggestion not found"),
     *             @OA\Property(property="success", type="boolean", example=false),
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="suggestion updated successfully"),
     *             @OA\Property(property="content", type="object", ref="#/components/schemas/Suggestion"),
     *         )
     *     )
     * )
     */
    public function update(Request $request, $suggestionId)
    {
        // on récupère la suggestion associé
        $suggestionFound = Suggestion::find($suggestionId);
        if ($suggestionFound) {

            $validator = Validator::make($request->all(), [
                'description' => 'required',
            ]);
        } else {
            return response()->json([
                'message' => 'Suggestion not found',
                'success' => false,
            ], 404);
        }

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Could not update this suggestion',
                'success' => false,
                'error' => $validator->errors()
            ], 400);
        }


        // Mise à jour des champs de l'objet suggestion
        $suggestionFound->description = $request->input('description');
        $suggestionFound->save();

        return response()->json([
            'message' => 'Suggestion updated successfully',
            'success' => true,
            'content' => $suggestionFound
        ]);
    }

    /**
     * @OA\Delete (
     *     path="/api/suggestion/delete/{id}",
     *     summary="Delete an suggestion",
     *     description="Delete a suggestion resource",
     *     operationId="deleteSuggestion",
     *     tags={"Suggestions"},
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
     *         description="ID of suggestion to delete",
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
     *             @OA\Property(property="message", type="string", example="suggestion not found"),
     *             @OA\Property(property="success", type="boolean", example=false),
     *         )
     *     ),
     *    @OA\Response(
     *         response=200,
     *         description="suggestion deleted successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="suggestion deleted successfully")
     *         )
     *     ),
     * )
     */
    public function delete($suggestionId)
    {
        $suggestion = Suggestion::find($suggestionId);

        if (!$suggestion) {
            return response()->json([
                'message' => 'Suggestion not found',
                'success' => false
            ], 404);
        }

        $suggestion->delete();

        return response()->json([
            'success' => true,
            'message' => 'Suggestion deleted successfully'
        ], 200);
    }
}
