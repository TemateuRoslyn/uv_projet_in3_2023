<?php

namespace App\Models;

use Tymon\JWTAuth\Contracts\JWTSubject;

use App\Models\Notification;
use App\Models\Role;
use App\Models\Eleve;
use App\Models\Personnel;
use App\Models\Professeur;
use App\Models\Parents;
use App\Models\Permission;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;




/**
 * @OA\Schema(
 *     required={"email", "password", "username"},
 *     @OA\Xml(name="User"),
 *     @OA\Property(property="id", type="integer", readOnly=true, example="1"),
 *     @OA\Property(property="email", type="string", readOnly=true, format="email", description="User unique email address", example="user@gmail.com"),
 *     @OA\Property(property="username", type="string", readOnly=true, description="username", example="maestros21"),
 *     @OA\Property(property="roles", type="array", @OA\Items(ref="#/components/schemas/Role")),
 *     @OA\Property(property="permissions", type="array", @OA\Items(ref="#/components/schemas/Permission")),
 *     @OA\Property(
 *               property="model",
 *               type="object",
 *               oneOf={
 *                   @OA\Schema(ref="#/components/schemas/Parents"),
 *                   @OA\Schema(ref="#/components/schemas/Eleve"),
 *                   @OA\Schema(ref="#/components/schemas/Professeur"),
 *                   @OA\Schema(ref="#/components/schemas/Personnel"),
 *               }
 *      ), 
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
        'password',
        'roles',
        'permissions',
        'model', // qui pourrat etre : Eleve, Parent, Professeur ou Personnel
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    // eleve 
    public function eleve()
    {
        return $this->hasOne(Eleve::class, 'userId');
    }
    public function getEleveAttribute()
    {
        return $this->eleve()->first();
    }

    // professeur
    public function professeur()
    {
        return $this->hasOne(Professeur::class, 'userId');
    }
    public function getProfesseurAttribute()
    {
        return $this->professeur()->first();
    }

    // parents
    public function parents()
    {
        return $this->hasOne(Parents::class, 'userId');
    }
    public function getParentsAttribute()
    {
        return $this->parents()->first();
    }

    // personnel
    public function personnel()
    {
        return $this->hasOne(Personnel::class, 'userId');
    }
    public function getPersonnelAttribute()
    {
        return $this->personnel()->first();
    }
    


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
