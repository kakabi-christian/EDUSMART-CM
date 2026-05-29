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
        Schema::create('trimestres', function (Blueprint $table) {
            $table->id();
            
            // L'année scolaire concernée (ex: 2025-2026)
            $table->foreignId('annee_scolaire_id')
                  ->constrained('annees_scolaires')
                  ->onDelete('cascade');

            // Le nom du trimestre
            $table->enum('nom', ['PREMIER_TRIMESTRE', 'DEUXIEME_TRIMESTRE', 'TROISIEME_TRIMESTRE']);
            
            // Période du trimestre (Utile pour bloquer la saisie des notes hors délai)
            $table->date('date_debut')->nullable();
            $table->date('date_fin')->nullable();
            
            // Statut pour savoir si le trimestre est clôturé (bulletins verrouillés)
            $table->boolean('est_cloture')->default(false);

            $table->timestamps();

            // Unicité : Pas de doublon de trimestre pour une même année scolaire
            $table->unique(['annee_scolaire_id', 'nom']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trimestres');
    }
};