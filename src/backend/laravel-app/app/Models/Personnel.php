<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 *     required={"firstName", "lastName", "dateDeNaissance", "lieuDeNaissance", "password", "photo", "sexe", "telephone", "fonction"},
 *     @OA\Xml(name="Personnel"),
 *     @OA\Property(property="id", type="integer", readOnly=true, example="1"),
 *     @OA\Property(property="role", type="string", readOnly=true, description="User role"),
 *     @OA\Property(property="firstName", type="string", maxLength=32, example="Doe"),
 *     @OA\Property(property="lastName", type="string", maxLength=32, example="Smith"),
 *     @OA\Property(property="dateDeNaissance", type="string", format="date", example="1990-01-01"),
 *     @OA\Property(property="lieuDeNaissance", type="string", maxLength=32, example="Paris"),
 *     @OA\Property(property="photo", type="string", format="url", example="https://example.com/photo.jpg"),
 *     @OA\Property(property="sexe", type="string", example="male"),
 *     @OA\Property(property="telephone", type="string", example="+33123456789"),
 *     @OA\Property(property="fonction", type="string", example="Censeur"),
 *     @OA\Property(property="user", type="object", ref="#/components/schemas/User"),
 *     @OA\Property(property="created_at", ref="#/components/schemas/BaseModel/properties/created_at"),
 *     @OA\Property(property="updated_at", ref="#/components/schemas/BaseModel/properties/updated_at"),
 *     @OA\Property(property="deleted_at", ref="#/components/schemas/BaseModel/properties/deleted_at")
 * )
 *
 * @method static create(array $array)
 * @method static findOrFail($id)
 * @method static paginate(int $int)
 *
 * Class Personnel
 *
 * @package App\Models
 */

class Personnel extends Model
{
    protected $fillable = [
        'firstName',
        'lastName',
        'dateDeNaissance',
        'lieuDeNaissance',
        'sexe',
        'photo',
        'telephone',
        'fonction',
        'userId',
        'user'
    ];

    public function notification()
    {
        return $this->hasMany(Notification::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'userId');
    }

    public function convocation()
    {
        return $this->belongsToMany(convocation::class);
    }

    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($personnel) {
            $personnel->user()->delete();
        });
    }
}
