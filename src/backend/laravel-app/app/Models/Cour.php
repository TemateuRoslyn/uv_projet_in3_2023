<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cour extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function professeur()
    {
        return $this->belongsTo(Professeur::class);
    }
}
