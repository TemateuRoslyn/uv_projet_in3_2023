<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Eleve;

/**
 * @OA\Schema(
 *     required={"libelle", "gravite","eleve_id","regle_id"},
 *     @OA\Xml(name="Faute"),
 *     @OA\Property(property="id", type="integer", readOnly=true, example="1"),
 *     @OA\Property(property="libelle", type="string", example="escalade"),
 *     @OA\Property(property="gravite", type="string", example="recidif"),
 *   @OA\Property(property="eleve_id", type="integer", readOnly=true, example="1"),
 *   @OA\Property(property="regle_id", type="integer", readOnly=true, example="1"),
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

class Faute extends Model
{
    use HasFactory;
    protected $fillable = [
        'id',
        'libelle',
        'gravite',
        'eleve_id',
        'regle_id'
    ];
    public function regle()
    {
        return $this->belongsTo(Regle::class);
    }
    public function eleve()
    {
        return $this->belongsTo(Eleve::class);
    }
}
