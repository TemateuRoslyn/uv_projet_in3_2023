<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


/**
 * @OA\Schema(
 *     required={"libelle"},
 *     @OA\Xml(name="Regle"),
 *     @OA\Property(property="id", type="integer", readOnly=true, example="1"),
 *     @OA\Property(property="role", type="string", readOnly=true, description="Une regle"),
 *     @OA\Property(property="created_at", ref="#/components/schemas/BaseModel/properties/created_at"),
 *     @OA\Property(property="updated_at", ref="#/components/schemas/BaseModel/properties/updated_at"),
 *     @OA\Property(property="deleted_at", ref="#/components/schemas/BaseModel/properties/deleted_at")
 * )
 *
 * @method static create(array $array)
 * @method static findOrFail($id)
 * @method static paginate(int $int)
 *
 * Class Regle
 *
 * @package App\Models
 */
class Regle extends Model
{
    use HasFactory;

    protected $fillable = [
        'libelle',
        'reglement_interieur_id'
    ];

    public function reglementInterieur()
    {
        return $this->belongsTo(ReglementInterieur::class);
    }
}
