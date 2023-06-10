<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\User;
use App\Models\Role;
use App\Models\Permission;
use App\Models\Eleve;

class EleveSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $user = User::create([
            'email' => 'eleve1@example.com',
            'username' => 'eleve1',
            'password' => bcrypt('eleve1'),
        ]);

        // Création du eleve associé à l'utilisateur et au cour
        Eleve::create([
            'first_name' => 'Roslyn',
            'last_name' => 'Maestros',
            'date_de_naissance' => '2000/05/2',
            'lieu_de_naissance' => 'nkong',
            'photo' => 'photo.png',
            'sexe' => 'm',
            'telephone' => '+237666534899',
            'solvable' => true,
            'redoublant' => false,
            'user_id' => $user->id,
        ]);

        // Recuperer le rôle l'eleve
        $eleveRole = Role::where('name', ELEVE_ROLE['name'])->first();

        //assigner le role
        if ($eleveRole) {
            $user->roles()->attach($eleveRole);
        }
        
        //assigner les permissions des profs
        foreach (PROFESSEUR_PERMISSIONS as $permission) {
            $elevePermis = Permission::where('name', $permission['name'])->first();
            if ($elevePermis) {
                $user->permissions()->attach($elevePermis);
            }
        }
    }
}
