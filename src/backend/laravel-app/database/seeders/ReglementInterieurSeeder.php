<?php

namespace Database\Seeders;

use App\Models\ReglementInterieur;
use App\Models\Regle;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReglementInterieurSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
   /*  public function run(): void
    {
        ReglementInterieur::create([
            'libelle' => 'reglement interieur de l\'ecole',
        ]);
    } */
    public function run(): void
{
   

    $articles = [
        [
            'libelle' => 'Objet et champ d’application',
            'contenu' => 'Le présent règlement s\'applique à toutes les personnes habilitées à entrer dans le lycée. Il a pour objet de déterminer les règles et les normes de comportement et de discipline à l’intérieur du lycée.',
        ],
        [
            'libelle' => 'Obligation générale',
            'contenu' => 'Toutes les personnes habilitées à entrer dans le lycée s’engagent à respecter ce règlement intérieur. Elles s’engagent également à respecter les autres règles et règlements applicables dans le lycée et à adhérer à la culture du lycée.',
        ],
        [
            'libelle' => 'Heures d’ouverture',
            'contenu' => 'Le lycée est ouvert du lundi au vendredi de 7h00 à 17h00 et le samedi de 8h00 à 13h00.',
        ],
        [
            'libelle' => 'Utilisation des locaux et des matériels',
            'contenu' => 'Tous les élèves et les membres du personnel du lycée doivent respecter et veiller à la bonne utilisation des locaux et du matériel mis à leur disposition.',
        ],
        [
            'libelle' => 'Utilisation des ressources en ligne',
            'contenu' => 'L’accès à Internet et aux ressources en ligne est réservé aux fins d’études et de recherche et est strictement interdit d’utiliser Internet et ces ressources dans des activités illicites ou répréhensibles.',
        ],
        [
            'libelle' => 'Interdiction de fumer',
            'contenu' => 'Il est interdit de fumer ou de vapoter dans le lycée.',
        ],
        [
            'libelle' => 'Respect du personnel et des élèves',
            'contenu' => 'Tous les membres du personnel et les étudiants du lycée doivent se respecter mutuellement et éviter tout comportement inapproprié, abusif ou discriminatoire.',
        ],
        [
            'libelle' => 'Sanctions',
            'contenu' => 'Toute activité ou comportement illicite ou répréhensible sera sanctionné par des mesures disciplinaires appropriées.',
        ],
    ];

    foreach ($articles as $article) {
        $reglementInterieur = ReglementInterieur::create([
            'libelle' => $article['libelle'],
        ]);
        $regle = Regle::create([
            'libelle' => $article['contenu'],
            'reglementInterieurId' => $reglementInterieur->id,
        ]);
    }
}

}
