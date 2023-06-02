<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;
use App\Models\Permission;

class RoleSeeder extends Seeder
{
    /**
     * Run the seeder.
     *
     * @return void
     */
    public function run()
    {

        // Récupérer les permissions associées aux rôles
        $deleteUserPermission = Permission::where('name', 'delete_user')->first();
        $createUserPermission = Permission::where('name', 'create_user')->first();
        $updateUserInfos = Permission::where('name', 'update_user_infos')->first();

        // Créer les nouveaux rôles
        $roles = [
            [
                'name' => 'admin',
                'description' => 'Administrateur',
                'permissions' => [$deleteUserPermission, $createUserPermission, $updateUserInfos],
            ],
            [
                'name' => 'manager',
                'description' => 'Manager',
                'permissions' => [$createUserPermission],
            ],
            [
                'name' => 'user',
                'description' => 'Utilisateur',
                'permissions' => [],
            ],
        ];

        // Insérer les rôles dans la base de données
        foreach ($roles as $roleData) {

                $role = Role::updateOrCreate([
                    'name' => $roleData['name'],
                    'description' => $roleData['description'],
                ]);

                foreach($roleData['permissions'] as $perm){
                    $role->permissions()->attach($perm);
                }
    
        }
    }
}
