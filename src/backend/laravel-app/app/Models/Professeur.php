<?php

namespace App\Models;

class Professeur extends User
{
    protected $fillable = [
        'matiere',
    ];

    public function cours()
    {
        return $this->belongsToMany(Cour::class);
    }
}
