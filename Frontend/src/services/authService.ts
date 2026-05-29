import api from './api';
import type { 
  LoginPayloadStep1, 
  LoginPayloadStep2, 
  AuthResponse,
  UpdateProfilePayload,
  ChangePasswordPayload,
  User // Ajout pour le typage des membres
} from '../models/Utilisateur';

export const authService = {
  
  /**
   * 🔑 Étape 1 : Connexion initiale
   */
  login: async (credentials: LoginPayloadStep1): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/login', credentials);
    return response.data;
  },

  /**
   * 🛡️ Étape 2 : Validation du code OTP
   */
  verifyOtp: async (payload: LoginPayloadStep2): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/login', payload);
    
    if (response.data.access_token) {
      localStorage.setItem('auth_token', response.data.access_token);
    }
    if (response.data.user) {
      localStorage.setItem('user_data', JSON.stringify(response.data.user));
    }
    
    return response.data;
  },

  /**
   * 👤 Récupérer le profil complet depuis l'API
   */
  getProfile: async () => {
    const response = await api.get('/profile');
    if (response.data.user) {
      localStorage.setItem('user_data', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  /**
   * ✏️ Mettre à jour les informations du profil
   */
  updateProfile: async (payload: UpdateProfilePayload) => {
    const response = await api.put('/profile/update', payload);
    if (response.data.user) {
      localStorage.setItem('user_data', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  /**
   * 🔐 Changer le mot de passe
   */
  changePassword: async (payload: ChangePasswordPayload) => {
    const response = await api.put('/profile/password', payload);
    return response.data;
  },

  // ─────────────────────────────────────────────────────────────────────────
  // GESTION DES MEMBRES DU GROUPE MINESEC
  // ─────────────────────────────────────────────────────────────────────────

  /**
   * 📋 Lister les membres MINESEC (avec pagination)
   */
  listMinesecMembers: async (page: number = 1) => {
    const response = await api.get(`/minesec/members?page=${page}`);
    return response.data;
  },

  /**
   * ➕ Créer un nouveau membre MINESEC
   */
  createMinesecMember: async (payload: { nom: string, prenom?: string, email: string, telephone?: string }) => {
    const response = await api.post('/minesec/members', payload);
    return response.data;
  },

  /**
   * 🗑️ Supprimer un membre MINESEC
   */
  deleteMinesecMember: async (id: number) => {
    const response = await api.delete(`/minesec/members/${id}`);
    return response.data;
  },
  updateMinesecMember: async (id: number, payload: any) => {
    const response = await api.put(`/minesec/members/${id}`, payload);
    return response.data;
  },

  // ─────────────────────────────────────────────────────────────────────────
  // UTILITAIRES
  // ─────────────────────────────────────────────────────────────────────────

  /**
   * 🚪 Déconnexion
   */
  logout: async (): Promise<void> => {
    try {
      await api.post('/logout');
    } finally {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
    }
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user_data');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('auth_token');
  }
};