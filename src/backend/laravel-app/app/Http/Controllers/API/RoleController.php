<?php

namespace App\Http\Controllers\API;

use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

use App\Http\Controllers\Controller;

use App\Models\Role;

class RoleController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/roles/findAll",
     *     summary="Get all roles",
     *     description="Retrieve a list of all roles",
     *     operationId="rolesIndex",
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
     *     tags={"roles"},
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Role Admin"),
     *             @OA\Property(
     *                 property="content",
     *                 type="array",
     *                 @OA\Items(ref="#/components/schemas/Role")
     *             )     
     *          )
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
        $roles = Role::all();

        return response()->json([
            'success' => true,
            'message' => "List of roles",
            'content' => $roles
        ], 200);
    }

    /**
     * @OA\Post(
     *     path="/api/roles/create",
     *     summary="Create a new role",
     *     description="Create a new role resource",
     *     operationId="createRole",
     *     tags={"roles"},
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
     *             required={"name", "description"},
     *             @OA\Property(property="name", type="string", example="admins"),
     *             @OA\Property(property="description", type="string", example="Admin")
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error - Invalid request data",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="object", example={
     *                 "name": {
     *                     "The name field is required."
     *                 },
     *                 "description": {
     *                     "The description field is required."
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
     *                 "name": {
     *                     "The name must be a valid name address."
     *                 },
     *                 "description": {
     *                     "The description must be at least 8 characters."
     *                 }
     *             })
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Role trouve"),
     *             @OA\Property(property="success", type="boolean", example="true"),      
     *             @OA\Property(property="content", type="object", ref="#/components/schemas/Role"),
     *         )
     *     )
     * )
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:roles',
            'description' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'The given data was invalid',
                'errors' => $validator->errors(),
                'success' => false
            ], 400);
        }

        $role = Role::create([
            'name' => $request->name,
            'description' => $request->description,
            'status' => STATE_ACTIVATED
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Role created successfully',
            'content' => $role
        ], 201);
    }

    /**
     * @OA\Get(
     *     path="/api/roles/findOne/{roleId}",
     *     summary="Get role information",
     *     description="Get information about a specific role",
     *     operationId="viewRole",
     *     tags={"roles"},
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
     *         name="roleId",
     *         in="path",
     *         description="ID of role to get information for",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Error - Not found",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Role not found"),
     *             @OA\Property(property="success", type="boolean", example="false"),
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Role trouve"),
     *             @OA\Property(property="success", type="boolean", example="true"),
     *             @OA\Property(property="content", type="object", ref="#/components/schemas/Role")
     *         )
     *     )
     * )
     */
    public function show(string $id)
    {
        $role = Role::find($id);

        if (!$role) {
            return response()->json([
                'message' => 'Role not found',
                'success' => false
            ], 404);
        }

        return response()->json([
            'success' => true,
            'content' => $role
        ], 200);
    }

    /**
     * @OA\Put(
     *     path="/api/roles/update/{roleId}",
     *     summary="Update a specific role",
     *     tags={"roles"},
     *     operationId="updateRole",
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
     *         name="roleId",
     *         in="path",
     *         description="ID of eleve to delete",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *      @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name", "description"},
     *             @OA\Property(property="name", type="string", example="admins"),
     *             @OA\Property(property="description", type="string", example="Admin")
     *         )
     *     ),      
     *     @OA\Response(
     *         response=400,
     *         description="Error - Invalid request data",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="object", example={
     *                 "name": {
     *                     "The name field is required."
     *                 },
     *                 "description": {
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
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Role not found")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Role deleted successfully"),
     *             @OA\Property(property="content", type="object", ref="#/components/schemas/Role"),
     *         )
     *     )
     * )
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'The given data was invalid',
                'errors' => $validator->errors(),
                'success' => false
            ], 400);
        }

        $role = Role::find($id);

        if (!$role) {
            return response()->json([
                'message' => 'Role not found',
                'success' => false
            ], 404);
        }

        $role->update([
            'name' => $request->name,
            'description' => $request->description
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Role updated successfully',
            'content' => $role
        ], 200);
    }

        /**
     * Update the specified role.
     *
     * @OA\Put(
     *     path="/api/roles/update/status/{roleId}",
     *     summary="Update a specific role",
     *     tags={"Roles"},
     *     operationId="roleUpdateStatus",     
     *     @OA\Parameter(
     *         name="roleId",
     *         in="path",
     *         description="Role ID",
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
     *             example="Bearer {your_token}"
     *         ),
     *         description="JWT token"
     *     ),     
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="integer", example="0: active"),
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Role updated successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Role updated successfully"),
     *             @OA\Property(property="content", type="object", ref="#/components/schemas/Role")
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Validation error",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string", example="The given data was invalid"),
     *             @OA\Property(property="errors", type="object", example="{'name': ['The name field is required.']}"),
     *             @OA\Property(property="success", type="boolean", example=false)
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Role not found",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string", example="Role not found"),
     *             @OA\Property(property="success", type="boolean", example=false)
     *         )
     *     )
     * )
     */
    public function updateStatus(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'status' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'The given data was invalid',
                'errors' => $validator->errors(),
                'success' => false
            ], 400);
        }

        $role = Role::find($id);

        if (!$role) {
            return response()->json([
                'message' => 'Role not found',
                'success' => false
            ], 404);
        }

        $role->update([
            'status' => $request->status,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Role status updated successfully',
            'content' => $role
        ], 200);
    }

    /**
     * @OA\Delete (
     *     path="/api/roles/delete/{roleId}",
     *     summary="Delete an role",
     *     description="Delete an role resource",
     *     operationId="deleteRole",
     *     tags={"roles"},
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
     *         name="roleId",
     *         in="path",
     *         description="ID of role to delete",
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
     *         response=200,
     *         description="Role deleted successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Role deleted successfully"),
     *         )
     *     ),     
     *      @OA\Response(
     *         response=404,
     *         description="Error - Not found",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string", example="Role not found")
     *         )
     *     ),
     *     @OA\Response(
     *         response=204,
     *         description="Success",
     *     )
     * )
     */
    public function destroy(string $id)
    {
        $role = Role::find($id);

        if (!$role) {
            return response()->json([
                'message' => 'Role not found',
                'success' => false
            ], 404);
        }

        $role->delete();

        return response()->json([
            'success' => true,
            'message' => 'Role deleted successfully'
        ], 200);
    }
}
