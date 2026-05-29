import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Données fictives pour l'exemple
const dataFiliere = [
  { name: 'Informatique', value: 400 },
  { name: 'Gestion', value: 300 },
  { name: 'Génie Civil', value: 200 },
  { name: 'Santé', value: 150 },
];

const etablissements = [
  { id: 1, nom: 'IUC Douala', region: 'Littoral', effectif: 1200 },
  { id: 2, nom: 'Polytechnique Yaoundé', region: 'Centre', effectif: 850 },
  { id: 3, nom: 'IUT Bandjoun', region: 'Ouest', effectif: 600 },
];

export default function Stats() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Tableau de Bord Statistiques</h1>

      {/* Cartes KPI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-500">Total Établissements</p>
          <h3 className="text-3xl font-bold text-blue-600">45</h3>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-500">Total Étudiants</p>
          <h3 className="text-3xl font-bold text-green-600">12,400</h3>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-500">Régions Couvertes</p>
          <h3 className="text-3xl font-bold text-purple-600">8</h3>
        </div>
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold mb-4">Répartition par Filière</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataFiliere}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tableau des établissements */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold mb-4">Établissements par Région</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="py-2 text-gray-600">Nom</th>
                  <th className="py-2 text-gray-600">Région</th>
                  <th className="py-2 text-gray-600">Effectif</th>
                </tr>
              </thead>
              <tbody>
                {etablissements.map((etab) => (
                  <tr key={etab.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 font-medium">{etab.nom}</td>
                    <td className="py-3 text-gray-600">{etab.region}</td>
                    <td className="py-3 text-blue-600 font-bold">{etab.effectif}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}