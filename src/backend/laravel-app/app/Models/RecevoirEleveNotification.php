<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RecevoirEleveNotification extends Model
{
    use HasFactory;
    protected $fillable = [
        'eleve_id',
        'notification_id',
    ];


    public function eleve()
    {
        return $this->belongsTo(Eleve::class);
    }
    public function notification()
    {
        return $this->belongsTo(Notification::class);
    }
}
