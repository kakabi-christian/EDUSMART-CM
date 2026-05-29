import React, { useState, useEffect } from 'react';
import { MdAdd, MdDelete, MdPerson, MdRefresh, MdChevronLeft, MdChevronRight, MdEdit } from 'react-icons/md';
import { authService } from '../../services/authService';

export default function User() {
  const [members, setMembers] = useState<any[]>([]);
  const [meta, setMeta] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [newMember, setNewMember] = useState({ nom: '', prenom: '', email: '', telephone: '' });
  
  // États pour les modaux
  const [editingMember, setEditingMember] = useState<any>(null);
  const [deletingMember, setDeletingMember] = useState<any>(null);

  useEffect(() => { fetchMembers(); }, []);

  const fetchMembers = async (page: number = 1) => {
    setLoading(true);
    try {
      const response = await authService.listMinesecMembers(page);
      setMembers(response.data.data);
      setMeta(response.data.meta);
    } catch (error) { console.error("Erreur", error); }
    finally { setLoading(false); }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authService.createMinesecMember(newMember);
      setNewMember({ nom: '', prenom: '', email: '', telephone: '' });
      fetchMembers();
    } catch (error) { alert('Erreur lors de la création'); }
  };

  const handleUpdate = async () => {
    try {
      await authService.updateMinesecMember(editingMember.id, editingMember);
      setEditingMember(null);
      fetchMembers();
    } catch (error) { alert('Erreur lors de la modification'); }
  };

  const handleDelete = async () => {
    try {
      await authService.deleteMinesecMember(deletingMember.id);
      setDeletingMember(null);
      fetchMembers();
    } catch (error) { alert('Erreur lors de la suppression'); }
  };

  return (
    <div className="container-fluid py-4" style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold m-0 text-uppercase" style={{ color: '#00A663' }}>Équipe MINESEC</h3>
        <button className="btn btn-outline-success btn-sm" onClick={() => fetchMembers()}><MdRefresh /></button>
      </div>

      {/* FORMULAIRE */}
      <div className="card p-4 mb-4 border-0 shadow-sm rounded-4" style={{ backgroundColor: '#fdfdfd', border: '1px solid #f0f0f0' }}>
        <h5 className="fw-bold mb-3" style={{ color: '#333' }}><MdAdd /> Ajouter un membre</h5>
        <form onSubmit={handleCreate} className="row g-3">
          <div className="col-md-3"><input type="text" placeholder="Nom" className="form-control" value={newMember.nom} onChange={e => setNewMember({...newMember, nom: e.target.value})} required /></div>
          <div className="col-md-3"><input type="text" placeholder="Prénom" className="form-control" value={newMember.prenom} onChange={e => setNewMember({...newMember, prenom: e.target.value})} /></div>
          <div className="col-md-3"><input type="email" placeholder="Email institutionnel" className="form-control" value={newMember.email} onChange={e => setNewMember({...newMember, email: e.target.value})} required /></div>
          <div className="col-md-3"><button type="submit" className="btn w-100 fw-bold" style={{ backgroundColor: '#00A663', color: '#fff' }}>Enregistrer</button></div>
        </form>
      </div>

      {/* TABLEAU */}
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <table className="table align-middle mb-0">
          <thead style={{ backgroundColor: '#00A663', color: '#ffffff' }}>
            <tr>
              <th className="px-4 py-3">Matricule</th>
              <th className="py-3">Nom & Prénom</th>
              <th className="py-3">Email</th>
              <th className="text-end px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.id}>
                <td className="px-4 fw-bold" style={{ color: '#005C36' }}>{member.matricule}</td>
                <td><MdPerson className="me-2" style={{ color: '#00A663' }} />{member.nom} {member.prenom}</td>
                <td style={{ color: '#666' }}>{member.email}</td>
                <td className="text-end px-4">
                  <button className="btn btn-sm btn-outline-primary me-2" onClick={() => setEditingMember(member)}><MdEdit /></button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => setDeletingMember(member)}><MdDelete /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL SUPPRESSION */}
      {deletingMember && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow">
              <div className="modal-header"><h5 className="modal-title">Confirmer suppression</h5></div>
              <div className="modal-body">Voulez-vous vraiment supprimer {deletingMember.nom} ?</div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setDeletingMember(null)}>Annuler</button>
                <button className="btn btn-danger" onClick={handleDelete}>Confirmer</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL MODIFICATION */}
      {editingMember && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow">
              <div className="modal-header"><h5 className="modal-title">Modifier le membre</h5></div>
              <div className="modal-body">
                <input className="form-control mb-3" value={editingMember.nom} onChange={e => setEditingMember({...editingMember, nom: e.target.value})} />
                <input className="form-control mb-3" value={editingMember.prenom} onChange={e => setEditingMember({...editingMember, prenom: e.target.value})} />
                <input className="form-control" value={editingMember.email} onChange={e => setEditingMember({...editingMember, email: e.target.value})} />
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setEditingMember(null)}>Annuler</button>
                <button className="btn btn-success" onClick={handleUpdate}>Sauvegarder</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}