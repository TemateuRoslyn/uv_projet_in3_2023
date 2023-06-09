<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

use App\Models\User;
use App\Models\Eleve;

class CheckRoles
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$roles)
    {
        // Votre logique de vérification du rôle ou de la permission ici
        if ($request->user() && !$request->user()->hasAnyRoles($roles)) {
            return response()->json([
                'success' => false,
                'message' => 'Votre role est insuffisant pour exploiter cette ressource !',
            ], 403);
        } else if($request->user() == null){
            return response()->json([
                'success' => false,
                'message' => 'Veuillez vous authentifier',
            ], 403);
        }
        return $next($request);
    }


}
