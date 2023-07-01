<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Classe;
use App\Models\Cour;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\Professeur;
use App\Models\User;
use App\Models\Permission;
use App\Models\ClasseProfesseur;
use App\Models\Role;

class ProfesseurController extends Controller
{
    private $avatar_path = "assets/avatars/professeurs";

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
     *              @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Liste des professeurs"),
     *             @OA\Property(property="content", type="array", @OA\Items(ref="#/components/schemas/Professeur"))
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
        $professeurs = Professeur::with('user', 'cour', 'classes')->get();

        return response()->json([
            'message' => 'Liste des professeurs',
            'success' => true,
            'content' => $professeurs
        ]);
    }

/**
     * @OA\Get(
     *     path="/api/professeurs/findOne/{id}",
     *     summary="Get professeur information",
     *     description="Get information about a specific professeur",
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
     *             @OA\Property(property="message", type="string", example="professeur not found"),
     *             @OA\Property(property="success", type="boolean", example="false"),
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="professeur trouvé(e)"),
     *             @OA\Property(property="success", type="boolean", example="true"),
     *             @OA\Property(property="content", type="object", ref="#/components/schemas/Professeur")
     *         )
     *     )
     * )
     */
    public function view($professeurId)
    {
        $professeur = Professeur::with('user')
                                ->has('cour')->with('cour')
                                ->has('classes')->with('classes')
                                ->find($professeurId);

        if ($professeur) {
            $professeurIdData = $professeur->toArray();
            $professeurIdData['email'] = $professeur->user->email;

            return response()->json([
                'message' => 'professeur trouvé(e)',
                'success' => true,
                'content' => $professeurIdData
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
     *     summary="Create a new professorr",
     *     description="Create a new professor resource",
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
     *             required={"firstName", "lastName", "dateDeNaissance", "lieuDeNaissance", "sexe", "telephone", "statut", "courId","classesId","email"},
     *             @OA\Property(property="email", type="string", format="email", example="maestros.roslyn@gmail.com"),
     *             @OA\Property(property="firstName", type="string", example="John"),
     *             @OA\Property(property="lastName", type="string", example="Smith"),
     *             @OA\Property(property="dateDeNaissance", type="string", format="date", example="1990-01-01"),
     *             @OA\Property(property="lieuDeNaissance", type="string", example="Paris"),
     *                 @OA\Property(property="photo", type="string", format="binary", nullable=true),
     *             @OA\Property(property="sexe", type="string", example="Male"),
     *             @OA\Property(property="telephone", type="string", nullable=true, example="+33123456789"),
     *             @OA\Property(property="statut", type="string", example="censeur"),
     *              @OA\Property(property="courId", type="integer", example=2),
     *              @OA\Property(property="classesId", type="array", example="[1,2]", @OA\Items(type="integer")),
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
     *                 "classesId": {
     *                     "The classesId field is required."
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
     *                 "firstName": {
     *                     "The firstName must be at least 8 characters."
     *                 },
     *                 "lastName": {
     *                     "The lastName field is required."
     *                 }
     *             })
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Success",
     *         @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="professeur créé(e)"),
     *             @OA\Property(property="success", type="boolean", example="true"),
     *             @OA\Property(property="content", type="object", ref="#/components/schemas/Professeur"),
     *         )
     *     )
     * )
     */
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'email' => 'required|email|unique:users',
            'firstName' => 'required',
            'lastName' => 'required',
            'dateDeNaissance' => 'required|date',
            'lieuDeNaissance' => 'required',
            'photo' => 'nullable|image',
            'sexe' => 'required',
            'telephone' => 'required',
            'statut' => 'required',
            'courId' => 'required',
            'classesId' => 'required|array',


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

        $professeur = Professeur::create([
            'courId' => $request->input('courId'),
            'userId' => $user->id,
            'statut' => $request->input('statut'),
            'firstName' => $request->input('firstName'),
            'lastName' => $request->input('lastName'),
            'dateDeNaissance' => $request->input('dateDeNaissance'),
            'lieuDeNaissance' => $request->input('lieuDeNaissance'),
            'photo' => $photo,
            'sexe' => $request->input('sexe'),
            'telephone' => $request->input('telephone'),
        ]);

        foreach ($request->classesId as $classeId) {
            ClasseProfesseur::create([
                'professeurId' => $professeur->id,
                'classeId' => $classeId
            ]);
        }

        $professeur->load('classes');
        $professeur->user = $user;
        $professeur->cours = Cour::find($professeur->courId);

        // Créer un professeur de base avec le rôle professeur
        $professeurRole = Role::where('name', 'professeur')->first();

        $user->roles()->attach($professeurRole);
          // assigner les permission
          foreach (PROFESSEUR_PERMISSIONS as $permission) {
            $professeurPerm = Permission::where('name', $permission['name'])->first();
            if ($professeurPerm) {
                $user->permissions()->attach($professeurPerm);
            }
        }


        return response()->json([
            'message' => 'professor created successfully',
            'success' => true,
            'content' => $professeur
        ]);
    }


    /**
     * @OA\Post(
     *     path="/api/professeurs/update/{professeurId}",
     *     summary="Update a professeur's information",
     *     description="Update a professeur's information",
     *     operationId="updateProfesseur",
     *     tags={"professeurs"},
     *      @OA\Parameter(
     *         name="professeurId",
     *         in="path",
     *         description="ID of professeur to update in this request",
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
     *      @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(
     *                 required={"firstName", "lastName", "dateDeNaissance", "lieuDeNaissance", "sexe", "telephone", "statut", "courId","classesId","email"},
     *             @OA\Property(property="email", type="string", format="email", example="maestros.roslyn@gmail.com"),
     *             @OA\Property(property="firstName", type="string", example="John"),
     *             @OA\Property(property="lastName", type="string", example="Smith"),
     *             @OA\Property(property="dateDeNaissance", type="string", format="date", example="1990-01-01"),
     *             @OA\Property(property="lieuDeNaissance", type="string", example="Paris"),
     *                 @OA\Property(property="photo", type="string", format="binary", nullable=true),
     *             @OA\Property(property="sexe", type="string", example="Male"),
     *             @OA\Property(property="telephone", type="string", nullable=true, example="+33123456789"),
     *             @OA\Property(property="statut", type="string", example="censeur"),
     *              @OA\Property(property="courId", type="integer", example=2),
     *              @OA\Property(property="classesId", type="array", example="[1,2]", @OA\Items(type="integer")),
     *
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error - Invalid request data",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="The given data are invalid"),
     *             @OA\Property(property="success", type="boolean", example="false"),
     *             @OA\Property(property="error", type="object", example={
     *                 "sexe": {
     *                     "The sexe field is required."
     *                 },
     *                 "statut": {
     *                     "The statut field is required."
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
     *             @OA\Property(property="message", type="string", example="professeur not found"),
     *             @OA\Property(property="success", type="boolean", example="false"),
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="professeur modifié avec succèss"),
     *             @OA\Property(property="success", type="boolean", example="true"),
     *             @OA\Property(property="content", type="object", ref="#/components/schemas/Professeur"),
     *         )
     *     )
     * )
     */

    public function update(Request $request, $id)
    {

        // on récupère le professeur associé
        $professeurFound = Professeur::find($id);
        if ($professeurFound) {
            $user = User::find($professeurFound->userId);

            $validator = Validator::make($request->all(), [
                'email' => 'required|email|unique:users,email,' . $user->id,
                'firstName' => 'required',
                'lastName' => 'required',
                'dateDeNaissance' => 'required|date',
                'lieuDeNaissance' => 'required',
                'photo' => 'nullable|image',
                'sexe' => 'required',
                'telephone' => 'required',
                'statut' => 'required',
               'courId' => 'required',
               'classesId' => 'required|array'
            ]);
        } else {
            return response()->json([
                'message' => 'Teacher not exists',
                'success' => false,
            ], 404);
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

        $professeurFound->firstName = $request->input('firstName');
        $professeurFound->lastName = $request->input('lastName');
        $professeurFound->dateDeNaissance = $request->input('dateDeNaissance');
        $professeurFound->lieuDeNaissance = $request->input('lieuDeNaissance');
        $professeurFound->sexe = $request->input('sexe');
        $professeurFound->telephone = $request->input('telephone');
        $professeurFound->statut =  $request->input('statut');

          // update de cour de professeur...

        // si il change de cour
        $cour = Cour::find($request->courId);

        if($cour && $professeurFound->courId != $request->courId){

            // update de l'ancienne cour
            $oldCour = Cour::find($professeurFound->courId);
            $oldCour->update([
                'libelle' => $oldCour->libelle,
                'date_cour' => $oldCour->date_cour,
                'heure_debut' => $oldCour->heure_debut,
                'heure_fin' => $oldCour->heure_fin,

            ]);

            // update de la nouvelle classe
            $cour->update([
                'libelle' => $cour->libelle,
                'date_cour' => $cour->date_cour,
                'heure_debut' => $cour->heure_debut,
                'heure_fin' => $cour->heure_fin,
            ]);

        }


        $professeurFound->courId = $request->input('courId');
        $professeurFound->save();

        $professeurFound->user = $user;
        $professeurFound->cour = $cour;
        ClasseProfesseur::where('professeurId', $professeurFound->id)->delete();
        foreach ($request->classesId as $classeId) {
            ClasseProfesseur::create([
                'professeurId' => $professeurFound->id,
                'classeId' => $classeId
            ]);
        }

        $professeurFound->load('classes');
        //$professeurFound = Professeur::with('user')->find($professeurFound->id);

        return response()->json([
            'message' => 'Professeur updated successfully',
            'success' => true,
            'content' => $professeurFound
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
     *    @OA\Response(
     *         response=200,
     *         description="Permission deleted successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="professeur deleted successfully")
     *         )
     *     ),
     * )
     */

    public function delete($professeurId)
    {
        $professeurFound = Professeur::find($professeurId);

        if ($professeurFound) {

            //le user associe
            $userFound = User::find($professeurFound->userId);

            // suppresion de l'image du user
            if ($userFound->photo) {
                Storage::delete($userFound->photo);
            }

            //suppression du professeur
            $professeurFound->classes()->detach();
            ClasseProfesseur::where('professeurId', $professeurFound->id)->delete();
            $professeurFound->delete();

            // update du cour du prof...
            $cour = Cour::find($professeurFound->courId);
            $cour->update([
                'libelle' => $cour->libelle,
                'date_cour' => $cour->date_cour,
                'heure_debut' => $cour->heure_debut,
                'heure_fin' => $cour->heure_fin,
            ]);


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
