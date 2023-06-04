
## Démarrer le projet : Premier démarrage et les autres lancements...

[1] Une fois que vous vous êtes mis à jour avec un rebase sur la branche `main`, faites un premier démarrage du backend en exécutant le script `run.first.laravel.bat` ou `run.first.laravel.sh` et acceptez la proposition qui vous sera faite.
[2] Pour les lancements ultérieurs du projet, exécutez le script `run.laravel.bat` ou `run.laravel.sh`.

## Mettre à jour la documentation Swagger

[1] Si vous mettez à jour la documentation Swagger d'une méthode, vous devez exécuter ce script dans un terminal ouvert sur le projet Laravel : 

[2] Commande: ```php artisan l5-swagger:generate```

## Observer la documentation générée

[1] Une fois votre application démarrée, la documentation est visible à l'adresse suivante :

[2] ```http://127.0.0.1:8000/api/docs```

## Générer les services frontend pour React Site et React Admin

Pour la génération des services frontend :
[1] Démarrez d'abord votre backend.
[2] Ensuite, exécutez le fichier `swagger.generate.sh` ou `swagger.generate.bat`.

