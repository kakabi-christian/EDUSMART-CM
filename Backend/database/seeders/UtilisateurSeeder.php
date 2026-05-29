<?php

namespace Database\Seeders;

use App\Models\UtilisateurModel;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UtilisateurSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Création du Super-Administrateur principal s'il n'existe pas
        if (!UtilisateurModel::where('matricule', 'ADMIN-MINESEC')->exists()) {
            UtilisateurModel::create([
                'etablissement_id' => null,
                'nom'              => 'MINESEC',
                'prenom'           => 'Super Admin',
                'matricule'        => 'ADMIN-MINESEC',
                'email'            => 'kakabichristian58@gmail.com',
                'telephone'        => '698525441',
                'password'         => Hash::make('password'),
                'role'             => 'minesec',
            ]);
            $this->command->info('✅ Compte Super-Administrateur MINESEC créé.');
        }

        // 2. Génération de 10 membres MINESEC supplémentaires pour tester le CRUD
        for ($i = 1; $i <= 10; $i++) {
            $email = "membre.minesec{$i}@edusmart.cm";
            
            if (!UtilisateurModel::where('email', $email)->exists()) {
                UtilisateurModel::create([
                    'etablissement_id' => null,
                    'nom'              => 'Membre',
                    'prenom'           => 'Equipe ' . $i,
                    'matricule'        => 'MINESECUSER-' . strtoupper(Str::random(6)),
                    'email'            => $email,
                    'telephone'        => '69000000' . $i,
                    'password'         => Hash::make('password123'),
                    'role'             => 'minesec',
                ]);
            }
        }

        $this->command->info('✅ 10 membres MINESEC additionnels ont été ajoutés avec succès !');
    }
}