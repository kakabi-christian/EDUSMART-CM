<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('classes', function (Blueprint $table) {
            $table->id();
            
            // Une classe appartient à un établissement (lycée)
            $table->foreignId('etablissement_id')
                  ->constrained('etablissements')
                  ->onDelete('cascade');
                  
            // Une classe est définie pour une année scolaire précise
            $table->foreignId('annee_scolaire_id')
                  ->constrained('annees_scolaires')
                  ->onDelete('cascade');

            // NOUVEAU : Une classe appartient désormais à une filière / série spécifique
            $table->foreignId('filiere_id')
                  ->constrained('filieres')
                  ->onDelete('cascade');

            $table->string('nom'); // Ex: "6ème M1", "Seconde C", "Terminale TI"
            $table->string('code_classe')->nullable(); // Ex: TTI-2026
            
            // Le sous-système (Francophone ou Anglophone) pour la gestion des bulletins au Cameroun
            $table->enum('sous_systeme', ['FRANCOPHONE', 'ANGLOPHONE'])->default('FRANCOPHONE');
            
            // Niveau d'études pour les statistiques du MINESEC
            $table->enum('niveau', ['PREMIER_CYCLE', 'SECOND_CYCLE']);
            
            $table->integer('capacite_max')->nullable(); // Nombre max d'élèves autorisés

            $table->timestamps();
            
            // Unicité : Pas de doublon de nom de classe dans le même lycée, la même année pour la même filière
            $table->unique(['etablissement_id', 'annee_scolaire_id', 'filiere_id', 'nom'], 'classes_unique_index');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('classes');
    }
};