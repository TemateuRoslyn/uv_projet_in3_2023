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

        $eleves = Eleve::limit(14)->get();
$regles = Regle::limit(14)->get();

$fauteLibelles = [
    'Tricherie lors d\'un examen',
    'Retard répété en classe',
    'Violence physique envers un autre élève',
    'Non-respect des consignes de sécurité',
    'Bavardage excessif en classe',
    'Utilisation inappropriée du téléphone portable',
    'Destruction du matériel scolaire',
    'Absence injustifiée à plusieurs cours',
    'Comportement irrespectueux envers un enseignant',
    'Non-participation aux activités scolaires',
    'Vol d\'objets appartenant à un autre élève',
    'Intimidation ou harcèlement envers un autre élève',
    'Utilisation de langage injurieux en classe',
    'Non-respect du règlement de la cantine',
];

foreach ($eleves as $eleve) {
    $regleIds = $regles->pluck('id','libelle')->shuffle()->all();
    

    $fauteCount = 0;
    foreach ($regleIds as $regleId) {
        if ($fauteCount >= 3) {
            break;
        }
        $regle = Regle::where('id',$regleId)->get();
        
        if($regleId % 2  == 0){
            $gravite = "Mineur";
        }else{
            $gravite = "Majeur";
        }

        
        Faute::create([
            'libelle' => $fauteLibelles[array_rand($fauteLibelles)], //"Fautes sur ".( Regle::where('id', $regleId)->pluck('libelle')->first()),// 
            'gravite' => $gravite,
            'eleveId' => $eleve->id,
            'regleId' => $regleId,
        ]);

        $fauteCount++;
    }
}

       /*  //Regle qui qui ete enfreint
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
        ]); */

    }
}
