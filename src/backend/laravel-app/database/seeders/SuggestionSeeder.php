<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Suggestion;

class SuggestionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Suggestion::create([
            'description' => 'j\'aimerais qu\'il y ait des amenagements pour les toilettes et les robinets a l\'ecole',
        ]);
        Suggestion::create([
            'description' => 'la couleur des murs devrait avoir la meme couleur que celle des tenues des
                                eleves',
        ]);
        Suggestion::create([
            'description' => 'les eleves en classes d\'exam devrait beneficier des cours de souien
                               de la part des professeurs',
        ]);
        Suggestion::create([
            'description' => 'instaurer les cantines pour plus de precaution et prevenir des maladies',
        ]);
    }
}
