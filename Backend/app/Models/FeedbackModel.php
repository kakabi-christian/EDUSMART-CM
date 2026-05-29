<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FeedbackModel extends Model
{
    // Liaison explicite avec la table personnalisée
    protected $table = 'feedbacks';

    /**
     * Les attributs qui peuvent être assignés en masse.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'auteur_id',
        'type',
        'titre',
        'contenu',
        'statut',
        'local_sync_id',
    ];

    // ─────────────────────────────────────────────────────────────────────────
    // RELATIONS ÉLOQUENT
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Le feedback a été écrit par un utilisateur.
     */
    public function auteur()
    {
        return $this->belongsTo(UtilisateurModel::class, 'auteur_id');
    }
}