<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Role;

class UserSeeder extends Seeder
{
    /**
     * Run the seeder.
     *
     * @return void
     */
    public function run()
    {


        
        $user = User::create([
            'name' => 'maestros',
            'email' => 'maestros@gmail.com',
            'password' => bcrypt('maestros'),
            'first_name' => 'John',
            'last_name' => 'Doe',
            'date_de_naissance' => '1990-01-01',
            'lieu_de_naissance' => 'Paris',
            'photo' => 'admin.jpg',
            'sexe' => 'M',
            'telephone' => '1234567890',
        ]);
        
        // Créer un utilisateur de base avec le rôle d'administrateur
        $adminRole = Role::where('name', 'admin')->first();

        
        $user->roles()->attach($adminRole);
        
    }
}
