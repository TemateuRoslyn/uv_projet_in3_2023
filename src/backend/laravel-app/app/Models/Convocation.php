<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Personnel;

/**
 * @OA\Schema(
 *     required={"libelle", "dateConvocation","dateRdv","statut","personnelId","eleveId"},
 *     @OA\Xml(name="Convocation"),
 *     @OA\Property(property="id", type="integer", readOnly=true, example="1"),
 *     @OA\Property(property="libelle", type="string", example="vous X eleve dans mon etablissement"),
 *     @OA\Property(property="dateConvocation", type="string", format="date", example="1990-01-01"),
 *     @OA\Property(property="dateRdv", type="string", format="date", example="1990-01-01"),
 *     @OA\Property(property="statut", type="string", example="achevee,annulee"),
 *     @OA\Property(property="personnelId", type="integer", readOnly=true, example="1"),
 *     @OA\Property(property="personnel", type="object", ref="#/components/schemas/Personnel"),
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
 * Class Convocation
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
         'eleveId',
         'eleve',
    ];

    public function personnel()
    {
        return $this->belongsTo(Personnel::class, 'personnelId');
    }
    public function eleve()
    {
        return $this->belongsTo(Eleve::class, 'eleveId');
    }


}
