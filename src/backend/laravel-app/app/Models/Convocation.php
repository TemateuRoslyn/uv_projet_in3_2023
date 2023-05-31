<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Convocation extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function personnel()
    {
        return $this->hasOne(Personnel::class);
    }
}
