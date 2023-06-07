<?php

namespace App\Models;

class Professeur extends User
{
    protected $fillable = [
        'statut',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function cours()
    {
        return $this->belongsToMany(Cour::class);
    }
}
