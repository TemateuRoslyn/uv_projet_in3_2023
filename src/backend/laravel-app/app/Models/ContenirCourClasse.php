<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContenirCourClasse extends Model
{
    use HasFactory;
    protected $fillable = [
        'id',
        'cour_id',
        'classe_id',
    ];
}
