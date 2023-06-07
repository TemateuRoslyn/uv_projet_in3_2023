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
            'date_cours' => '2023-01-04',
            'heure_debut' => '15:00',
            'heure_fin' => '18:00',
            'professeur_id' => '1'
        ]);
    }
}
