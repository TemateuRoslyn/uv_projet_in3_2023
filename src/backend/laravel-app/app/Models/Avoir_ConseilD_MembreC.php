<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Avoir_ConseilD_MembreC extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function conseilDiscipline(){
        return $this->hasOne(ConseilDiscipline::class);
    }
    public function membreConseil(){
        return $this->hasOne(MembreConseil::class);
    }
}
