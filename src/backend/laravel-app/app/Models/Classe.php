<?php

namespace App\Models;

use App\Models\Eleve;
use App\Models\Cour;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


/**
 * @OA\Schema(
 *     required={"string"},
 *     @OA\Xml(name="Cour"),
 *     @OA\Property(property="id", type="integer", readOnly=true, example="1"),
 *     @OA\Property(property="name", type="string", readOnly=true, description="Terminal"),
 *     @OA\Property(property="shortName", type="string", readOnly=true, description="Tle"),
 *     @OA\Property(property="speciality", type="string", readOnly=true, description="C"),
 *     @OA\Property(property="no", type="integer", readOnly=true, description="1"),
 *     @OA\Property(property="effectif", type="integer", readOnly=true, description="100"),
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
class Classe extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'shortName',
        'speciality',
        'no',
        'effectif',
    ];

    public function eleves()
    {
        return $this->hasMany(Eleve::class);
    }

    public function cours(){
        return $this->belongsToMany(Cour::class, 'cours_classes', 'courId', 'classeId');
    }
}
