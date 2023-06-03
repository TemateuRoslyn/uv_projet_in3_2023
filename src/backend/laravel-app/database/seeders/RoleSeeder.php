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
        $consulter_info_eleve = Permission::where('name', 'consulter_info_eleve')->first();
        $suggerer = Permission::where('name', 'suggerer')->first();
        $consulter_info_conseil_d = Permission::where('name', 'consulter_info_conseil_d')->first();
        $consulter_info_membre_conseil = Permission::where('name', 'consulter_info_membre_conseil')->first();
        $consulter_convocation = Permission::where('name', 'consulter_convocation')->first();
        $demande_reparation = Permission::where('name', 'demande_reparation')->first();
        $creer_notification = Permission::where('name', 'creer_notification')->first();
        $creer_conseil = Permission::where('name', 'creer_conseil')->first();
        $modifier_conseil = Permission::where('name', 'modifier_conseil')->first();
        $supprimer_conseil = Permission::where('name', 'supprimer_conseil')->first();
        $creer_convocation = Permission::where('name', 'creer_convocation')->first();
        $modifier_convocation = Permission::where('name', 'modifier_convocation')->first();
        $supprimer_convocation = Permission::where('name', 'supprimer_convocation')->first();
        $creer_eleve = Permission::where('name', 'creer_eleve')->first();
        $modifier_eleve = Permission::where('name', 'modifier_eleve')->first();
        $supprimer_eleve = Permission::where('name', 'supprimer_eleve')->first();
        $consulter_info_parent = Permission::where('name', 'consulter_info_parent')->first();
        $creer_parent = Permission::where('name', 'creer_parent')->first();
        $modifier_parent = Permission::where('name', 'modifier_parent')->first();
        $supprimer_parent = Permission::where('name', 'supprimer_parent')->first();
        $consulter_info_professeur = Permission::where('name', 'consulter_info_professeur')->first();
        $creer_professeur = Permission::where('name', 'creer_professeur')->first();
        $modifier_professeur = Permission::where('name', 'modifier_professeur')->first();
        $supprimer_professeur = Permission::where('name', 'supprimer_professeur')->first();
        $consulter_info_personnel = Permission::where('name', 'consulter_info_personnel')->first();
        $creer_personnel = Permission::where('name', 'creer_personnel')->first();
        $modifier_personnel = Permission::where('name', 'modifier_personnel')->first();
        $supprimer_personnel = Permission::where('name', 'supprimer_personnel')->first();
        $creer_faute = Permission::where('name', 'creer_faute')->first();
        $modifier_faute = Permission::where('name', 'modifier_faute')->first();
        $supprimer_faute = Permission::where('name', 'supprimer_faute')->first();
        $creer_cours = Permission::where('name', 'creer_cours')->first();
        $modifier_cours = Permission::where('name', 'modifier_cours')->first();
        $supprimer_cours = Permission::where('name', 'supprimer_cours')->first();
        $creer_classe = Permission::where('name', 'creer_classe')->first();
        $modifier_classe = Permission::where('name', 'modifier_classe')->first();
        $supprimer_classe = Permission::where('name', 'supprimer_classe')->first();
        $creer_regle = Permission::where('name', 'creer_regle')->first();
        $modifier_regle = Permission::where('name', 'modifier_regle')->first();
        $supprimer_regle = Permission::where('name', 'supprimer_regle')->first();
        $creer_reglement_interieure = Permission::where('name', 'creer_reglement_interieure')->first();
        $modifier_reglement_interieure = Permission::where('name', 'modifier_reglement_interieure')->first();
        $supprimer_reglement_interieure = Permission::where('name', 'supprimer_reglement_interieure')->first();
        $creer_sanction = Permission::where('name', 'creer_sanction')->first();
        $modifier_sanction = Permission::where('name', 'modifier_sanction')->first();
        $supprimer_sanction = Permission::where('name', 'supprimer_sanction')->first();

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
            [
                'name' => 'parent',
                'description' => 'Parent',
                'permissions' => [$consulter_info_eleve,$suggerer],
            ],
            [
                'name' => 'eleve',
                'description' => 'Eleve',
                'permissions' => [
                    $consulter_info_conseil_d,
                    $consulter_info_membre_conseil,
                    $consulter_convocation,
                    $demande_reparation,
                    $suggerer
                ],
            ],
            [
                'name' => 'professeur',
                'description' => 'Professeur',
                'permissions' => [
                    $consulter_info_conseil_d,
                    $consulter_info_membre_conseil,
                    $consulter_info_eleve,
                    $suggerer
                ],
            ],
            [
                'name' => 'personnel',
                'description' => 'Personnel',
                'permissions' => [
                    $creer_notification,
                    $creer_conseil,
                    $consulter_info_conseil_d,
                    $modifier_conseil,
                    $supprimer_conseil,
                    $creer_convocation,
                    $consulter_convocation,
                    $modifier_convocation,
                    $supprimer_convocation,
                    $creer_eleve,
                    $consulter_info_eleve,
                    $modifier_eleve,
                    $supprimer_eleve,
                    $consulter_info_parent,
                    $creer_parent,
                    $modifier_parent,
                    $supprimer_parent,
                    $consulter_info_professeur,
                    $creer_professeur,
                    $modifier_professeur,
                    $supprimer_professeur,
                    $consulter_info_personnel,
                    $creer_personnel,
                    $modifier_personnel,
                    $supprimer_personnel,
                    $creer_faute,
                    $modifier_faute,
                    $supprimer_faute,
                    $creer_cours,
                    $modifier_cours,
                    $supprimer_cours,
                    $creer_classe,
                    $modifier_classe,
                    $supprimer_classe,
                    $creer_regle,
                    $modifier_regle,
                    $supprimer_regle,
                    $creer_reglement_interieure,
                    $modifier_reglement_interieure,
                    $supprimer_reglement_interieure,
                    $creer_sanction,
                    $modifier_sanction,
                    $supprimer_sanction,
                ],
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
