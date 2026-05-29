<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\ClasseModel;

class FiliereModel extends Model
{
    /**
     * Le nom de la table associée au modèle.
     *
     * @var string
     */
    protected $table = 'filieres';

    /**
     * Les attributs qui peuvent être assignés en masse.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nom',
        'code_filiere',
        'description',
    ];

    // ─────────────────────────────────────────────────────────────────────────
    // RELATIONS ÉLOQUENT
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Relation : Une filière peut être liée à plusieurs établissements.
     * Nécessite une table pivot 'etablissement_filiere'.
     */
    public function etablissements()
    {
        return $this->belongsToMany(EtablissementModel::class, 'etablissement_filiere', 'filiere_id', 'etablissement_id')
                    ->withTimestamps();
    }

    /**
     * Relation : Une filière peut contenir plusieurs classes.
     */
    public function classes()
    {
        return $this->hasMany(ClasseModel::class, 'filiere_id');
    }
}