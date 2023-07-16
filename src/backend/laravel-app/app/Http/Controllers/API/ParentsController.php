<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Eleve;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

use App\Models\Convocation;
use App\Models\ConseilDiscipline;
use App\Models\Faute;
use App\Models\SanctionPrevu;

use App\Models\Parents;
use App\Models\Permission;
use App\Models\User;
use App\Models\Role;
use PhpParser\Node\Expr\Cast\Object_;
use Ramsey\Uuid\Type\Integer;
use Illuminate\Support\Facades\Queue;
use App\Jobs\SendEmailJob;

use Carbon\Carbon;

class ParentsController extends Controller
{
    private $avatar_path = "assets/avatars/parents";

    /**
     * @OA\Get(
     *     path="/api/parents/findAll",
     *     summary="Get all parents",
     *     description="Retrieve a list of all parents",
     *     operationId="parentsIndex",
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
     *     tags={"Parents"},
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Parents retrieved successfully"),
     *             @OA\Property(property="content", type="array", @OA\Items(ref="#/components/schemas/Parents"))
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
        // $parents = Parents::has('eleves')->with('eleves')->get();
        // $parents = Parents::has('user')->with('user')->get();
        $parents = Parents::whereHas('eleves.classe')->whereHas('user')->with('user', 'eleves.classe')->get();


        return response()->json([
            'message' => 'Liste des parents',
            'success' => true,
            'content' => $parents
        ]);
    }

    /**
     * @OA\Get(
     *     path="/api/parents/findOne/{parentId}",
     *     summary="Get parent information",
     *     description="Get information about a specific parent",
     *     operationId="viewparent",
     *     tags={"Parents"},
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
     *         name="parentId",
     *         in="path",
     *         description="ID of parent to get information for",
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
     *             @OA\Property(property="message", type="string", example="Parent not found"),
     *             @OA\Property(property="success", type="boolean", example="false"),
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Parent trouvé(e)"),
     *             @OA\Property(property="success", type="boolean", example="true"),
     *             @OA\Property(property="content", type="object", ref="#/components/schemas/Parents")
     *         )
     *     )
     * )
     */
    public function view($parentId)
    {
        $parent = Parents::whereHas('eleves.classe')->whereHas('user')->with('user', 'eleves.classe')->find($parentId);
        // $parentData = Parents::with('eleves')->find($parentId);
        // $parent = Parents::with('user')->find($parentId);

        if ($parent) {

            $parent->eleves->each(function ($eleve) {
                $eleve->nombresFautes = $eleve->fautes()->count();
            });
            $parentData = $parent->toArray();
            $parentData['email'] = $parent->user->email;

            return response()->json([
                'message' => 'Parent trouvé',
                'success' => true,
                'content' => $parentData
            ], 200);
        } else {
            return response()->json([
                'message' => 'Parent non trouvé',
                'success' => false,
            ], 404);
        }
    }

