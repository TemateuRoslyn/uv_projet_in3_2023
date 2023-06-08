<?php

namespace Database\Seeders;

use App\Models\Cour;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CoursSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Cour::create([
            'libelle' => 'Histoire',
            'date_cour' => '2023-01-04',
            'heure_debut' => '2023-01-05',
            'heure_fin' => '2023-01-06',
            //  'professeur_id' => '1'
        ]);
    }
}
