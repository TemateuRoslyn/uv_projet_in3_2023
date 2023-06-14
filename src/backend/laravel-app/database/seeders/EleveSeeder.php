<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\User;
use App\Models\Role;
use App\Models\Permission;
use App\Models\Eleve;
use App\Models\Classe;

class EleveSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $classe = Classe::find(1);
        $classe1 = Classe::find(30);

        $user = User::create([
            'email' => 'eleve1@example.com',
            'username' => 'eleve1',
            'password' => bcrypt('eleve1'),
        ]);

        $user2 = User::create([
            'email' => 'eleve2@example.com',
            'username' => 'eleve2',
            'password' => bcrypt('eleve2'),
        ]);

        // Création du eleve associé à l'utilisateur et au cour
        Eleve::create([
            'firstName' => 'Roslyn',
            'lastName' => 'Maestros',
            'dateDeNaissance' => '2000/05/2',
            'lieuDeNaissance' => 'nkong',
            'photo' => 'assets/avatars/eleves/maestros.JPG',
            'sexe' => 'Masculin',
            'telephone' => '+237666534899',
            'solvable' => true,
            'redoublant' => false,
            'userId' => $user->id,
            'classeId' => $classe->id,
        ]);

        Eleve::create([
            'firstName' => 'Eleve 2',
            'lastName' => 'Tonfack Rieman',
            'dateDeNaissance' => '2000/05/2',
            'lieuDeNaissance' => 'nkong',
            'photo' => 'assets/avatars/eleves/user.png',
            'sexe' => 'Masculin',
            'telephone' => '+237666534899',
            'solvable' => true,
            'redoublant' => false,
            'userId' => $user2->id,
            'classeId' => $classe1->id,
        ]);

        // update de la classe 
        $classe->update([
            'name' => $classe->name,
            'shortName' => $classe->shortName,
            'speciality' => $classe->speciality,
            'no' => $classe->no,
            'effectif' => ++$classe->effectif,
        ]);
        $classe1->update([
            'name' => $classe1->name,
            'shortName' => $classe1->shortName,
            'speciality' => $classe1->speciality,
            'no' => $classe1->no,
            'effectif' => ++$classe1->effectif,
        ]);

        // Recuperer le rôle l'eleve
        $eleveRole = Role::where('name', ELEVE_ROLE['name'])->first();

        //assigner le role
        if ($eleveRole) {
            $user->roles()->attach($eleveRole);
            $user2->roles()->attach($eleveRole);
        }
        
        //assigner les permissions des profs
        foreach (PROFESSEUR_PERMISSIONS as $permission) {
            $elevePermis = Permission::where('name', $permission['name'])->first();
            if ($elevePermis) {
                $user->permissions()->attach($elevePermis);
                $user2->permissions()->attach($elevePermis);
            }
        }
    }
}
