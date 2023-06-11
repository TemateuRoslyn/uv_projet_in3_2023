<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Database\Seeders\RoleSeeder;
use Database\Seeders\UserSeeder;
use Database\Seeders\ReglementInterieurSeeder;
use Database\Seeders\RegleSeeder;
use Database\Seeders\CoursSeeder;
use Database\Seeders\ClasseSeeder;
use Database\Seeders\EleveSeeder;


class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call([
            RoleSeeder::class,
            UserSeeder::class,
            ReglementInterieurSeeder::class,
            RegleSeeder::class,
            CoursSeeder::class,
            ProfesseurSeeder::class,
            ClasseSeeder::class,
            EleveSeeder::class,
        ]);
    }
}
