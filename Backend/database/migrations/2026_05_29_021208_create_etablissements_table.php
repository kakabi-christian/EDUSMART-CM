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
        Schema::create('etablissements', function (Blueprint $table) {
            $table->id();
            $table->string('nom'); // Ex: Lycée Classique de Douala
            $table->string('code_etablissement')->unique(); // Ex: LYCLADOU (identifiant unique MINESEC)
            
            // Les 10 régions administratives du Cameroun
            $table->enum('region', [
                'ADAMAOUA', 'CENTRE', 'EST', 'EXTREME_NORD', 'LITTORAL', 
                'NORD', 'NORD_OUEST', 'OUEST', 'SUD', 'SUD_OUEST'
            ]);
            
            $table->string('ville'); // Ex: Douala, Yaoundé, Garoua...
            $table->string('boite_postale')->nullable();
            $table->string('telephone_contact')->nullable();
            
            // Pour distinguer les 150 lycées pilotes du reste (extensibilité à 800)
            $table->boolean('est_pilote')->default(true); 

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('etablissements');
    }
};