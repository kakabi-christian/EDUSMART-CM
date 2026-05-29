<?php

namespace Database\Seeders;

use App\Models\FiliereModel; // Assure-toi que ton modèle s'appelle bien FiliereModel
use Illuminate\Database\Seeder;

class FiliereSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $filieres = [
            ['nom' => 'Enseignement Général (Série A)', 'code_filiere' => 'GEN_A', 'description' => 'Série Lettres et Philosophie'],
            ['nom' => 'Enseignement Général (Série C)', 'code_filiere' => 'GEN_C', 'description' => 'Série Mathématiques et Sciences Physiques'],
            ['nom' => 'Enseignement Général (Série D)', 'code_filiere' => 'GEN_D', 'description' => 'Série Sciences de la Vie et de la Terre'],
            ['nom' => 'Enseignement Technique (Génie Civil)', 'code_filiere' => 'TEC_GC', 'description' => 'Filière Bâtiment et Travaux Publics'],
            ['nom' => 'Enseignement Technique (Génie Électrique)', 'code_filiere' => 'TEC_GE', 'description' => 'Filière Électronique et Électrotechnique'],
            ['nom' => 'Enseignement Technique (Comptabilité)', 'code_filiere' => 'TEC_CG', 'description' => 'Filière Comptabilité et Gestion'],
            ['nom' => 'Enseignement Technique (Action et Communication Commerciales)', 'code_filiere' => 'TEC_ACC', 'description' => 'Filière Commerciale'],
            ['nom' => 'Enseignement Technique (Informatique)', 'code_filiere' => 'TEC_INFO', 'description' => 'Filière Informatique industrielle et de gestion'],
            ['nom' => 'Enseignement Général (Série E)', 'code_filiere' => 'GEN_E', 'description' => 'Mathématiques et Techniques'],
            ['nom' => 'Enseignement Général (Série TI)', 'code_filiere' => 'GEN_TI', 'description' => 'Technologies de l\'Information'],
        ];

        foreach ($filieres as $filiere) {
            // Utilisation de updateOrCreate pour éviter les doublons lors des relances du seeder
            \App\Models\FiliereModel::updateOrCreate(
                ['code_filiere' => $filiere['code_filiere']],
                $filiere
            );
        }

        $this->command->info('✅ Les filières MINESEC ont été injectées avec succès !');
    }
}  