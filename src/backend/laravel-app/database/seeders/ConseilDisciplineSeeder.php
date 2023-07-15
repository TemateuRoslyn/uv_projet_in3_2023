<?php

namespace Database\Seeders;

use App\Http\Controllers\API\ConseilDisciplineController;
use App\Models\ConseilDiscipline;
use App\Models\Eleve;
use App\Models\Faute;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ConseilDisciplineSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $eleves = Eleve::has('fautes')->with('fautes')->limit(20)->get();

foreach ($eleves as $eleve) {
    $faute = $eleve->fautes->first();

    $conseil = new ConseilDiscipline;
    $conseil->dateCd = '2023-01-04';
    $conseil->heureDebutCd = '10:00:00';
    $conseil->heureFinCd = '12:00:00';
    $conseil->eleveId = $eleve->id;
    $conseil->fauteId = $faute->id;
    $conseil->status = $conseil->getStatusAttribute();
    $conseil->save();
}

        //Eleve qui a ete traduit au conseil de discipline
       /*  $eleve = Eleve::find(1);
        $faute = Faute::find(2);

        $conseil = new ConseilDiscipline;
        $conseil->dateCd = '2023-01-04';
        $conseil->heureDebutCd = '10:00:00';
        $conseil->heureFinCd = '12:00:00';
        $conseil->eleveId = $eleve->id;
        $conseil->fauteId = $faute->id;
        $conseil->status = $conseil->getStatusAttribute();
        $conseil->save();

        $conseil = new ConseilDiscipline;
        $conseil->dateCd = '2023-07-09';
        $conseil->heureDebutCd = '06:00:00';
        $conseil->heureFinCd = '19:00:00';
        $conseil->eleveId = $eleve->id;
        $conseil->fauteId = $faute->id;
        $conseil->status = $conseil->getStatusAttribute();
        $conseil->save();

        $eleve = Eleve::find(2);
        $faute = Faute::find(3);
        $conseil = new ConseilDiscipline;
        $conseil->dateCd = '2023-07-10';
        $conseil->heureDebutCd = '09:00:00';
        $conseil->heureFinCd = '12:00:00';
        $conseil->eleveId = $eleve->id;
        $conseil->fauteId = $faute->id;
        $conseil->status = $conseil->getStatusAttribute();
        $conseil->save(); */
    }
}
