<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class EtablissementRequest extends FormRequest
{
    /**
     * Détermine si l'utilisateur est autorisé à faire cette requête.
     */
    public function authorize(): bool
    {
        // Seul le personnel MINESEC (Super Admin) devrait normalement créer/modifier un établissement.
        // Si tu n'as pas encore mis en place tes politiques de rôles, laisse à true pour tes tests.
        return true; 
    }

    /**
     * Obtenir les règles de validation qui s'appliquent à la requête.
     */
    public function rules(): array
    {
        // Récupération de l'ID de l'établissement pour exclure l'enregistrement actuel lors d'une modification (PUT/PATCH)
        $etablissementId = $this->route('etablissement') ?? $this->route('etablissement_id');

        return [
            'nom' => 'required|string|max:255',
            
            'code_etablissement' => [
                'required',
                'string',
                'max:50',
                // Gère l'unicité du code, mais ignore l'établissement actuel si c'est une mise à jour
                Rule::unique('etablissements', 'code_etablissement')->ignore($etablissementId),
            ],
            
            // Validation stricte basée sur les 10 régions de la migration d'EDUSMART
            'region' => [
                'required',
                'string',
                Rule::in([
                    'ADAMAOUA', 'CENTRE', 'EST', 'EXTREME_NORD', 'LITTORAL', 
                    'NORD', 'NORD_OUEST', 'OUEST', 'SUD', 'SUD_OUEST'
                ]),
            ],
            
            'ville'             => 'required|string|max:100',
            'boite_postale'     => 'nullable|string|max:50',
            'telephone_contact' => 'nullable|string|max:50',
            'est_pilote'        => 'boolean',
        ];
    }

    /**
     * Messages d'erreur personnalisés en français pour l'API.
     */
    public function messages(): array
    {
        return [
            'nom.required'                => 'Le nom de l\'établissement est obligatoire.',
            'code_etablissement.required' => 'Le code unique MINESEC (ex: LYCLADOU) est obligatoire.',
            'code_etablissement.unique'   => 'Ce code d\'établissement existe déjà dans le système.',
            'region.required'             => 'La région administrative est obligatoire.',
            'region.in'                   => 'La région sélectionnée n\'est pas une région valide du Cameroun.',
            'ville.required'              => 'La ville ou commune d\'implantation est obligatoire.',
            'est_pilote.boolean'          => 'Le statut pilote doit être un booléen (vrai ou faux).',
        ];
    }
}