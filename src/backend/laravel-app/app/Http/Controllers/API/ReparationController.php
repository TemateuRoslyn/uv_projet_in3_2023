<?php

namespace App\Http\Controllers\API;

use App\Models\Reparation;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use App\Models\Faute;
use Illuminate\Http\Request;

class ReparationController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/reparations/findAll",
     *     summary="Get all reparations",
     *     description="Retrieve a list of all reparations",
     *     operationId="reparationsIndex",
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
     *     tags={"Reparations"},
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Reparations retrieved successfully"),
     *             @OA\Property(property="content", type="array", @OA\Items(ref="#/components/schemas/Reparation"))
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
        $reparations = Reparation::has('faute')->with('faute.eleve')->get();

        return response()->json([
            'message' => 'Liste des reparations',
            'success' => true,
            'content' => $reparations
        ]);
    }

    /**
     * @OA\Get(
     *     path="/api/reparations/findValidated",
     *     summary="Get all reparations",
     *     description="Retrieve a list of all reparations where are validated",
     *     operationId="reparationsValidated",
     *     security={{"bearerAuth":{}}},
     *     tags={"Reparations"},
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
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Validated Reparation retrieved successfully"),
     *             @OA\Property(property="content", type="array", @OA\Items(ref="#/components/schemas/Reparation"))
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

    

    public function indexValidate()
    {
        $reparations = Reparation::has('faute')->with('faute.eleve.classe')->where('status', 'valide')->orWhere('status', 'rejete')->get();

        return response()->json([
            'message' => 'Liste des reparations',
            'success' => true,
            'content' => $reparations
        ]);
    }

    /**
     * @OA\Get(
     *     path="/api/reparations/findAll/eleve/{eleveId}",
     *     summary="Get mistake information for a student",
     *     description="Get information about all specific mistake to a student",
     *     operationId="viewReparationEleve",
     *     tags={"Reparations"},
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
     *         name="eleveId",
     *         in="path",
     *         description="ID of Eleve to get information for",
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
     *               @OA\Property(property="message", type="string", example="eleve non trouvé(e)"),
     *             @OA\Property(property="success", type="boolean", example="false"),
     *
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="fautes de l\'eleve trouvé(e)"),
     *             @OA\Property(property="success", type="boolean", example="true"),
     *             @OA\Property(property="content", type="object", ref="#/components/schemas/Faute")
     *         )
     *     )
     * )
     */
    public function viewReparationEleve($eleveId)
    {
        $eleve = Reparation::where('fauteId', '=', $eleveId)->get();

        if ($eleve) {
            return response()->json([
                'message' => 'Reparation de l\'eleve trouvé(e)',
                'success' => true,
                'content' => $eleve
            ], 200);
        } else {
            return response()->json([
                'message' => 'Reparation non trouvée',
                'success' => false,
            ], 404);
        }
    }


    /**
     * @OA\Get(
     *     path="/api/reparations/findNotValidated",
     *     summary="Get all reparations",
     *     description="Retrieve a list of all reparations which are not validated",
     *     operationId="reparationsNotValidated",
     *     security={{"bearerAuth":{}}},
     *     tags={"Reparations"},
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
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Validated Reparation retrieved successfully"),
     *             @OA\Property(property="content", type="array", @OA\Items(ref="#/components/schemas/Reparation"))
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

    public function indexNotValidate()
    {
        $reparations = Reparation::has('faute')->with('faute.eleve.classe')->where('status', 'en attente')->get();

        return response()->json([
            'message' => 'Liste des reparations',
            'success' => true,
            'content' => $reparations
        ]);
    }


    /**
     * @OA\Get(
     *     path="/api/reparations/findOne/{id}",
     *     summary="Get reparation information",
     *     description="Get information about a specific reparation",
     *     operationId="viewReparation",
     *     tags={"Reparations"},
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
     *         description="ID of reparation to get information for",
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
     *             @OA\Property(property="message", type="string", example="Reparation not found"),
     *             @OA\Property(property="success", type="boolean", example="false"),
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Reparation trouvé(e)"),
     *             @OA\Property(property="success", type="boolean", example="true"),
     *             @OA\Property(property="content", type="object", ref="#/components/schemas/Reparation")
     *         )
     *     )
     * )
     */

    public function view($reparationId)
    {
        $reparation = Reparation::find($reparationId)->with('faute')->get();

        if (!$reparation) {
            return response()->json([
                'message' => 'Reparation not found',
                'success' => false
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Reparation retrieved successfully',
            'content' => $reparation
        ], 200);
    }

    /**
     * @OA\Post(
     *     path="/api/reparations/create",
     *     summary="Create a new reparation",
     *     description="Create a new reparation resource",
     *     operationId="createReparation",
     *     tags={"Reparations"},
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
     *                 required={"demarcheMediation", "fauteId"},
     *                 @OA\Property(property="demarcheMediation", type="string", example="La demarche de mediation a suivre pour la reparation de la faute"),
     *                 @OA\Property(property="fauteId", type="integer", example=1),
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error - Invalid request data",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="object", example={
     *                 "demarcheMediation": {
     *                     "The mediation process field is required."
     *                 },
     *                 "fauteId": {
     *                     "The id of the fault is required."
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
     *         response=201,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Reparation créé(e)"),
     *             @OA\Property(property="success", type="boolean", example="true"),
     *             @OA\Property(property="content", type="object", ref="#/components/schemas/Reparation")
     *         )
     *     )
     * )
     */

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'demarcheMediation' => 'required',
            'fauteId' => 'required|exists:fautes,id'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Could not create this reparation',
                'success' => false,
                'error' => $validator->errors()
            ], 400);
        }
        $reparation = Reparation::create([
            'fauteId' => $request->input('fauteId'),
            'demarcheMediation' => $request->input('demarcheMediation'),
            'status' => 'En attente'
        ]);

        // update de faute de la reparation...
        $faute = Faute::find($request->fauteId);
        $faute->update([
            'libelleFaute' => $faute->libelleFaute,
            'gravite' => $faute->gravite,
            'eleve_id' => $faute->eleve_id,
            'regle_id' => $faute->regle_id,
        ]);
        $reparation->faute = $faute;

        return response()->json([
            'message' => 'Reparation created successfully',
            'success' => true,
            'content' => $reparation,
        ], 201);
    }

    /**
     * @OA\post(
     *     path="/api/reparations/update/{reparationId}",
     *     summary="Update a reparation's information",
     *     description="Update a reparation's information",
     *     operationId="updateReparation",
     *     tags={"Reparations"},
     *      @OA\Parameter(
     *         name="reparationId",
     *         in="path",
     *         description="ID of reparation to update in this request",
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
     *                 required={"demarcheMediation", "fauteId"},
     *                 @OA\Property(property="demarcheMediation", type="string", example="La demarche de reparation a suivre "),
     *                 @OA\Property(property="fauteId", type="integer", example=1),
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error - Invalid request data",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Could not update this Eleve"),
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="error", type="object", example={
     *                 "demarcheMediation": {
     *                     "The mediation process field is required."
     *                 },
     *                 "fauteId": {
     *                     "The id of the fault is required."
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
     *             @OA\Property(property="message", type="string", example="Reparation not found"),
     *             @OA\Property(property="success", type="boolean", example=false),
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Reparation modifié qvec succèss"),
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="content", type="object", ref="#/components/schemas/Reparation"),
     *          )
     *     )
     * )
     */

    public function update(Request $request, $id)
    {

        // on récupère la reparation associé
        $reparationFound = Reparation::find($id);
        if ($reparationFound) {
            $validator = Validator::make($request->all(), [
                'demarcheMediation' => 'required',
                'fauteId' => 'required'
            ]);
        } else {
            return response()->json([
                'message' => 'Reparation not exists',
                'success' => false,
            ], 404);
        }

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Could not update this reparation',
                'success' => false,
                'error' => $validator->errors()
            ], 400);
        }

        // Mise à jour des champs de l'objet Reparation
        $reparationFound->demarcheMediation = $request->input('demarcheMediation');
        $reparationFound->status = 'En attente';

        // update de la faute de reparation...

        // si il change de faute
        $faute = Faute::find($request->fauteId);

        if ($faute && $reparationFound->fauteId != $request->fauteId) {

            // update de l'ancienne faute
            $oldFaute = Faute::find($reparationFound->fauteId);
            $oldFaute->update([
                'libelleFaute' => $oldFaute->libelleFaute,
                'gravite' => $oldFaute->gravite,
                'eleve_id' => $oldFaute->eleve_id,
                'regle_id' => $oldFaute->regle_id,
            ]);

            // update de la nouvelle faute
            $faute->update([
                'libelleFaute' => $faute->libelleFaute,
                'gravite' => $faute->gravite,
                'eleve_id' => $faute->eleve_id,
                'regle_id' => $faute->regle_id,
            ]);
        }

        $reparationFound->fauteId = $request->input('fauteId');
        $reparationFound->save();

        $reparationFound->faute = $faute;

        return response()->json([
            'message' => 'Reparation updated successfully',
            'success' => true,
            'content' => $reparationFound
        ], 200);
    }

    /**
     * @OA\Delete (
     *     path="/api/reparations/delete/{id}",
     *     summary="Delete an reparation",
     *     description="Delete an reparation resource",
     *     operationId="deleteReparation",
     *     tags={"Reparations"},
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
     *         description="ID of reparation to delete",
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
     *             @OA\Property(property="message", type="string", example="Reparation not found")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Permission deleted successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Reparation deleted successfully")
     *         )
     *     ),
     * )
     */

    public function delete($reparationId)
    {
        $reparationFound = Reparation::find($reparationId);

        if ($reparationFound) {

            //suppression de la reparation...
            $reparationFound->delete();

            // update de la faute de reparation...
            $faute = Faute::find($reparationFound->fauteId);
            $faute->update([
                'libelleFaute' => $faute->libelleFaute,
                'gravite' => $faute->gravite,
                'eleve_id' => $faute->eleve_id,
                'regle_id' => $faute->regle_id,

            ]);

            return response()->json([
                'message' => 'Reparation deleted successfully',
                'success' => true,
            ], 200);
        } else {
            return response()->json([
                'message' => 'Reparation to delete was not found',
                'success' => false,
            ], 404);
        }
    }
    /**
     * @OA\post(
     *     path="/api/reparations/validate/{reparationId}",
     *     summary="Validate a reparation",
     *     description="Mark a reparation's status as valide",
     *     operationId="validateReparation",
     *     tags={"Reparations"},
     *      @OA\Parameter(
     *         name="reparationId",
     *         in="path",
     *         description="ID of reparation to validate in this request",
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
     *                 required={"status"},
     *                 @OA\Property(property="status", type="string", example="valide"),
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error - Invalid request data",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Could not update this Eleve"),
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="error", type="object", example={
     *                 "status": {
     *                     "The status field is required."
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
     *             @OA\Property(property="message", type="string", example="Reparation not found"),
     *             @OA\Property(property="success", type="boolean", example=false),
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Reparation validé avec succèss"),
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="content", type="object", ref="#/components/schemas/Reparation"),
     *          )
     *     )
     * )
     */

    public function valider(Request $request, $id)
    {
        // on récupère la reparation associé
        $reparationFound = Reparation::find($id);
        if ($reparationFound) {
            $validator = Validator::make($request->all(), [
                'status' => 'required|string|in:Valide,Rejete',
            ]);
        } else {
            return response()->json([
                'message' => 'Reparation not exists',
                'success' => false,
            ], 404);
        }

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Could not update this reparation',
                'success' => false,
                'error' => $validator->errors()
            ], 400);
        }
        // Mise à jour du champ status de l'objet Reparation
        $reparationFound->status = $request->input('status');
        $reparationFound->save();

        return response()->json([
            'message' => 'Reparation validated successfully',
            'success' => true,
            'content' => $reparationFound
        ], 200);
    }
}
