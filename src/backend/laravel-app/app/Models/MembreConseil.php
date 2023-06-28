<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 *     required={"idChef", "idSurveillantG","idRepresentantE"},
 *     @OA\Xml(name="MembreConseil"),
 *     @OA\Property(property="id", type="integer", readOnly=true, example="1"),
 *     @OA\Property(property="idChef", type="integer", example="1"),
 *     @OA\Property(property="idSurveillantG", type="integer", example="1"),
 *     @OA\Property(property="idRepresentantE", type="integer", example="1"),
 *     @OA\Property(property="personnelC", type="object", ref="#/components/schemas/Personnel"),
 *     @OA\Property(property="personnelG", type="object", ref="#/components/schemas/Personnel"),
 *     @OA\Property(property="parent", type="object", ref="#/components/schemas/Parents"),
 *     @OA\Property(property="created_at", ref="#/components/schemas/BaseModel/properties/created_at"),
 *     @OA\Property(property="updated_at", ref="#/components/schemas/BaseModel/properties/updated_at"),
 *     @OA\Property(property="deleted_at", ref="#/components/schemas/BaseModel/properties/deleted_at")
 * )
 *
 * @method static create(array $array)
 * @method static findOrFail($id)
 * @method static paginate(int $int)
 *
 * Class MembreConseil
 *
 * @package App\Models
 */
class MembreConseil extends Model
{
    use HasFactory;
    protected $fillable = [
        'idChef',
        'idSurveillantG',
        'idRepresentantE',
        'personnelC',
        'personnelG',
        'parent'
    ];

    public function personnelC()
    {
        return $this->belongsTo(Personnel::class, 'idChef');
    }

    public function personnelG()
    {
        return $this->belongsTo(Personnel::class, 'idSurveillantG');
    }

    public function parent()
    {
        return $this->belongsTo(Parent::class, 'idRepresentantE');
    }
}
