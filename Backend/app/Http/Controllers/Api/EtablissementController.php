<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\EtablissementRequest;
use App\Models\EtablissementModel;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class EtablissementController extends Controller
{
    /**
     * Liste des établissements avec pagination.
     * Exemple : GET /api/etablissements?per_page=10&page=1
     */
    public function index(Request $request): JsonResponse
    {
        // Récupère le nombre d'éléments par page (par défaut 15)
        $perPage = $request->query('per_page', 15);

        // Pagination des résultats
        $etablissements = EtablissementModel::paginate($perPage);

        return response()->json([
            'success' => true,
            'message' => 'Liste des établissements récupérée avec succès.',
            'data' => $etablissements->items(),
            'meta' => [
                'current_page' => $etablissements->currentPage(),
                'last_page'    => $etablissements->lastPage(),
                'per_page'     => $etablissements->perPage(),
                'total'        => $etablissements->total(),
            ]
        ], 200);
    }

    /**
     * Créer un nouvel établissement (Réservé au MINESEC).
     */
    public function store(EtablissementRequest $request): JsonResponse
    {
        // Les données sont automatiquement validées par EtablissementRequest
        $etablissement = EtablissementModel::create($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Établissement enregistré avec succès.',
            'data'    => $etablissement
        ], 201);
    }

    /**
     * Afficher les détails d'un établissement spécifique.
     */
    public function show($id): JsonResponse
    {
        $etablissement = EtablissementModel::find($id);

        if (!$etablissement) {
            return response()->json([
                'success' => false,
                'message' => 'Établissement introuvable.'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Détails de l\'établissement récupérés.',
            'data'    => $etablissement
        ], 200);
    }

    /**
     * Mettre à jour un établissement existant.
     */
    public function update(EtablissementRequest $request, $id): JsonResponse
    {
        $etablissement = EtablissementModel::find($id);

        if (!$etablissement) {
            return response()->json([
                'success' => false,
                'message' => 'Établissement introuvable.'
            ], 404);
        }

        // Mise à jour avec les données validées
        $etablissement->update($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Établissement mis à jour avec succès.',
            'data'    => $etablissement
        ], 200);
    }

    /**
     * Supprimer un établissement de la base de données.
     */
    public function destroy($id): JsonResponse
    {
        $etablissement = EtablissementModel::find($id);

        if (!$etablissement) {
            return response()->json([
                'success' => false,
                'message' => 'Établissement introuvable.'
            ], 404);
        }

        $etablissement->delete();

        return response()->json([
            'success' => true,
            'message' => 'Établissement supprimé avec succès.'
        ], 200);
    }
}