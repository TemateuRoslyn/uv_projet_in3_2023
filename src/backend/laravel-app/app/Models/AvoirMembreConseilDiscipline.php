<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 *     required={"idMembreConseil", "idConseilDiscipline"},
 *     @OA\Xml(name="AvoirMembreConseilDiscipline"),
 *     @OA\Property(property="id", type="integer", readOnly=true, example="1"),
 *     @OA\Property(property="idMembreConseil", type="integer", example="1"),
 *     @OA\Property(property="idConseilDiscipline", type="integer", example="1"),
 *     @OA\Property(property="membreconseil", type="object", ref="#/components/schemas/MembreConseil"),
 *     @OA\Property(property="conseildiscipline", type="object", ref="#/components/schemas/ConseilDiscipline"),
 *     @OA\Property(property="created_at", ref="#/components/schemas/BaseModel/properties/created_at"),
 *     @OA\Property(property="updated_at", ref="#/components/schemas/BaseModel/properties/updated_at"),
 *     @OA\Property(property="deleted_at", ref="#/components/schemas/BaseModel/properties/deleted_at")
 * )
 *
 * @method static create(array $array)
 * @method static findOrFail($id)
 * @method static paginate(int $int)
 *
 * Class AvoirMembreConseilDiscipline
 *
 * @package App\Models
 */
class AvoirMembreConseilDiscipline extends Model
{
    use HasFactory;
    protected $fillable = [
        'idMembreConseil',
        'idConseilDiscipline',
        'membreconseil',
        'conseildiscipline'
    ];

    public function membreconseil()
    {
        return $this->belongsTo(MembreConseil::class, 'idMembreConseil');
    }

    public function conseildiscipline()
    {
        return $this->belongsTo(ConseilDiscipline::class, 'idConseilDiscipline');
    }
}
