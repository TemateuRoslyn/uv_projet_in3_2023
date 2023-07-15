<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Personnel;
use App\Models\Eleve;
use App\Models\Convocation;

class ConvocationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $eleves = Eleve::inRandomOrder()->limit(15)->get();
$personnel = Personnel::inRandomOrder()->limit(2)->get();

foreach ($eleves as $eleve) {
    $personnelIndex = rand(0, $personnel->count() - 1);
    $selectedPersonnel = $personnel[$personnelIndex];
    
    $dateConvocation = '2023-06-20';
    $dateRdv = date('Y-m-d', strtotime($dateConvocation . '+4 days'));

    Convocation::create([
        'libelle' => $eleve->firstName . ' ' . $eleve->lastName . ', élève dans notre établissement, vous et vos parents êtes convoqués au conseil de discipline qui se tiendra le ' . $dateConvocation . '.',
        'dateConvocation' => $dateConvocation,
        'dateRdv' => $dateRdv,
        'statut' => 'a venir',
        'personnelId' => $selectedPersonnel->id,
        'eleveId' => $eleve->id,
    ]);
}

       /*  $personnel = Personnel::find(1);
        $eleve = Eleve::find(1);


        ///creation de la faute associe a l'eleve, la regle et l'user correspondant
        Convocation::create([
            'libelle' => 'mr/mlle X eleve dans mon etablissement Y etes convoque vous et vos parents au conseil de
                            de discipline qui se tiendra xyz jour',
            'dateConvocation' => '2023/06/20',
            'dateRdv' => '2023/06/28',
            'statut'  => 'a venir',
            'personnelId' => $personnel->id,
            'eleveId' => $eleve->id,
        ]); */
    }
}
