<?php

namespace App\Models;

use App\Models\Userl;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReglementInterieur extends Model
{
    use HasFactory;

    protected $fillable = [
        'libelle'
    ];
}

