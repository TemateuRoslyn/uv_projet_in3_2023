<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

use App\Http\Controllers\Controller;

use App\Models\Eleve;
use App\Models\User;
use App\Models\Role;

class EleveController extends Controller
{

    private $avatar_path = "assets/avatars/eleves" ;


    /**
     * @OA\Get(
     *     path="/api/eleves/findAll",
     *     summary="Get all eleves",
     *     description="Retrieve a list of all eleves",
     *     operationId="elevesIndex",
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
     *     tags={"eleves"},
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="eleves", type="array", @OA\Items(ref="#/components/schemas/Eleve"))
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
        $eleves = Eleve::has('user')->with('user')->get();

    
        return response()->json([
            'message' => 'Liste des élèves', 
            'success' => true,
            'data' => $eleves]);
    }

    /**
     * @OA\Get(
     *     path="/api/eleves/findOne/{id}",
     *     summary="Get eleve information",
     *     description="Get information about a specific eleve",
     *     operationId="viewEleve",
     *     tags={"eleves"},
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
     *         description="ID of eleve to get information for",
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
     *             @OA\Property(property="error", type="string", example="Eleve not found")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Élève trouvé(e)"),
     *             @OA\Property(property="success", type="boolean", example="true"),
     *             @OA\Property(property="data", type="object", ref="#/components/schemas/Eleve")
     *         )
     *     )
     * )
     */
    public function view($eleveId)
    {
        $eleve = Eleve::with('user')->find($eleveId);

        if ($eleve) {
            $eleveData = $eleve->toArray();
            $eleveData['email'] = $eleve->user->email;

            return response()->json([
                'message' => 'élève trouvé(e)',
                'success' => true,
                'data' => $eleveData
            ], 200);
        } else {
            return response()->json([
                'message' => 'Élève non trouvé',
                'success' => false,
            ], 404);
        }
    }

    


