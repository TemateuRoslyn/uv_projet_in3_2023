<?php

namespace App\Models;

class Userl extends User
{
    protected $fillable = [
        'fonction',
    ];

    public function conseilDiscipline(){
        return $this->belongsToMany(ConseilDiscipline::class);
   }
}
