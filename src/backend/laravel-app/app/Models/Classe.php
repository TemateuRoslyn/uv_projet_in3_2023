<?php

namespace App\Models;

use App\Models\Eleve;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Classe extends Model
{
    use HasFactory;
    protected $fillable = [
        'nom',
    ];

    public function eleves()
    {
        return $this->hasMany(Eleve::class);
    }
}
