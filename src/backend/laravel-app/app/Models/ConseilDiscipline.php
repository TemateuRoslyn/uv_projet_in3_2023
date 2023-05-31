<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ConseilDiscipline extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function eleve()
    {
        return $this->hasOne(Eleve::class);
    }
}
