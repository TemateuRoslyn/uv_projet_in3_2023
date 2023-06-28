<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Personnel;

/**
 * @OA\Schema(
 *     required={"libelle", "dateConvocation","dateRdv","statut","personnelId"},
 *     @OA\Xml(name="Faute"),
 *     @OA\Property(property="id", type="integer", readOnly=true, example="1"),
 *     @OA\Property(property="libelle", type="string", example="vous X eleve dans mon etablissement"),
 *     @OA\Property(property="dateConvocation", type="string", format="date", example="1990-01-01"),
 *     @OA\Property(property="dateRdv", type="string", format="date", example="1990-01-01"),
 *     @OA\Property(property="statut", type="string", example="achevee,annulee"),
 *     @OA\Property(property="personnelId", type="integer", readOnly=true, example="1"),
 *     @OA\Property(property="personnel", type="object", ref="#/components/schemas/Personnel"),
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


class Convocation extends Model
{
    use HasFactory;
    protected $fillable = [
        'libelle',
        'dateConvocation',
         'dateRdv',
         'statut',
         'personnelId',
         'personnel',
    ];

    public function personnel()
    {
        return $this->belongsTo(Personnel::class, 'personnelId');
    }


}
