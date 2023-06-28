<?php

namespace App\Models;


/**
 * @OA\Schema(
 *     required={"email", "password", "username"},
 *     @OA\Xml(name="Personnel"),
 *     @OA\Property(property="id", type="integer", readOnly=true, example="1"),
 *     @OA\Property(property="fonction", type="string",example="Marchand"),
 *     @OA\Property(property="updated_at", ref="#/components/schemas/BaseModel/properties/updated_at"),
 *     @OA\Property(property="deleted_at", ref="#/components/schemas/BaseModel/properties/deleted_at")
 * )
 *
 * @method static create(array $array)
 * @method static findOrFail($id)
 * @method static paginate(int $int)
 *
 * Class Personnel
 *
 * @package App\Models
 */
class Personnel extends User
{
    protected $fillable = [
        'fonction',
    ];

    public function conseilDiscipline(){
        return $this->belongsToMany(ConseilDiscipline::class);
   }
}
