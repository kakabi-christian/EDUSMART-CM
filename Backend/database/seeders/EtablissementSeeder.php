<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EtablissementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $etablissements = [
            [
                'nom' => 'Lycée Technique de Douala Koumassi',
                'code_etablissement' => 'LYC-TECH-KUM',
                'region' => 'LITTORAL',
                'ville' => 'Douala Ier',
                'boite_postale' => 'BP 4021 Douala',
                'telephone_contact' => '+237671234567',
                'est_pilote' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nom' => 'Lycée Général Leclerc',
                'code_etablissement' => 'LYC-LECLERC',
                'region' => 'CENTRE',
                'ville' => 'Yaoundé Ier',
                'boite_postale' => 'BP 125 Yaoundé',
                'telephone_contact' => '+237691234568',
                'est_pilote' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nom' => 'Lycée Classique et Moderne de Bafoussam',
                'code_etablissement' => 'LYC-CL-BAF',
                'region' => 'OUEST',
                'ville' => 'Bafoussam Ier',
                'boite_postale' => 'BP 98 Bafoussam',
                'telephone_contact' => '+237651234569',
                'est_pilote' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nom' => 'Lycée Bilingue de Ngaoundéré',
                'code_etablissement' => 'LYC-BIL-NGA',
                'region' => 'ADAMAOUA',
                'ville' => 'Ngaoundéré IIIe',
                'boite_postale' => 'BP 42 Ngaoundéré',
                'telephone_contact' => '+237675554433',
                'est_pilote' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nom' => 'Lycée Scientifique de Bertoua',
                'code_etablissement' => 'LYC-SCI-BER',
                'region' => 'EST',
                'ville' => 'Bertoua IIe',
                'boite_postale' => 'BP 102 Bertoua',
                'telephone_contact' => '+237699887766',
                'est_pilote' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nom' => 'Lycée Classique de Maroua',
                'code_etablissement' => 'LYC-CL-MAR',
                'region' => 'EXTREME_NORD',
                'ville' => 'Maroua Ier',
                'boite_postale' => 'BP 15 Maroua',
                'telephone_contact' => '+237681122334',
                'est_pilote' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nom' => 'Lycée Classique de Garoua',
                'code_etablissement' => 'LYC-CL-GAR',
                'region' => 'NORD',
                'ville' => 'Garoua Ier',
                'boite_postale' => 'BP 80 Garoua',
                'telephone_contact' => '+237660112233',
                'est_pilote' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nom' => 'Government Bilingual High School (GBHS) Bamenda',
                'code_etablissement' => 'GBHS-BAM',
                'region' => 'NORD_OUEST',
                'ville' => 'Bamenda IIe',
                'boite_postale' => 'PO Box 24 Bamenda',
                'telephone_contact' => '+237677665544',
                'est_pilote' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nom' => 'Lycée Classique d\'Ebolowa',
                'code_etablissement' => 'LYC-CL-EBO',
                'region' => 'SUD',
                'ville' => 'Ebolowa IIe',
                'boite_postale' => 'BP 54 Ebolowa',
                'telephone_contact' => '+237694433221',
                'est_pilote' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nom' => 'Lycée Bilingue de Molyko',
                'code_etablissement' => 'LYC-BIL-MOL',
                'region' => 'SUD_OUEST',
                'ville' => 'Buea',
                'boite_postale' => null,
                'telephone_contact' => '+237655667788',
                'est_pilote' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        // Insertion collective directe
        DB::table('etablissements')->insert($etablissements);
    }
}