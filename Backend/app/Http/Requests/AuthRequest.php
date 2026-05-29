<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AuthRequest extends FormRequest
{
    /**
     * Autoriser tous les utilisateurs à effectuer cette requête d'authentification.
     */
    public function authorize(): bool
    {
        return true; // ✅ Changé de false à true pour permettre l'exécution
    }

    /**
     * Règles de validation appliquées à la requête.
     */
    public function rules(): array
    {
        $rules = [
            // L'identifiant peut être l'email, le téléphone ou le matricule selon l'utilisateur
            'login' => 'required|string',
        ];

        // S'il s'agit de la phase 2 (Validation du code à double facteur)
        if ($this->has('two_factor_code')) {
            $rules['two_factor_code'] = 'required|string|size:6';
        } else {
            // S'il s'agit de la phase 1 (Connexion initiale avec mot de passe)
            $rules['password'] = 'required|string|min:6';
        }

        return $rules;
    }

    /**
     * Messages d'erreur personnalisés en français pour ton API EDUSMART.
     */
    public function messages(): array
    {
        return [
            'login.required' => 'L\'identifiant (Email, Téléphone ou Matricule) est obligatoire.',
            'password.required' => 'Le mot de passe est obligatoire.',
            'password.min' => 'Le mot de passe doit contenir au moins 6 caractères.',
            'two_factor_code.required' => 'Le code de vérification OTP est obligatoire.',
            'two_factor_code.size' => 'Le code de vérification doit comporter exactement 6 chiffres.',
        ];
    }
}