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
        Schema::create('filieres', function (Blueprint $table) {
            $table->id();
            
            $table->string('nom'); // Ex: "Technologies de l'Information", "Sciences Exactes", "Lettres"
            $table->string('code_filiere', 10)->unique(); // Ex: "TI", "S_C" (Série C), "S_D", "ALL"
            $table->text('description')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('filieres');
    }
};