<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reparation extends Model
{
    use HasFactory;

    protected $fillable = [
        'demarche_mediatiion',
    ];

    public function faute()
    {
        return $this->hasOne(Faute::class);
    }
}
