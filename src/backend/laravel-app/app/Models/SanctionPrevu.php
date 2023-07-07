<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 *     required={"libelle","eleveId","fauteId","dureeValidite"},
 *     @OA\Xml(name="Eleve"),
 *     @OA\Property(property="id", type="integer", readOnly=true, example="1"),
 *     @OA\Property(property="libelle", type="string", example="sanction"),
 *     @OA\Property(property="dureeValidite", type="string", format="date", example="1990-01-01"),
 *     @OA\Property(property="eleveId", type="integer", example="1"),
 *     @OA\Property(property="fauteId", type="integer", example="1"),
 *     @OA\Property(property="eleve", type="object", ref="#/components/schemas/Eleve"),
 *     @OA\Property(property="faute", type="object", ref="#/components/schemas/Faute"),
 *     @OA\Property(property="created_at", ref="#/components/schemas/BaseModel/properties/created_at"),
 *     @OA\Property(property="updated_at", ref="#/components/schemas/BaseModel/properties/updated_at"),
 *     @OA\Property(property="deleted_at", ref="#/components/schemas/BaseModel/properties/deleted_at")
 * )
 *
 * @method static create(array $array)
 * @method static findOrFail($id)
 * @method static paginate(int $int)
 *
 * Class SanctionPrevu
 *
 * @package App\Models
 */

class SanctionPrevu extends Model
{
    use HasFactory;

    protected $fillable = [
        'libelle',
        'dureeValidite',
        'eleveId',
        'fauteId',
        'eleve',
        'faute',
    ];

    public function faute()
    {
        return $this->belongsTo(Faute::class, 'fauteId');
    }

    public function eleve()
    {
        return $this->belongsTo(Eleve::class, 'eleveId');
    }
}
