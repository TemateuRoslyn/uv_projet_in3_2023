<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 *     required={"dateCd", "heureDebutCd", "heureFinCd", "eleveId"},
 *     @OA\Xml(name="ConseilDiscipline"),
 *     @OA\Property(property="id", type="integer", readOnly=true, example="1"),
 *     @OA\Property(property="dateCd", type="string", format="date", example="2023-04-01"),
 *     @OA\Property(property="heureDebutCd", type="string", format="date", example="11:00:00"),
 *     @OA\Property(property="heureFinCd", type="string", format="date", example="13:00:00"),
 *     @OA\Property(property="eleveId", type="integer", readOnly=true, example="1"),
 *     @OA\Property(property="eleve", type="object", ref="#/components/schemas/Eleve"),
 *     @OA\Property(property="created_at", ref="#/components/schemas/BaseModel/properties/created_at"),
 *     @OA\Property(property="updated_at", ref="#/components/schemas/BaseModel/properties/updated_at"),
 *     @OA\Property(property="deleted_at", ref="#/components/schemas/BaseModel/properties/deleted_at")
 * )
 *
 * @method static create(array $array)
 * @method static findOrFail($id)
 * @method static paginate(int $int)
 *
 * Class ConseilDiscipline
 *
 * @package App\Models
 */
class ConseilDiscipline extends Model
{
    protected $fillable = [
        'dateCd',
        'heureDebutCd',
        'heureFinCd',
        'eleveId',
        'eleve',
    ];
    public function eleve()
    {
        return $this->belongsTo(Eleve::class, 'eleveId');
    }
}
