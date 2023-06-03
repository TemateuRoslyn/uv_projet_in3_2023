<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reparation extends Model
{
    use HasFactory;
    protected $fillable = [
        'id',
        'demarcheMediation',
        'faute_id',
    ];
    public function faute()
    {
        return $this->belongsTo(Faute::class);
    }
}
