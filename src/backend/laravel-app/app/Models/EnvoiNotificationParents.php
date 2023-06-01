<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EnvoiNotificationParents extends Model
{
    use HasFactory;
    protected $fillable = [
        'notification_id',
        'parent_id'
    ];

    public function notification(){
        return $this->hasOne(Notification::class);
    }
    public function parent(){
        return $this->hasOne(Parents::class);
    }
}
