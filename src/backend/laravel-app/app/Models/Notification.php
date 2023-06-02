<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;
    protected $fillable = [
        'libelle',
        'view',
        'name'
    ];

    public function users()
    {
        return $this->belongsToMany(Professeur::class, 'user_notifications');
    }
}
