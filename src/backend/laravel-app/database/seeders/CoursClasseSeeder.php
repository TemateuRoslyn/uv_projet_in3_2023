<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\CoursClasse;
use App\Models\Cour;
use App\Models\Classe;



class CoursClasseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $courses = Cour::all();
        $classes = Classe::all();
        
        foreach ($courses as $course) {
            foreach ($classes as $class) {
                CoursClasse::create([
                    'courId' => $course->id,
                    'classeId' => $class->id,
                ]);
            }
        }
        
        /*  CoursClasse::create([
            'courId' => 1,
            'classeId' => 1,
        ]);
        CoursClasse::create([
            'courId' => 2,
            'classeId' => 1,
        ]);
        CoursClasse::create([
            'courId' => 3,
            'classeId' => 2,
        ]);
        CoursClasse::create([
            'courId' => 4,
            'classeId' => 2,
        ]); */
    }
}