    /**
     * @OA\Post(
     *     path="/api/parents/create",
     *     summary="Create a new parent",
     *     description="Create a new parent resource",
     *     operationId="createParent",
     *     tags={"Parents"},
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
     *                 required={"email", "firstName", "lastName", "username", "dateDeNaissance", "lieuDeNaissance", "sexe", "telephone", "profession", "eleveIds"},
     *                 @OA\Property(property="email", type="string", format="email", example="maestros.roslyn@gmail.com"),
     *                 @OA\Property(property="firstName", type="string", example="John"),
     *                 @OA\Property(property="lastName", type="string", example="Smith"),
     *                 @OA\Property(property="dateDeNaissance", type="string", format="date", example="1990-01-01"),
     *                 @OA\Property(property="lieuDeNaissance", type="string", example="Paris"),
     *                 @OA\Property(property="photo", type="string", format="binary", nullable=true),
     *                 @OA\Property(property="sexe", type="string", example="Male"),
     *                 @OA\Property(property="telephone", type="string", example="+33123456789"),
     *                 @OA\Property(property="profession", type="string", example="Teacher"),
     *                 @OA\Property(property="eleveIds", type="array", @OA\Items(type="integer", example=1))
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error - Invalid request data",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Could not create this parent"),
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="error", type="object", example={
     *                 "email": { "The email field is required."},
     *                 "firstName": {"The first name field is required."},
     *                 "lastName": {"The last name field is required."},
     *                 "dateDeNaissance": {"The date de naissance field is required."},
     *                 "lieuDeNaissance": {"The lieu de naissance field is required."},
     *                 "sexe": {"The sexe field is required."},
     *                 "telephone": {"The telephone field is required."},
     *                 "profession": {"The profession field is required."},
     *                 "eleveIds": {"The Ids of the children are required."}
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
     *                 "username": {
     *                     "The username field is required."
     *                 }
     *             })
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Parent created successfully"),
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="content", type="object", ref="#/components/schemas/Parents")
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
            // 'photo' => 'nullable|image',
            'sexe' => 'required',
            'telephone' => 'required',
            'profession' => 'required',
            'eleveIds' => 'required',
            'eleveIds.*' => 'required|integer|exists:eleves,id',
        ]);

        //generation automatique du mot de passe
        $characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
        $password = substr(str_shuffle($characters), 0, 10);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Could not create this parent',
                'success' => false,
                'error' => $validator->errors()
            ], 400);
        }

        $user = User::create([
            'email' => $request->input('email'),
            'username' => $request->input('email'),
            'password' => bcrypt($password),
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

        $parent = Parents::create([
            'userId' => $user->id,
            'profession' => $request->input('profession'),
            'firstName' => $request->input('firstName'),
            'lastName' => $request->input('lastName'),
            'dateDeNaissance' => $request->input('dateDeNaissance'),
            'lieuDeNaissance' => $request->input('lieuDeNaissance'),
            'photo' => $photo,
            'sexe' => $request->input('sexe'),
            'telephone' => $request->input('telephone'),
        ]);

        /*Recupere le tableau contenant les ids des eleves puis verifie si ce
        n'etait pas une chaine de caractere si oui converti en tableau*/
        $tmp = $request->input('eleveIds');
        if (is_string($tmp)) {
            $eleveIds = array_unique(array_map('intval', explode(',', $tmp)));
        } else {
            $eleveIds = array_unique($tmp);
        }
        //var_dump($eleveIds);
        //dd(gettype($eleveIds));
        $names="";
        //Atache les eleves du parent
        foreach ($eleveIds as $eleveId) {
            $parent->eleves()->attach($eleveId);
            $eleve = Eleve::find($eleveId);
            $names = $names . " ," .  $eleve->firstName;
        }

        // assigner le role parent
        $parentRole = Role::where('name', PARENT_ROLE['name'])->first();
        $user->roles()->attach($parentRole);

        // assigner les permission
        foreach (PARENT_PERMISSIONS as $permission) {
            $parentPerm = Permission::where('name', $permission['name'])->first();
            if ($parentPerm) {
                $user->permissions()->attach($parentPerm);
            }
        }

        $parent = Parents::whereHas('eleves.classe')->whereHas('user')->with('user', 'eleves.classe')->find($parent->id);

        //envoie du mail a l'utilisateur
        $details = array();

        $details['greeting'] = "Salut " . $parent->firstName;
        $details['body'] = "Parent de(s) eleve(s)" . $names .  " Veuillez Modifier votre mot de passe pour assurer la confidentialite de vos donnees et de vos actions au sein de la plateforme \n.
                            \n Mot de passe actuel: $password 
                            \n Login actuel: $user->username 
                            Pour cela, veuillez cliquer sur le ce lien pour proceder la la mise a jour de votre mot de passe .";
        $details['actiontext'] = "Modifier mon mot de passe";
        $details['actionurl'] = "https://react-admin-ashy-zeta.vercel.app/";
        $details['endtext'] = "Merci de rester fidele à cet etablissement";

