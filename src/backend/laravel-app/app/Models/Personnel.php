<?php

namespace App\Models;

class Personnel extends User
{
    protected $fillable = [
        'fonction',
    ];

    public function conseilDiscipline(){
        return $this->belongsToMany(ConseilDiscipline::class);
   }
}
