<?php

namespace App\Models;

use App\Models\Notification;
use App\Models\Role;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

/**
 *
 * @OA\Schema(
 * required={"email", "password", "first_name", "last_name", "sexe"},
 * @OA\Xml(name="User"),
 * @OA\Property(property="id", type="integer", readOnly="true", example="1"),
 * @OA\Property(property="role", type="string", readOnly="true", description="User role"),
 * @OA\Property(property="email", type="string", readOnly="true", format="email", description="User unique email address", example="user@gmail.com"),
 * @OA\Property(property="email_verified_at", type="string", readOnly="true", format="date-time", description="Datetime marker of verification status", example="2019-02-25 12:59:20"),
 * @OA\Property(property="password", type="string", readOnly="true", format="password", description="User password", example="secret"),
 * @OA\Property(property="name", type="string", maxLength=32, example="John"),
 * @OA\Property(property="first_name", type="string", maxLength=32, example="Doe"),
 * @OA\Property(property="last_name", type="string", maxLength=32, example="Smith"),
 * @OA\Property(property="date_de_naissance", type="string", format="date", example="1990-01-01"),
 * @OA\Property(property="lieu_de_naissance", type="string", maxLength=32, example="Paris"),
 * @OA\Property(property="photo", type="string", format="url", example="https://example.com/photo.jpg"),
 * @OA\Property(property="sexe", type="string", enum={"male", "female"}, example="male"),
 * @OA\Property(property="telephone", type="string", example="+33123456789"),
 * @OA\Property(property="solvable", type="boolean", example=true),
 * @OA\Property(property="redoublant", type="boolean", example=false),
 * @OA\Property(property="created_at", ref="#/components/schemas/BaseModel/properties/created_at"),
 * @OA\Property(property="updated_at", ref="#/components/schemas/BaseModel/properties/updated_at"),
 * @OA\Property(property="deleted_at", ref="#/components/schemas/BaseModel/properties/deleted_at")
 * )
 *
 * Class User
 *
 */
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
