<?php

namespace App\Http\Controllers\API;


use Illuminate\Support\Facades\Queue;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

use App\Http\Controllers\Controller;
use App\Jobs\SendEmailJob;

use App\Models\Role;
use App\Models\User;
use App\Models\Personnel;
use App\Models\Permission;

class PersonnelController extends Controller
{
    private $avatar_path = "assets/avatars/personnel";

    /**
      * @OA\Get(
      *     path="/api/personnel/findAll",
      *     summary="Get all personels",
      *     description="Retrieve a list of all personels",
      *     operationId="personelIndex",
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
      *     tags={"personnel"},
      *     security={{ "bearerAuth":{} }},
      *     @OA\Response(
      *         response=200,
      *         description="Success",
      *         @OA\JsonContent(
      *             type="object",
      *             @OA\Property(property="success", type="boolean", example=true),
      *             @OA\Property(property="message", type="string", example="Permission updated successfully"),
      *             @OA\Property(property="content", type="array", @OA\Items(ref="#/components/schemas/Personnel"))
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
        $personnel = Personnel::has('user')->with('user')->get();


        return response()->json([
            'message' => 'List of personels',
            'success' => true,
            'content' => $personnel
        ], 200);
    }

    /**
     * @OA\Get(
     *     path="/api/personnel/findOne/{id}",
     *     summary="Get personel information",
     *     description="Get information about a specific personel",
     *     operationId="viewPersonnel",
     *     tags={"personnel"},
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
     *     @OA\Parameter(
     *         name="personnelId",
     *         in="path",
     *         description="ID of the personel to get information for",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Personel found"),
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="content", type="object", ref="#/components/schemas/Personnel")
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
     *             @OA\Property(property="message", type="string", example="Personel not found"),
     *             @OA\Property(property="success", type="boolean", example="false"),
     *         )
     *     )
     * )
     */
    public function view($personnelId)
    {
        $personnel = Personnel::with('user')->find($personnelId);

        if ($personnel) {
            $personnelData = $personnel->toArray();
            $personnelData['email'] = $personnel->user->email;

            return response()->json([
                'message' => 'Personel found',
                'success' => true,
                'content' => $personnelData
            ], 200);
        } else {
            return response()->json([
                'message' => 'Personel not found',
                'success' => false,
            ], 404);
        }
    }

