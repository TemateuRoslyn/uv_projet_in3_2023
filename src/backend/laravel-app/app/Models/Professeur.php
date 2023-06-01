<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Professeur extends Model
{
    use HasFactory;

    public function cours()
    {
        return $this->belongsToMany(Cour::class);
    }

    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }
}
