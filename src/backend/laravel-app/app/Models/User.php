<?php

namespace App\Models;

use Tymon\JWTAuth\Contracts\JWTSubject;

use App\Models\Notification;
use App\Models\Role;
use App\Models\Permission;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;




/**
 * @OA\Schema(
 *     required={"email", "password", "username"},
 *     @OA\Xml(name="User"),
 *     @OA\Property(property="id", type="integer", readOnly=true, example="1"),
 *     @OA\Property(property="role", type="string", readOnly=true, description="User role"),
 *     @OA\Property(property="email", type="string", readOnly=true, format="email", description="User unique email address", example="user@gmail.com"),
 *     @OA\Property(property="username", type="string", readOnly=true, description="username", example="maestros21"),
 *     @OA\Property(property="email_verified_at", type="string", readOnly=true, format="date-time", description="Datetime marker of verification status", example="2019-02-25 12:59:20"),
 *     @OA\Property(property="password", type="string", readOnly=true, format="password", description="User password", example="secret"),
 *     @OA\Property(property="created_at", ref="#/components/schemas/BaseModel/properties/created_at"),
 *     @OA\Property(property="updated_at", ref="#/components/schemas/BaseModel/properties/updated_at"),
 *     @OA\Property(property="deleted_at", ref="#/components/schemas/BaseModel/properties/deleted_at")
 * )
 *
 * @method static create(array $array)
 * @method static findOrFail($id)
 * @method static paginate(int $int)
 *
 * Class User
 *
 * @package App\Models
 */
class User  extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'email',
        'username',
        'password'
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

    public function permissions()
    {
        return $this->belongsToMany(Permission::class, 'user_permissions');
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }
    
    public function getJWTCustomClaims()
    {
        return [];
    }

    // check des roles


    public function hasRole($role)
    {
        return $this->roles->contains('name', $role);
    }

    public function hasAnyRoles(array $roles)
    {
        return $exists = collect($this->roles)->pluck('name')->contains(function ($name) use ($roles) {
            return in_array($name, $roles);
        });
    }

    // check des permission

    public function hasPermission($permission)
    {
        return $this->permissions->contains('name', $permission);
    }

    public function hasAnyPermissions($permissions)
    {
        return $exists = collect($this->permissions)->pluck('name')->contains(function ($name) use ($permissions) {
            return in_array($name, $permissions);
        });
    }
}
