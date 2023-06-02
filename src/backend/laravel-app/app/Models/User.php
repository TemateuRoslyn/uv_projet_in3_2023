<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User  extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'email',
        'password',
        'name',
        'first_name',
        'last_name',
        'date_de_naissance',
        'lieu_de_naissance',
        'photo',
        'sexe',
        'telephone',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function notifications()
    {
        return $this->belongsToMany(Notification::class, 'user_notifications');
    }

    public function roles()
    {
        return $this->belongsToMany(Role::class, 'role_user');
    }
}
