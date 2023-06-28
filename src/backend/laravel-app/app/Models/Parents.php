<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 *     required={"profession", "name", "first_name", "last_name", "date_de_naissance", "lieu_de_naissance", "photo", "sexe", "telephone", "user_id", "user"},
 *     @OA\Xml(name="Parents"),
 *     @OA\Property(property="id", type="integer", readOnly=true, example="1"),
 *     @OA\Property(property="profession", type="string", example="Engineer"),
 *     @OA\Property(property="first_name", type="string", example="John"),
 *     @OA\Property(property="last_name", type="string", example="Smith"),
 *     @OA\Property(property="date_de_naissance", type="string", format="date", example="1990-01-01"),
 *     @OA\Property(property="lieu_de_naissance", type="string", example="Paris"),
 *     @OA\Property(property="photo", type="string", format="url", example="https://example.com/photo.jpg"),
 *     @OA\Property(property="sexe", type="string", example="male"),
 *     @OA\Property(property="telephone", type="string", example="+33123456789"),
 *     @OA\Property(property="user_id", type="integer", example="1"),
 *     @OA\Property(property="user", ref="#/components/schemas/User"),
 *     @OA\Property(property="eleves", ref="#/components/schemas/Eleve"),
 *     @OA\Property(property="created_at", ref="#/components/schemas/BaseModel/properties/created_at"),
 *     @OA\Property(property="updated_at", ref="#/components/schemas/BaseModel/properties/updated_at"),
 *     @OA\Property(property="deleted_at", ref="#/components/schemas/BaseModel/properties/deleted_at")
 * )
 *
 * @method static create(array $array)
 * @method static findOrFail($id)
 * @method static paginate(int $int)
 *
 * Class Parents
 *
 * @package App\Models
 */

class Parents extends Model
{

    protected $fillable = [
        'profession',
        'firstName',
        'lastName',
        'dateDeNaissance',
        'lieuDeNaissance',
        'photo',
        'sexe',
        'telephone',
        'userId',
        'user',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'userId');
    }

    public function eleves()
    {
        return $this->belongsToMany(Eleve::class, 'eleve_parent', 'parentId', 'eleveId');
    }

    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($parents) {
            $parents->user()->delete();
        });
    }
}
