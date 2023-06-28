<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Personnel;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PersonnelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::create([
            'email' => 'personnel1@example.com',
            'username' => 'personnel1',
            'password' => bcrypt('personnel1'),
        ]);

        $user2 = User::create([
            'email' => 'personel2@example.com',
            'username' => 'personnel2',
            'password' => bcrypt('personnel2'),
        ]);

        // Création d'un personnel associé à l'utilisateur
        Personnel::create([
            'firstName' => 'Roslyn',
            'lastName' => 'Maestros',
            'dateDeNaissance' => '2000/05/2',
            'lieuDeNaissance' => 'nkong',
            'photo' => 'assets/avatars/eleves/maestros.JPG',
            'sexe' => 'Masculin',
            'telephone' => '+237666534899',
            'fonction' => 'Censeur',
            'userId' => $user->id,
        ]);

        Personnel::create([
            'firstName' => 'Personnel 2',
            'lastName' => 'Tonfack Rieman',
            'dateDeNaissance' => '2000/05/2',
            'lieuDeNaissance' => 'nkong',
            'photo' => 'assets/avatars/eleves/user.png',
            'sexe' => 'Masculin',
            'telephone' => '+237666534899',
            'fonction' => 'Proviseur',
            'userId' => $user2->id,
        ]);

        // Recuperer le rôle du personnel
        $personnelRole = Role::where('name', PERSONNEL_ROLE['name'])->first();

        //assigner le role
        if ($personnelRole) {
            $user->roles()->attach($personnelRole);
            $user2->roles()->attach($personnelRole);
        }

        //assigner les permissions des personnels
        foreach (PERSONNEL_PERMISSIONS as $permission) {
            $personnelPermis = Permission::where('name', $permission['name'])->first();
            if ($personnelPermis) {
                $user->permissions()->attach($personnelPermis);
                $user2->permissions()->attach($personnelPermis);
            }
        }
    }
}
