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
            'fauteId' => '1',
        ]);
    }
}
