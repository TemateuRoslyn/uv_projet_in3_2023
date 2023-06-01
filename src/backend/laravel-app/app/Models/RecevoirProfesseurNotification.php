<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RecevoirProfesseurNotification extends Model
{
    use HasFactory;
    protected $fillable = [
        'professeur_id',
        'notification_id',
    ];

    public function professeur()
    {
        return $this->belongsTo(Professeur::class);
    }

    public function notification()
    {
        return $this->belongsTo(Notification::class);
    }
}
