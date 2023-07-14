<?php

namespace Database\Seeders;

use App\Models\Reparation;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReparationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Reparation::create([
            'demarcheMediation' => 'Redige la lette d\'excuse',
            'status' => 'Valide',
            'fauteId' => '1',
        ]);
        Reparation::create([
            'demarcheMediation' => 'Redige la lette d\'excuse',
            'status' => 'En attente',
            'fauteId' => '1',
        ]);
        Reparation::create([
            'demarcheMediation' => 'Redige la lette d\'excuse',
            'status' => 'Rejete',
            'fauteId' => '1',
        ]);
    }
}
