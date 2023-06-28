<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 *     required={"demarcheMediation", "fauteId"},
 *     @OA\Xml(name="Reparation"),
 *     @OA\Property(property="id", type="integer", readOnly=true, example="1"),
 *     @OA\Property(property="demarcheMediation", type="string", maxLength=200, example="Lettre de demande d'excuse"),
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
 * Class Reparation
 *
 * @package App\Models
 */
class Reparation extends Model
{
    use HasFactory;
    protected $fillable = [
        'demarcheMediation',
        'fauteId',
    ];


    public function faute()
    {
        return $this->belongsTo(Faute::class, 'fauteId');
    }
}
