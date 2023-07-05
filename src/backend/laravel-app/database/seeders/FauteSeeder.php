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
        //Regle qui qui ete enfreint
        $regle = Regle::find(1);
        //eleve qui a enfreint la regele
        $eleve = Eleve::find(1);


        ///creation de la faute associe a l'eleve, la regle et l'user correspondant
        Faute::create([
            'libelle' => 'escalade et destruction du mur de l\'ecole',
            'gravite' => 'gravite de la faute',
            'eleveId' => $eleve->id,
            'regleId' => $regle->id,
        ]);

        Faute::create([
            'libelle' => 'esczzzzzzzzzzzzzzzzzzzz uction du mur de l\'ecole',
            'gravite' => 'gravite de la faute',
            'eleveId' => $eleve->id,
            'regleId' => $regle->id,
        ]);

        Faute::create([
            'libelle' => 'ssssssssssssssssss wwwwwwwwwwwwwwwwww du mur de l\'ecole',
            'gravite' => 'gravite de la faute',
            'eleveId' => $eleve->id,
            'regleId' => $regle->id,
        ]);

        $eleve = Eleve::find(2);


        ///creation de la faute associe a l'eleve, la regle et l'user correspondant
        Faute::create([
            'libelle' => 'escalade et destruction du mur de l\'ecole',
            'gravite' => 'gravite de la faute',
            'eleveId' => $eleve->id,
            'regleId' => $regle->id,
        ]);

        Faute::create([
            'libelle' => 'esczzzzzzzzzzzzzzzzzzzz uction du mur de l\'ecole',
            'gravite' => 'gravite de la faute',
            'eleveId' => $eleve->id,
            'regleId' => $regle->id,
        ]);

    }
}
