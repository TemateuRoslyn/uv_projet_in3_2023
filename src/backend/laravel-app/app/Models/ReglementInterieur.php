<?php

namespace App\Models;

use App\Models\Personnel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReglementInterieur extends Model
{
    use HasFactory;

    protected $fillable = [
        'libelle'
    ];
}

