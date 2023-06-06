<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckPermissions
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $permision)
    {
   
        // Votre logique de vérification du rôle ou de la permission ici
        
        if ($request->user() && !$request->user()->hasPermission($permision)) {
            return response()->json([
                'message' => 'Pour exploiter cette ressource vous denez disposer de la permission "'.ucfirst($permision).'".',
            ], 403);
        } else if($request->user() == null){
            return response()->json([
                'message' => 'Veuillez vous authentifier',
            ], 403);
        }

        return $next($request);
    }
}
