<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SanctionPrevu extends Model
{
    use HasFactory;

    protected $fillable = [
        'libelle',
        'niveau_gravite',
        'motif',
        'duree_validite',
    ];


    public function regle()
    {
        return $this->hasOne(Regle::class);
    }

    public function faute()
    {
        return $this->hasOne(Faute::class);
    }

    public function eleve()
    {
        return $this->hasOne(Eleve::class);
    }

    public function convocation()
    {
        return $this->hasOne(Convocation::class);
    }
}
