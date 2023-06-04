<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 *     required={"solvable", "redoublant", "name", "first_name", "last_name", "date_de_naissance", "lieu_de_naissance", "photo", "sexe", "telephone"},
 *     @OA\Xml(name="Eleve"),
 *     @OA\Property(property="id", type="integer", readOnly=true, example="1"),
 *     @OA\Property(property="role", type="string", readOnly=true, description="User role"),
 *     @OA\Property(property="name", type="string", maxLength=32, example="John"),
 *     @OA\Property(property="first_name", type="string", maxLength=32, example="Doe"),
 *     @OA\Property(property="last_name", type="string", maxLength=32, example="Smith"),
 *     @OA\Property(property="date_de_naissance", type="string", format="date", example="1990-01-01"),
 *     @OA\Property(property="lieu_de_naissance", type="string", maxLength=32, example="Paris"),
 *     @OA\Property(property="photo", type="string", format="url", example="https://example.com/photo.jpg"),
 *     @OA\Property(property="sexe", type="string", example="male"),
 *     @OA\Property(property="telephone", type="string", example="+33123456789"),
 *     @OA\Property(property="solvable", type="boolean", example=true),
 *     @OA\Property(property="redoublant", type="boolean", example=false),
 *     @OA\Property(property="created_at", ref="#/components/schemas/BaseModel/properties/created_at"),
 *     @OA\Property(property="updated_at", ref="#/components/schemas/BaseModel/properties/updated_at"),
 *     @OA\Property(property="deleted_at", ref="#/components/schemas/BaseModel/properties/deleted_at")
 * )
 *
 * @method static create(array $array)
 * @method static findOrFail($id)
 * @method static paginate(int $int)
 *
 * Class Eleve
 *
 * @package App\Models
 */
class Eleve extends Model
{

    protected $fillable = [
        'solvable',
        'redoublant',
        'name',
        'first_name',
        'last_name',
        'date_de_naissance',
        'lieu_de_naissance',
        'photo',
        'sexe',
        'telephone',
        'user_id',
        'user',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function parents()
    {
        return $this->belongsToMany(Parents::class);
    }

    public function classe()
    {
        return $this->belongsTo(Classe::class);
    }

    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($eleve) {
            $eleve->user()->delete();
        });
    }
}
