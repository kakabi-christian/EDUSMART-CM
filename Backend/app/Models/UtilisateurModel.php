<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class UtilisateurModel extends Authenticatable
{
    // Indispensable : On lie ce modèle à ta table personnalisée
    protected $table = 'utilisateurs';

    use HasApiTokens, Notifiable;

    /**
     * Les attributs qui peuvent être assignés en masse.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'etablissement_id',
        'nom',
        'prenom',
        'email',
        'telephone',
        'matricule', // ✅ AJOUTÉ : Permet l'enregistrement du matricule
        'role',
        'password',
        'est_actif',
        // ✅ Champs requis pour l'authentification à double facteur (2FA)
        'two_factor_code',
        'two_factor_expires_at',
    ];

    /**
     * Les attributs qui doivent être cachés pour les retours d'API JSON.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'two_factor_code', // Sécurité : Ne jamais renvoyer le code secret dans les réponses JSON
    ];

    /**
     * Le cast des attributs natifs.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed', // Gère automatiquement le hachage Bcrypt à la création
        'est_actif' => 'boolean',
        // ✅ Casts pour le contrôle de validité du 2FA
        'two_factor_expires_at' => 'datetime',
    ];

    // ─────────────────────────────────────────────────────────────────────────
    // LOGIQUE MÉTIER 2FA
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Génère un code 2FA à 6 chiffres et définit son expiration (ex: 15 minutes)
     */
    public function generateTwoFactorCode(): void
    {
        $this->timestamps = false; // Évite de modifier le champ updated_at juste pour un code OTP
        $this->two_factor_code = rand(100000, 999000);
        $this->two_factor_expires_at = now()->addMinutes(15);
        $this->save();
    }

    /**
     * Réinitialise le code 2FA après une vérification réussie ou une expiration
     */
    public function resetTwoFactorCode(): void
    {
        $this->timestamps = false;
        $this->two_factor_code = null;
        $this->two_factor_expires_at = null;
        $this->save();
    }

    // ─────────────────────────────────────────────────────────────────────────
    // RELATIONS ÉLOQUENT
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Un utilisateur appartient à un établissement (sauf super-administrateur MINESEC)
     */
    public function etablissement()
    {
        return $this->belongsTo(EtablissementModel::class, 'etablissement_id');
    }

    /**
     * Un utilisateur peut soumettre plusieurs feedbacks ou réclamations.
     */
    public function feedbacks()
    {
        return $this->hasMany(FeedbackModel::class, 'auteur_id');
    }
}