    /**
     * @OA\Post(
     *     path="/api/eleves/create",
     *     summary="Create a new eleve",
     *     description="Create a new eleve resource",
     *     operationId="createEleve",
     *     tags={"eleves"},
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
     *             required={"email", "password", "username", "first_name", "last_name", "date_de_naissance", "lieu_de_naissance", "sexe", "telephone", "solvable", "redoublant", "user_id"},
     *             @OA\Property(property="email", type="string", format="email", example="maestros.roslyn@gmail.com"),
     *             @OA\Property(property="password", type="string", format="password", example="PassWord12345"),
     *             @OA\Property(property="username", type="string", example="Doe"),
     *             @OA\Property(property="first_name", type="string", example="John"),
     *             @OA\Property(property="last_name", type="string", example="Smith"),
     *             @OA\Property(property="date_de_naissance", type="string", format="date", example="1990-01-01"),
     *             @OA\Property(property="lieu_de_naissance", type="string", example="Paris"),
     *             @OA\Property(property="photo", type="string", nullable=true, example="https://example.com/photo.jpg"),
     *             @OA\Property(property="sexe", type="string", example="Male"),
     *             @OA\Property(property="telephone", type="string", nullable=true, example="+33123456789"),
     *             @OA\Property(property="solvable", type="boolean", example="true"),
     *             @OA\Property(property="redoublant", type="boolean", example="false")
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error - Invalid request data",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="object", example={
     *                 "email": {
     *                     "The email field is required."
     *                 },
     *                 "password": {
     *                     "The password field is required."
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
     *                 "email": {
     *                     "The email must be a valid email address."
     *                 },
     *                 "password": {
     *                     "The password must be at least 8 characters."
     *                 },
     *                 "username": {
     *                     "The username field is required."
     *                 }
     *             })
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="eleve", type="object", ref="#/components/schemas/Eleve"),
     *         )
     *     )
     * )
     */
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8',
            'username' => 'required|unique:users',
            'first_name' => 'required',
            'last_name' => 'required',
            'date_de_naissance' => 'required|date',
            'lieu_de_naissance' => 'required',
            'photo' => 'nullable|image',
            'sexe' => 'required',
            'telephone' => 'required',
            'solvable' => 'required',
            'redoublant' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Could not create this student', 
                'success' => false,
                'error' => $validator->errors()
            ], 400);
        }

        $user = User::create([
            'email' => $request->input('email'),
            'username' => $request->input('username'),
            'password' => bcrypt($request->input('password')),
        ]);

        
        $eleve = Eleve::create([
            'user_id' => $user->id,
            'solvable' => boolval($request->input('solvable')),
            'redoublant' => boolval($request->input('redoublant')),
            'first_name' => $request->input('first_name'),
            'last_name' => $request->input('last_name'),
            'date_de_naissance' => $request->input('date_de_naissance'),
            'lieu_de_naissance' => $request->input('lieu_de_naissance'),
            'photo' => $request->file('photo') ? $request->file('photo')->store($this->avatar_path) : null,
            'sexe' => $request->input('sexe'),
            'telephone' => $request->input('telephone'),
        ]);

        $eleve->user = $user;
        
        // Créer un eleve de base avec le rôle eleve
        $eleveRole = Role::where('name', 'eleve')->first();

        $user->roles()->attach($eleveRole);

        return response()->json([
            'message' => 'Eleve created successfully', 
            'success' => true,
            'data' => $eleve,
        ]);
    }

    
    /**
     * @OA\Post(
     *     path="/api/eleves/update",
     *     summary="Update a eleve's information",
     *     description="Update a eleve's information",
     *     operationId="updateEleve",
     *     tags={"eleves"},
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
     *             @OA\Property(property="email", type="string", format="email", example="maestros.roslyn@gmail.com"),
     *             @OA\Property(property="password", type="string", format="password", example="PassWord12345"),
     *             @OA\Property(property="username", type="string", example="Doe"),
     *             @OA\Property(property="first_name", type="string", example="John"),
     *             @OA\Property(property="last_name", type="string", example="Smith"),
     *             @OA\Property(property="date_de_naissance", type="string", format="date", example="1990-01-01"),
     *             @OA\Property(property="lieu_de_naissance", type="string", example="Paris"),
     *             @OA\Property(property="photo", type="string", nullable=true, example="https://example.com/photo.jpg"),
     *             @OA\Property(property="sexe", type="string", example="Male"),
     *             @OA\Property(property="telephone", type="string", nullable=true, example="+33123456789"),
     *             @OA\Property(property="solvable", type="boolean", example="true"),
     *             @OA\Property(property="redoublant", type="boolean", example="false")
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error - Invalid request data",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="object", example={
     *                 "email": {
     *                     "The email field is required."
     *                 },
     *                 "password": {
     *                     "The password field is required."
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
     *             @OA\Property(property="error", type="string", example="Eleve not found")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="eleve", type="object", ref="#/components/schemas/Eleve"),
     *         )
     *     )
     * )
     */
    public function update(Request $request)
    {
        // on récupère l'élève associé
        $eleveFound = Eleve::find($request->id);
        if($eleveFound){
            $user = User::find($eleveFound->user_id);
    
            $validator = Validator::make($request->all(), [
                'id' => 'required',
                'email' => 'required|email|unique:users,email,' . $user->id,
                'username' => 'required|unique:users',
                'first_name' => 'required',
                'last_name' => 'required',
                'date_de_naissance' => 'required|date',
                'lieu_de_naissance' => 'required',
                'photo' => 'nullable|image',
                'sexe' => 'required',
                'telephone' => 'required',
                'solvable' => 'required',
                'redoublant' => 'required',
            ]);
        }else {
            return response()->json([
                'message' => 'Student not exists', 
                'success' => false,
            ], 400);
        }

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Could not update this student', 
                'success' => false,
                'error' => $validator->errors()
            ], 400);
        }

        // Mise à jour des champs de l'objet User
        $user->email = $request->input('email');
        $user->username = $request->input('username');
        
        // Suppression de l'ancienne photo si une nouvelle a été sélectionnée
        if ($request->hasFile('photo')) {
            $oldPhoto = $eleveFound->photo;
            if ($oldPhoto) {
                Storage::delete($oldPhoto);
            }
            $eleveFound->photo = $request->file('photo')->store($this->avatar_path);
        }

        $user->save();

        // Mise à jour des champs de l'objet Eleve
        $eleveFound->first_name = $request->input('first_name');
        $eleveFound->last_name = $request->input('last_name');
        $eleveFound->date_de_naissance = $request->input('date_de_naissance');
        $eleveFound->lieu_de_naissance = $request->input('lieu_de_naissance');
        $eleveFound->sexe = $request->input('sexe');
        $eleveFound->telephone = $request->input('telephone');
        $eleveFound->solvable = boolval($request->input('solvable'));
        $eleveFound->redoublant = boolval($request->input('redoublant'));
        $eleveFound->save();

        $eleveFound = Eleve::with('user')->find($eleveFound->id);

        return response()->json([
            'message' => 'Eleve updated successfully', 
            'success' => true,
            'data' => $eleveFound
        ]);
    }

    /**
     * @OA\Delete (
     *     path="/api/eleves/delete/{id}",
     *     summary="Delete an eleve",
     *     description="Delete an eleve resource",
     *     operationId="deleteEleve",
     *     tags={"eleves"},
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
     *         description="ID of eleve to delete",
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
     *             @OA\Property(property="error", type="string", example="Eleve not found")
     *         )
     *     ),
     *     @OA\Response(
     *         response=204,
     *         description="Success",
     *     )
     * )
     */
    public function delete($eleveId)
    {
        $eleveFound = Eleve::find($eleveId);
        
        if($eleveFound){
            
            //le user associe
            $userFound = User::find($eleveFound->user_id);

            // supperssion de l'image du user
            if($userFound->photo){
                Storage::delete($userFound->photo);
            }

            //suppression de l'eleve
            $eleveFound->delete();

            return response()->json([
                'message' => 'Eleve deleted successfully',
                'success' => true, 
            ]);
        }else {
            return response()->json([
                'message' => 'Eleve to delete was not found',
                'success' => false,
            ]);
        }
    }
}
