<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Database\Seeders\RoleSeeder;
use Database\Seeders\UserSeeder;
use Database\Seeders\ReglementInterieurSeeder;
use Database\Seeders\RegleSeeder;
use Database\Seeders\CoursSeeder;
use Database\Seeders\ClasseSeeder;
use Database\Seeders\CoursClasseSeeder;
use Database\Seeders\EleveSeeder;
use Database\Seeders\ProfesseurSeeder;
use Database\Seeders\FauteSeeder;
use Database\Seeders\PersonnelSeeder;
use Database\Seeders\ConvocationSeeder;
use Database\Seeders\ClasseProfesseurSeeder;
use Database\Seeders\SuggestionSeeder;
use Database\Seeders\SanctionPrevuSeeder;
use Database\Seeders\NotificationSeeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call([
            RoleSeeder::class,
            UserSeeder::class,
            ClasseSeeder::class,
            ReglementInterieurSeeder::class,
            RegleSeeder::class,
            CoursSeeder::class,
            ProfesseurSeeder::class,
            ClasseSeeder::class,
            CoursClasseSeeder::class,
            EleveSeeder::class,
            FauteSeeder::class,
            PersonnelSeeder::class,
            NotificationSeeder::class,
            ConvocationSeeder::class,
            ConseilDisciplineSeeder::class,
            ParentSeeder::class,
            ReparationSeeder::class,
            ClasseProfesseurSeeder::class,
            SuggestionSeeder::class,
            SanctionPrevueSeeder::class,
        ]);
    }
}
