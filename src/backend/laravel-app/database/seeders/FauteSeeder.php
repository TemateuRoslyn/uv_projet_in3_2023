<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Faute;
use App\Models\Regle;
use App\Models\User;
use App\Models\Eleve;
use App\Models\Classe;

class FauteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //creation de la regle
       $regle = Regle::create([
            'libelle' => 'regle de l\'ecole',
            'reglement_interieur_id' => '1'
        ]);

        //creation de l'eleve
        $classe = Classe::find(1);

        $user = User::create([
            'email' => 'eleve3@example.com',
            'username' => 'eleve3',
            'password' => bcrypt('eleve3'),
        ]);
  // Création du eleve associé à l'utilisateur et au cour
        $eleve = Eleve::create([
            'firstName' => 'Roslyn',
            'lastName' => 'Maestros',
            'dateDeNaissance' => '2000/05/2',
            'lieuDeNaissance' => 'nkong',
            'photo' => 'assets/avatars/eleves/maestros.JPG',
            'sexe' => 'Masculin',
            'telephone' => '+237666534899',
            'solvable' => true,
            'redoublant' => false,
            'userId' => $user->id,
            'classeId' => $classe->id,
        ]);


        ///creation de la faute associe a l'eleve, la regle et l'user correspondant
        Faute::create([
            'libelle' => 'escalade et destruction du mur de l\'ecole',
            'gravite' => 'gravite de la faute',
            'eleve_id' => $eleve->id,
            'regle_id' => $regle->id,
        ]);

    }
}
