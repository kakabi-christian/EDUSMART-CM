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
        Schema::create('utilisateurs', function (Blueprint $table) {
            $table->id();
            
            // Clé étrangère vers l'établissement rattaché
            $table->foreignId('etablissement_id')
                  ->nullable()
                  ->constrained('etablissements')
                  ->onDelete('set null');

            $table->string('nom');
            $table->string('prenom')->nullable();
            
            // Le matricule (identifiant unique pour enseignants ou élèves)
            $table->string('matricule')->unique()->nullable(); 
            
            // L'email et le téléphone (tous deux uniques et nullables selon le profil)
            $table->string('email')->unique()->nullable(); 
            $table->string('telephone')->unique()->nullable(); 
            
            $table->string('password');
            
            // Les 4 rôles principaux du projet EDUSMART
            $table->enum('role', ['minesec', 'chef_etablissement', 'enseignant', 'eleve_parent']);
            
            // ✅ Champs requis pour l'authentification à double facteur (2FA OTP)
            $table->string('two_factor_code')->nullable();
            $table->timestamp('two_factor_expires_at')->nullable();

            // Pour la synchronisation Offline-First
            $table->timestamp('derniere_synchro_at')->nullable(); 

            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('utilisateurs');
    }
};