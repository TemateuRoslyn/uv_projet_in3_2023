<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use App\Models\Cour;
use App\Models\Classe;
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
        // Création de l'utilisateur
        $user1 = User::create([
            'email' => 'kratos@example.com',
            'username' => 'kratos',
            'password' => bcrypt('kratos'),
        ]);
        // Création de l'utilisateur
        $user2 = User::create([
            'email' => 'cesar@example.com',
            'username' => 'cesar',
            'password' => bcrypt('cesar'),
        ]);
        // Création de l'utilisateur
        $user3 = User::create([
            'email' => 'lucie@example.com',
            'username' => 'lucie',
            'password' => bcrypt('lucie'),
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
            'statut' => 'CENSEUR',
            'firstName' => 'professeurName',
            'lastName' => 'professeurLastName ',
            'dateDeNaissance' => '2000/05/2',
            'lieuDeNaissance' => 'nkong',
            'photo' => 'photo.png',
            'sexe' => 'm',
            'telephone' => '+237666534899',
            'userId' => $user->id,
            'courId' => $cour->id,
        ]);
        // Création du professeur associé à l'utilisateur et au cour
        Professeur::create([
            'statut' => 'CENSEUR',
            'firstName' => 'professeurName',
            'lastName' => 'professeurLastName ',
            'dateDeNaissance' => '2000/05/2',
            'lieuDeNaissance' => 'nkong',
            'photo' => 'photo.png',
            'sexe' => 'm',
            'telephone' => '+237666534899',
            'userId' => $user1->id,
            'courId' => 1,
        ]);
        // Création du professeur associé à l'utilisateur et au cour
        Professeur::create([
            'statut' => 'CENSEUR',
            'firstName' => 'professeurName',
            'lastName' => 'professeurLastName ',
            'dateDeNaissance' => '2000/05/2',
            'lieuDeNaissance' => 'nkong',
            'photo' => 'photo.png',
            'sexe' => 'm',
            'telephone' => '+237666534899',
            'userId' => $user2->id,
            'courId' => 2,
        ]);
        // Création du professeur associé à l'utilisateur et au cour
        Professeur::create([
            'statut' => 'CENSEUR',
            'firstName' => 'professeurName',
            'lastName' => 'professeurLastName ',
            'dateDeNaissance' => '2000/05/2',
            'lieuDeNaissance' => 'nkong',
            'photo' => 'photo.png',
            'sexe' => 'm',
            'telephone' => '+237666534899',
            'userId' => $user3->id,
            'courId' => 3,
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
