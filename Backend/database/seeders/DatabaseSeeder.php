<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Appel des seeders ordonnés pour éviter les erreurs de clés étrangères
        $this->call([
            EtablissementSeeder::class,
            UtilisateurSeeder::class,
        ]);
    }
}