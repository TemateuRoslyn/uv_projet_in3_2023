<?php

namespace App\Models;

use App\Models\Eleve;
use App\Models\Cour;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


/**
 * @OA\Schema(
 *     required={"name","shortName","speciality","no","effectif"},
 *     @OA\Xml(name="Classe"),
 *     @OA\Property(property="id", type="integer", readOnly=true, example="1"),
 *     @OA\Property(property="name", type="string", readOnly=true, description="Terminal"),
 *     @OA\Property(property="shortName", type="string", readOnly=true, description="Tle"),
 *     @OA\Property(property="speciality", type="string", readOnly=true, description="C"),
 *     @OA\Property(property="no", type="integer", readOnly=true, description="1"),
 *     @OA\Property(property="effectif", type="integer", readOnly=true, description="100"),
 *     @OA\Property(property="eleves", type="object", ref="#/components/schemas/Eleve"),
 *     @OA\Property(property="cours", type="object", ref="#/components/schemas/Cour"),
 *     @OA\Property(property="professeurs", type="object", ref="#/components/schemas/Professeur"),
 *     @OA\Property(property="created_at", ref="#/components/schemas/BaseModel/properties/created_at"),
 *     @OA\Property(property="updated_at", ref="#/components/schemas/BaseModel/properties/updated_at"),
 *     @OA\Property(property="deleted_at", ref="#/components/schemas/BaseModel/properties/deleted_at")
 * )
 *
 * @method static create(array $array)
 * @method static findOrFail($id)
 * @method static paginate(int $int)
 *
 * Class Classe
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
        'eleves',
        'cours',
        'professeurs'
    ];

    public function eleves()
    {
        return $this->belongsToMany(Eleve::class);
    }

    public function cours()
    {
        return $this->belongsToMany(Cour::class);
    }

    public function professeurs()
    {
        return $this->belongsToMany(Cour::class);
    }
}
