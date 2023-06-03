<?php

namespace App\Models;

class Eleve extends User
{

    protected $fillable = [
        'solvable',
        'redoublant',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'id');
    }

    public function parents()
    {
        return $this->belongsToMany(Parents::class);
    }

    public function classe()
    {
        return $this->belongsTo(Classe::class);
    }

    public function assignUserFields(User $user)
    {
        $this->email = $user->email;
        $this->password = $user->password;
        $this->name = $user->name;
        $this->first_name = $user->first_name;
        $this->last_name = $user->last_name;
        $this->date_de_naissance = $user->date_de_naissance;
        $this->lieu_de_naissance = $user->lieu_de_naissance;
        $this->photo = $user->photo;
        $this->sexe = $user->sexe;
        $this->telephone = $user->telephone;
    }
}
