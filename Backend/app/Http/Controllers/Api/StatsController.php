<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\EtablissementModel;
use App\Models\ClasseModel;
use App\Models\UtilisateurModel;
use App\Models\FiliereModel;
use App\Models\AnneeScolaireModel;
use Illuminate\Support\Facades\DB;

class StatsController extends Controller
{
    /**
     * Utilitaire pour calculer le pourcentage uniformément
     */
    private function calculatePercentage($count, $total) 
    {
        return $total > 0 ? round(($count / $total) * 100, 2) : 0;
    }

    public function index(Request $request)
    {
        return response()->json([
            'success' => true,
            'data' => $this->getGlobalStats($request)
        ]);
    }

    public function getRepartitionParRegion()
    {
        $total = EtablissementModel::count();
        $data = EtablissementModel::select('region', DB::raw('count(*) as total'))
            ->groupBy('region')
            ->get()
            ->map(fn($item) => [
                'region' => $item->region,
                'count'  => $item->total,
                'percentage' => $this->calculatePercentage($item->total, $total)
            ]);

        return response()->json($data);
    }

    public function getFiliereStats()
    {
        $total = ClasseModel::count();
        $data = FiliereModel::withCount('classes')
            ->get(['id', 'nom', 'code_filiere'])
            ->map(fn($f) => [
                'nom' => $f->nom,
                'count' => $f->classes_count,
                'percentage' => $this->calculatePercentage($f->classes_count, $total)
            ]);

        return response()->json($data);
    }

    public function getGlobalStats(Request $request)
    {
        $query = ClasseModel::query();
        if ($request->filled('annee_scolaire_id')) $query->where('annee_scolaire_id', $request->annee_scolaire_id);
        if ($request->filled('filiere_id')) $query->where('filiere_id', $request->filiere_id);
        
        $total = $query->count();

        return response()->json([
            'total_classes' => $total,
            'filiere_repartition' => ClasseModel::select('filiere_id', DB::raw('count(*) as count'))
                                           ->with('filiere:id,nom')->groupBy('filiere_id')->get()
                                           ->map(fn($i) => ['filiere' => $i->filiere->nom, 'count' => $i->count, 'percentage' => $this->calculatePercentage($i->count, $total)]),
            'niveau_repartition' => $query->select('niveau', DB::raw('count(*) as count'))->groupBy('niveau')->get()
                                          ->map(fn($i) => ['niveau' => $i->niveau, 'count' => $i->count, 'percentage' => $this->calculatePercentage($i->count, $total)]),
            'systeme_repartition' => $query->select('sous_systeme', DB::raw('count(*) as count'))->groupBy('sous_systeme')->get()
                                           ->map(fn($i) => ['systeme' => $i->sous_systeme, 'count' => $i->count, 'percentage' => $this->calculatePercentage($i->count, $total)]),
        ]);
    }

    public function getEvolutionParAnnee()
    {
        $total = ClasseModel::count();
        $data = AnneeScolaireModel::withCount('classes')
            ->orderBy('libelle', 'desc')
            ->get(['id', 'libelle'])
            ->map(fn($a) => [
                'annee' => $a->libelle,
                'count' => $a->classes_count,
                'percentage' => $this->calculatePercentage($a->classes_count, $total)
            ]);

        return response()->json($data);
    }

    public function getUserStats()
    {
        $total = UtilisateurModel::count();
        $data = UtilisateurModel::select('role', DB::raw('count(*) as count'))
            ->groupBy('role')
            ->get()
            ->map(fn($i) => [
                'role' => $i->role,
                'count' => $i->count,
                'percentage' => $this->calculatePercentage($i->count, $total)
            ]);

        return response()->json($data);
    }
}