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
        //Creation du user
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
        }
    }
}
