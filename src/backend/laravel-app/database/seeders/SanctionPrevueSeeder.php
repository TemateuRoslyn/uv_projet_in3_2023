<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Eleve;
use App\Models\Faute;
use App\Models\SanctionPrevu;

class SanctionPrevueSeeder extends Seeder
{
    public function run()
    {
        
                $eleves = Eleve::limit(15)->get();
                /* $fauteLibelles = [
                    'Tricherie lors d\'un examen',
                    'Retard répété en classe',
                    'Violence physique envers un autre élève',
                    'Non-respect des consignes de sécurité',
                    'Bavardage excessif en classe',
                    'Utilisation inappropriée du téléphone portable',
                    'Destruction du matériel scolaire',
                    'Absence injustifiée à plusieurs cours',
                    'Comportement irrespectueux envers un enseignant',
                    'Non-participation aux activités scolaires',
                    'Vol d\'objets appartenant à un autre élève',
                    'Intimidation ou harcèlement envers un autre élève',
                    'Utilisation de langage injurieux en classe',
                    'Non-respect du règlement de la cantine',
                ];
         */
                foreach ($eleves as $eleve) {
                    $fautes = Faute::where('eleveId', $eleve->id)->limit(3)->get();
        
                    foreach ($fautes as $faute) {
                        $sanctionLibelle = $this->getSanctionLibelle($faute->libelle);
        
                        SanctionPrevu::create([
                            'libelle' => $sanctionLibelle,
                            'dureeValidite' => now()->addDays(5),
                            'eleveId' => $eleve->id,
                            'fauteId' => $faute->id,
                        ]);
                    }
                }
            }
        
            private function getSanctionLibelle($fauteLibelle)
            {
                $sanctionLibelles = [
                    'Tricherie lors d\'un examen' => 'Sanction pour tricherie',
                    'Retard répété en classe' => 'Sanction pour retard',
                    'Violence physique envers un autre élève' => 'Sanction pour violence',
                    'Non-respect des consignes de sécurité' => 'Sanction pour non-respect des consignes de sécurité',
                    'Bavardage excessif en classe' => 'Sanction pour bavardage excessif',
                    'Utilisation inappropriée du téléphone portable' => 'Sanction pour utilisation inappropriée du téléphone',
                    'Destruction du matériel scolaire' => 'Sanction pour destruction du matériel scolaire',
                    'Absence injustifiée à plusieurs cours' => 'Sanction pour absence injustifiée',
                    'Comportement irrespectueux envers un enseignant' => 'Sanction pour comportement irrespectueux envers un enseignant',
                    'Non-participation aux activités scolaires' => 'Sanction pour non-participation aux activités scolaires',
                    'Vol d\'objets appartenant à un autre élève' => 'Sanction pour vol d\'objets',
                    'Intimidation ou harcèlement envers un autre élève' => 'Sanction pour intimidation ou harcèlement',
                    'Utilisation de langage injurieux en classe' => 'Sanction pour langage injurieux',
                    'Non-respect du règlement de la cantine' => 'Sanction pour non-respect du règlement de la cantine',
                ];
        
                $sanctionLibelle = $sanctionLibelles[$fauteLibelle] ?? 'Sanction prévue pour la faute';
        
                return $sanctionLibelle;
            }
        }
        
    
