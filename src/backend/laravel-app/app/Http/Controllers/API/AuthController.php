<?php

namespace App\Http\Controllers\API;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Role;

class AuthController extends Controller
{
    /**
     * Inscription d'un nouvel utilisateur
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|unique:users|max:255',
            'password' => 'required|string|min:6',
            'name' => 'required|string|max:255',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'date_de_naissance' => 'required|date',
            'lieu_de_naissance' => 'required|string|max:255',
            'photo' => 'nullable|string',
            'sexe' => 'required|in:Male,Female',
            'telephone' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $user = User::create([
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'name' => $request->name,
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'date_de_naissance' => $request->date_de_naissance,
            'lieu_de_naissance' => $request->lieu_de_naissance,
            'photo' => $request->photo,
            'sexe' => $request->sexe,
            'telephone' => $request->telephone,
        ]);

        // Créer un utilisateur de base avec le rôle user
        $userRole = Role::where('name', 'user')->first();

        $user->roles()->attach($userRole);

        $token = $user->createToken('API Token')->accessToken;

        return response()->json(['token' => $token], 200);
    }

    /**
     * Connexion d'un utilisateur existant
     */
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('API Token')->accessToken;

            return response()->json(['token' => $token], 200);
        } else {
            return response()->json(['error' => 'Invalid credentials'], 401);
        }
    }

    /**
     * Récupération des informations de l'utilisateur authentifié
     */
    public function user(Request $request)
    {
        $user = $request->user();

        return response()->json(['user' => $user], 200);
    }

    /**
     * Déconnexion de l'utilisateur authentifié
     */
    public function logout(Request $request)
    {
        $request->user()->token()->revoke();

        return response()->json(['message' => 'Logged out successfully'], 200);
    }
}
