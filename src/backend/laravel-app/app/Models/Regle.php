<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Regle extends Model
{
    use HasFactory;

    protected $fillable = [
        'libelle',
    ];

    public function reglementInterieur()
    {
        return $this->hasOne(ReglementInterieur::class);
    }
}
