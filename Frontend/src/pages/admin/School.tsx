import React, { useEffect, useState } from 'react';
import type { Etablissement, CameroonRegion, CreateEtablissementPayload } from '../../models/Etablissement';
import { etablissementService } from '../../services/EtablissementService';
import { 
  MdSchool, 
  MdAdd, 
  MdLocationOn, 
  MdPhone, 
  MdStar, 
  MdVerified, 
  MdDelete, 
  MdEdit, 
  MdChevronLeft, 
  MdChevronRight,
  MdClose
} from 'react-icons/md';
import AOS from 'aos';
import 'aos/dist/aos.css';

const REGIONS: CameroonRegion[] = [
  'ADAMAOUA', 'CENTRE', 'EST', 'EXTREME_NORD', 'LITTORAL', 
  'NORD', 'NORD_OUEST', 'OUEST', 'SUD', 'SUD_OUEST'
];

export default function School() {
  // États pour le listing et la pagination
  const [etablissements, setEtablissements] = useState<Etablissement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);

  // États pour les modales CRUD
  const [showFormModal, setShowFormModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [selectedSchool, setSelectedSchool] = useState<Etablissement | null>(null);

  // État pour les champs du formulaire
  const [formData, setFormData] = useState<CreateEtablissementPayload>({
    nom: '',
    code_etablissement: '',
    region: 'LITTORAL',
    ville: '',
    boite_postale: '',
    telephone_contact: '',
    est_pilote: false
  });

  // ── 1. LIRE (READ) : Charger la liste via l'API
  const fetchEtablissements = async (page: number) => {
    setLoading(true);
    try {
      const response = await etablissementService.getAll(page, 6);
      if (response.success) {
        setEtablissements(response.data);
        setCurrentPage(response.meta.current_page);
        setLastPage(response.meta.last_page);
        setTotal(response.meta.total);
      }
    } catch (error) {
      console.error("Erreur lors du chargement des établissements :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
    fetchEtablissements(currentPage);
  }, [currentPage]);

  // Ouvrir le formulaire en mode Ajout
  const handleOpenCreateModal = () => {
    setSelectedSchool(null);
    setFormData({
      nom: '',
      code_etablissement: '',
      region: 'LITTORAL',
      ville: '',
      boite_postale: '',
      telephone_contact: '',
      est_pilote: false
    });
    setShowFormModal(true);
  };

  // Ouvrir le formulaire en mode Édition
  const handleOpenEditModal = (school: Etablissement) => {
    setSelectedSchool(school);
    setFormData({
      nom: school.nom,
      code_etablissement: school.code_etablissement,
      region: school.region,
      ville: school.ville,
      boite_postale: school.boite_postale || '',
      telephone_contact: school.telephone_contact || '',
      est_pilote: school.est_pilote
    });
    setShowFormModal(true);
  };

  // ── 2 & 3. CREER & MODIFIER (POST / PUT)
  const handleSaveEtablissement = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (selectedSchool) {
        // Mode modification
        const res = await etablissementService.update(selectedSchool.id, formData);
        if (res.success) fetchEtablissements(currentPage);
      } else {
        // Mode création
        const res = await etablissementService.create(formData);
        if (res.success) fetchEtablissements(1);
      }
      setShowFormModal(false);
    } catch (err) {
      console.error("Erreur lors de la sauvegarde :", err);
    }
  };

  // Ouvrir la confirmation de suppression
  const handleOpenDeleteModal = (school: Etablissement) => {
    setSelectedSchool(school);
    setShowDeleteModal(true);
  };

  // ── 4. SUPPRIMER (DELETE)
  const handleConfirmDelete = async () => {
    if (!selectedSchool) return;
    try {
      const res = await etablissementService.delete(selectedSchool.id);
      if (res.success) {
        setShowDeleteModal(false);
        fetchEtablissements(currentPage);
      }
    } catch (err) {
      console.error("Erreur lors de la suppression :", err);
    }
  };

  const totalPilotes = etablissements.filter(e => e.est_pilote).length;

  return (
    <div className="container-fluid py-4" style={{ backgroundColor: 'var(--white)', minHeight: '100vh' }}>
      
      {/* ── EN-TÊTE DU DASHBOARD ── */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3" data-aos="fade-down">
        <div>
          <h2 className="fw-bold mb-1" style={{ color: 'var(--indigo)' }}>
            <MdSchool className="me-2" style={{ color: 'var(--green)' }} />
            Gestion des Établissements
          </h2>
          <p className="text-muted mb-0">Supervision des lycées et collèges connectés sur l'ensemble des 10 régions du Cameroun.</p>
        </div>
        <button 
          onClick={handleOpenCreateModal}
          className="btn d-flex align-items-center justify-content-center gap-2 px-4 py-2 rounded-pill fw-bold border-0 shadow-sm text-white"
          style={{ background: 'var(--gradient-primary)' }}
        >
          <MdAdd className="fs-5" /> Enregistrer un établissement
        </button>
      </div>

      {/* ── CARTES DE STATISTIQUES (KPIs) ── */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-md-4">
          <div className="p-3 bg-white border rounded-4 shadow-sm" style={{ borderColor: 'var(--gray-light)' }}>
            <div className="small fw-bold text-uppercase mb-1" style={{ color: 'var(--gray)' }}>Total structures</div>
            <div className="fs-2 fw-black" style={{ color: 'var(--indigo)' }}>{loading ? '...' : total}</div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-4">
          <div className="p-3 border rounded-4 shadow-sm text-white" style={{ background: 'var(--indigo)', borderColor: 'transparent' }}>
            <div className="small fw-bold text-uppercase mb-1" style={{ color: 'var(--indigo-light)' }}>Établissements Pilotes</div>
            <div className="fs-2 fw-black d-flex align-items-center gap-2">
              {loading ? '...' : totalPilotes} <MdStar style={{ color: 'var(--yellow)' }} className="fs-4" />
            </div>
          </div>
        </div>
      </div>

      {/* ── LISTING DES ÉTABLISSEMENTS ── */}
      {loading ? (
        <div className="d-flex flex-column align-items-center justify-content-center py-5">
          <div className="spinner-border" style={{ color: 'var(--green)' }} role="status"></div>
          <span className="mt-2 small fw-medium" style={{ color: 'var(--gray)' }}>Chargement du réseau EDUSMART...</span>
        </div>
      ) : etablissements.length === 0 ? (
        <div className="text-center py-5 border rounded-4 bg-white" style={{ borderColor: 'var(--gray-light)' }}>
          <p className="text-muted mb-0">Aucun établissement enregistré pour le moment. Cliquez sur "Enregistrer" pour commencer.</p>
        </div>
      ) : (
        <>
          <div className="row g-4 mb-4">
            {etablissements.map((school) => (
              <div className="col-12 col-md-6 col-xl-4" key={school.id}>
                <div className="card h-100 border-0 rounded-4 shadow-sm bg-white overflow-hidden position-relative">
                  
                  <div className="position-absolute top-0 end-0 m-3 px-2.5 py-1 rounded-pill small fw-bold"
                       style={{ backgroundColor: 'rgba(0, 166, 99, 0.1)', color: 'var(--green-dark)', fontSize: '0.75rem' }}>
                    {school.region.replace('_', ' ')}
                  </div>

                  <div className="card-body p-4 d-flex flex-column justify-content-between">
                    <div>
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <span className="small px-2 py-0.5 rounded fw-mono text-white bg-secondary" style={{ fontSize: '0.75rem' }}>
                          {school.code_etablissement}
                        </span>
                        {school.est_pilote && (
                          <span className="badge d-flex align-items-center gap-1 bg-success rounded-pill fw-bold px-2.5 py-1"
                                style={{ backgroundColor: 'rgba(0, 166, 99, 0.15)', color: 'var(--green-dark)', fontSize: '0.7rem' }}>
                            <MdVerified /> Pilote
                          </span>
                        )}
                      </div>

                      <h5 className="card-title fw-bold mb-3" style={{ color: 'var(--indigo)' }}>{school.nom}</h5>
                      
                      <div className="d-flex align-items-center gap-2 mb-2 small" style={{ color: 'var(--gray)' }}>
                        <MdLocationOn className="fs-5 text-secondary" />
                        <span>{school.ville}</span>
                      </div>

                      {school.telephone_contact && (
                        <div className="d-flex align-items-center gap-2 mb-2 small" style={{ color: 'var(--gray)' }}>
                          <MdPhone className="fs-5 text-secondary" />
                          <span>{school.telephone_contact}</span>
                        </div>
                      )}
                    </div>

                    <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top" style={{ borderColor: 'var(--gray-light)' }}>
                      <button onClick={() => handleOpenEditModal(school)} className="btn btn-sm btn-light p-2 rounded-3 text-secondary border">
                        <MdEdit className="fs-5" />
                      </button>
                      <button onClick={() => handleOpenDeleteModal(school)} className="btn btn-sm p-2 rounded-3 border" style={{ backgroundColor: 'rgba(230, 33, 52, 0.05)', color: 'var(--red)' }}>
                        <MdDelete className="fs-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* PAGINATION */}
          <div className="d-flex justify-content-between align-items-center border-top pt-4" style={{ borderColor: 'var(--gray-light)' }}>
            <div className="small fw-medium" style={{ color: 'var(--gray)' }}>
              Page <span className="text-dark fw-bold">{currentPage}</span> sur <span className="text-dark fw-bold">{lastPage}</span>
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-white border rounded-3 p-2" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>
                <MdChevronLeft className="fs-4" />
              </button>
              <button className="btn btn-white border rounded-3 p-2" disabled={currentPage === lastPage} onClick={() => setCurrentPage(p => p + 1)}>
                <MdChevronRight className="fs-4" />
              </button>
            </div>
          </div>
        </>
      )}

      {/* ── MODALE : FORMULAIRE D'AJOUT / ÉDITION ── */}
      {showFormModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(10, 15, 13, 0.5)', backdropFilter: 'blur(4px)', zIndex: 1060 }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content border-0 rounded-4 shadow-lg">
              <div className="modal-header border-0 bg-light p-4 rounded-top-4 d-flex justify-content-between align-items-center">
                <h5 className="fw-bold m-0" style={{ color: 'var(--indigo)' }}>
                  {selectedSchool ? 'Modifier la structure' : 'Nouvel établissement'}
                </h5>
                <button className="btn p-1 border-0" onClick={() => setShowFormModal(false)}><MdClose className="fs-4" /></button>
              </div>
              <form onSubmit={handleSaveEtablissement}>
                <div className="modal-body p-4 row g-3">
                  <div className="col-12 col-md-8">
                    <label className="form-label small fw-bold">Nom complet du Lycée / Collège</label>
                    <input type="text" className="form-control rounded-3" required value={formData.nom} onChange={e => setFormData({...formData, nom: e.target.value})} />
                  </div>
                  <div className="col-12 col-md-4">
                    <label className="form-label small fw-bold">Code Établissement (Unique)</label>
                    <input type="text" className="form-control rounded-3" placeholder="Ex: LYC-DE-DEIDO" required value={formData.code_etablissement} onChange={e => setFormData({...formData, code_etablissement: e.target.value})} />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-bold">Région administrative</label>
                    <select className="form-select rounded-3" value={formData.region} onChange={e => setFormData({...formData, region: e.target.value as CameroonRegion})}>
                      {REGIONS.map(r => <option key={r} value={r}>{r.replace('_', ' ')}</option>)}
                    </select>
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-bold">Ville / Commune</label>
                    <input type="text" className="form-control rounded-3" required value={formData.ville} onChange={e => setFormData({...formData, ville: e.target.value})} />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-bold">Téléphone</label>
                    <input type="text" className="form-control rounded-3" value={formData.telephone_contact || ''} onChange={e => setFormData({...formData, telephone_contact: e.target.value})} />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-bold">Boîte Postale</label>
                    <input type="text" className="form-control rounded-3" value={formData.boite_postale || ''} onChange={e => setFormData({...formData, boite_postale: e.target.value})} />
                  </div>
                  <div className="col-12 mt-4">
                    <div className="form-check form-switch p-3 rounded-3 border" style={{ backgroundColor: '#fdfdfd' }}>
                      <input className="form-check-input ms-0 me-3" type="checkbox" id="estPiloteSwitch" checked={formData.est_pilote} onChange={e => setFormData({...formData, est_pilote: e.target.checked})} />
                      <label className="form-check-label fw-bold small text-success" htmlFor="estPiloteSwitch">Marquer cet établissement comme Structure Pilote 🚀</label>
                    </div>
                  </div>
                </div>
                <div className="modal-footer border-0 p-4 bg-light rounded-bottom-4">
                  <button type="button" className="btn btn-light rounded-3 px-4" onClick={() => setShowFormModal(false)}>Annuler</button>
                  <button type="submit" className="btn text-white px-4 rounded-3 fw-bold border-0" style={{ background: 'var(--green)' }}>Enregistrer les modifications</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ── MODALE : CONFIRMATION DE SUPPRESSION ── */}
      {showDeleteModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(10, 15, 13, 0.5)', backdropFilter: 'blur(4px)', zIndex: 1060 }}>
          <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '420px' }}>
            <div className="modal-content border-0 rounded-4 shadow-lg">
              <div className="modal-body p-4 text-center">
                <div className="mb-3 d-inline-flex p-3 rounded-circle" style={{ backgroundColor: 'rgba(230, 33, 52, 0.1)' }}>
                  <MdDelete size={40} style={{ color: 'var(--red)' }} />
                </div>
                <h5 className="fw-bold text-dark mb-2">Supprimer l'établissement ?</h5>
                <p className="text-muted small px-3">Attention, cette action supprimera définitivement <strong>{selectedSchool?.nom}</strong> du réseau EDUSMART.</p>
                <div className="d-flex gap-2 mt-4">
                  <button type="button" className="btn btn-light w-50 py-2 rounded-3" onClick={() => setShowDeleteModal(false)}>Annuler</button>
                  <button type="button" className="btn text-white w-50 py-2 rounded-3 border-0" style={{ backgroundColor: 'var(--red)' }} onClick={handleConfirmDelete}>Oui, supprimer</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}