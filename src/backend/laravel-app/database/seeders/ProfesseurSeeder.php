<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use App\Models\Cour;
use App\Models\User;
use App\Models\Professeur;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProfesseurSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        // Création de l'utilisateur
        $user = User::create([
            'email' => 'professeur@example.com',
            'username' => 'professeurname',
            'password' => bcrypt('password'),
        ]);

        // Création du cour
        $cour = Cour::create([
            'libelle' => 'Histoire',
            'date_cour' => '2023-01-04',
            'heure_debut' => '2023-01-05',
            'heure_fin' => '2023-01-06',

        ]);

        // Création du professeur associé à l'utilisateur et au cour
        Professeur::create([
            'statut' => 'Actif',
            'first_name' => 'professeurName',
            'last_name' => 'professeurLastName ',
            'date_de_naissance' => '2000/05/2',
            'lieu_de_naissance' => 'nkong',
            'photo' => 'photo.png',
            'sexe' => 'm',
            'telephone' => '+237666534899',
            'user_id' => $user->id,
            'cour_id' => $cour->id,
        ]);



        // Recuperer le rôle professeur
        $professeurRole = Role::where('name', PROFESSEUR_ROLE['name'])->first();

        //assigner le role
        if ($professeurRole) {
            $user->roles()->attach($professeurRole);
        }
        
        //assigner les permissions des profs
        foreach (PROFESSEUR_PERMISSIONS as $permission) {
            $professeurPermis = Permission::where('name', $permission['name'])->first();
            if ($professeurPermis) {
                $user->permissions()->attach($professeurPermis);
            }
        }
    }
}
