<?php

namespace Database\Seeders;

use App\Models\ReglementInterieur;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReglementInterieurSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ReglementInterieur::create([
            'libelle' => 'reglement interieur de l\'ecole',
        ]);
    }
}
