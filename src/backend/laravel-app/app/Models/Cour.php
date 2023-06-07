<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 *     required={"id", "libelle", "date_cour", "heure_debut", "heure_fin"},
 *     @OA\Xml(name="Cour"),
 *     @OA\Property(property="id", type="integer", readOnly=true, example="1"),
 *     @OA\Property(property="libelle", type="string", readOnly=true, description="Physique"),
 *     @OA\Property(property="date_cour", type="string", format="date", example="1990-01-01"),
 *     @OA\Property(property="heure_debut", type="string", format="date", example="1990-01-01"),
 *     @OA\Property(property="heure_fin", type="string", format="date", example="1990-01-01"),
 *     @OA\Property(property="created_at", ref="#/components/schemas/BaseModel/properties/created_at"),
 *     @OA\Property(property="updated_at", ref="#/components/schemas/BaseModel/properties/updated_at"),
 *     @OA\Property(property="deleted_at", ref="#/components/schemas/BaseModel/properties/deleted_at")
 * )
 *
 * @method static create(array $array)
 * @method static findOrFail($id)
 * @method static paginate(int $int)
 *
 * Class Cour
 *
 * @package App\Models
 */
class Cour extends Model
{
    use HasFactory;
    protected $fillable = [
        'libelle',
        'date_cour',
        'heure_debut',
        'heure_fin',
        'professeur_id',
    ];
    public function professeur()
    {
        return $this->belongsTo(Professeur::class);
    }
}
