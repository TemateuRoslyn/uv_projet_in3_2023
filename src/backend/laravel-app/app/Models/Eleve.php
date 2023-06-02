<?php

namespace App\Models;

class Eleve extends User
{

    protected $fillable = [
        'solvable',
        'redoublant',
    ];

    public function parents()
    {
        return $this->belongsToMany(Parents::class);
    }

    public function classe()
    {
        return $this->belongsTo(Classe::class);
    }
}
