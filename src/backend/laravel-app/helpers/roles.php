<?php 


 /**
 *                LISTE DES ROLES DU SYSTEME
 *============================================================
 *
 */

 if(!defined('USER_ROLE')) define('USER_ROLE',
 [
     'name'=> 'User',
     'description' => 'USER',
 ]);

if(!defined('ELEVE_ROLE')) define('ELEVE_ROLE', 
 [
     'name'=> 'Eleve',
     'description' => 'ELEVE',
 ]);

 
if(!defined('PARENT_ROLE')) define('PARENT_ROLE',
 [
     'name'=> 'Parent',
     'description' => 'PARENT',
 ]);
 

if(!defined('PROFESSEUR_ROLE')) define('PROFESSEUR_ROLE',
 [
     'name'=> 'Professeur',
     'description' => 'PROFESSEUR',
 ]);


if(!defined('PERSONNEL_ROLE')) define('PERSONNEL_ROLE', 
 [
     'name'=> 'Personnel',
     'description' => 'PERSONNEL',
 ]);

if(!defined('ADMIN_ROLE')) define('ADMIN_ROLE', 
 [
     'name'=> 'Admin',
     'description' => 'ADMIN',
 ]);
 
if(!defined('ROLE_LIST')) define('ROLE_LIST', 
 [
     USER_ROLE, 
     ELEVE_ROLE, 
     PARENT_ROLE, 
     PROFESSEUR_ROLE, 
     PERSONNEL_ROLE,
     ADMIN_ROLE, 
]);


