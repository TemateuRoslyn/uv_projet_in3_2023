<?php

namespace Database\Seeders;

use App\Models\Eleve;
use App\Models\Parents;
use App\Models\User;
use App\Models\Role;
use App\Models\Permission;


use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ParentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $eleves = Eleve::all();
$parents = [];
$cpt = 0;

foreach ($eleves as $eleve) {
    // Check if parent already exists for the current class
    $parent = $parents[$cpt] ?? null;

    // Create a new parent if not already existing or if it has already 2 eleves
    if (!$parent || $parent->eleves()->count() >= 2) {
        // Creation du user pour le parent
        $user = User::create([
            'email' => 'parent' . $eleve->id . '@example.com',
            'username' => 'parent' . $eleve->id,
            'password' => bcrypt('password'),
        ]);
        $firstName = 'Parent' . $eleve->id;
        $lastName = 'Lastname' . $eleve->id;
        $dateOfBirth = '2000/05/' . ($eleve->id + 2);
        $gender = $eleve->id % 2 === 0 ? 'Masculin' : 'Feminin';

        // Création du parent associé à l'utilisateur
        $parent = Parents::create([
            'profession' => 'Industriel',
            'firstName' => $firstName,
            'lastName' => $lastName,
            'dateDeNaissance' => $dateOfBirth,
            'lieuDeNaissance' => 'Nkong',
            'photo' => 'assets/avatars/parents/user.png',
            'sexe' => $gender,
            'telephone' => '+237666534899',
            'userId' => $user->id,
        ]);

        // Recuperer le rôle du parent
        $parentRole = Role::where('name', PARENT_ROLE['name'])->first();

        // Assigner le rôle
        if ($parentRole) {
            $user->roles()->attach($parentRole);
        }

        // Assigner les permissions du parent
        foreach (PARENT_PERMISSIONS as $permission) {
            $parentPermis = Permission::where('name', $permission['name'])->first();
            if ($parentPermis) {
                $user->permissions()->attach($parentPermis);
            }
        }

        // Store the parent in the array for future use
        $parents[$cpt] = $parent;
    }elseif($parent->eleves()->count() >= 1) {
        $cpt = $cpt +1;

    }

    // Check if the desired number of eleves is reached for this parent
    if ($parent->eleves()->count() >= 2) {
        continue; // Skip adding more eleves to this parent
    }

    // Associer l'eleve au parent
    $parent->eleves()->attach($eleve->id);
}

/* 
        $eleves = Eleve::all();
$parents = [];

foreach ($eleves as $eleve) {
    // Check if parent already exists for the current eleve
    $parent = $parents[$eleve->id] ?? null;

    if (!$parent) {
        // Creation du user pour le parent
        $user = User::create([
            'email' => 'parent' . $eleve->id . '@example.com',
            'username' => 'parent' . $eleve->id,
            'password' => bcrypt('password'),
        ]);

        $firstName = 'Parent' . $eleve->id;
        $lastName = 'Lastname' . $eleve->id;
        $dateOfBirth = '2000/05/' . ($eleve->id + 2);
        $gender = $eleve->id % 2 === 0 ? 'Masculin' : 'Feminin';

        // Création du parent associé à l'utilisateur
        $parent = Parents::create([
            'profession' => 'Industriel',
            'firstName' => $firstName,
            'lastName' => $lastName,
            'dateDeNaissance' => $dateOfBirth,
            'lieuDeNaissance' => 'Nkong',
            'photo' => 'assets/avatars/parents/user.png',
            'sexe' => $gender,
            'telephone' => '+237666534899',
            'userId' => $user->id,
        ]);

        // Recuperer le rôle du parent
        $parentRole = Role::where('name', PARENT_ROLE['name'])->first();

        // Assigner le rôle
        if ($parentRole) {
            $user->roles()->attach($parentRole);
        }

        // Assigner les permissions du parent
        foreach (PARENT_PERMISSIONS as $permission) {
            $parentPermis = Permission::where('name', $permission['name'])->first();
            if ($parentPermis) {
                $user->permissions()->attach($parentPermis);
            }
        }

        // Store the parent in the array for future use
        $parents[$eleve->id] = $parent;
    }

    // Associer l'eleve au parent
    $parent->eleves()->attach($eleve->id);
}
 */
       /*  //Creation du user
        $user = User::create([
            'email' => 'midas@example.com',
            'username' => 'dvlmonster',
            'password' => bcrypt('password'),
        ]);

        //recherche les eleves associes au parent
        $eleve = Eleve::find(1);
        $eleve1 = Eleve::find(2);

        // Création du parent associé à l'utilisateur
        $parent = Parents::create([
            'profession' => 'Industriel',
            'firstName' => 'Donfack',
            'lastName' => 'Midas',
            'dateDeNaissance' => '2000/05/2',
            'lieuDeNaissance' => 'nkong',
            'photo' => 'assets/avatars/parents/user.png',
            'sexe' => 'Masculin',
            'telephone' => '+237666534899',
            'userId' => $user->id,
        ]);

        //Associer le parent a ses eleves
        $parent->eleves()->attach([$eleve->id, $eleve1->id]);

        // Recuperer le rôle l'eleve
        $parentRole = Role::where('name', PARENT_ROLE['name'])->first();

        //assigner le role
        if ($parentRole) {
            $user->roles()->attach($parentRole);
        }


        foreach (PARENT_PERMISSIONS as $permission) {
            $parentPermis = Permission::where('name', $permission['name'])->first();
            if ($parentPermis) {
                $user->permissions()->attach($parentPermis);
            }
        } */
    }
}
