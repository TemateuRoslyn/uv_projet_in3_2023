<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Faute extends Model
{
    use HasFactory;
    protected $fillable = [
        'libelle',
        'gravite',
    ];
    public function regle()
    {
        return $this->belongsTo(Regle::class);
    }
    public function eleve()
    {
        return $this->belongsTo(Eleve::class);
    }
}
