<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 *     required={"libelle", "view"},
 *     @OA\Xml(name="Notification"),
 *     @OA\Property(property="id", type="integer", readOnly=true, example="1"),
 *     @OA\Property(property="libelle", type="string", maxLength=32, example="Resultat d'examin"),
 *     @OA\Property(property="view", type="integer"),
 *     @OA\Property(property="user", type="object", ref="#/components/schemas/User"),
 *     @OA\Property(property="created_at", ref="#/components/schemas/BaseModel/properties/created_at"),
 *     @OA\Property(property="updated_at", ref="#/components/schemas/BaseModel/properties/updated_at"),
 *     @OA\Property(property="deleted_at", ref="#/components/schemas/BaseModel/properties/deleted_at")
 * )
 *
 * @method static create(array $array)
 * @method static findOrFail($id)
 * @method static paginate(int $int)
 *
 * Class Notification
 *
 * @package App\Models
*/

class Notification extends Model
{
    protected $fillable = [
        'libelle',
        'view',
        'userId',
        'user',
    ];
    public function user()
    {
        return $this->belongsTo(User::class, 'userId');
    }

    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($notification) {
            $notification->user()->delete();
        });
    }
}