    /**
     * @OA\Post(
     *     path="/api/personnel/create",
     *     summary="Create a new personel",
     *     description="Create a new personel resource",
     *     operationId="createPersonnel",
     *     tags={"personnel"},
     * @OA\Parameter(
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
     *         @OA\MediaType(
     *              mediaType="multipart/form-data",
     *              @OA\Schema(
     *                  required={"email", "firstName", "lastName", "dateDeNaissance", "lieuDeNaissance", "sexe", "telephone", "fonction"},
     *                  @OA\Property(property="email", type="string", format="email", example="user1@mail.com"),
     *                  @OA\Property(property="firstName", type="string", example="John"),
     *                  @OA\Property(property="lastName", type="string", example="Smith"),
     *                  @OA\Property(property="dateDeNaissance", type="string", format="date", example="1990-01-01"),
     *                  @OA\Property(property="lieuDeNaissance", type="string", example="Paris"),
     *                  @OA\Property(property="photo", type="string", nullable=true, example="https://example.com/photo.jpg"),
     *                  @OA\Property(property="sexe", type="string", example="Male"),
     *                  @OA\Property(property="telephone", type="string", example="+33123456789"),
     *                  @OA\Property(property="fonction", type="string", example="Censeur")
     *              )
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error - Invalid request data",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Could not create this personel"),
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="error", type="object", example={
     *                 "email": { "The email field is required."},
     *                 "password": {"The password field is required."},
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
     *             @OA\Property(property="message", type="string", example="Personel created successfully"),
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="content", type="object", ref="#/components/schemas/Personnel")
     *         )
     *     )
     * )
     */
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'firstName' => 'required',
            'lastName' => 'required',
            'dateDeNaissance' => 'required|date',
            'lieuDeNaissance' => 'required',
            'email' => 'required|email|unique:users',
            // 'photo' => 'nullable|image',
            'sexe' => 'required',
            'telephone' => 'required',
            'fonction' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Could not create this personel',
                'success' => false,
                'error' => $validator->errors()
            ], 400);
        }

        $user = User::create([
            'email' => $request->input('email'),
            'username' => $request->input('email'),
            'password' => bcrypt($request->input('email')),
        ]);

        $photo = NULL;

        if ($request->hasFile('photo') && $request->file('photo')->isValid()) {
            $file = $request->file('photo');

            // Vérifiez le type MIME si nécessaire
            $allowedTypes = ['image/jpeg', 'image/png'];
            if (!in_array($file->getMimeType(), $allowedTypes)) {
                return response()->json(['error' => 'Le fichier sélectionné n\'est pas une image.'], 400);
            }

            // Déplacez le fichier vers le répertoire de stockage souhaité
            $photo = $file->store($this->avatar_path);

        }


        $personnel = Personnel::create([
            'userId' => $user->id,
            'firstName' => $request->input('firstName'),
            'lastName' => $request->input('lastName'),
            'dateDeNaissance' => $request->input('dateDeNaissance'),
            'lieuDeNaissance' => $request->input('lieuDeNaissance'),
            'photo' => $photo,
            'sexe' => $request->input('sexe'),
            'telephone' => $request->input('telephone'),
            'fonction' => $request->input('fonction'),
        ]);

        $personnel->user = $user;

            // Créer un personnel de base avec le rôle personnel
        $personnelRole = Role::where('name', 'personnel')->first();

        $user->roles()->attach($personnelRole);

        // assigner les permission
        foreach (PERSONNEL_PERMISSIONS as $permission) {
            $personnelPerm = Permission::where('name', $permission['name'])->first();
            if ($personnelPerm) {
                $user->permissions()->attach($personnelPerm);
            }
        }

        //envoie du mail a l'utilisateur
        $details = array();

        $details['greeting'] = "Hi " . $personnel->firstName;
        $details['body'] = "Veuillez Modifier votre mot de passe pour assurer la confidentialite de vos donnees et de vos actions au sein de la plateforme .
                            \n Mot de passe actuel: $user->email
                            \n Login actuel: $user->email
                            Pour cela, veuillez cliquer sur le ce lien pour proceder la la mise a jour de votre mot de passe .";
        $details['actiontext'] = "Modifier mon mot de passe";
        $details['actionurl'] = "https://react-admin-ashy-zeta.vercel.app/";
        $details['endtext'] = "Merci de rester fidele à cet etablissement";

        // envoi du mail
        Queue::push(new SendEmailJob($user, $details));


        return response()->json([
            'message' => 'Personel created successfully',
            'success' => true,
            'content' => $personnel,
        ], 201);
    }

    /**
     * @OA\Post(
     *     path="/api/personnel/update/{personnelId}",
     *     summary="Update a personel's information",
     *     description="Update a personel's information",
     *     operationId="updatePersonnel",
     *     tags={"personnel"},
     * @OA\Parameter(
     *         name="Authorization",
     *         in="header",
     *         required=true,
     *         @OA\Schema(
     *             type="string",
     *             example="Bearer {your_token}"
     *         ),
     *         description="JWT token"
     *     ),
     * @OA\Parameter(
     *         name="personnelId",
     *         in="path",
     *         description="ID of personel to update in this request",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     security={ {"bearer": {} }},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(
     *                 required={"email", "firstName", "lastName", "dateDeNaissance", "lieuDeNaissance", "sexe", "telephone", "fonction"},
     *                 @OA\Property(property="email", type="string", format="email", example="user1@mail.com"),
     *                 @OA\Property(property="firstName", type="string", example="John"),
     *                 @OA\Property(property="lastName", type="string", example="Smith"),
     *                 @OA\Property(property="dateDeNaissance", type="string", format="date", example="1990-01-01"),
     *                 @OA\Property(property="lieuDeNaissance", type="string", example="Paris"),
     *                 @OA\Property(property="photo", type="string", nullable=true, example="https://example.com/photo.jpg"),
     *                 @OA\Property(property="sexe", type="string", example="Male"),
     *                 @OA\Property(property="telephone", type="string", nullable=true, example="+33123456789"),
     *                 @OA\Property(property="fonction", type="string", example="Censeur")
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error - Invalid request data",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Personnel non trouve(e)"),
     *             @OA\Property(property="success", type="boolean", example="false"),
     *             @OA\Property(property="error", type="object", example={
     *                 "email": { "The email field is required."},
     *                 "password": {"The password field is required."},
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
     *             @OA\Property(property="message", type="string", example="Personnnel non trouve(e)"),
     *             @OA\Property(property="success", type="boolean", example="false"),
     *             @OA\Property(property="error", type="string", example="Personel not found")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Personel modifié avec succèss"),
     *             @OA\Property(property="success", type="boolean", example="true"),
     *             @OA\Property(property="content", type="object", ref="#/components/schemas/Personnel"),
     *         )
     *     )
     * )
     */
    public function update(Request $request, $id)
    {
        // on récupère le personnel associé
        $personnelFound = Personnel::find($id);
        if ($personnelFound) {
            $user = User::find($personnelFound->userId);
            $validator = Validator::make($request->all(), [
                'email' => 'required|email|unique:users,email,' . $user->id,
                'firstName' => 'required',
                'lastName' => 'required',
                'dateDeNaissance' => 'required|date',
                'lieuDeNaissance' => 'required',
                'sexe' => 'required',
                // 'photo' => 'nullable|image',
                'telephone' => 'required',
                'fonction' => 'required',
            ]);
        } else {
            return response()->json([
                'message' => 'Personel not exists',
                'success' => false,
            ], 404);
        }

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Could not update this personel',
                'success' => false,
                'error' => $validator->errors()
            ], 400);
        }

        // Mise à jour des champs de l'objet User
        $user->email = $request->input('email');
        //$user->username = $request->input('username');

        // Suppression de l'ancienne photo si une nouvelle a été sélectionnée
        if ($request->hasFile('photo')) {
            $oldPhoto = $personnelFound->photo;
            if ($oldPhoto) {
                Storage::delete($oldPhoto);
            }
            $personnelFound->photo = $request->file('photo')->store($this->avatar_path);
        }

        $user->save();

        // Mise à jour des champs de l'objet Personnel
        $personnelFound->firstName = $request->input('firstName');
        $personnelFound->lastName = $request->input('lastName');
        $personnelFound->dateDeNaissance = $request->input('dateDeNaissance');
        $personnelFound->lieuDeNaissance = $request->input('lieuDeNaissance');
        $personnelFound->sexe = $request->input('sexe');
        $personnelFound->telephone = $request->input('telephone');
        $personnelFound->fonction = $request->input('fonction');
        $personnelFound->save();

        $personnelFound->user = $user;
        $personnelFound = Personnel::with('user')->find($personnelFound->id);

        return response()->json([
            'message' => 'Personel updated successfully',
            'success' => true,
            'content' => $personnelFound
        ], 200);
    }

    /**
     * @OA\Delete (
     *     path="/api/personnel/delete/{id}",
     *     summary="Delete a personel",
     *     description="Delete a personel resource",
     *     operationId="deletePersonnel",
     *     tags={"personnel"},
     * @OA\Parameter(
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
     *         description="ID of personel to delete",
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
     *             @OA\Property(property="error", type="string", example="Personnel not found")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Personel deleted successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Personel deleted successfully")
     *          )
     *      ),
     * )
     */
    public function delete($personnelId)
    {
        $personnelFound = Personnel::find($personnelId);

        if ($personnelFound) {

            //le user associe
            $userFound = User::find($personnelFound->userId);

            // supperssion de l'image du personnel
            if ($userFound->photo) {
                Storage::delete($userFound->photo);
            }

            //suppression du personnel
            $personnelFound->delete();

            return response()->json([
                'message' => 'Personel deleted successfully',
                'success' => true,
            ], 200);
        } else {
            return response()->json([
                'message' => 'personel to delete was not found',
                'success' => false,
            ], 404);
        }
    }
}
