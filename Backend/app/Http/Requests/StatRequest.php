<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StatRequest extends FormRequest
{
    /**
     * Autoriser la requête si l'utilisateur est authentifié.
     */
    public function authorize(): bool
    {
        return Auth::check();
    }

    /**
     * Règles de validation pour les filtres statistiques.
     * * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'annee_scolaire_id' => 'sometimes|exists:annees_scolaires,id',
            'etablissement_id'  => 'sometimes|exists:etablissements,id',
            'filiere_id'        => 'sometimes|exists:filieres,id',
            'niveau'            => 'sometimes|in:PREMIER_CYCLE,SECOND_CYCLE',
            'sous_systeme'      => 'sometimes|in:FRANCOPHONE,ANGLOPHONE',
            'date_debut'        => 'sometimes|date',
            'date_fin'          => 'sometimes|date|after_or_equal:date_debut',
            'type'              => 'required|in:global,repartition,evolution',
        ];
    }

    /**
     * Messages d'erreur personnalisés pour une meilleure expérience API.
     */
    public function messages(): array
    {
        return [
            'date_fin.after_or_equal' => 'La date de fin doit être postérieure ou égale à la date de début.',
            'type.required'           => 'Le type de statistique est obligatoire.',
            'type.in'                 => 'Le type de statistique doit être : global, repartition ou evolution.',
        ];
    }
}