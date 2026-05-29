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
        Schema::create('feedbacks', function (Blueprint $table) {
            $table->id();

            // L'auteur du feedback (enseignant, parent, direction rattachés à leur établissement)
            $table->foreignId('auteur_id')
                  ->constrained('utilisateurs')
                  ->onDelete('cascade');

            // Le type de feedback pour faciliter le tri côté administration ou MINESEC
            $table->enum('type', ['SUGGESTION', 'RECLAMATION', 'COMPORTEMENT', 'TECHNIQUE'])
                  ->default('SUGGESTION');

            $table->string('titre');
            $table->text('contenu');

            // Statut du traitement
            $table->enum('statut', ['EN_ATTENTE', 'EN_COURS', 'RESOLU', 'REJETE'])
                  ->default('EN_ATTENTE');

            // Pour la synchronisation Offline-First
            $table->string('local_sync_id')->nullable()->unique();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('feedbacks');
    }
};