<?php

namespace App\Models;

use Carbon\Carbon;
use DateTime;
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
 *     @OA\Property(property="statut", type="string", example="En attente"),
 *     @OA\Property(property="eleveId", type="integer", example="1"),
 *     @OA\Property(property="eleve", type="object", ref="#/components/schemas/Eleve"),
 *     @OA\Property(property="fauteId", type="integer", example="1"),
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
        'fauteId',
        'faute',
        'eleve',
    ];
    protected $append = [
        'status'
    ];
    public function eleve()
    {
        return $this->belongsTo(Eleve::class, 'eleveId');
    }
    public function faute()
    {
        return $this->belongsTo(Faute::class, 'fauteId');
    }

    //Recuperer le status d'un conseil en fonction de la date courante
    public function getStatusAttribute()
    {
        $date_debut = Carbon::parse($this->attributes['dateCd'] . ' ' . $this->attributes['heureDebutCd']);
        $date_fin = Carbon::parse($this->attributes['dateCd'] . ' ' . $this->attributes['heureFinCd']);
        $date_courante = new DateTime();

        if ($date_debut->isFuture()) {
            return "En attente";
        }

        if ($date_courante > $date_debut && $date_courante < $date_fin) {
            return "En cours";
        }

        return "Passe";
    }
}
