// models/etablissement.ts
/**
 * Les 10 régions administratives officielles du Cameroun définies dans la base EDUSMART
 */
export type CameroonRegion = 
  | 'ADAMAOUA' 
  | 'CENTRE' 
  | 'EST' 
  | 'EXTREME_NORD' 
  | 'LITTORAL' 
  | 'NORD' 
  | 'NORD_OUEST' 
  | 'OUEST' 
  | 'SUD' 
  | 'SUD_OUEST';

/**
 * Interface principale représentant un Établissement (Lycée/Collège)
 */
export interface Etablissement {
  id: number;
  nom: string;
  code_etablissement: string; // Ex: LYCLADOU 🆔
  region: CameroonRegion;     // Région administrative stricte
  ville: string;              // Ville ou commune d'implantation 🏢
  boite_postale: string | null;
  telephone_contact: string | null;
  est_pilote: boolean;        // Statut d'établissement pilote 🚀
  created_at?: string;
  updated_at?: string;
}

/**
 * Payload requis pour la création d'un nouvel établissement (POST)
 */
export interface CreateEtablissementPayload {
  nom: string;
  code_etablissement: string;
  region: CameroonRegion;
  ville: string;
  boite_postale?: string | null;
  telephone_contact?: string | null;
  est_pilote?: boolean;
}

/**
 * Payload pour la mise à jour partielle d'un établissement (PUT/PATCH)
 */
export interface UpdateEtablissementPayload extends Partial<CreateEtablissementPayload> {
  // Tous les champs deviennent optionnels pour les modifications locales
}