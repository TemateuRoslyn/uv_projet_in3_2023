<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

use App\Models\Parents;
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
     *     tags={"parents"},
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="data", type="array", @OA\Items(ref="#/components/schemas/Parents"))
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
        $parents = Parents::has('user')->with('user')->get();


        return response()->json([
            'message' => 'Liste des parents',
            'success' => true,
            'data' => $parents
        ]);
    }

    /**
     * @OA\Get(
     *     path="/api/parents/findOne/{parentId}",
     *     summary="Get parent information",
     *     description="Get information about a specific parent",
     *     operationId="viewParent",
     *     tags={"parents"},
     *     @OA\Parameter(
     *         name="parentId",
     *         in="path",
     *         description="ID of the parent to get information for",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Parent trouvé"),
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="data", type="object", ref="#/components/schemas/Parents")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Error - Not found",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string", example="Parent non trouvé"),
     *         )
     *     )
     * )
     */
    public function showIndex($parentId)
    {
        $parent = Parents::with('user')->find($parentId);

        if ($parent) {
            $parentData = $parent->toArray();
            $parentData['email'] = $parent->user->email;

            return response()->json([
                'message' => 'Parent trouvé',
                'success' => true,
                'data' => $parentData
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
     *     tags={"parents"},
     *     security={{"bearer": {}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"email", "password", "name", "first_name", "last_name", "date_de_naissance", "lieu_de_naissance", "sexe", "telephone", "profession"},
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
     *             @OA\Property(property="profession", type="string", example="Teacher")
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
     *                 "profession": {"The profession field is required."}
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
     *             @OA\Property(property="message", type="string", example="Parent created successfully"),
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="data", type="object", ref="#/components/schemas/Parents")
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
            'profession' => 'required',
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
            'user_id' => $user->id,
            'profession' => $request->input('profession'),
            'first_name' => $request->input('first_name'),
            'last_name' => $request->input('last_name'),
            'date_de_naissance' => $request->input('date_de_naissance'),
            'lieu_de_naissance' => $request->input('lieu_de_naissance'),
            'photo' => $request->file('photo') ? $request->file('photo')->store($this->avatar_path) : null,
            'sexe' => $request->input('sexe'),
            'telephone' => $request->input('telephone'),
        ]);

        $parent->user = $user;

        return response()->json([
            'message' => 'Parent created successfully',
            'success' => true,
            'data' => $parent
        ]);

        // Créer un parent de base avec le rôle parent
        $parentRole = Role::where('name', 'parent')->first();

        $user->roles()->attach($parentRole);


        return response()->json([
            'message' => 'Parent created successfully',
            'success' => true,
            'data' => $parent
        ]);
    }

    /**
     * @OA\Post(
     *     path="/api/parents/update",
     *     summary="Update a parent's information",
     *     description="Update a parent's information",
     *     operationId="updateParent",
     *     tags={"parents"},
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
     *             @OA\Property(property="profession", type="string", example="Engineer")
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
     *                 "profession": {"The profession field is required."},
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
     *             @OA\Property(property="error", type="string", example="Parent not found")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="parent", type="object", ref="#/components/schemas/Parents"),
     *         )
     *     )
     * )
     */

    public function update(Request $request)
    {
        // on récupère le parent associé
        $parentFound = Parents::find($request->id);
        if ($parentFound) {
            $user = User::find($parentFound->user_id);

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
                'profession' => 'required',
            ]);
        } else {
            return response()->json([
                'message' => 'Parent not exists',
                'success' => false,
            ], 400);
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

        // Mise à jour des champs de l'objet Parent
        $parentFound->first_name = $request->input('first_name');
        $parentFound->last_name = $request->input('last_name');
        $parentFound->date_de_naissance = $request->input('date_de_naissance');
        $parentFound->lieu_de_naissance = $request->input('lieu_de_naissance');
        $parentFound->sexe = $request->input('sexe');
        $parentFound->telephone = $request->input('telephone');
        $parentFound->profession = $request->input('profession');
        $parentFound->save();

        $parentFound = Parents::with('user')->find($parentFound->id);

        return response()->json([
            'message' => 'Parent updated successfully',
            'success' => true,
            'data' => $parentFound
        ]);
    }

    /**
     * @OA\Delete (
     *     path="/api/parents/delete/{id}",
     *     summary="Delete a parent",
     *     description="Delete a parent resource",
     *     operationId="deleteParent",
     *     tags={"parents"},
     *     security={ {"bearer": {} }},
     *     @OA\Parameter(
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
     *             @OA\Property(property="error", type="string", example="Parent not found")
     *         )
     *     ),
     *     @OA\Response(
     *         response=204,
     *         description="Success",
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
            ]);
        } else {
            return response()->json([
                'message' => 'parent to delete was not found',
                'success' => false,
            ]);
        }
    }
}