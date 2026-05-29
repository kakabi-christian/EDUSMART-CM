<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AnneeScolaireModel extends Model
{
    /**
     * Le nom de la table associée au modèle.
     */
    protected $table = 'annees_scolaires';

    /**
     * Les attributs qui peuvent être assignés en masse.
     */
    protected $fillable = [
        'libelle',
        'date_debut',
        'date_fin',
        'est_active',
    ];

    /**
     * Les attributs qui doivent être castés.
     */
    protected $casts = [
        'date_debut' => 'date',
        'date_fin' => 'date',
        'est_active' => 'boolean',
    ];

    // ─────────────────────────────────────────────────────────────────────────
    // RELATIONS ÉLOQUENT
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Une année scolaire contient plusieurs classes.
     */
    public function classes(): HasMany
    {
        return $this->hasMany(ClasseModel::class, 'annee_scolaire_id');
    }

    // ─────────────────────────────────────────────────────────────────────────
    // SCOPES (Utilitaires)
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Scope pour récupérer uniquement l'année scolaire active.
     * Utilisation : AnneeScolaireModel::active()->first();
     */
    public function scopeActive($query)
    {
        return $query->where('est_active', true);
    }
}