<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Regle;

class RegleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Regle::create([
            'libelle' => 'regle de l\'ecole',
            'reglementInterieurId' => '1'
        ]);
    }
}
