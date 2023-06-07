<?php


/**
 *                     NOTATION IMPORTANTES
 *============================================================
 *    CRUD:  add, list, read, delete et update la selection
 *    LD:    list et read la selection
 */


 /**
 *                LISTE DES PERMISSIONS DU SYSTEME
 *============================================================
 *
 */


/**
 *  USER_PERMISSIONS
 */
$USER_PERMISSIONS = [
    [
        'name' => 'update_user_infos',
        'description' => 'Mettre à jour les informations d\'utilisateure',
    ],
];


/**
 * ELEVE_PERMISSIONS
 */
$ELEVE_PERMISSIONS = [
    ...$USER_PERMISSIONS,
    [
        'name' => 'consulter_info_conseil_d',
        'description' => 'Consuter les informations du conseil de discipline',
    ],
    [
        'name' => 'demande_reparation',
        'description' => 'Demarche de mediation',
    ],
    [
        'name' => 'consulter_convocation',
        'description' => 'Consulter une convocation',
    ],
    [
        'name' => 'consulter_info_membre_conseil',
        'description' => 'Consulter les info des membre du conseil de discipline',
    ],
    [
        'name' => 'suggerer',
        'description' => 'Envoyer des messages dans la boite a suggestion',
    ],
];

/**
 *  PARENT_PERMISSIONS
 */
$PARENT_PERMISSIONS = [
    ...$ELEVE_PERMISSIONS,
    [
        'name' => 'consulter_info_eleve',
        'description' => 'Consulter les informations d\'un eleve',
    ],
];


/**
 * PROFESSEUR_PERMISSIONS
 */
$PROFESSEUR_PERMISSIONS = [
    ...$PARENT_PERMISSIONS,
];

/**
 * PERSONNEL_PERMISSIONS
 */
$PERSONNEL_PERMISSIONS = [
    ...$PARENT_PERMISSIONS,
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
        'name' => 'modifier_personnel',
        'description' => 'Modifier les info d\'un personnel',
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

/**
 * ADMINITRATEUR_PERMISSIONS
 */
$ADMINITRATEUR_PERMISSIONS = [
    ...$PERSONNEL_PERMISSIONS,
    [
        'name' => 'creer_personnel',
        'description' => 'Creer un personnel',
    ],
    
    [
        'name' => 'supprimer_personnel',
        'description' => 'Supprimer un personnel',
    ],
    [
        'name' => 'delete_user',
        'description' => 'Supprimer un utilisateur',
    ],
    [
        'name' => 'create_user',
        'description' => 'Créer un utilisateur',
    ],
    [
        'name' => 'crud_permission',
        'description' => 'Créer un utilisateur',
    ],
    [
        'name' => 'crud_role',
        'description' => 'Créer un utilisateur',
    ],

];



 /**
 *                LISTE DES PERMISSION DU SYSTEME
 *                       GROUPEES PAR ROLES
 *============================================================
 *
 */

if(!defined('USER_PERMISSIONS')) define('USER_PERMISSIONS', $USER_PERMISSIONS);
if(!defined('ELEVE_PERMISSIONS')) define('ELEVE_PERMISSIONS', $ELEVE_PERMISSIONS);
if(!defined('PARENT_PERMISSIONS')) define('PARENT_PERMISSIONS', $PARENT_PERMISSIONS);
if(!defined('PROFESSEUR_PERMISSIONS')) define('PROFESSEUR_PERMISSIONS',$PROFESSEUR_PERMISSIONS);
if(!defined('PERSONNEL_PERMISSIONS')) define('PERSONNEL_PERMISSIONS',$PERSONNEL_PERMISSIONS);
if(!defined('ADMINITRATEUR_PERMISSIONS')) define('ADMINITRATEUR_PERMISSIONS',$ADMINITRATEUR_PERMISSIONS);
if(!defined('ALL_SYSTEME_PERMISSIONS')) define('ALL_SYSTEME_PERMISSIONS',$ADMINITRATEUR_PERMISSIONS);

