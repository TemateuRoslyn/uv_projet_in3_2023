<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\File;
use ReflectionClass;

class GenerateRequests extends Command
{
    protected $signature = 'generate:requests';

    protected $description = 'Génère les fichiers de demande pour tous les modèles de votre application.';

    public function handle()
    {
        // Récupèrer la liste des classes modèle existants dans le dossier "app/Models"
        $models = File::glob('app/Models/*.php');

        // Si aucun modèle n'existe, on arrête le programme
        if (empty($models)) {
            $this->warn('Aucun modèle existant dans le dossier "app/Models".');
            return;
        }

        // Boucle sur chaque classe modèle pour générer une classe de demande correspondante
        foreach ($models as $model) {
            $modelClass = 'App\\Models\\'.basename($model, '.php');
            $requestClass = 'App\\Http\\Requests\\'.class_basename($modelClass).'Request';
            $reflection = new ReflectionClass($modelClass);

            // Instancier la classe modèle avant de récupérer ses propriétés
            $modelInstance = new $modelClass;

            // Récupérer le tableau "fillable" de la classe modèle et l'ajouter à la classe de demande générée
            $fillable = implode(',', $reflection->getProperty('fillable')->getValue($modelInstance));
            Artisan::call('make:request', ['name' => $requestClass, '--force' => true]);
            File::append(app_path('/Http/Requests/'.$requestClass.'.php'), "\tprotected \$fillable = [$fillable];\n");
            $this->info('Généré la classe de demande '.$requestClass.' pour le modèle '.$modelClass.'.');
        }

        $this->info('Génération de toutes les classes de demande réussie !');        
    }
}
