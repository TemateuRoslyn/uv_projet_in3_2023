<?php

namespace Database\Seeders;

use App\Models\ConseilDiscipline;
use App\Models\Eleve;
use App\Models\Faute;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ConseilDisciplineSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //Eleve qui a ete traduit au conseil de discipline
        $eleve = Eleve::find(1);
        $faute = Faute::find(2);

        ConseilDiscipline::create([
            'dateCd' => '2023-01-04',
            'heureDebutCd' => '10:00:00',
            'heureFinCd' => '12:00:00',
            'eleveId' => $eleve->id,
            'fauteId' => $faute->id,
        ]);

        ConseilDiscipline::create([
            'dateCd' => '2023-01-04',
            'heureDebutCd' => '10:00:00',
            'heureFinCd' => '12:00:00',
            'eleveId' => $eleve->id,
            'fauteId' => $faute->id,
        ]);

        $eleve = Eleve::find(2);
        $faute = Faute::find(3);
        ConseilDiscipline::create([
            'dateCd' => '2023-01-04',
            'heureDebutCd' => '10:00:00',
            'heureFinCd' => '12:00:00',
            'eleveId' => $eleve->id,
            'fauteId' => $faute->id,
        ]);
    }
}
