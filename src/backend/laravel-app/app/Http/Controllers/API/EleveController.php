<?php

namespace App\Http\Controllers\API;

use Carbon\Carbon;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

use App\Http\Controllers\Controller;

use App\Models\Eleve;
use App\Models\User;
use App\Models\Role;

class EleveController extends Controller
{

    private $avatar_path = "assets/avatars/eleves" ;

    public function index()
    {
        $eleves = Eleve::get()->map(function ($eleve) {
                                $user = User::find($eleve->user_id);
                                $eleve->assignUserFields($user);
                                return $eleve;
                            });
    
        return response()->json([
            'message' => 'Liste des élèves', 
            'success' => true,
            'data' => $eleves]);
    }

    public function read($eleveId)
    {
        $eleve = Eleve::find($eleveId);
        
        if ($eleve) {
            $user = User::find($eleve->user_id);
             // on cahrge les champ de l'entite user associee
            $eleve->assignUserFields($user);

            return response()->json([
                'message' => 'élève trouvé(e)',
                'success' => true,
                'data' => $eleve
            ], 200);
        } else {
            // L'élève n'a pas été trouvé
            return response()->json([
                'message' => 'Élève non trouvé',
                'success' => false,
            ], 404);
        }
    }
    

    public function store(Request $request)
    {

        $request->validate([
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8',
            'name' => 'required',
            'first_name' => 'required',
            'last_name' => 'required',
            'date_de_naissance' => 'required|date',
            'lieu_de_naissance' => 'required',
            'photo' => 'nullable|image',
            'sexe' => 'required',
            'telephone' => 'required',
            'solvable' => 'required',
            'redoublant' => 'required',
        ]);
        
        $user = User::create([
            'email' => $request->input('email'),
            'password' => bcrypt($request->input('password')),
            'name' => $request->input('name'),
            'first_name' => $request->input('first_name'),
            'last_name' => $request->input('last_name'),
            'date_de_naissance' => $request->input('date_de_naissance'),
            'lieu_de_naissance' => $request->input('lieu_de_naissance'),
            'photo' => $request->file('photo') ? $request->file('photo')->store($this->avatar_path) : null,
            'sexe' => $request->input('sexe'),
            'telephone' => $request->input('telephone'),
        ]);
        
        $eleve = Eleve::create([
            'user_id' => $user->id,
            'solvable' => boolval($request->input('solvable')),
            'redoublant' => boolval($request->input('redoublant'))
        ]);

        // on cahrge les champ de l'entite user associee
        $eleve->assignUserFields($user);
        
        // Créer un eleve de base avec le rôle eleve
        $eleveRole = Role::where('name', 'student')->first();

        $user->roles()->attach($eleveRole);


        return response()->json([
            'message' => 'Eleve created successfully', 
            'success' => true,
            'data' => $eleve
        ]);
    }

    public function update(Request $request)
    {
        // on récupère l'élève associé
        $eleveFound = Eleve::find($request->id);
        $user = User::find($eleveFound->user_id);

        $request->validate([
            'id' => 'required',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'password' => 'required|min:8',
            'name' => 'required',
            'first_name' => 'required',
            'last_name' => 'required',
            'date_de_naissance' => 'required|date',
            'lieu_de_naissance' => 'required',
            'photo' => 'nullable|image',
            'sexe' => 'required',
            'telephone' => 'required',
            'solvable' => 'required',
            'redoublant' => 'required',
        ]);

        // Mise à jour des champs de l'objet User
        $user->email = $request->input('email');
        $user->password = bcrypt($request->input('password'));
        $user->name = $request->input('name');
        $user->first_name = $request->input('first_name');
        $user->last_name = $request->input('last_name');
        $user->date_de_naissance = $request->input('date_de_naissance');
        $user->lieu_de_naissance = $request->input('lieu_de_naissance');
        $user->sexe = $request->input('sexe');
        $user->telephone = $request->input('telephone');
        
        // Suppression de l'ancienne photo si une nouvelle a été sélectionnée
        if ($request->hasFile('photo')) {
            $oldPhoto = $user->photo;
            if ($oldPhoto) {
                Storage::delete($oldPhoto);
            }
            $user->photo = $request->file('photo')->store($this->avatar_path);
        }

        $user->save();

        // Mise à jour des champs de l'objet Eleve
        $eleveFound->solvable = boolval($request->input('solvable'));
        $eleveFound->redoublant = boolval($request->input('redoublant'));
        $eleveFound->save();

        // on cahrge les champ de l'entite user associee
        $eleveFound->assignUserFields($user);

        return response()->json([
            'message' => 'Eleve updated successfully', 
            'success' => true,
            'data' => $eleveFound
        ]);
    }



    public function delete($eleveId)
    {
        $eleveFound = Eleve::find($eleveId);
        
        if($eleveFound){
            
            //le user associe
            $userFound = User::find($eleveFound->user_id);

            // supperssion de l'image du user
            Storage::delete($userFound->photo);

            //suppression de l'eleve
            $eleveFound->delete();

            return response()->json([
                'message' => 'Eleve deleted successfully',
                'success' => true, 
            ]);
        }else {
            return response()->json([
                'message' => 'Eleve to delete was not found',
                'success' => false,
            ]);
        }
    }
}
