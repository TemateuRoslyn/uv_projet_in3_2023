<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

use Illuminate\Http\Request;

use App\Models\Role;
use App\Models\User;
use App\Models\Personnel;

class PersonnelController extends Controller
{
    private $avatar_path = "assets/avatars/personnel";

<<<<<<< HEAD
    // /**
    //  * @OA\Get(
    //  *     path="/api/personnel/findAll",
    //  *     summary="Get all personnel",
    //  *     description="Retrieve a list of all personnel",
    //  *     operationId="personelIndex",
    //  *     tags={"personnel"},
    //  *     @OA\Response(
    //  *         response=200,
    //  *         description="Success",
    //  *         @OA\JsonContent(
    //  *             @OA\Property(property="data", type="array", @OA\Items(ref="#/components/schemas/Personnel"))
    //  *         )
    //  *     ),
    //  *     @OA\Response(
    //  *         response=401,
    //  *         description="Error - Unauthorized",
    //  *         @OA\JsonContent(
    //  *             @OA\Property(property="error", type="string", example="Unauthorized")
    //  *         )
    //  *     )
    //  * )
    //  */
    // public function showAll()
    // {
    //     $personnel = Personnel::has('user')->with('user')->get();
=======
    /**
     * @OA\Get(
     *     path="/api/personnel/findAll",
     *     summary="Get all personnel",
     *     description="Retrieve a list of all personnel",
     *     operationId="personelIndex",
     *     tags={"personnel"},
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="data", type="array", @OA\Items(ref="#/components/schemas/Personnel"))
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
        $personnel = Personnel::has('user')->with('user')->get();
>>>>>>> fdf79b6 (Closes #110 #111 Creation du controleur et Seeder, definition des routes et documentation pour les enites ReglementInterieur et Regle)


    //     return response()->json([
    //         'message' => 'List of personels',
    //         'success' => true,
    //         'data' => $personnel
    //     ]);
    // }

<<<<<<< HEAD
    // /**
    //  * @OA\Get(
    //  *     path="/api/personnel/findOne/{personnelId}",
    //  *     summary="Get personnel information",
    //  *     description="Get information about a specific personnel",
    //  *     operationId="viewPersonnel",
    //  *     tags={"personnel"},
    //  *     @OA\Parameter(
    //  *         name="personnelId",
    //  *         in="path",
    //  *         description="ID of the personnnel to get information for",
    //  *         required=true,
    //  *         @OA\Schema(
    //  *             type="integer"
    //  *         )
    //  *     ),
    //  *     @OA\Response(
    //  *         response=200,
    //  *         description="Success",
    //  *         @OA\JsonContent(
    //  *             @OA\Property(property="message", type="string", example="Personnel trouvé"),
    //  *             @OA\Property(property="success", type="boolean", example=true),
    //  *             @OA\Property(property="data", type="object", ref="#/components/schemas/Personnel")
    //  *         )
    //  *     ),
    //  *     @OA\Response(
    //  *         response=404,
    //  *         description="Error - Not found",
    //  *         @OA\JsonContent(
    //  *             @OA\Property(property="error", type="string", example="Personnel non trouvé"),
    //  *         )
    //  *     )
    //  * )
    //  */
    // public function showIndex($personnelId)
    // {
    //     $personnel = Personnel::with('user')->find($personnelId);
=======
    /**
     * @OA\Get(
     *     path="/api/personnel/findOne/{personnelId}",
     *     summary="Get personnel information",
     *     description="Get information about a specific personnel",
     *     operationId="viewPersonnel",
     *     tags={"personnel"},
     *     @OA\Parameter(
     *         name="personnelId",
     *         in="path",
     *         description="ID of the personnnel to get information for",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Personnel trouvé"),
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="data", type="object", ref="#/components/schemas/Personnel")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Error - Not found",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string", example="Personnel non trouvé"),
     *         )
     *     )
     * )
     */
    public function showIndex($personnelId)
    {
        $personnel = Personnel::with('user')->find($personnelId);
>>>>>>> fdf79b6 (Closes #110 #111 Creation du controleur et Seeder, definition des routes et documentation pour les enites ReglementInterieur et Regle)

    //     if ($personnel) {
    //         $personnelData = $personnel->toArray();
    //         $personnelData['email'] = $personnel->user->email;

    //         return response()->json([
    //             'message' => 'Personnel trouvé',
    //             'success' => true,
    //             'data' => $personnelData
    //         ], 200);
    //     } else {
    //         return response()->json([
    //             'message' => 'Personnel non trouvé',
    //             'success' => false,
    //         ], 404);
    //     }
    // }

<<<<<<< HEAD
    // /**
    //  * @OA\Post(
    //  *     path="/api/personnel/create",
    //  *     summary="Create a new personnel",
    //  *     description="Create a new personnel resource",
    //  *     operationId="createPersonnel",
    //  *     tags={"personnel"},
    //  *     security={{"bearer": {}}},
    //  *     @OA\RequestBody(
    //  *         required=true,
    //  *         @OA\JsonContent(
    //  *             required={"email", "password", "username", "first_name", "last_name", "date_de_naissance", "lieu_de_naissance", "sexe", "telephone", "fonction"},
    //  *             @OA\Property(property="email", type="string", format="email", example="user1@mail.com"),
    //  *             @OA\Property(property="password", type="string", format="password", example="PassWord12345"),
    //  *             @OA\Property(property="username", type="string", example="Doe"),
    //  *             @OA\Property(property="first_name", type="string", example="John"),
    //  *             @OA\Property(property="last_name", type="string", example="Smith"),
    //  *             @OA\Property(property="date_de_naissance", type="string", format="date", example="1990-01-01"),
    //  *             @OA\Property(property="lieu_de_naissance", type="string", example="Paris"),
    //  *             @OA\Property(property="photo", type="string", nullable=true, example="https://example.com/photo.jpg"),
    //  *             @OA\Property(property="sexe", type="string", example="Male"),
    //  *             @OA\Property(property="telephone", type="string", example="+33123456789"),
    //  *             @OA\Property(property="fonction", type="string", example="Censeur")
    //  *         )
    //  *     ),
    //  *     @OA\Response(
    //  *         response=400,
    //  *         description="Error - Invalid request data",
    //  *         @OA\JsonContent(
    //  *             @OA\Property(property="message", type="string", example="Could not create this personnel"),
    //  *             @OA\Property(property="success", type="boolean", example=false),
    //  *             @OA\Property(property="error", type="object", example={
    //  *                 "email": { "The email field is required."},
    //  *                 "password": {"The password field is required."},
    //  *                 "username": {"The username field is required."},
    //  *                 "first_name": {"The first name field is required."},
    //  *                 "last_name": {"The last name field is required."},
    //  *                 "date_de_naissance": {"The date de naissance field is required."},
    //  *                 "lieu_de_naissance": {"The lieu de naissance field is required."},
    //  *                 "sexe": {"The sexe field is required."},
    //  *                 "telephone": {"The telephone field is required."},
    //  *                 "fonction": {"The fonction field is required."}
    //  *             })
    //  *         )
    //  *     ),
    //  *     @OA\Response(
    //  *         response=401,
    //  *         description="Error - Unauthorized",
    //  *         @OA\JsonContent(
    //  *             @OA\Property(property="error", type="string", example="Unauthorized")
    //  *         )
    //  *     ),
    //  *     @OA\Response(
    //  *         response=201,
    //  *         description="Success",
    //  *         @OA\JsonContent(
    //  *             @OA\Property(property="message", type="string", example="Personnel created successfully"),
    //  *             @OA\Property(property="success", type="boolean", example=true),
    //  *             @OA\Property(property="data", type="object", ref="#/components/schemas/Personnel")
    //  *         )
    //  *     )
    //  * )
    //  */
    // public function store(Request $request)
    // {
=======
    /**
     * @OA\Post(
     *     path="/api/personnel/create",
     *     summary="Create a new personnel",
     *     description="Create a new personnel resource",
     *     operationId="createPersonnel",
     *     tags={"personnel"},
     *     security={{"bearer": {}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"email", "password", "username", "first_name", "last_name", "date_de_naissance", "lieu_de_naissance", "sexe", "telephone", "fonction"},
     *             @OA\Property(property="email", type="string", format="email", example="user1@mail.com"),
     *             @OA\Property(property="password", type="string", format="password", example="PassWord12345"),
     *             @OA\Property(property="username", type="string", example="Doe"),
     *             @OA\Property(property="first_name", type="string", example="John"),
     *             @OA\Property(property="last_name", type="string", example="Smith"),
     *             @OA\Property(property="date_de_naissance", type="string", format="date", example="1990-01-01"),
     *             @OA\Property(property="lieu_de_naissance", type="string", example="Paris"),
     *             @OA\Property(property="photo", type="string", nullable=true, example="https://example.com/photo.jpg"),
     *             @OA\Property(property="sexe", type="string", example="Male"),
     *             @OA\Property(property="telephone", type="string", example="+33123456789"),
     *             @OA\Property(property="fonction", type="string", example="Censeur")
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error - Invalid request data",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Could not create this personnel"),
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="error", type="object", example={
     *                 "email": { "The email field is required."},
     *                 "password": {"The password field is required."},
     *                 "username": {"The username field is required."},
     *                 "first_name": {"The first name field is required."},
     *                 "last_name": {"The last name field is required."},
     *                 "date_de_naissance": {"The date de naissance field is required."},
     *                 "lieu_de_naissance": {"The lieu de naissance field is required."},
     *                 "sexe": {"The sexe field is required."},
     *                 "telephone": {"The telephone field is required."},
     *                 "fonction": {"The fonction field is required."}
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
     *             @OA\Property(property="message", type="string", example="Personnel created successfully"),
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="data", type="object", ref="#/components/schemas/Personnel")
     *         )
     *     )
     * )
     */
    public function store(Request $request)
    {
>>>>>>> fdf79b6 (Closes #110 #111 Creation du controleur et Seeder, definition des routes et documentation pour les enites ReglementInterieur et Regle)

    //     $validator = Validator::make($request->all(), [
    //         'email' => 'required|email|unique:users',
    //         'password' => 'required|min:8',
    //         'username' => 'required|unique:users',
    //         'first_name' => 'required',
    //         'last_name' => 'required',
    //         'date_de_naissance' => 'required|date',
    //         'lieu_de_naissance' => 'required',
    //         'photo' => 'nullable|image',
    //         'sexe' => 'required',
    //         'telephone' => 'required',
    //         'fonction' => 'required',
    //     ]);

    //     if ($validator->fails()) {
    //         return response()->json([
    //             'message' => 'Could not create this personel',
    //             'success' => false,
    //             'error' => $validator->errors()
    //         ], 400);
    //     }

    //     $user = User::create([
    //         'email' => $request->input('email'),
    //         'username' => $request->input('username'),
    //         'password' => bcrypt($request->input('password')),
    //     ]);


    //     $personnel = Personnel::create([
    //         'user_id' => $user->id,
    //         'fonction' => $request->input('fonction'),
    //         'first_name' => $request->input('first_name'),
    //         'last_name' => $request->input('last_name'),
    //         'date_de_naissance' => $request->input('date_de_naissance'),
    //         'lieu_de_naissance' => $request->input('lieu_de_naissance'),
    //         'photo' => $request->file('photo') ? $request->file('photo')->store($this->avatar_path) : null,
    //         'sexe' => $request->input('sexe'),
    //         'telephone' => $request->input('telephone'),
    //     ]);

    //     $personnel->user = $user;

    //     return response()->json([
    //         'message' => 'Personel created successfully',
    //         'success' => true,
    //         'data' => $personnel
    //     ]);

    //         // Créer un personnel de base avec le rôle personnel
    //     $personnelRole = Role::where('username', 'personnel')->first();

    //     $user->roles()->attach($personnelRole);


    //     return response()->json([
    //         'message' => 'Personel created successfully',
    //         'success' => true,
    //         'data' => $personnel
    //     ]);
    // }

<<<<<<< HEAD
    // /**
    //  * @OA\Post(
    //  *     path="/api/personnel/update",
    //  *     summary="Update a personnel's information",
    //  *     description="Update a personnel's information",
    //  *     operationId="updatePersonnel",
    //  *     tags={"personnel"},
    //  *     security={ {"bearer": {} }},
    //  *     @OA\RequestBody(
    //  *         required=true,
    //  *         @OA\JsonContent(
    //  *             @OA\Property(property="id", type="integer", example=1),
    //  *             @OA\Property(property="email", type="string", format="email", example="user1@mail.com"),
    //  *             @OA\Property(property="username", type="string", example="Doe"),
    //  *             @OA\Property(property="first_name", type="string", example="John"),
    //  *             @OA\Property(property="last_name", type="string", example="Smith"),
    //  *             @OA\Property(property="date_de_naissance", type="string", format="date", example="1990-01-01"),
    //  *             @OA\Property(property="lieu_de_naissance", type="string", example="Paris"),
    //  *             @OA\Property(property="photo", type="string", nullable=true, example="https://example.com/photo.jpg"),
    //  *             @OA\Property(property="sexe", type="string", example="Male"),
    //  *             @OA\Property(property="telephone", type="string", nullable=true, example="+33123456789"),
    //  *             @OA\Property(property="fonction", type="string", example="Censeur")
    //  *         )
    //  *     ),
    //  *     @OA\Response(
    //  *         response=400,
    //  *         description="Error - Invalid request data",
    //  *         @OA\JsonContent(
    //  *             @OA\Property(property="error", type="object", example={
    //  *                 "email": { "The email field is required."},
    //  *                 "password": {"The password field is required."},
    //  *                 "username": {"The username field is required."},
    //  *                 "first_name": {"The first name field is required."},
    //  *                 "last_name": {"The last name field is required."},
    //  *                 "date_de_naissance": {"The date de naissance field is required."},
    //  *                 "lieu_de_naissance": {"The lieu de naissance field is required."},
    //  *                 "sexe": {"The sexe field is required."},
    //  *                 "telephone": {"The telephone field is required."},
    //  *                 "fonction": {"The fonction field is required."},
    //  *             })
    //  *         )
    //  *     ),
    //  *     @OA\Response(
    //  *         response=401,
    //  *         description="Error - Unauthorized",
    //  *         @OA\JsonContent(
    //  *             @OA\Property(property="error", type="string", example="Unauthorized")
    //  *         )
    //  *     ),
    //  *     @OA\Response(
    //  *         response=404,
    //  *         description="Error - Not found",
    //  *         @OA\JsonContent(
    //  *             @OA\Property(property="error", type="string", example="Personnel not found")
    //  *         )
    //  *     ),
    //  *     @OA\Response(
    //  *         response=200,
    //  *         description="Success",
    //  *         @OA\JsonContent(
    //  *             @OA\Property(property="personnel", type="object", ref="#/components/schemas/Personnel"),
    //  *         )
    //  *     )
    //  * )
    //  */
    // public function update(Request $request)
    // {
    //     // on récupère le personnel associé
    //     $personnelFound = Personnel::find($request->id);
    //     if ($personnelFound) {
    //         $user = User::find($personnelFound->user_id);
=======
    /**
     * @OA\Post(
     *     path="/api/personnel/update",
     *     summary="Update a personnel's information",
     *     description="Update a personnel's information",
     *     operationId="updatePersonnel",
     *     tags={"personnel"},
     *     security={ {"bearer": {} }},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="id", type="integer", example=1),
     *             @OA\Property(property="email", type="string", format="email", example="user1@mail.com"),
     *             @OA\Property(property="username", type="string", example="Doe"),
     *             @OA\Property(property="first_name", type="string", example="John"),
     *             @OA\Property(property="last_name", type="string", example="Smith"),
     *             @OA\Property(property="date_de_naissance", type="string", format="date", example="1990-01-01"),
     *             @OA\Property(property="lieu_de_naissance", type="string", example="Paris"),
     *             @OA\Property(property="photo", type="string", nullable=true, example="https://example.com/photo.jpg"),
     *             @OA\Property(property="sexe", type="string", example="Male"),
     *             @OA\Property(property="telephone", type="string", nullable=true, example="+33123456789"),
     *             @OA\Property(property="fonction", type="string", example="Censeur")
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error - Invalid request data",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="object", example={
     *                 "email": { "The email field is required."},
     *                 "password": {"The password field is required."},
     *                 "username": {"The username field is required."},
     *                 "first_name": {"The first name field is required."},
     *                 "last_name": {"The last name field is required."},
     *                 "date_de_naissance": {"The date de naissance field is required."},
     *                 "lieu_de_naissance": {"The lieu de naissance field is required."},
     *                 "sexe": {"The sexe field is required."},
     *                 "telephone": {"The telephone field is required."},
     *                 "fonction": {"The fonction field is required."},
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
     *             @OA\Property(property="error", type="string", example="Personnel not found")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="personnel", type="object", ref="#/components/schemas/Personnel"),
     *         )
     *     )
     * )
     */
    public function update(Request $request)
    {
        // on récupère le personnel associé
        $personnelFound = Personnel::find($request->id);
        if ($personnelFound) {
            $user = User::find($personnelFound->user_id);
>>>>>>> fdf79b6 (Closes #110 #111 Creation du controleur et Seeder, definition des routes et documentation pour les enites ReglementInterieur et Regle)

    //         $validator = Validator::make($request->all(), [
    //             'id' => 'required',
    //             'email' => 'required|email|unique:users,email,' . $user->id,
    //             'username' => 'required|unique:users',
    //             'first_name' => 'required',
    //             'last_name' => 'required',
    //             'date_de_naissance' => 'required|date',
    //             'lieu_de_naissance' => 'required',
    //             'photo' => 'nullable|image',
    //             'sexe' => 'required',
    //             'telephone' => 'required',
    //             'fonction' => 'required',
    //         ]);
    //     } else {
    //         return response()->json([
    //             'message' => 'Personel not exists',
    //             'success' => false,
    //         ], 400);
    //     }

    //     if ($validator->fails()) {
    //         return response()->json([
    //             'message' => 'Could not update this personel',
    //             'success' => false,
    //             'error' => $validator->errors()
    //         ], 400);
    //     }

    //     // Mise à jour des champs de l'objet User
    //     $user->email = $request->input('email');
    //     $user->username = $request->input('username');

    //     // Suppression de l'ancienne photo si une nouvelle a été sélectionnée
    //     if ($request->hasFile('photo')) {
    //         $oldPhoto = $personnelFound->photo;
    //         if ($oldPhoto) {
    //             Storage::delete($oldPhoto);
    //         }
    //         $personnelFound->photo = $request->file('photo')->store($this->avatar_path);
    //     }

    //     $user->save();

    //     // Mise à jour des champs de l'objet Personnel
    //     $personnelFound->first_name = $request->input('first_name');
    //     $personnelFound->last_name = $request->input('last_name');
    //     $personnelFound->date_de_naissance = $request->input('date_de_naissance');
    //     $personnelFound->lieu_de_naissance = $request->input('lieu_de_naissance');
    //     $personnelFound->sexe = $request->input('sexe');
    //     $personnelFound->telephone = $request->input('telephone');
    //     $personnelFound->fonction = $request->input('fonction');
    //     $personnelFound->save();

    //     $personnelFound = Personnel::with('user')->find($personnelFound->id);

    //     return response()->json([
    //         'message' => 'Personel updated successfully',
    //         'success' => true,
    //         'data' => $personnelFound
    //     ]);
    // }

    // /**
    //  * @OA\Delete (
    //  *     path="/api/personnel/delete/{id}",
    //  *     summary="Delete a personnel",
    //  *     description="Delete a personnel resource",
    //  *     operationId="deletePersonnel",
    //  *     tags={"personnel"},
    //  *     security={ {"bearer": {} }},
    //  *     @OA\Parameter(
    //  *         name="id",
    //  *         in="path",
    //  *         description="ID of personnel to delete",
    //  *         required=true,
    //  *         @OA\Schema(
    //  *             type="integer"
    //  *         )
    //  *     ),
    //  *
    //  *     @OA\Response(
    //  *         response=401,
    //  *         description="Error - Unauthorized",
    //  *         @OA\JsonContent(
    //  *             @OA\Property(property="error", type="string", example="Unauthorized")
    //  *         )
    //  *     ),
    //  *     @OA\Response(
    //  *         response=404,
    //  *         description="Error - Not found",
    //  *         @OA\JsonContent(
    //  *             @OA\Property(property="error", type="string", example="Personnel not found")
    //  *         )
    //  *     ),
    //  *     @OA\Response(
    //  *         response=204,
    //  *         description="Success",
    //  *     )
    //  * )
    //  */
    // public function delete($personnelId)
    // {
    //     $personnelFound = Personnel::find($personnelId);

    //     if ($personnelFound) {

    //         // supperssion de l'image du personnel
    //         if ($personnelFound->photo) {
    //             Storage::delete($personnelFound->photo);
    //         }

    //         //suppression du personnel
    //         $personnelFound->delete();

    //         return response()->json([
    //             'message' => 'Personel deleted successfully',
    //             'success' => true,
    //         ]);
    //     } else {
    //         return response()->json([
    //             'message' => 'personnel to delete was not found',
    //             'success' => false,
    //         ]);
    //     }
    // }
}
