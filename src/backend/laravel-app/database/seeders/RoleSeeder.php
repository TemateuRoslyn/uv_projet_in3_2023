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

        // LES PERMISSIONS

        $USER_PERMISSIONS = [];
        $ELEVE_PERMISSIONS = [];
        $PARENT_PERMISSIONS = [];
        $PROFESSEUR_PERMISSIONS = [];
        $PERSONNEL_PERMISSIONS = [];
        $ADMINITRATEUR_PERMISSIONS = [];


        // CREATE PERMISSIONS

        foreach (USER_PERMISSIONS as $permission) {
            $USER_PERMISSIONS = [
                ...$USER_PERMISSIONS,
                Permission::updateOrCreate([
                    'name' => $permission['name'],
                    'description' => $permission['description'],
                    'status' => STATE_ACTIVATED
                ])
            ];
        }
        foreach (ELEVE_PERMISSIONS as $permission) {
            $ELEVE_PERMISSIONS = [
                ...$ELEVE_PERMISSIONS,
                Permission::updateOrCreate([
                    'name' => $permission['name'],
                    'description' => $permission['description'],
                    'status' => STATE_ACTIVATED
                ])
            ];
        }
        foreach (PARENT_PERMISSIONS as $permission) {
            $PARENT_PERMISSIONS = [
                ...$PARENT_PERMISSIONS,
                Permission::updateOrCreate([
                    'name' => $permission['name'],
                    'description' => $permission['description'],
                    'status' => STATE_ACTIVATED
                ])
            ];
        }
        foreach (PROFESSEUR_PERMISSIONS as $permission) {
            $PROFESSEUR_PERMISSIONS = [
                ...$PROFESSEUR_PERMISSIONS,
                Permission::updateOrCreate([
                    'name' => $permission['name'],
                    'description' => $permission['description'],
                    'status' => STATE_ACTIVATED
                ])
            ];
        }
        foreach (PERSONNEL_PERMISSIONS as $permission) {
            $PERSONNEL_PERMISSIONS = [
                ...$PERSONNEL_PERMISSIONS,
                Permission::updateOrCreate([
                    'name' => $permission['name'],
                    'description' => $permission['description'],
                    'status' => STATE_ACTIVATED
                ])
            ];
        }
        foreach (ADMINITRATEUR_PERMISSIONS as $permission) {
            $ADMINITRATEUR_PERMISSIONS = [
                ...$ADMINITRATEUR_PERMISSIONS,
                Permission::updateOrCreate([
                    'name' => $permission['name'],
                    'description' => $permission['description'],
                    'status' => STATE_ACTIVATED
                ])
            ];
        }


        // CREATE ROLES

        $USER_ROLE       = Role::updateOrCreate([...USER_ROLE, 'status' => STATE_ACTIVATED]);
        $ELEVE_ROLE      = Role::updateOrCreate([...ELEVE_ROLE, 'status' => STATE_ACTIVATED]);
        $PARENT_ROLE     = Role::updateOrCreate([...PARENT_ROLE, 'status' => STATE_ACTIVATED]);
        $PROFESSEUR_ROLE = Role::updateOrCreate([...PROFESSEUR_ROLE, 'status' => STATE_ACTIVATED]);
        $PERSONNEL_ROLE  = Role::updateOrCreate([...PERSONNEL_ROLE, 'status' => STATE_ACTIVATED]);
        $ADMIN_ROLE      = Role::updateOrCreate([...ADMIN_ROLE, 'status' => STATE_ACTIVATED]);

        // ASSIGN ROLE TO PERMISSIONS

        foreach($USER_PERMISSIONS as $perm){
            $USER_ROLE->permissions()->attach($perm);
        }
        foreach($ELEVE_PERMISSIONS as $perm){
            $ELEVE_ROLE->permissions()->attach($perm);
        }
        foreach($PARENT_PERMISSIONS as $perm){
            $PARENT_ROLE->permissions()->attach($perm);
        }
        foreach($PROFESSEUR_PERMISSIONS as $perm){
            $PROFESSEUR_ROLE->permissions()->attach($perm);
        }
        foreach($PERSONNEL_PERMISSIONS as $perm){
            $PERSONNEL_ROLE->permissions()->attach($perm);
        }
        foreach($ADMINITRATEUR_PERMISSIONS as $perm){
            $ADMIN_ROLE->permissions()->attach($perm);
        }

    }
}
