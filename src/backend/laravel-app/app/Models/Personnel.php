<?php

namespace App\Models;

use App\Models\Conseil_D;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Personnel extends Model
{
    use HasFactory;
    // protected $guarded = [];
    protected $fillable = [
        'nom',
        'prenom',
        'date_nais',
        'lieu_nais',
        'photo',
        'email',
        'login',
        'mot_de_passe',
        'sex',
        'tel',
        'role',
        'fonction'
    ];

    public function conseilDiscipline(){
        return $this->belongsToMany(Conseil_D::class);
   }
}
