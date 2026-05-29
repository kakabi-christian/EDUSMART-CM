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
        Schema::create('salles', function (Blueprint $table) {
            $table->id();
            
            // Une salle appartient physiquement à un établissement précis
            $table->foreignId('etablissement_id')
                  ->constrained('etablissements')
                  ->onDelete('cascade');

            $table->string('nom'); // Ex: "Salle 01", "Labo Informatique", "Amphi B"
            $table->string('code_salle')->nullable(); // Ex: "S01", "LABO_INFO"
            
            // Capacité d'accueil physique (nombre de places/bancs disponibles)
            $table->integer('capacite_places')->nullable(); 
            
            // Type de salle pour l'attribution des emplois du temps (ex: Cours théorique, TP Informatique, etc.)
            $table->enum('type_salle', ['CLASSIQUE', 'LABORATOIRE', 'INFORMATIQUE', 'ATELIER'])->default('CLASSIQUE');

            $table->timestamps();

            // Unicité : Deux salles ne peuvent pas avoir le même nom dans le même établissement
            $table->unique(['etablissement_id', 'nom']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('salles');
    }
};