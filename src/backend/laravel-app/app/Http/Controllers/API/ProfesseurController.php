<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Cour;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\Professeur;
use App\Models\User;
use App\Models\Role;

class ProfesseurController extends Controller
{
    private $avatar_path = "assets/avatars/professeurs";

    //doc d'index
    /**
     * @OA\Get(
     *     path="/api/professeurs/findAll",
     *     summary="Get all professeurs",
     *     description="Retrieve a list of all professeurs",
     *     operationId="professeursIndex",
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
     *     tags={"professeurs"},
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="professeurs", type="array", @OA\Items(ref="#/components/schemas/Professeur"))
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
        $professeurs = Professeur::has('user')->with('user')->get();


        return response()->json([
            'message' => 'Liste des professeurs',
            'success' => true,
            'data' => $professeurs
        ]);
    }

    /**
     * @OA\Get(
     *     path="/api/professeurs/findOne/{id}",
     *     summary="Get professeur information",
     *     description="Get information about a specific professor",
     *     operationId="viewProfesseur",
     *     tags={"professeurs"},
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
     *         description="ID of professeur to get information for",
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
     *             @OA\Property(property="error", type="string", example="Professeur not found")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Professeur trouvé(e)"),
     *             @OA\Property(property="success", type="boolean", example="true"),
     *             @OA\Property(property="data", type="object", ref="#/components/schemas/Professeur")
     *         )
     *     )
     * )
     */
    public function view($professeurId)
    {
        $professeur = Professeur::with('user')->find($professeurId);

        if ($professeur) {
            $professeurIdData = $professeur->toArray();
            $professeurIdData['email'] = $professeur->user->email;

            return response()->json([
                'message' => 'professeur trouvé(e)',
                'success' => true,
                'data' => $professeurIdData
            ], 200);
        } else {
            return response()->json([
                'message' => 'professeur non trouvé',
                'success' => false,
            ], 404);
        }
    }

    /**
     * @OA\Post(
     *     path="/api/professeurs/create",
     *     summary="Create a new professeur",
     *     description="Create a new professeur resource",
     *     operationId="createProfesseur",
     *     tags={"professeurs"},
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
     *             @OA\Property(property="statut", type="string", example="censeur"),
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
     *             @OA\Property(property="professeur", type="object", ref="#/components/schemas/Professeur"),
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
            'statut' => 'required',
            'cour_id' => 'required',

        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Could not create this professor',
                'success' => false,
                'error' => $validator->errors()
            ], 400);
        }

        $user = User::create([
            'email' => $request->input('email'),
            'username' => $request->input('username'),
            'password' => bcrypt($request->input('password')),
        ]);




        $professeur = Professeur::create([
            'cour_id' => $request->input('cour_id'),
            'user_id' => $user->id,
            'statut' => $request->input('statut'),
            'first_name' => $request->input('first_name'),
            'last_name' => $request->input('last_name'),
            'date_de_naissance' => $request->input('date_de_naissance'),
            'lieu_de_naissance' => $request->input('lieu_de_naissance'),
            'photo' => $request->file('photo') ? $request->file('photo')->store($this->avatar_path) : null,
            'sexe' => $request->input('sexe'),
            'telephone' => $request->input('telephone'),
        ]);

        $professeur->user = $user;
        $professeur->cours = Cour::with('professeur')->find($professeur->id);

        return response()->json([
            'message' => 'Professor created successfully',
            'success' => true,
            'data' => $professeur
        ]);

        // Créer un professeur de base avec le rôle professeur
        $professeurRole = Role::where('name', 'professeur')->first();

        $user->roles()->attach($professeurRole);


        return response()->json([
            'message' => 'professor created successfully',
            'success' => true,
            'data' => $professeur
        ]);
    }


    /**
     * @OA\Post(
     *     path="/api/professeurs/update",
     *     summary="Update a professeur's information",
     *     description="Update a professeur's information",
     *     operationId="updateProfesseur",
     *     tags={"professeurs"},
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
     *             @OA\Property(property="statut", type="string", example="Censeur"),
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
     *             @OA\Property(property="error", type="string", example="Professor not found")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="eleve", type="object", ref="#/components/schemas/Professeur"),
     *         )
     *     )
     * )
     */

    public function update(Request $request)
    {

        // on récupère le professeur associé
        $professeurFound = Professeur::find($request->id);
        if ($professeurFound) {
            $user = User::find($professeurFound->user_id);

            $validator = Validator::make($request->all(), [
                'id' => 'required',
                'email' => 'required|email|unique:users,email,' . $user->id,

                'first_name' => 'required',
                'last_name' => 'required',
                'date_de_naissance' => 'required|date',
                'lieu_de_naissance' => 'required',
                'photo' => 'nullable|image',
                'sexe' => 'required',
                'telephone' => 'required',
                'statut' => 'required',
            ]);
        } else {
            return response()->json([
                'message' => 'Teacher not exists',
                'success' => false,
            ], 400);
        }

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Could not update this teacher',
                'success' => false,
                'error' => $validator->errors()
            ], 400);
        }

        // Mise à jour des champs de l'objet User
        $user->email = $request->input('email');
        // $user->password = $user->password;

        // Suppression de l'ancienne photo si une nouvelle a été sélectionnée
        if ($request->hasFile('photo')) {
            $oldPhoto = $professeurFound->photo;
            if ($oldPhoto) {
                Storage::delete($oldPhoto);
            }
            $professeurFound->photo = $request->file('photo')->store($this->avatar_path);
        }

        $user->save();

        // Mise à jour des champs de l'objet Professeur

        $professeurFound->first_name = $request->input('first_name');
        $professeurFound->last_name = $request->input('last_name');
        $professeurFound->date_de_naissance = $request->input('date_de_naissance');
        $professeurFound->lieu_de_naissance = $request->input('lieu_de_naissance');
        $professeurFound->sexe = $request->input('sexe');
        $professeurFound->telephone = $request->input('telephone');
        $professeurFound->statut =  $request->input('statut');
        $professeurFound->save();

        $professeurFound = Professeur::with('user')->find($professeurFound->id);

        return response()->json([
            'message' => 'Professeur updated successfully',
            'success' => true,
            'data' => $professeurFound
        ]);
    }


    /**
     * @OA\Delete (
     *     path="/api/professeurs/delete/{id}",
     *     summary="Delete an professor",
     *     description="Delete an professor resource",
     *     operationId="deleteProfesseur",
     *     tags={"professeurs"},
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
     *         description="ID of professor to delete",
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
     *             @OA\Property(property="error", type="string", example="Professor not found")
     *         )
     *     ),
     *     @OA\Response(
     *         response=204,
     *         description="Success",
     *     )
     * )
     */

    public function delete($professeurId)
    {
        $professeurFound = Professeur::find($professeurId);

        if ($professeurFound) {

            //le user associe
            $userFound = User::find($professeurFound->user_id);

            // supperssion de l'image du user
            if ($userFound->photo) {
                Storage::delete($userFound->photo);
            }

            //suppression du professeur
            $professeurFound->delete();

            return response()->json([
                'message' => 'professeur deleted successfully',
                'success' => true,
            ]);
        } else {
            return response()->json([
                'message' => 'professeur to delete was not found',
                'success' => false,
            ]);
        }
    }
}
