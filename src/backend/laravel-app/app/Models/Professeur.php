<?php

namespace App\Models;

class Professeur extends User
{
    protected $fillable = [
        'matiere',
        'first_name',
        'last_name',
        'date_de_naissance',
        'lieu_de_naissance',
        'photo',
        'sexe',
        'telephone',
        'user_id',
        'user',
    ];

    public function cours()
    {
        return $this->belongsToMany(Cour::class);
    }
}
