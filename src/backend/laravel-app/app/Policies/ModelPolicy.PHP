<?php

namespace App\Policies;

use Illuminate\Auth\Access\HandlesAuthorization;
use App\Model\User;

class ModelPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     *
     * @param  \App\Models\User  $user
     * @return bool
     */
    public function viewAny(User $user)
    {
        // Logique d'autorisation pour voir tous les modèles
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Model  $model
     * @return bool
     */
    public function view(User $user, Model $model)
    {
        // Logique d'autorisation pour voir un modèle spécifique
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\User  $user
     * @return bool
     */
    public function create(User $user)
    {
        // Logique d'autorisation pour créer un modèle
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Model  $model
     * @return bool
     */
    public function update(User $user, Model $model)
    {
        // Logique d'autorisation pour mettre à jour un modèle
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Model  $model
     * @return bool
     */
    public function delete(User $user, Model $model)
    {
        // Logique d'autorisation pour supprimer un modèle
    }
}
