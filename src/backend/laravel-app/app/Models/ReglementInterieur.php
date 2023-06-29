<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 *     required={"libelle"},
 *     @OA\Xml(name="ReglementInterieur"),
 *     @OA\Property(property="id", type="integer", readOnly=true, example="1"),
 *     @OA\Property(property="libelle", type="string", readOnly=true, description="Un nouveau reglement interieur"),
 *     @OA\Property(property="created_at", ref="#/components/schemas/BaseModel/properties/created_at"),
 *     @OA\Property(property="updated_at", ref="#/components/schemas/BaseModel/properties/updated_at"),
 *     @OA\Property(property="deleted_at", ref="#/components/schemas/BaseModel/properties/deleted_at")
 * )
 *
 * @method static create(array $array)
 * @method static findOrFail($id)
 * @method static paginate(int $int)
 *
 * Class ReglementInterieur
 *
 * @package App\Models
 */
class ReglementInterieur extends Model
{
    use HasFactory;

    protected $fillable = [
        'libelle'
    ];
    public function regle(){
        return $this->belongsToMany(Regle::class, 'reglementInterieurId');
    }
}
