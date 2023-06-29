<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\ConseilDiscipline;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class ConseilDisciplineController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/conseil_discipline/findAll",
     *     summary="Get all disciplinary councils",
     *     description="Retrieve a list of all disciplinary councils with associated eleve",
     *     operationId="conseilDisciplinesIndex",
     *     tags={"ConseilDisciplines"},
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
     *             @OA\Property(property="message", type="string", example="Disciplinary councils retrieved successfully"),
     *             @OA\Property(property="content", type="array", @OA\Items(ref="#/components/schemas/ConseilDiscipline"))
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
        $conseil_discipline = ConseilDiscipline::all();

        return response()->json([
            'success' => true,
            'message' => 'Disciplinary councils retrieved successfully',
            'content' => $conseil_discipline,
        ], 200);
    }

    /**
     * @OA\Get(
     *     path="/api/conseil_discipline/findOne/{id}",
     *     summary="Get disciplinary council information",
     *     description="Get information about a specific disciplinary council",
     *     operationId="viewConseilDiscipline",
     *     tags={"ConseilDisciplines"},
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
     *         description="ID of disciplinary council to get information for",
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
     *             @OA\Property(property="error", type="string", example="Disciplinary council not found")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="conseil de discipline trouvé(e)"),
     *             @OA\Property(property="success", type="boolean", example="true"),
     *             @OA\Property(property="content", type="object", ref="#/components/schemas/ConseilDiscipline")
     *         )
     *     )
     * )
     */

    public function view($conseil_disciplineId)
    {
        $conseil_discipline = ConseilDiscipline::find($conseil_disciplineId);

        if (!$conseil_discipline) {
            return response()->json([
                'error' => 'Disciplinary council not found',
                'success' => false
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Disciplinary council retrieved successfully',
            'content' => $conseil_discipline
        ], 200);
    }

    /**
     * @OA\Post(
     *     path="/api/conseil_discipline/create",
     *     summary="Create a new disciplinary council",
     *     description="Create a new disciplinary council resource",
     *     operationId="createConseilDiscipline",
     *     tags={"ConseilDisciplines"},
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
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(
     *                 required={"dateCd", "heureDebutCd", "heureFinCd", "eleveId"},
     *                 @OA\Property(property="dateCd", type="string", format="date", example="2023-06-05"),
     *                 @OA\Property(property="heureDebutCd", type="string", example="09:00:00"),
     *                 @OA\Property(property="heureFinCd", type="string", example="10:00:00"),
     *                 @OA\Property(property="eleveId", type="integer", example=1)
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error - Invalid request data",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Could not create this Disciplinary council"),
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="error", type="object", example={
     *                 "dateCd": {
     *                     "The dateCd field is required."
     *                 },
     *                 "heureDebutCd": {
     *                     "The heureDebutCd field is required."
     *                 },
     *                 "heureFinCd": {
     *                     "The heureFinCd field is required."
     *                 },
     *                 "eleveId": {
     *                     "The eleveId field is required."
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
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Disciplinary council created successfully"),
     *             @OA\Property(property="content", ref="#/components/schemas/ConseilDiscipline")
     *         )
     *     )
     * )
     */

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'dateCd' => 'required|date',
            'heureDebutCd' => 'required|date_format:H:i:s',
            'heureFinCd' => 'required|date_format:H:i:s|after:heure_debut_cd',
            'eleveId' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Could not create this Disciplinary council',
                'success' => false,
                'error' => $validator->errors()
            ], 400);
        }
        $conseil_discipline = ConseilDiscipline::create([
            'dateCd' => $request->input('dateCd'),
            'heureDebutCd' => $request->input('heureDebutCd'),
            'heureFinCd' => $request->input('heureFinCd'),
            'eleveId' => $request->input('eleveId'),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Disciplinary council created successfully',
            'content' => $conseil_discipline
        ], 200);
    }

    /**
     * @OA\Post(
     *     path="/api/conseil_discipline/update/{conseilDisciplineId}",
     *     summary="Update a disciplinary council's information",
     *     description="Update a disciplinary council's information",
     *     operationId="updateConseilDiscipline",
     *     tags={"ConseilDisciplines"},
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
     *              required={"dateCd", "heureDebutCd", "heureFinCd", "eleveId"},
     *             @OA\Property(property="dateCd", type="string", format="date", example="1990-01-01"),
     *             @OA\Property(property="heureDebutCd", type="string", example="09:00:00"),
     *             @OA\Property(property="heureFinCd", type="string", example="11:00:00"),
     *             @OA\Property(property="eleveId", type="integer", example=1)
     *           )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error - Invalid request data",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="The given data was invalid"),
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="error", type="object", example={
     *                 "dateCd": {
     *                     "The dateCd field is required."
     *                 },
     *                 "heureDebutCd": {
     *                     "The heureDebutCd field is required."
     *                 },
     *                 "heureFinCd": {
     *                     "The heureFinCd field is required."
     *                 },
     *                 "eleveId": {
     *                     "The eleveId field is required."
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
     *             @OA\Property(property="error", type="string", example="Disciplinary council not found")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Disciplinary council updated successfully"),
     *             @OA\Property(property="content", type="object", ref="#/components/schemas/ConseilDiscipline"),
     *         )
     *     )
     * )
     */

    public function update(Request $request, $id)
    {
        $conseil_discipline = ConseilDiscipline::find($id);
        if ($conseil_discipline){
            $validator = Validator::make($request->all(), [
                'dateCd' => 'required|date',
                'heureDebutCd' => 'required|date_format:H:i:s',
                'heureFinCd' => 'required|date_format:H:i:s|after:heure_debut_cd',
                'eleveId' => 'required|integer',
            ]);
        }else{
            return response()->json([
                'error' => 'Disciplinary council not found',
                'success' => false
            ], 404);
        }

        if ($validator->fails()) {
            return response()->json([
                'message' => 'The given data was invalid',
                'error' => $validator->errors(),
                'success' => false
            ], 400);
        }

        //mise a jour des informations du conseil de discipline
        $conseil_discipline->dateCd = $request->input('dateCd');
        $conseil_discipline->heureDebutCd = $request->input('heureDebutCd');
        $conseil_discipline->heureFinCd = $request->input('heureFinCd');
        $conseil_discipline->eleveId = $request->input('eleveId');
        $conseil_discipline->save();

        return response()->json([
            'success' => true,
            'message' => 'Disciplinary council updated successfully',
            'content' => $conseil_discipline
        ], 200);
    }

    /**
     * @OA\Delete (
     *     path="/api/conseil_discipline/delete/{id}",
     *     summary="Delete a disciplinary council",
     *     description="Delete a disciplinary council resource",
     *     operationId="deleteConseilDiscipline",
     *     tags={"ConseilDisciplines"},
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
     *         description="ID of disciplinary council to delete",
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
     *             @OA\Property(property="error", type="string", example="Disciplinary council not found")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Disciplinary council deleted successfully"),
     *         )
     *     )
     * )
     */

    public function delete(string $id)
    {
        $conseil_discipline = ConseilDiscipline::find($id);

        if (!$conseil_discipline) {
            return response()->json([
                'error' => 'Disciplinary council not found',
                'success' => false
            ], 404);
        }

        $conseil_discipline->delete();

        return response()->json([
            'success' => true,
            'message' => 'Disciplinary council deleted successfully'
        ], 200);
    }
}
