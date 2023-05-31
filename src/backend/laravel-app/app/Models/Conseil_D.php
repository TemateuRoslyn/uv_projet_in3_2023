<?php

namespace App\Models;

use App\Models\Personnel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Conseil_D extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function personnels(){
        return $this->belongsToMany(Personnel::class);
   }
}

