/**
 * Les 4 rôles officiels définis dans la base de données EDUSMART
 */
export type UserRole = 'minesec' | 'chef_etablissement' | 'enseignant' | 'eleve_parent';

/**
 * Payload pour l'Étape 1 de la connexion (Demande de l'OTP)
 */
export interface LoginPayloadStep1 {
  login: string;    // Peut être l'email, le téléphone ou le matricule 🔑
  password: string; // Mot de passe initial
}

/**
 * Payload pour l'Étape 2 de la connexion (Validation de l'OTP)
 */
export interface LoginPayloadStep2 {
  login: string;
  two_factor_code: string; // Le code à 6 chiffres reçu par mail 📧
}

/**
 * Payload pour la mise à jour du profil
 */
export interface UpdateProfilePayload {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
}

/**
 * Payload pour le changement de mot de passe
 */
export interface ChangePasswordPayload {
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
}

/**
 * Structure de l'utilisateur connecté renvoyée par l'API
 */
export interface AuthenticatedUser {
  id: number;
  nom: string;
  prenom: string | null;
  role: UserRole;
  etablissement_id: number | null;
  email: string | null;
  telephone: string | null;
  matricule: string | null;
}

/**
 * Interface globale pour un utilisateur complet (EDUSMART)
 */
export interface User {
  id: number;
  etablissement_id: number | null;
  nom: string;
  prenom: string | null;
  matricule: string | null;
  email: string | null;
  telephone: string | null;
  role: UserRole;
  derniere_synchro_at?: string | null;
  created_at?: string;
  updated_at?: string;
}

/**
 * Réponse de l'API lors d'une authentification réussie
 */
export interface AuthResponse {
  success: boolean;
  message: string;
  step?: number;
  access_token?: string;
  token_type?: string;
  user?: AuthenticatedUser;
}

/**
 * Interface de pagination standardisée (Laravel Resource pour EDUSMART)
 */
export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}