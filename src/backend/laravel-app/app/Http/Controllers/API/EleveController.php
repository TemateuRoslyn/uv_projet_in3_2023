<?php

namespace App\Http\Controllers\API;


use Illuminate\Support\Facades\Queue;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Notification;

use App\Http\Controllers\Controller;
use App\Jobs\SendEmailJob;
use App\Notifications\SendEmailNotification;

use App\Models\Eleve;
use App\Models\Classe;
use App\Models\User;
use App\Models\Permission;
use App\Models\Role;

class EleveController extends Controller
{

    private $avatar_path = "assets/avatars/eleves";


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
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Permission updated successfully"),
     *             @OA\Property(property="content", type="array", @OA\Items(ref="#/components/schemas/Eleve"))
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
        $eleves = Eleve::with('user', 'classe', 'parents')->get();

        return response()->json([
            'message' => 'Liste des élèves',
            'success' => true,
            'content' => $eleves
        ]);
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
     *             @OA\Property(property="message", type="string", example="Eleve not found"),
     *             @OA\Property(property="success", type="boolean", example="false"),
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Élève trouvé(e)"),
     *             @OA\Property(property="success", type="boolean", example="true"),
     *             @OA\Property(property="content", type="object", ref="#/components/schemas/Eleve")
     *         )
     *     )
     * )
     */
    public function view($eleveId)
    {
        $eleve = Eleve::with('user')
            ->has('classe')->with('classe')
            ->has('parents')->with('parents')
            ->find($eleveId);

        if ($eleve) {
            $eleveData = $eleve->toArray();
            $eleveData['email'] = $eleve->user->email;

            return response()->json([
                'message' => 'élève trouvé(e)',
                'success' => true,
                'content' => $eleveData
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
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(
     *                 required={"email", "firstName", "lastName", "dateDeNaissance", "lieuDeNaissance", "sexe", "telephone", "solvable", "redoublant", "classeId"},
     *                 @OA\Property(property="email", type="string", format="email", example="maestros.roslyn@gmail.com"),
     *                 @OA\Property(property="firstName", type="string", example="John"),
     *                 @OA\Property(property="lastName", type="string", example="Smith"),
     *                 @OA\Property(property="dateDeNaissance", type="string", format="date", example="1990-01-01"),
     *                 @OA\Property(property="lieuDeNaissance", type="string", example="Paris"),
     *                 @OA\Property(property="photo", type="string", format="binary", nullable=true),
     *                 @OA\Property(property="sexe", type="string", example="Male"),
     *                 @OA\Property(property="telephone", type="string", nullable=true, example="+33123456789"),
     *                 @OA\Property(property="solvable", type="boolean", example=true),
     *                 @OA\Property(property="redoublant", type="boolean", example=false),
     *                 @OA\Property(property="classeId", type="integer", example=1),
     *             )
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
     *             @OA\Property(property="message", type="string", example="Élève créé(e)"),
     *             @OA\Property(property="success", type="boolean", example="true"),
     *             @OA\Property(property="content", type="object", ref="#/components/schemas/Eleve")
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
            'sexe' => 'required',
            'photo' => 'nullable|image',
            'telephone' => 'required',
            'solvable' => 'required',
            'redoublant' => 'required',
            'classeId' => 'required'
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

        $eleve = Eleve::create([
            'userId' => $user->id,
            'classeId' => $request->input('classeId'),
            'solvable' => boolval($request->input('solvable')),
            'redoublant' => boolval($request->input('redoublant')),
            'firstName' => $request->input('firstName'),
            'lastName' => $request->input('lastName'),
            'dateDeNaissance' => $request->input('dateDeNaissance'),
            'lieuDeNaissance' => $request->input('lieuDeNaissance'),
            'photo' => $photo,
            'sexe' => $request->input('sexe'),
            'telephone' => $request->input('telephone'),
        ]);

        // update de classe de l'eleve...
        $classe = Classe::find($request->classeId);
        $classe->effectif++;
        $classe->update([
            'name' => $classe->name,
            'shortName' => $classe->shortName,
            'speciality' => $classe->speciality,
            'no' => $classe->no,
            'effectif' => $classe->effectif,
        ]);

        $eleve->user = $user;
        $eleve->classe = $classe;
        $eleve->load('parents');

        // Créer un eleve de base avec le rôle eleve
        $eleveRole = Role::where('name', 'eleve')->first();

        $user->roles()->attach($eleveRole);

        // assigner les permission
        foreach (ELEVE_PERMISSIONS as $permission) {
            $elevePerm = Permission::where('name', $permission['name'])->first();
            if ($elevePerm) {
                $user->permissions()->attach($elevePerm);
            }
        }

        //envoie du mail a l'utilisateur
        $details = array();

        $details['greeting'] = "Hi " . $eleve->firstName;
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
            'message' => 'Eleve created successfully',
            'success' => true,
            'content' => $eleve,
        ]);
    }


    /**
     * @OA\post(
     *     path="/api/eleves/update/{eleveId}",
     *     summary="Update a eleve's information",
     *     description="Update a eleve's information",
     *     operationId="updateEleve",
     *     tags={"eleves"},
     *      @OA\Parameter(
     *         name="eleveId",
     *         in="path",
     *         description="ID of eleve to update in this request",
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
     *                 required={"email", "firstName", "lastName", "dateDeNaissance", "lieuDeNaissance", "sexe", "telephone", "solvable", "redoublant", "classeId"},
     *                 @OA\Property(property="email", type="string", format="email", example="maestros.roslyn@gmail.com"),
     *                 @OA\Property(property="firstName", type="string", example="John"),
     *                 @OA\Property(property="lastName", type="string", example="Smith"),
     *                 @OA\Property(property="dateDeNaissance", type="string", format="date", example="1990-01-01"),
     *                 @OA\Property(property="lieuDeNaissance", type="string", example="Paris"),
     *                 @OA\Property(property="photo", type="string", format="binary", nullable=true),
     *                 @OA\Property(property="sexe", type="string", example="Male"),
     *                 @OA\Property(property="telephone", type="string", nullable=true, example="+33123456789"),
     *                 @OA\Property(property="solvable", type="boolean", example=true),
     *                 @OA\Property(property="redoublant", type="boolean", example=false),
     *                 @OA\Property(property="classeId", type="integer", example=1),
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error - Invalid request data",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Eleve non trouve(e)"),
     *             @OA\Property(property="success", type="boolean", example="false"),
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
     *             @OA\Property(property="message", type="string", example="Eleve non trouve(e)"),
     *             @OA\Property(property="success", type="boolean", example="false"),
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Élève modifié qvec succèss"),
     *             @OA\Property(property="success", type="boolean", example="true"),
     *             @OA\Property(property="content", type="object", ref="#/components/schemas/Eleve")
     *          )
     *     )
     * )
     */
    public function update(Request $request, $id)
    {

        // on récupère l'élève associé
        $eleveFound = Eleve::find($id);
        if ($eleveFound) {
            $user = User::find($eleveFound->userId);
            $validator = Validator::make($request->all(), [
                'email' => 'required|email|unique:users,email,' . $user->id,
                'firstName' => 'required',
                'lastName' => 'required',
                'dateDeNaissance' => 'required|date',
                'lieuDeNaissance' => 'required',
                'sexe' => 'required',
                'photo' => 'nullable|image',
                'telephone' => 'required',
                'solvable' => 'required',
                'redoublant' => 'required',
                'classeId' => 'required'
            ]);
        } else {
            return response()->json([
                'message' => 'Student not exists',
                'success' => false,
            ], 404);
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
        $eleveFound->firstName = $request->input('firstName');
        $eleveFound->lastName = $request->input('lastName');
        $eleveFound->dateDeNaissance = $request->input('dateDeNaissance');
        $eleveFound->lieuDeNaissance = $request->input('lieuDeNaissance');
        $eleveFound->sexe = $request->input('sexe');
        $eleveFound->telephone = $request->input('telephone');
        $eleveFound->solvable = boolval($request->input('solvable'));
        $eleveFound->redoublant = boolval($request->input('redoublant'));

        // update de classe de l'eleve...

        // si il change de classe
        $classe = Classe::find($request->classeId);

        if ($classe && $eleveFound->classeId != $request->classeId) {

            // update de l'ancienne classe
            $oldClasse = Classe::find($eleveFound->classeId);
            $oldClasse->update([
                'name' => $oldClasse->name,
                'shortName' => $oldClasse->shortName,
                'speciality' => $oldClasse->speciality,
                'no' => $oldClasse->no,
                'effectif' => --$oldClasse->effectif,
            ]);

            // update de la nouvelle classe
            $classe->update([
                'name' => $classe->name,
                'shortName' => $classe->shortName,
                'speciality' => $classe->speciality,
                'no' => $classe->no,
                'effectif' => ++$classe->effectif,
            ]);
        }

        $eleveFound->classeId = $request->input('classeId');
        $eleveFound->save();

        $eleveFound->user = $user;
        $eleveFound->classe = $classe;
        $eleveFound->load('parents');

        return response()->json([
            'message' => 'Eleve updated successfully',
            'success' => true,
            'content' => $eleveFound
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
     *         response=200,
     *         description="Permission deleted successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Eleve deleted successfully")
     *         )
     *     ),
     * )
     */
    public function delete($eleveId)
    {
        $eleveFound = Eleve::find($eleveId);

        if ($eleveFound) {

            // supperssion de l'image du user
            if ($eleveFound->photo) {
                Storage::delete($eleveFound->photo);
            }

            //recherche le parent associe a l'eleve
            $parent = $eleveFound->parent;

            //suppression de l'eleve
            $eleveFound->delete();

            //Verifie si l'eleve etait le dernier en fant du parent si oui supprime le parent
            if ($parent && $parent->eleves->isEmpty()) {
                $parent->delete();
            }

            // update de classe de l'eleve...
            $classe = Classe::find($eleveFound->classeId);
            $classe->update([
                'name' => $classe->name,
                'shortName' => $classe->shortName,
                'speciality' => $classe->speciality,
                'no' => $classe->no,
                'effectif' => --$classe->effectif,
            ]);

            return response()->json([
                'message' => 'Eleve deleted successfully',
                'success' => true,
            ], 200);
        } else {
            return response()->json([
                'message' => 'Eleve to delete was not found',
                'success' => false,
            ], 404);
        }
    }


    /**
     * Get the filtered list of Students.
     *
     * @OA\Get(
     *     path="/api/eleves/records/{keyword}",
     *     summary="Get filtered list of eleves",
     *     tags={"eleves"},
     *     operationId="elevesRecords",
     *     @OA\Parameter(
     *         name="keyword",
     *         in="path",
     *         description="Keyword to filter eleves",
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
     *             @OA\Property(property="message", type="string", example="Eleves records successfully"),
     *             @OA\Property(property="content", type="array", @OA\Items(type="string", example="Tonfack"))
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
        $eleves = Eleve::whereHas('user', function ($query) use ($keyword) {
            $query->where('email', 'like', "%{$keyword}%");
        })->orWhere('telephone', 'like', "%{$keyword}%")
            ->orWhere('firstName', 'like', "%{$keyword}%")
            ->orWhere('lastName', 'like', "%{$keyword}%")
            ->get();

        // dd($eleves);

        $formattedEleve = $eleves->map(function ($eleve) {
            $tel = $eleve->telephone;
            $email = $eleve->user->email;
            $firstName = $eleve->firstName;
            $lastName = $eleve->lastName;
            $classe = $eleve->classe->name . ' ' . $eleve->classe->speciality;
            $id = $eleve->id;

            return "{$email} {$firstName} {$lastName} {$tel} {$classe}:{$id}";
        });

        return response()->json([
            'success' => true,
            'message' => 'Eleve records successfully',
            'content' => $formattedEleve,
        ], 200);
    }
}
