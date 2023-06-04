<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class GeneratePolicies extends Command
{
    protected $signature = 'generate:policies';

    protected $description = 'Génère les fichiers de politiques pour tous les modèles de votre application.';

    public function handle()
    {
        $models = File::glob('app/Models/*.php');

        if (empty($models)) {
            $this->warn('Aucun modèle existant dans le dossier "app/Models".');
            return;
        }

        foreach ($models as $model) {
            $modelClass = 'App\\Models\\'.basename($model, '.php');
            $policyClass = 'App\\Policies\\'.class_basename($modelClass).'Policy';
            print($policyClass);
            if (!class_exists($policyClass)) {
                $this->callSilent('make:policy', ['name' => $policyClass, '--model' => $modelClass]);
                $this->info('Généré la politique '.$policyClass.' pour le modèle '.$modelClass.'.');
            } else {
                $this->info('La classe de politique '.$policyClass.' existe déjà pour le modèle '.$modelClass.'.');
            }
        }

        $this->info('Génération de toutes les politiques réussie !');
    }
}
