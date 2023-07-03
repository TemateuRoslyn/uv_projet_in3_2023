<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Eleve;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

use App\Models\Parents;
use App\Models\Permission;
use App\Models\User;
use App\Models\Role;

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
     *         name="id",
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
     *                 @OA\Property(property="username", type="string", example="dvlmonster"),
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
     *                 "password": {"The password field is required."},
     *                 "username": {"The username field is required."},
     *                 "first_name": {"The first name field is required."},
     *                 "last_name": {"The last name field is required."},
     *                 "date_de_naissance": {"The date de naissance field is required."},
     *                 "lieu_de_naissance": {"The lieu de naissance field is required."},
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
            'password' => 'required|min:8',
            'username' => 'required|unique:users',
            'firstName' => 'required',
            'lastName' => 'required',
            'dateDeNaissance' => 'required|date',
            'lieuDeNaissance' => 'required',
            'photo' => 'nullable|image',
            'sexe' => 'required',
            'telephone' => 'required',
            'profession' => 'required',
            'eleveIds' => 'required|array',
            'eleveIds.*' => 'required|integer|exists:eleves,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Could not create this parent',
                'success' => false,
                'error' => $validator->errors()
            ], 400);
        }

        $user = User::create([
            'email' => $request->input('email'),
            'username' => $request->input('username'),
            'password' => bcrypt($request->input('password')),
        ]);


        $parent = Parents::create([
            'userId' => $user->id,
            'profession' => $request->input('profession'),
            'firstName' => $request->input('firstName'),
            'lastName' => $request->input('lastName'),
            'dateDeNaissance' => $request->input('dateDeNaissance'),
            'lieuDeNaissance' => $request->input('lieuDeNaissance'),
            'photo' => $request->file('photo') ? $request->file('photo')->store($this->avatar_path) : null,
            'sexe' => $request->input('sexe'),
            'telephone' => $request->input('telephone'),
        ]);

        //Atache les eleves du parent
        $eleveIds = $request->input('eleveIds');
        foreach ($eleveIds as $eleveId) {
            $parent->eleves()->attach($eleveId);
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

        return response()->json([
            'message' => 'Parent created successfully',
            'success' => true,
            'content' => $parent
        ]);
    }

    /**
     * @OA\Post(
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
     *                 @OA\Property(property="username", type="string", example="dvlmonster"),
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
     *                 "username": {"The username field is required."},
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
                'username' => 'required|unique:users',
                'firstName' => 'required',
                'lastName' => 'required',
                'dateDeNaissance' => 'required|date',
                'lieuDeNaissance' => 'required',
                'photo' => 'nullable|image',
                'sexe' => 'required',
                'telephone' => 'required',
                'profession' => 'required',
                'eleveIds' => 'required|array',
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
        $user->username = $request->input('username');

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

        //Atache les eleves du parent
        $eleveIds = $request->input('eleveIds');
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
}