        // envoi du mail
        Queue::push(new SendEmailJob($user, $details));

        return response()->json([
            'message' => 'Parent created successfully',
            'success' => true,
            'content' => $parent
        ]);
    }

    /**
     * @OA\post(
     *     path="/api/parents/update/{parentId}",
     *     summary="Update a parent's information",
     *     description="Update a parent's information",
     *     operationId="updateParent",
     *     tags={"Parents"},
     *      @OA\Parameter(
     *         name="parentId",
     *         in="path",
     *         description="ID of parent to update in this request",
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
     *                 required={"email", "firstName", "lastName", "username", "dateDeNaissance", "lieuDeNaissance", "sexe", "telephone", "profession", "eleveIds"},
     *                 @OA\Property(property="email", type="string", format="email", example="maestros.roslyn@gmail.com"),
     *                 @OA\Property(property="firstName", type="string", example="John"),
     *                 @OA\Property(property="lastName", type="string", example="Smith"),
     *                 @OA\Property(property="dateDeNaissance", type="string", format="date", example="1990-01-01"),
     *                 @OA\Property(property="lieuDeNaissance", type="string", example="Paris"),
     *                 @OA\Property(property="photo", type="string", format="binary", nullable=true),
     *                 @OA\Property(property="sexe", type="string", example="Male"),
     *                 @OA\Property(property="telephone", type="string", example="+33123456789"),
     *                 @OA\Property(property="profession", type="string", example="Teacher"),
     *                 @OA\Property(property="eleveIds", type="array", @OA\Items(type="integer", example=1))
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error - Invalid request data",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example="false"),
     *             @OA\Property(property="message", type="string", example="The given data was invalid"),
     *             @OA\Property(property="error", type="object", example={
     *                 "email": { "The email field is required."},
     *                 "firstName": {"The first name field is required."},
     *                 "lastName": {"The last name field is required."},
     *                 "dateDeNaissance": {"The date de naissance field is required."},
     *                 "lieuDeNaissance": {"The lieu de naissance field is required."},
     *                 "sexe": {"The sexe field is required."},
     *                 "telephone": {"The telephone field is required."},
     *                 "profession": {"The profession field is required."},
     *                 "eleveIds": {"The Ids of the children are required."},
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
     *             @OA\Property(property="success", type="boolean", example="false"),
     *             @OA\Property(property="message", type="string", example="Parent not found")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Parent modifié avec succèss"),
     *             @OA\Property(property="success", type="boolean", example="true"),
     *             @OA\Property(property="content", type="object", ref="#/components/schemas/Parents")
     *          )
     *     )
     * )
     */
    public function update(Request $request, $id)
    {
        // on récupère le parent associé
        $parentFound = Parents::find($id);
        if ($parentFound) {
            $user = User::find($parentFound->userId);

            $validator = Validator::make($request->all(), [
                'email' => 'required|email|unique:users,email,' . $user->id,
                'firstName' => 'required',
                'lastName' => 'required',
                'dateDeNaissance' => 'required|date',
                'lieuDeNaissance' => 'required',
                // 'photo' => 'nullable|image',
                'sexe' => 'required',
                'telephone' => 'required',
                'profession' => 'required',
                'eleveIds' => 'required',
                'eleveIds.*' => 'required|integer|exists:eleves,id',
            ]);
        } else {
            return response()->json([
                'message' => 'Parent not exists',
                'success' => false,
            ], 404);
        }

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Could not update this parent',
                'success' => false,
                'error' => $validator->errors()
            ], 400);
        }

        // Mise à jour des champs de l'objet User
        $user->email = $request->input('email');
        $user->username = $request->input('email');

        // Suppression de l'ancienne photo si une nouvelle a été sélectionnée
        if ($request->hasFile('photo')) {
            $oldPhoto = $parentFound->photo;
            if ($oldPhoto) {
                Storage::delete($oldPhoto);
            }
            $parentFound->photo = $request->file('photo')->store($this->avatar_path);
        }
        $user->save();

        //Detache les anciens eleves du parent
        foreach ($parentFound->eleves() as $eleveId) {
            $parentFound->eleves()->detach($parentFound->eleveIds);
        }

        /*Recupere le tableau contenant les ids des eleves puis verifie si ce
        n'etait pas une chaine de caractere si oui converti en tableau*/
        $tmp = $request->input('eleveIds');
        if (is_string($tmp)) {
            $eleveIds = array_unique(array_map('intval', explode(',', $tmp)));
        } else {
            $eleveIds = array_unique($tmp);
        }
        //Atache les eleves du parent
        foreach ($eleveIds as $eleveId) {
            $parentFound->eleves()->attach($eleveId);
        }
        // Mise à jour des champs de l'objet Parent
        $parentFound->firstName = $request->input('firstName');
        $parentFound->lastName = $request->input('lastName');
        $parentFound->dateDeNaissance = $request->input('dateDeNaissance');
        $parentFound->lieuDeNaissance = $request->input('lieuDeNaissance');
        $parentFound->sexe = $request->input('sexe');
        $parentFound->telephone = $request->input('telephone');
        $parentFound->profession = $request->input('profession');
        $parentFound->save();

        $parentFound = Parents::whereHas('eleves.classe')->whereHas('user')->with('user', 'eleves.classe')->find($parentFound->id);
        // $parentFound = Parents::with('user')->find($parentFound->id);
        // $parentFound = Parents::with('eleves')->find($parentFound->id);

        return response()->json([
            'message' => 'Parent updated successfully',
            'success' => true,
            'content' => $parentFound
        ]);
    }

    /**
     * @OA\Delete (
     *     path="/api/parents/delete/{id}",
     *     summary="Delete an parent",
     *     description="Delete an parent resource",
     *     operationId="deleteParent",
     *     tags={"Parents"},
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
     *         description="ID of parent to delete",
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
     *             @OA\Property(property="message", type="string", example="Parent not found")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Parent deleted successfully"),
     *         )
     *     )
     * )
     */
    public function delete($parentId)
    {
        $parentFound = Parents::find($parentId);

        if ($parentFound) {

            // supperssion de l'image du parent
            if ($parentFound->photo) {
                Storage::delete($parentFound->photo);
            }

            //suppression du parent
            $parentFound->delete();

            return response()->json([
                'message' => 'Parent deleted successfully',
                'success' => true,
            ], 200);
        } else {
            return response()->json([
                'message' => 'parent to delete was not found',
                'success' => false,
            ], 404);
        }
    }

    public function parentNotification($eleveId){
        $currentDate = Carbon::now();

        $convo = Convocation::where('eleveId', $eleveId)
        ->orWhere('dateConvocation', '>', $currentDate)
            ->with(['eleve', 'personnel'])
            ->get();
        $conseil = ConseilDiscipline::where('eleveId', $eleveId)
            ->orWhere('dateCd', '>', $currentDate)
            ->with(['eleve'])
            ->get();
        /* $conseil = Faute::where('eleveId', $eleveId)
            ->where('dateCd', '>', $currentDate)
            ->with(['eleve', 'personnel'])
            ->get();
        $conseil = ConseilDiscipline::where('eleveId', $eleveId)
            ->where('dateCd', '>', $currentDate)
            ->with(['eleve', 'personnel'])
            ->get(); */
            $data = User::where('id',0);
        $data->convo = $convo;
        $data->conseil = $conseil;


        if ($data->convo->count() > 0 || $data->conseil->count() > 0) {
            return response()->json([
                'message' => 'Convocations de l\'élève trouvées',
                'success' => true,
                'content' => $data
            ], 200);
        } else {
            return response()->json([
                'message' => 'Convocations de l\'élève non trouvées',
                'success' => false,
                'content' => $data
            ], 404);
        }
    }
}
