<?php

namespace App\Http\Controllers\API;

use Tymon\JWTAuth\Facades\JWTAuth;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Role;

class AuthController extends Controller
{
    /**
     * @OA\Post(
     *     path="/api/auth/register",
     *     summary="Register",
     *     description="Register a new user",
     *     operationId="authRegister",
     *     tags={"auth"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"email", "password", "name", "first_name", "last_name", "date_de_naissance", "lieu_de_naissance", "sexe"},
     *             @OA\Property(property="email", type="string", format="email", example="user1@mail.com"),
     *             @OA\Property(property="password", type="string", format="password", example="PassWord12345")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="user", type="object", ref="#/components/schemas/User"),
     *             @OA\Property(property="token", type="string", example="eyJ0eXAiOiJKV1QiLCJ....")
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
     *                     "The password must be at least 6 characters."
     *                 },
     *                 "name": {
     *                     "The name field is required."
     *                 }
     *             })
     *         )
     *     ),
     * )
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|unique:users|max:255',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $user = User::create([
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);
        
        // Créer un utilisateur de base avec le rôle user
        $userRole = Role::where('name', 'user')->first();
        
        $user->roles()->attach($userRole);
        
        return response()->json([
            'data' => $user, 
            'message' => "User successfully created",
            'success' => true
        ], 200);
    }

    /**
     * @OA\Post(
     *     path="/api/auth/login",
     *     summary="Sign in",
     *     description="Login by email, password",
     *     operationId="authLogin",
     *     tags={"auth"},
     *     @OA\RequestBody(
     *        required=true,
     *        description="Pass user credentials",
     *        @OA\JsonContent(
     *           required={"email","password"},
     *           @OA\Property(property="email", type="string", format="email", example="user1@mail.com"),
     *           @OA\Property(property="password", type="string", format="password", example="PassWord12345"),
     *           @OA\Property(property="persistent", type="boolean", example="true"),
     *        ),
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Error - Unauthorized",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string", example="Invalid credentials")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="user", type="object", ref="#/components/schemas/User"),
     *             @OA\Property(property="token", type="string", example="eyJ0eXAiOiJKV1QiLCJ....")
     *         )
     *     )
     * )
     */
    public function login(Request $request)
    {

        // validation
        $request->validate([
            "email" => "required|email",
            "password" => "required"
        ]);

        // verify user + token
        if (!$token = auth()->attempt(["email" => $request->email, "password" => $request->password])) {
            return response()->json([
                "success" => false,
                "message" => "Invalid credentials"
            ]);
        }

        // send response
        return response()->json([
            "success" => true,
            "message" => "Logged in successfully",
            "data" => ['token' => $token]
        ]);

    }

    /**
     * @OA\POST(
     *     path="/api/auth/user",
     *     summary="Get user details",
     *     description="Get details of the authenticated user",
     *     operationId="authUser",
     *     tags={"auth"},
     *     security={ {"bearer": {} }},
     *     @OA\Response(
     *         response=401,
     *         description="Error - Unauthorized",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string", example="Unauthorized")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="user", type="object", ref="#/components/schemas/User")
     *         )
     *     ),
     *     @OA\SecurityScheme(
     *         type="http",
     *         securityScheme="bearerAuth",
     *         scheme="bearer",
     *         bearerFormat="JWT"
     *     )
     * )
     */
    public function user()
    {
        $user = auth()->user();

        $profile = [
            'email' => $user->email,
        ];

        return response()->json(['data' => $profile], 200);
        // $user_data = auth()->user();
        // return response()->json([
        //     "success" => true,
        //     "message" => "User profile data",
        //     "data" => $user_data
        // ]);
    }

    /**
     * @OA\Post(
     *     path="/api/auth/logout",
     *     summary="Logout",
     *     description="Invalidate token and log out user",
     *     operationId="authLogout",
     *     tags={"auth"},
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
     *     @OA\Response(
     *         response=200,
     *         description="Successfully logged out",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Successfully logged out")
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string", example="Unauthorized")
     *         )
     *     )
     * )
     */
    public function logout()
    {
        try {
            JWTAuth::parseToken()->authenticate(); // Vérifie que le token JWT existe et est valide
            JWTAuth::invalidate(JWTAuth::getToken()); // Invalide le token JWT
            return response()->json(['message' => 'Successfully logged out'],200);
        } catch (JWTException $e) {
            return response()->json(['error' => 'Invalid token'], 401);
        }
    }
}
