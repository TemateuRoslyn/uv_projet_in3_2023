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
            [
                'name' => 'consulter_info_eleve',
                'description' => 'Consulter les informations d\'un eleve',
            ],
            [
                'name' => 'suggerer',
                'description' => 'Envoyer des messages dans la boite a suggestion',
            ],
            [
                'name' => 'consulter_info_conseil_d',
                'description' => 'Consuter les informations du conseil de discipline',
            ],
            [
                'name' => 'consulter_info_membre_conseil',
                'description' => 'Consulter les info des membre du conseil de discipline',
            ],
            [
                'name' => 'consulter_convocation',
                'description' => 'Consulter une convocation',
            ],
            [
                'name' => 'demande_reparation',
                'description' => 'Demarche de mediation',
            ],
            [
                'name' => 'creer_notification',
                'description' => 'Creer une notification',
            ],
            [
                'name' => 'creer_conseil',
                'description' => 'Creer un conseil de discipline',
            ],
            [
                'name' => 'modifier_conseil',
                'description' => 'Modifier les info d\'un conseil de discipline',
            ],
            [
                'name' => 'supprimer_conseil',
                'description' => 'Supprimer un conseil',
            ],
            [
                'name' => 'creer_convocation',
                'description' => 'Creer une convocation',
            ],
            [
                'name' => 'modifier_convocation',
                'description' => 'Modifier les info d\'une convocation',
            ],
            [
                'name' => 'supprimer_convocation',
                'description' => 'supprimer une convocation',
            ],
            [
                'name' => 'creer_eleve',
                'description' => 'Creer un eleve',
            ],
            [
                'name' => 'modifier_eleve',
                'description' => 'Modifier un eleve',
            ],
            [
                'name' => 'supprimer_eleve',
                'description' => 'Supprimer un eleve',
            ],
            [
                'name' => 'consulter_info_parent',
                'description' => 'Consulter les info d\'un parent',
            ],
            [
                'name' => 'creer_parent',
                'description' => 'Creer un parent',
            ],
            [
                'name' => 'modifier_parent',
                'description' => 'Modifier les info d\'un parent',
            ],
            [
                'name' => 'supprimer_parent',
                'description' => 'Supprimer un parent',
            ],
            [
                'name' => 'consulter_info_professeur',
                'description' => 'Consulter les info d\'un professeur',
            ],
            [
                'name' => 'creer_professeur',
                'description' => 'Creer un professeur',
            ],
            [
                'name' => 'modifier_professeur',
                'description' => 'Modifier les info d\'un professeur',
            ],
            [
                'name' => 'supprimer_professeur',
                'description' => 'Supprimer un professeur',
            ],
            [
                'name' => 'consulter_info_personnel',
                'description' => 'Consulter les info d\'un personnel',
            ],
            [
                'name' => 'creer_personnel',
                'description' => 'Creer un personnel',
            ],
            [
                'name' => 'modifier_personnel',
                'description' => 'Modifier les info d\'un personnel',
            ],
            [
                'name' => 'supprimer_personnel',
                'description' => 'Supprimer un personnel',
            ],
            [
                'name' => 'creer_faute',
                'description' => 'Creer une faute',
            ],
            [
                'name' => 'modifier_faute',
                'description' => 'Modifier les info d\'une faute',
            ],
            [
                'name' => 'supprimer_faute',
                'description' => 'Supprimer une faute',
            ],
            [
                'name' => 'creer_cours',
                'description' => 'Creer un cours',
            ],
            [
                'name' => 'modifier_cours',
                'description' => 'Modifier les info d\'un cours',
            ],
            [
                'name' => 'supprimer_cours',
                'description' => 'Supprimer un cours',
            ],
            [
                'name' => 'creer_classe',
                'description' => 'Creer une classe',
            ],
            [
                'name' => 'modifier_classe',
                'description' => 'Modifier les info d\'une classe',
            ],
            [
                'name' => 'supprimer_classe',
                'description' => 'Supprimer une classe',
            ],
            [
                'name' => 'creer_regle',
                'description' => 'Creer une regle',
            ],
            [
                'name' => 'modifier_regle',
                'description' => 'Modifier les info d\'une regle',
            ],
            [
                'name' => 'supprimer_regle',
                'description' => 'Supprimer une regle',
            ],
            [
                'name' => 'creer_reglement_interieure',
                'description' => 'Creer un reglement interieure',
            ],
            [
                'name' => 'modifier_reglement_interieure',
                'description' => 'Modifier les info d\'un reglement interieure',
            ],
            [
                'name' => 'supprimer_reglement_interieure',
                'description' => 'Supprimer un reglement interieure',
            ],
            [
                'name' => 'creer_sanction',
                'description' => 'Creer une sanction',
            ],
            [
                'name' => 'modifier_sanction',
                'description' => 'Modifier les info d\'une sanction',
            ],
            [
                'name' => 'supprimer_sanction',
                'description' => 'Supprimer une sanction',
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
