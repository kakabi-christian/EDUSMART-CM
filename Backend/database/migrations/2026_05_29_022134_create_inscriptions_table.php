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
        Schema::create('inscriptions', function (Blueprint $table) {
            $table->id();
            $table->uuid('eleve_id'); // Reste en UUID car la table eleves utilise un UUID primaire
            
            // Correction : Type BigInteger unsigned pour correspondre à notre table 'etablissements'
            $table->unsignedBigInteger('etablissement_id'); 
            
            $table->foreignId('annee_scolaire_id')->constrained('annees_scolaires')->onDelete('cascade');
            $table->foreignId('classe_id')->constrained('classes')->onDelete('cascade');
            
            // Statuts enrichis selon tes besoins
            $table->enum('statut', ['inscrit', 'transfere', 'radie', 'abandonne'])->default('inscrit');
            $table->date('date_inscription');
            $table->string('numero_recu')->nullable(); // Reçu de paiement des frais scolaires (Exigence MINESEC)
            $table->decimal('frais_scolarite', 10, 2)->default(0);
            $table->boolean('frais_payes')->default(false);
            $table->text('motif_radiation')->nullable();
            $table->text('observations')->nullable();
            
            $table->timestamps();
         
            $table->foreign('eleve_id')->references('id')->on('eleves')->onDelete('cascade');
            $table->foreign('etablissement_id')->references('id')->on('etablissements')->onDelete('cascade');
            
            $table->unique(['eleve_id', 'annee_scolaire_id', 'etablissement_id'], 'uq_inscription_annee');
            $table->index(['etablissement_id', 'annee_scolaire_id']);
            $table->index('eleve_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inscriptions');
    }
};