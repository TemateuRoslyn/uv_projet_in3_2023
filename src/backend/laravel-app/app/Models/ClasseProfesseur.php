<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClasseProfesseur extends Model
{
    use HasFactory;
    protected $fillable = [
        'professeurId',
        'classeId'
    ];
}
