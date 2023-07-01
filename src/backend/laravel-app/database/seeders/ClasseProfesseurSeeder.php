<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\ClasseProfesseur;

class ClasseProfesseurSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ClasseProfesseur::create([
            'professeurId' => 1,
            'classeId' => 1,
        ]);
        ClasseProfesseur::create([
            'professeurId' => 1,
            'classeId' => 2,
        ]);
        ClasseProfesseur::create([
            'professeurId' => 1,
            'classeId' => 3,
        ]);
    }
}
