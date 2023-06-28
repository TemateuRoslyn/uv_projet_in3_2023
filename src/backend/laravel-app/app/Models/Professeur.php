<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 *     required={"statut","firstName", "lastName", "dateDeNaissance", "lieuDeNaissance", "photo", "sexe", "telephone"},
 *     @OA\Xml(name="Professeur"),
 *     @OA\Property(property="id", type="integer", readOnly=true, example="1"),
 *     @OA\Property(property="role", type="string", readOnly=true, description="User role"),
 *     @OA\Property(property="firstName", type="string", maxLength=32, example="Doe"),
 *     @OA\Property(property="lastName", type="string", maxLength=32, example="Smith"),
 *     @OA\Property(property="dateDeNaissance", type="string", format="date", example="1990-01-01"),
 *     @OA\Property(property="lieuDeNaissance", type="string", maxLength=32, example="Paris"),
 *     @OA\Property(property="photo", type="string", format="url", example="https://example.com/photo.jpg"),
 *     @OA\Property(property="sexe", type="string", example="male"),
 *     @OA\Property(property="telephone", type="string", example="+33123456789"),
 *     @OA\Property(property="statut", type="string", example="surveillant general"),
 *     @OA\Property(property="user", type="object", ref="#/components/schemas/User"),
 *     @OA\Property(property="cour", type="object", ref="#/components/schemas/Cour"),
 *     @OA\Property(property="created_at", ref="#/components/schemas/BaseModel/properties/created_at"),
 *     @OA\Property(property="updated_at", ref="#/components/schemas/BaseModel/properties/updated_at"),
 *     @OA\Property(property="deleted_at", ref="#/components/schemas/BaseModel/properties/deleted_at")
 * )
 *
 * @method static create(array $array)
 * @method static findOrFail($id)
 * @method static paginate(int $int)
 *
 * Class Professeur
 *
 * @package App\Models
 * */

class Professeur extends Model
{
    protected $fillable = [
        'statut',
        'firstName',
        'lastName',
        'dateDeNaissance',
        'lieuDeNaissance',
        'photo',
        'sexe',
        'telephone',
        'userId',
        'user',
        'courId',
        'cour'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'userId');
    }
    public function cours()
    {
        return $this->belongsTo(Cour::class, 'courId');
    }
}
