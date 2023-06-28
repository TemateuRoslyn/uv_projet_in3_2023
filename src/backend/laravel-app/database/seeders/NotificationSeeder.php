<?php

namespace Database\Seeders;

use App\Models\Notification;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class NotificationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::create([
            'email' => 'perso1@example.com',
            'username' => 'perso1',
            'password' => bcrypt('perso1'),
        ]);

        $user2 = User::create([
            'email' => 'perso2@example.com',
            'username' => 'perso2',
            'password' => bcrypt('perso2'),
        ]);

        // Création d'une notification associé à l'utilisateur
        Notification::create([
            'libelle' => 'Exams',
            'view' => 1,
            'userId' => $user->id,
        ]);

        Notification::create([
            'libelle' => 'Results',
            'view' => 2,
            'userId' => $user2->id,
        ]);

    }
}
