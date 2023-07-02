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
        $personnel = Personnel::find(1);
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
        ]);
    }
}
