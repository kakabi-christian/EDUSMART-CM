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
        Schema::create('eleves', function (Blueprint $table) {
            $table->uuid('id')->primary();
            
            // Correction : Type BigInteger unsigned pour correspondre à notre table 'utilisateurs'
            $table->unsignedBigInteger('user_id')->nullable(); 
            
            $table->string('matricule', 30)->unique(); // Généré automatiquement
            $table->string('nom', 80);
            $table->string('prenom', 80);
            $table->date('date_naissance');
            $table->string('lieu_naissance', 100)->nullable();
            $table->enum('sexe', ['M', 'F']);
            $table->string('nationalite', 50)->default('Camerounaise');
            $table->text('adresse')->nullable();
            $table->string('telephone_urgence', 20)->nullable();
            $table->string('nom_parent_tuteur', 150)->nullable();
            $table->string('telephone_parent', 20)->nullable();
            $table->string('email_parent', 150)->nullable();
            $table->string('photo')->nullable();
            
            $table->timestamps();
            $table->softDeletes(); // Pour ne pas supprimer définitivement un élève par erreur
         
            // Correction : Ciblage de la table 'utilisateurs' que nous avons créée
            $table->foreign('user_id')->references('id')->on('utilisateurs')->onDelete('set null');
            
            $table->index('matricule');
            $table->index('nom');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('eleves');
    }
};