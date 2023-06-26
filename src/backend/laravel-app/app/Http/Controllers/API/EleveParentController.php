<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class EleveParentController extends Controller
{
    public function ajouterRelation(Request $request)
    {
        // Valider les données de la requête
        $validatedData = $request->validate([
            'eleve_id' => 'required|integer|exists:eleves,id',
            'parent_id' => 'required|integer|exists:parents,id',
        ]);

        // Créer une nouvelle entrée dans la table pivot eleve_parent
        $eleve_parent = new EleveParent([
            'eleve_id' => $validatedData['eleve_id'],
            'parent_id' => $validatedData['parent_id'],
        ]);

        // Sauvegarder la nouvelle entrée dans la table pivot eleve_parent
        $eleve_parent->save();

        // Retourner une réponse de succès
        return response()->json([
            'status' => 'success',
            'message' => 'La relation a été ajoutée avec succès.'
        ], 201);
    }
}
