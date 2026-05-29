import api from "./api";

// Interface pour typer les réponses si nécessaire
export interface StatResponse {
    success: boolean;
    data: any;
}

export const StatsService = {
    // 1. Statistiques globales (avec filtres optionnels : annee_scolaire_id, filiere_id)
    getGlobalStats: async (params?: { annee_scolaire_id?: number, filiere_id?: number }) => {
        const response = await api.get<StatResponse>("/stats", { params });
        return response.data;
    },

    // 2. Répartition des établissements par région
    getRepartitionRegion: async () => {
        const response = await api.get<StatResponse>("/stats/repartition-region");
        return response.data;
    },

    // 3. Évolution du nombre de classes
    getEvolution: async () => {
        const response = await api.get<StatResponse>("/stats/evolution");
        return response.data;
    },

    // 4. Statistiques des utilisateurs par rôle
    getUserStats: async () => {
        const response = await api.get<StatResponse>("/stats/utilisateurs");
        return response.data;
    },

    // 5. Statistiques des filières
    getFiliereStats: async () => {
        const response = await api.get<StatResponse>("/stats/filieres");
        return response.data;
    }
};