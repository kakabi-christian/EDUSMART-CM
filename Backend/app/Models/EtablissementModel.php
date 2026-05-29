<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EtablissementModel extends Model
{
    // On lie explicitement le modèle à ta table personnalisée
    protected $table = 'etablissements';

    /**
     * Les attributs qui peuvent être assignés en masse.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nom',
        'code_etablissement',
        'region',
        'departement',
        'arrondissement',
        'adresse',
        'telephone',
        'email',
        'est_pilote',
    ];

    /**
     * Le cast des attributs natifs.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'est_pilote' => 'boolean',
    ];

    // ─────────────────────────────────────────────────────────────────────────
    // RELATIONS ÉLOQUENT
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Un établissement possède plusieurs utilisateurs (personnels, enseignants).
     */
    public function utilisateurs()
    {
        return $this->hasMany(UtilisateurModel::class, 'etablissement_id');
    }

    /**
     * Un établissement contient plusieurs salles physiques.
     */
    public function salles()
    {
        return $this->hasMany(Model::class, 'etablissement_id'); // Remplacer par SalleModel quand il sera créé
    }

    /**
     * Un établissement possède plusieurs classes pédagogiques.
     */
    public function classes()
    {
        return $this->hasMany(Model::class, 'etablissement_id'); // Remplacer par ClasseModel quand il sera créé
    }
}