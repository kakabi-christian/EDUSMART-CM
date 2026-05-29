<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ClasseModel extends Model
{
    /**
     * Le nom de la table associée au modèle.
     */
    protected $table = 'classes';

    /**
     * Les attributs qui peuvent être assignés en masse.
     */
    protected $fillable = [
        'etablissement_id',
        'annee_scolaire_id',
        'filiere_id',
        'nom',
        'code_classe',
        'sous_systeme',
        'niveau',
        'capacite_max',
    ];

    // ─────────────────────────────────────────────────────────────────────────
    // RELATIONS ÉLOQUENT
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Une classe appartient à un établissement.
     */
    public function etablissement(): BelongsTo
    {
        return $this->belongsTo(EtablissementModel::class, 'etablissement_id');
    }

    /**
     * Une classe appartient à une année scolaire.
     */
    public function anneeScolaire(): BelongsTo
    {
        return $this->belongsTo(AnneeScolaireModel::class, 'annee_scolaire_id');
    }

    /**
     * Une classe appartient à une filière.
     */
    public function filiere(): BelongsTo
    {
        return $this->belongsTo(FiliereModel::class, 'filiere_id');
    }

    /**
     * Relation optionnelle : Une classe possède des élèves.
     * Décommente si tu crées le modèle EleveModel.
     */
    /*
    public function eleves(): HasMany
    {
        return $this->hasMany(EleveModel::class, 'classe_id');
    }
    */
}