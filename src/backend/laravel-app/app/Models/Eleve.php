<?php

namespace App\Models;

use App\Models\parents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Eleve extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'prenom',
        'date_de_naissance',
        'login',
        'mot_de_passe',
        'lieu_de_naissance',
        'photo',
        'email',
        'sexe',
        'telephone',
        'role',
        'solvable',
        'redoublant',
    ];
    public function parents(){
        return $this->belongsToMany(Parents::class);
    }

}
