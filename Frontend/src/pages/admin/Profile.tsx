import React, { useState } from 'react';
import { MdAccountCircle, MdEdit, MdSave, MdLock } from 'react-icons/md';
import { authService } from '../../services/authService';
import type { UpdateProfilePayload, ChangePasswordPayload } from '../../models/Utilisateur';

export default function Profile() {
  const user = authService.getCurrentUser();

  const [profileData, setProfileData] = useState<UpdateProfilePayload>({
    nom: user?.nom || '',
    prenom: user?.prenom || '',
    email: user?.email || '',
    telephone: user?.telephone || ''
  });

  const [passwordData, setPasswordData] = useState<ChangePasswordPayload>({
    current_password: '',
    new_password: '',
    new_password_confirmation: ''
  });

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authService.updateProfile(profileData);
      alert('Profil mis à jour avec succès');
    } catch (error) {
      console.error("Erreur mise à jour profil", error);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authService.changePassword(passwordData);
      alert('Mot de passe modifié avec succès');
      setPasswordData({ current_password: '', new_password: '', new_password_confirmation: '' });
    } catch (error) {
      console.error("Erreur changement mot de passe", error);
    }
  };

  return (
    <div className="container-fluid py-4" style={{ backgroundColor: '#ffffff', minHeight: '100vh', color: '#000000' }}>
      
      {/* ── EN-TÊTE DU PROFIL ── */}
      <div className="card border-0 rounded-4 shadow-sm mb-4" style={{ backgroundColor: '#f8f9fa', border: '1px solid #e9ecef' }}>
        <div className="card-body p-4 p-md-5 d-flex flex-column flex-md-row align-items-center gap-4">
          <div className="position-relative">
            <MdAccountCircle size={120} style={{ color: '#00A663' }} />
          </div>
          <div>
            <h3 className="fw-bold m-0">{user?.nom} {user?.prenom}</h3>
            <p className="text-secondary mb-2 text-uppercase fw-bold" style={{ fontSize: '0.8rem', letterSpacing: '1px' }}>{user?.role}</p>
            <span className="badge px-3 py-2" style={{ backgroundColor: 'rgba(0, 166, 99, 0.1)', color: '#00A663' }}>
              Matricule : {user?.matricule || 'N/A'}
            </span>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* ── FORMULAIRE D'ÉDITION ── */}
        <div className="col-12 col-lg-8">
          <div className="card border-0 rounded-4 p-4 shadow-sm h-100" style={{ backgroundColor: '#f8f9fa', border: '1px solid #e9ecef' }}>
            <h5 className="fw-bold mb-4 d-flex align-items-center gap-2" style={{ color: '#00A663' }}>
              <MdEdit /> Informations personnelles
            </h5>
            <form onSubmit={handleUpdateProfile} className="row g-3">
              <div className="col-md-6">
                <label className="form-label small text-dark fw-bold">Nom</label>
                <input type="text" className="form-control bg-white rounded-3 border-secondary" value={profileData.nom} onChange={e => setProfileData({...profileData, nom: e.target.value})} />
              </div>
              <div className="col-md-6">
                <label className="form-label small text-dark fw-bold">Prénom</label>
                <input type="text" className="form-control bg-white rounded-3 border-secondary" value={profileData.prenom} onChange={e => setProfileData({...profileData, prenom: e.target.value})} />
              </div>
              <div className="col-md-6">
                <label className="form-label small text-dark fw-bold">Email</label>
                <input type="email" className="form-control bg-white rounded-3 border-secondary" value={profileData.email} onChange={e => setProfileData({...profileData, email: e.target.value})} />
              </div>
              <div className="col-md-6">
                <label className="form-label small text-dark fw-bold">Téléphone</label>
                <input type="text" className="form-control bg-white rounded-3 border-secondary" value={profileData.telephone} onChange={e => setProfileData({...profileData, telephone: e.target.value})} />
              </div>
              <div className="col-12 mt-4">
                <button type="submit" className="btn text-white px-4 py-2 rounded-3 fw-bold border-0" style={{ backgroundColor: '#00A663' }}>
                  <MdSave className="me-2" /> Enregistrer les changements
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* ── SÉCURITÉ ── */}
        <div className="col-12 col-lg-4">
          <div className="card border-0 rounded-4 p-4 shadow-sm h-100" style={{ backgroundColor: '#f8f9fa', border: '1px solid #e9ecef' }}>
            <h5 className="fw-bold mb-4 d-flex align-items-center gap-2" style={{ color: '#FFCC00' }}>
              <MdLock /> Sécurité
            </h5>
            <form onSubmit={handleChangePassword} className="d-flex flex-column gap-3">
              <input type="password" placeholder="Mot de passe actuel" className="form-control bg-white rounded-3 border-secondary" onChange={e => setPasswordData({...passwordData, current_password: e.target.value})} />
              <input type="password" placeholder="Nouveau mot de passe" className="form-control bg-white rounded-3 border-secondary" onChange={e => setPasswordData({...passwordData, new_password: e.target.value})} />
              <input type="password" placeholder="Confirmer nouveau mot de passe" className="form-control bg-white rounded-3 border-secondary" onChange={e => setPasswordData({...passwordData, new_password_confirmation: e.target.value})} />
              <button type="submit" className="btn w-100 mt-2 rounded-3 text-white border-0" style={{ backgroundColor: '#E62134' }}>
                Mettre à jour le mot de passe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}