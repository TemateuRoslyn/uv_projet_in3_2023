<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Personnel extends Model
{
    use HasFactory;
    protected $filable = [
        'nom',
        'prenom',
        'date_nais',
        'lieu_nais',
        'photo',
        'email',
        'login',
        'mot_de_passe',
        'sex',
        'tel',
        'role',
        'fonction'
    ];
}
