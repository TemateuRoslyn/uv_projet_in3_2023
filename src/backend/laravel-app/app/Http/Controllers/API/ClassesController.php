<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;

use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

use App\Models\Classe;
use App\Models\ClasseProfesseur;
use App\Models\CoursClasse;


class ClassesController extends Controller
{
    /**
     * Display a listing of the nbClase.
     *
     * @OA\Get(
     *     path="/api/classes/findAll",
     *     summary="Get a list of classes",
     *     tags={"Classes"},
     *     operationId="classesIndex",
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
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Classes retrieved successfully"),
     *             @OA\Property(
     *                 property="content",
     *                 type="array",
     *                 @OA\Items(ref="#/components/schemas/Classe")
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Error - Unauthorized",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string", example="Unauthorized")
     *         )
     *      )
     *  )
     */

    public function index()
    {
        $classes = Classe::with('eleves', 'cours.professeur')->get();

        return response()->json([
            'success' => true,
            'message' => 'Classes retrieved successfully',
            'content' => $classes
        ], 200);
    }

    /**
     * Create a new classe.
     *
     * @OA\Post(
     *     path="/api/classes/create",
     *     summary="Create a new classe",
     *     tags={"Classes"},
     *     operationId="classeCreate",
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
     *      @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *              @OA\Property(property="name", type="string", readOnly=true, description="Terminal"),
     *              @OA\Property(property="shortName", type="string", readOnly=true, description="Tle"),
     *              @OA\Property(property="speciality", type="string", readOnly=true, description="C"),
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Classe created successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Classe created successfully"),
     *             @OA\Property(property="content", type="object",  ref="#/components/schemas/Classe")
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Validation error",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string", example="Could not create this classe"),
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(
     *                 property="error",
     *                 type="object",
     *                 @OA\Property(property="name", type="array", @OA\Items(type="string")),
     *                 @OA\Property(property="description", type="array", @OA\Items(type="string"))
     *             )
     *         )
     *     )
     * )
     */

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'shortName' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Could not create this classe',
                'success' => false,
                'error' => $validator->errors()
            ], 400);
        }

        // on attribut le numero de la classe
        $classe = NULL;

        if($request->speciality){
            $nbClase = Classe::where('name', $request->name)
                              ->whereIn('speciality', [$request->speciality])
                              ->count();

            $classe = Classe::create([
                'name' => $request-> name,
                'shortName' => $request-> shortName,
                'speciality' => $request-> speciality,
                'no' => ++$nbClase,
                'effectif' => 0,
            ]);
        } else {
            $nbClase = Classe::where('name', $request->name)
                              ->count();
            $classe = Classe::create([
                'name' => $request-> name,
                'shortName' => $request-> shortName,
                'no' => ++$nbClase,
                'effectif' => 0,
            ]);
        }

        $classe->load('eleves');
        $classe->load('cours');
        $classe->load('professeurs');
        return response()->json([
            'success' => true,
            'message' => 'Classe created successfully',
            'content' => $classe
        ], 201);
    }

    /**
     * Display the specified classe.
     *
     * @OA\Get(
     *     path="/api/classes/findOne/{classeId}",
     *     summary="Get a specific classe",
     *     tags={"Classes"},
     *     operationId="classeShow",
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
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="Classe ID",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Classe retrieved successfully"),
     *             @OA\Property(property="content", type="object", ref="#/components/schemas/Classe")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Classe not found",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string", example="Classe not found"),
     *             @OA\Property(property="success", type="boolean", example=false)
     *         )
     *     )
     * )
     */
    public function show($id)
    {
        $classe = Classe::with('eleves','cours.professeur')
                        ->find($id);

        if (!$classe) {
            return response()->json([
                'message' => 'Classe not found',
                'success' => false
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Classe retrieved successfully',
            'content' => $classe
        ], 200);
    }



    /**
     * Update the specified classe.
     *
     * @OA\Put(
     *     path="/api/classes/update/{classeId}",
     *     summary="Update a specific classe",
     *     tags={"Classes"},
     *     operationId="classeUpdate",
     *     @OA\Parameter(
     *         name="classeId",
     *         in="path",
     *         description="Classe ID",
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
     *             example="Bearer {your_token}"
     *         ),
     *         description="JWT token"
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *              @OA\Property(property="name", type="string", readOnly=true, description="Terminal"),
     *              @OA\Property(property="shortName", type="string", readOnly=true, description="Tle"),
     *              @OA\Property(property="speciality", type="string", readOnly=true, description="C"),
     *              @OA\Property(property="effectif", type="number", readOnly=true, description="100"),
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Classe updated successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Classe updated successfully"),
     *             @OA\Property(property="content", type="object", ref="#/components/schemas/Classe")
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Validation error",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string", example="The given data was invalid"),
     *             @OA\Property(property="errors", type="object", example="{'name': ['The name field is required.']}"),
     *             @OA\Property(property="success", type="boolean", example=false)
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Classe not found",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string", example="Classe not found"),
     *             @OA\Property(property="success", type="boolean", example=false)
     *         )
     *     )
     * )
     */
    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'shortName' => 'required',
            'effectif' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Could not update this classe',
                'success' => false,
                'error' => $validator->errors()
            ], 400);
        }

        $classeFound = Classe::find($id);

        if (!$classeFound) {
            return response()->json([
                'message' => 'Classe not found',
                'success' => false
            ], 404);
        }

        // on attribut le numero de la classe

        if($request->speciality){
            $nbClase = Classe::where('name', $request->name)
                              ->whereIn('speciality', [$request->speciality])
                              ->count();

            $classeFound->update([
                'name' => $request->name,
                'shortName' => $request->shortName,
                'speciality' => $request->speciality,
                'no' => ++$nbClase,
                'effectif' => $request->effectif,
            ]);

        } else {
            $nbClase = Classe::where('name', $request->name)
                              ->count();
            $classeFound->update([
                'name' => $request->name,
                'shortName' => $request->shortName,
                'speciality' => NULL,
                'no' => ++$nbClase,
                'effectif' => $request->effectif,
            ]);
        }

        $classeFound->load('eleves');
        $classeFound->load('cours');
        $classeFound->load('professeurs');

        return response()->json([
            'success' => true,
            'message' => 'Classe updated successfully',
            'content' => $classeFound
        ], 201);
    }

    /**
     * Remove the specified classe from storage.
     *
     * @OA\Delete(
     *     path="/api/classes/delete/{classeId}",
     *     summary="Delete a specific classe",
     *     tags={"Classes"},
     *     operationId="classeDelete",
     *     @OA\Parameter(
     *         name="classeId",
     *         in="path",
     *         description="Classe ID",
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
     *             example="Bearer {your_token}"
     *         ),
     *         description="JWT token"
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Classe deleted successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Classe deleted successfully")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Classe not found",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string", example="Classe not found"),
     *             @OA\Property(property="success", type="boolean", example=false)
     *         )
     *     )
     * )
     */
    public function destroy(string $id)
    {
        $classe = Classe::find($id);

        if (!$classe) {
            return response()->json([
                'message' => 'Classe not found',
                'success' => false
            ], 404);
        }

        $classe->professeurs()->detach();
        $classe->cours()->detach();
        ClasseProfesseur::where('classeId', $classe->id)->delete();
        CoursClasse::where('classeId', $classe->id)->delete();
        $classe->delete();

        return response()->json([
            'success' => true,
            'message' => 'Classe deleted successfully'
        ], 200);
    }


    /**
     * Get the filtered list of classes.
     *
     * @OA\Get(
     *     path="/api/classes/records/{keyword}",
     *     summary="Get filtered list of classes",
     *     tags={"Classes"},
     *     operationId="classesRecords",
     *     @OA\Parameter(
     *         name="keyword",
     *         in="path",
     *         description="Keyword to filter classes",
     *         required=true,
     *         @OA\Schema(
     *             type="string"
     *         )
     *     ),
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
     *             @OA\Property(property="message", type="string", example="Classe records successfully"),
     *             @OA\Property(property="content", type="array", @OA\Items(type="string", example="Sixieme A 1:5"))
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Invalid request",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string", example="Invalid request"),
     *             @OA\Property(property="success", type="boolean", example=false)
     *         )
     *     )
     * )
     */
    public function records($keyword)
    {
        $classes = Classe::where('name', 'like', "%{$keyword}%")
            ->orWhere('speciality', 'like', "%{$keyword}%")
            ->orWhere('no', 'like', "%{$keyword}%")
            ->get();

        $formattedClasses = $classes->map(function ($class) {
            $name = $class->name;
            $speciality = $class->speciality;
            $no = $class->no;
            $id = $class->id;

            if ($speciality) {
                return "{$name} {$speciality} {$no}:{$id}";
            } else {
                return "{$name} {$no}:{$id}";
            }
        });

        return response()->json([
            'success' => true,
            'message' => 'Classe records successfully',
            'content' => $formattedClasses
        ], 200);
    }
}
