<?php

namespace App\Http\Controllers\API;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Role;

class UserController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/users/findAll",
     *     summary="Get a list of users",
     *     tags={"Users"},
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Users retrieved successfully"),
     *             @OA\Property(
     *                 property="data",
     *                 type="array",
     *                 @OA\Items(ref="#/components/schemas/User")
     *             )
     *         )
     *     )
     * )
     */
    public function index()
    {
        $users = User::all();

        return response()->json([
            'success' => true,
            'message' => 'Users retrieved successfully',
            'data' => $users
        ], 200);
    }

    /**
     * @OA\Post(
     *     path="/api/users/create",
     *     summary="Create a new user",
     *     tags={"Users"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="email", type="string", format="email", example="user@example.com"),
     *             @OA\Property(property="username", type="string", example="maestros21"),
     *             @OA\Property(property="password", type="string", format="password", example="secret")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="User created successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="User created successfully"),
     *             @OA\Property(property="data", ref="#/components/schemas/User")
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Validation error",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string", example="Could not create this user"),
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(
     *                 property="error",
     *                 type="object",
     *                 @OA\Property(property="email", type="array", @OA\Items(type="string")),
     *                 @OA\Property(property="username", type="array", @OA\Items(type="string")),
     *                 @OA\Property(property="password", type="array", @OA\Items(type="string"))
     *             )
     *         )
     *     )
     * )
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|unique:users',
            'username' => 'required|unique:users',
            'password' => 'required|min:6'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Could not create this user',
                'success' => false,
                'error' => $validator->errors()
            ], 400);
        }

        $data = $validator->validated();

        $user = User::create($data);

        // Créer un utilisateur de base avec le rôle user
        $userRole = Role::where('name', 'user')->first();
        $user->roles()->attach($userRole);

        return response()->json([
            'success' => true,
            'message' => 'User created successfully',
            'data' => $user
        ], 201);
    }

    /**
     * Display the specified user.
     *
     * @OA\Get(
     *     path="/api/users/findOne/{userId}",
     *     operationId="getUser",
     *     tags={"Users"},
     *     summary="Get a specific user",
     *     description="Get information about a specific user by user ID",
     *     @OA\Parameter(
     *         name="userId",
     *         in="path",
     *         required=true,
     *         description="User ID",
     *         @OA\Schema(
     *             type="string"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="User found",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="message",
     *                 type="string",
     *                 example="Utilisateur trouvé(e)"
     *             ),
     *             @OA\Property(
     *                 property="success",
     *                 type="boolean",
     *                 example=true
     *             ),
     *             @OA\Property(
     *                 property="data",
     *                 ref="#/components/schemas/User"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="User not found",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="message",
     *                 type="string",
     *                 example="Utilisateur non trouvé(e)"
     *             ),
     *             @OA\Property(
     *                 property="success",
     *                 type="boolean",
     *                 example=false
     *             )
     *         )
     *     )
     * )
     */
    public function show(string $userId)
    {
        $userFound = User::find($userId);

        if ($userFound) {
            return response()->json([
                'message' => 'Utilisateur trouvé(e)',
                'success' => true,
                'data' => $userFound
            ], 200);
        } else {
            return response()->json([
                'message' => 'Utilisateur non trouvé(e)',
                'success' => false,
            ], 404);
        }
    }

    /**
     * Update the specified user in storage.
     *
     * @OA\Put(
     *     path="/api/users/update/{userId}",
     *     operationId="updateUser",
     *     tags={"Users"},
     *     summary="Update a specific user",
     *     description="Update information of a specific user by user ID",
     *     @OA\Parameter(
     *         name="userId",
     *         in="path",
     *         required=true,
     *         description="User object",
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         description="Updated user information",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="email",
     *                 type="string",
     *                 format="email",
     *                 example="user@gmail.com"
     *             ),
     *             @OA\Property(
     *                 property="username",
     *                 type="string",
     *                 example="maestros21"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="User updated successfully",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="success",
     *                 type="boolean",
     *                 example=true
     *             ),
     *             @OA\Property(
     *                 property="message",
     *                 type="string",
     *                 example="User updated successfully"
     *             ),
     *             @OA\Property(
     *                 property="data",
     *                 ref="#/components/schemas/User"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Could not update this user",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="message",
     *                 type="string",
     *                 example="Could not update this user"
     *             ),
     *             @OA\Property(
     *                 property="success",
     *                 type="boolean",
     *                 example=false
     *             ),
     *             @OA\Property(
     *                 property="error",
     *                 type="object",
     *                 example={
     *                     "email": {
     *                         "The email has already been taken."
     *                     },
     *                     "username": {
     *                         "The username has already been taken."
     *                     }
     *                 }
     *             )
     *         )
     *     )
     * )
     */
    public function update(Request $request, User $user)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|unique:users,email,' . $user->id,
            'username' => 'required|unique:users,username,' . $user->id,
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Could not update this user',
                'success' => false,
                'error' => $validator->errors()
            ], 400);
        }

        $data = $validator->validated();

        $user->update($data);

        return response()->json([
            'success' => true,
            'message' => 'User updated successfully',
            'data' => $user
        ], 200);
    }

    /**
     * Remove the specified user from storage.
     *
     * @OA\Delete(
     *     path="/api/users/delete/{userId}",
     *     operationId="deleteUser",
     *     tags={"Users"},
     *     summary="Delete a specific user",
     *     description="Delete a specific user by user ID",
     *     @OA\Parameter(
     *         name="userId",
     *         in="path",
     *         required=true,
     *         description="User ID",
     *         @OA\Schema(
     *             type="string"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="User deleted successfully",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="message",
     *                 type="string",
     *                 example="User deleted successfully"
     *             ),
     *             @OA\Property(
     *                 property="success",
     *                 type="boolean",
     *                 example=true
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="User to delete was not found",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="message",
     *                 type="string",
     *                 example="User to delete was not found"
     *             ),
     *             @OA\Property(
     *                 property="success",
     *                 type="boolean",
     *                 example=false
     *             )
     *         )
     *     )
     * )
     */
    public function destroy(string $userId)
    {
        $userFound = User::find($userId);

        if ($userFound) {
            // Suppression de l'utilisateur
            $userFound->delete();

            return response()->json([
                'message' => 'User deleted successfully',
                'success' => true,
            ]);
        } else {
            return response()->json([
                'message' => 'User to delete was not found',
                'success' => false,
            ]);
        }
    }
}
