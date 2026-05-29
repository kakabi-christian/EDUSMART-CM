// services/EtablissementService.ts
import api from './api';
import type { 
  Etablissement, 
  CreateEtablissementPayload, 
  UpdateEtablissementPayload 
} from '../models/Etablissement';
import type { PaginatedResponse } from '../models/Utilisateur';

export const etablissementService = {
  
  /**
   * 🏢 1. Récupérer la liste paginée des établissements
   * Exemple d'utilisation : etablissementService.getAll(1, 10);
   */
  getAll: async (page = 1, perPage = 15): Promise<PaginatedResponse<Etablissement>> => {
    const response = await api.get<PaginatedResponse<Etablissement>>('/etablissements', {
      params: {
        page,
        per_page: perPage
      }
    });
    return response.data;
  },

  /**
   * 🔍 2... Récupérer les détails d'un établissement spécifique par son ID
   */
  getById: async (id: number): Promise<{ success: boolean; message: string; data: Etablissement }> => {
    const response = await api.get<{ success: boolean; message: string; data: Etablissement }>(`/etablissements/${id}`);
    return response.data;
  },

  /**
   * 🚀 3. Créer un nouvel établissement (Réservé au MINESEC / Admin)
   */
  create: async (payload: CreateEtablissementPayload): Promise<{ success: boolean; message: string; data: Etablissement }> => {
    const response = await api.post<{ success: boolean; message: string; data: Etablissement }>('/etablissements', payload);
    return response.data;
  },

  /**
   * 📝 4. Mettre à jour un établissement existant
   */
  update: async (id: number, payload: UpdateEtablissementPayload): Promise<{ success: boolean; message: string; data: Etablissement }> => {
    const response = await api.put<{ success: boolean; message: string; data: Etablissement }>(`/etablissements/${id}`, payload);
    return response.data;
  },

  /**
   * ❌ 5. Supprimer définitivement un établissement
   */
  delete: async (id: number): Promise<{ success: boolean; message: string }> => {
    const response = await api.delete<{ success: boolean; message: string }>(`/etablissements/${id}`);
    return response.data;
  }
};