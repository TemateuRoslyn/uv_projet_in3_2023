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
            'email' => 'maestros@gmail.com',
            'password' => bcrypt('maestros'),
        ]);
        
        // Créer un utilisateur de base avec le rôle d'administrateur
        $adminRole = Role::where('name', 'admin')->first();

        
        $user->roles()->attach($adminRole);
        
    }
}
