<?php

namespace App\Http\Controllers\API;

use Tymon\JWTAuth\Facades\JWTAuth;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Role;

use App\Models\Eleve;
use App\Models\Parents;
use App\Models\Personnel;
use App\Models\Professeur;

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
     *             required={"email", "password", "username"},
     *             @OA\Property(property="username", type="string", example="maestros21"),
     *             @OA\Property(property="password", type="string", format="password", example="PassWord12345"),
     *             @OA\Property(property="email", type="string", format="email", example="maestros.roslyn@gmail.com"),
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example="Logged in successfully"),
     *             @OA\Property(property="message", type="string", example="Logged in successfully"),
     *             @OA\Property(
     *                   property="content",
     *                   type="object",
     *                   @OA\Property(property="user", type="object", ref="#/components/schemas/User"),
     *                   @OA\Property(property="token", type="string", example="eyJ0eXAiOiJKV1QiLCJ....")
     *              ),
     *           )
     *          ),
     *     @OA\Response(
     *         response=400,
     *         description="Error - Invalid request data",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="object", example={
     *                 "username": {
     *                     "Le username est un champ requis."
     *                 },
     *                 "password": {
     *                     "Le mot de passe est un champ requis."
     *                 },
     *                 "email": {
     *                     "L'email est un champ requis."
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
     *                 "username": {
     *                     "Le username est un champ requis."
     *                 },
     *                 "password": {
     *                     "TLe mot de passe doit avoir au moins 6 characteres"
     *                 },
     *                 "email": {
     *                     "L'email doit etre valide"
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
            'username' => 'required|string|unique:users',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $user = User::create([
            'email' => $request->email,
            'username' => $request->username,
            'password' => bcrypt($request->password),
        ]);
        
        // Créer un utilisateur de base avec le rôle user
        $userRole = Role::where('name', 'user')->first();
        
        $user->roles()->attach($userRole);
        
        return response()->json([
            'content' => $user, 
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
     *           required={"password", "username"},
     *           @OA\Property(property="username", type="string", example="maestros21"),
     *           @OA\Property(property="password", type="string", format="password", example="PassWord12345"),
     *           @OA\Property(property="persistent", type="boolean", example="true"),
     *        ),
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Error - Unauthorized",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example="false"),
     *             @OA\Property(property="message", type="string", example="Invalid credentials")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example="Logged in successfully"),
     *             @OA\Property(property="message", type="string", example="Logged in successfully"),
     *             @OA\Property(
     *                   property="content",
     *                   type="object",
     *                   @OA\Property(property="token", type="string", example="eyJ0eXAiOiJKV1QiLCJ...."),
     *                   @OA\Property(property="user", type="object", ref="#/components/schemas/User"),
     *               ),
     *         )
     *     )
     * )
     */
    public function login(Request $request)
    {

        // validation
        $request->validate([
            "username" => "required",
            "password" => "required",
          
        ]);

        // verify user + token
        if (!$token = auth()->attempt(["username" => $request->username, "password" => $request->password])) {
            return response()->json([
                "success" => false,
                "message" => "Invalid credentials"
            ], 401);
        }

        $user = User::find(auth()->user()->id);
        $user->roles;
        $user->permissions;
        
        if ($request->persistent === "admin")
        {$user->persistent = $request->persistent;
            if($user->roles->contains('name', ELEVE_ROLE['name'])){
                return response()->json([
                    "success" => false,
                    "message" => "Invalid credentials"
                ], 401);
            } elseif ($user->roles->contains('name', PARENT_ROLE['name'])){
                return response()->json([
                    "success" => false,
                    "message" => "Invalid credentials"
                ], 401);
            } elseif ($user->roles->contains('name', PROFESSEUR_ROLE['name'])){
                return response()->json([
                    "success" => false,
                    "message" => "Invalid credentials"
                ], 401);
            } elseif ($user->roles->contains('name', PERSONNEL_ROLE['name'])){
                return response()->json([
                    "success" => false,
                    "message" => "Invalid credentials"
                ], 401);
            }

            return response()->json([
                "success" => true,
                "message" => "Logged in successfully",
                "content" => [
                    'token' => $token,
                    'user' => $user,
                    ]
            ], 200);
        }elseif($request->persistent === "web")
        {$user->persistent = $request->persistent;
            if ($user->roles->contains('name', PROFESSEUR_ROLE['name'])){
                return response()->json([
                    "success" => false,
                    "message" => "Invalid credentials"
                ], 401);
            } elseif ($user->roles->contains('name', PERSONNEL_ROLE['name'])){
                return response()->json([
                    "success" => false,
                    "message" => "Invalid credentials"
                ], 401);
            } elseif ($user->roles->contains('name', "Admin")){
                return response()->json([
                    "success" => false,
                    "message" => "Invalid credentials"
                ], 401);
            }

            if($user->roles->contains('name', ELEVE_ROLE['name'])){
                $user->model = $user->eleve;
            } elseif ($user->roles->contains('name', PARENT_ROLE['name'])){
                $user->model = $user->parents;
            }

            return response()->json([
                "success" => true,
                "message" => "Logged in successfully",
                "content" => [
                    'token' => $token,
                    'user' => $user,
                    ]
            ], 200);
        }
        
       /*  // on recupere les donnees personnel du user qui se connecte:
        if($user->roles->contains('name', ELEVE_ROLE['name'])){
            $user->model = $user->eleve;
        } elseif ($user->roles->contains('name', PARENT_ROLE['name'])){
            $user->model = $user->parents;
        } elseif ($user->roles->contains('name', PROFESSEUR_ROLE['name'])){
            $user->model = $user->professeur;
        } elseif ($user->roles->contains('name', PERSONNEL_ROLE['name'])){
            $user->model = $user->personnel;
        }
 */
        // send response
       /*  return response()->json([
            "success" => true,
            "message" => "Logged in successfully",
            "content" => [
                'token' => $token,
                'user' => $user,
                ]
        ], 200); */

        return response()->json([
            "success" => false,
            "message" => "Invalid credentials"
        ], 401);

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
        return response()->json(['data' => $user], 200);
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
