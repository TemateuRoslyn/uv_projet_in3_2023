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
    public function handle(Request $request, Closure $next, ...$permisions)
    {
   
        // Votre logique de vérification du rôle ou de la permission ici
        
        if ($request->user() && !$request->user()->hasAnyPermissions($permisions)) {
            return response()->json([
                'success' => false,
                'message' => 'Permission insuffisante !',
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
