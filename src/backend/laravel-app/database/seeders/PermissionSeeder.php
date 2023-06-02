<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Permission;

class PermissionSeeder extends Seeder
{
    public function run()
    {
        $permissions = [
            [
                'name' => 'delete_user',
                'description' => 'Supprimer un utilisateur',
            ],
            [
                'name' => 'create_user',
                'description' => 'Créer un utilisateur',
            ],
            [
                'name' => 'update_user_infos',
                'description' => 'Mettre à jour les informations d\'utilisateur',
            ],
        ];

        foreach ($permissions as $permission) {
            Permission::updateOrCreate([
                'name' => $permission['name'],
                'description' => $permission['description'],
            ]);

        }
    }
}
