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
        Schema::create('annees_scolaires', function (Blueprint $table) {
            $table->id();
            
            // Format standardisé, ex: "2025-2026"
            $table->string('libelle', 9)->unique(); 
            
            // Dates de début et de fin officielles de l'année scolaire au Cameroun
            $table->date('date_debut');
            $table->date('date_fin');
            
            // Permet d'activer l'année en cours et de verrouiller les anciennes années
            $table->boolean('est_active')->default(false); 

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('annees_scolaires');
    }
};