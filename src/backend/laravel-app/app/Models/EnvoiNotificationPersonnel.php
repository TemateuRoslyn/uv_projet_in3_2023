<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EnvoiNotificationPersonnel extends Model
{
    use HasFactory;
    protected $fillable = [
        'notification_id',
        'personnel_id'
    ];

    public function notification(){
        return $this->hasOne(Notification::class);
    }
    public function personnel(){
        return $this->hasOne(Personnel::class);
    }
}
