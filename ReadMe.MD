# 🎓 EDUSMART-CM — Plateforme de Gestion Scolaire Numérique

> **Éducation Numérique Intelligente au Cameroun**  
> Développé par **NEXATEC SOLUTIONS SARL** pour le compte du **Ministère des Enseignements Secondaires (MINESEC)**

[![CI/CD](https://github.com/nexatec/edusmart-cm/actions/workflows/deploy.yml/badge.svg)](https://github.com/nexatec/edusmart-cm/actions)
[![Coverage](https://img.shields.io/badge/coverage-%E2%89%A580%25-brightgreen)]()
[![PWA](https://img.shields.io/badge/PWA-offline--first-blueviolet)]()
[![License](https://img.shields.io/badge/license-Propriétaire-red)]()

## 🌍 Présentation du projet

**EDUSMART-CM** est une plateforme web complète de gestion des résultats scolaires, des inscriptions, des absences et des communications entre les établissements, les enseignants, les élèves et leurs familles.

| Attribut | Détail |
|---|---|
| **Client** | Ministère des Enseignements Secondaires (MINESEC) — Cameroun |
| **Prestataire** | NEXATEC SOLUTIONS SARL, Yaoundé / Douala |
| **Périmètre pilote** | 150 lycées publics — 10 régions administratives |
| **Date de début** | 15 juillet 2025 |
| **Date de livraison** | 14 juillet 2026 |
| **Budget** | 210 000 000 FCFA (forfait) |
| **Contrat** | Marché public avec pénalités de retard |

---

## 🏗️ Architecture fonctionnelle

Le projet est découpé en **3 portails** + 1 module transversal de sécurité :

```
EDUSMART-CM
│
├── 📁 Portail Administration
│   ├── Gestion des élèves (inscriptions, transferts, radiations)
│   ├── Gestion des enseignants & personnel
│   ├── Emplois du temps (saisie, validation, salles)
│   ├── Bulletins scolaires trimestriels (PDF automatique)
│   └── Tableau de bord chef d'établissement
│
├── 📁 Portail Enseignant
│   ├── Saisie des notes par matière et par classe
│   ├── Saisie des absences avec motifs
│   ├── Appréciations comportementales
│   ├── Consultation des progressions de cours
│   └── Messagerie interne (collègues + direction)
│
├── 📁 Portail Parent / Élève
│   ├── Consultation sécurisée des résultats et bulletins
│   ├── Suivi des absences en temps réel
│   ├── Messagerie avec enseignants et direction
│   └── Notifications SMS & e-mail (résultats, absences, réunions)
│
└── 🔒 Module Sécurité & Administration Système
    ├── RBAC — Gestion des rôles et droits d'accès
    ├── Authentification 2FA (OTP par SMS)
    ├── Chiffrement AES-256 (données au repos & en transit)
    ├── Journalisation des actions critiques (audit log)
    └── Export & sauvegarde des données
```

### Mode Offline-First (PWA)

> ⚠️ **Exigence MINESEC** : ≥ 70 % des fonctionnalités des modules Enseignant et Administration doivent fonctionner **sans connexion réseau**.

Implémenté via :
- **Progressive Web App (PWA)** avec Service Workers
- **Base de données locale IndexedDB** pour la persistance offline
- **Algorithme de résolution de conflits** (sync offline/online simultané)

---

## 🛠️ Stack technologique

| Couche | Technologie |
|---|---|
| **Front-end** | React.js 18 + Vite |
| **PWA** | Workbox · Service Workers · IndexedDB |
| **Back-end** | Laravel|
| **Base de données** | PostgreSQL 15 |
| **Authentification** | JWT · TOTP (2FA OTP SMS) |
| **Chiffrement** | AES-256 (données sensibles au repos) |
| **API** | REST · Documentation Swagger/OpenAPI 3.0 |
| **Versioning** | Git · GitHub (Git Flow) |
| **CI/CD** | GitHub Actions |
| **Hébergement** | VPS — Afrique du Sud (staging) |
| **Gestion de projet** | Jira |

---

## ✅ Prérequis

Assurez-vous d'avoir installé les outils suivants avant de démarrer :

- **php** ≥ 11.x 
- **Mysql** ≥ 15 (`psql --version`)
- **Git** ≥ 2.40 (`git --version`)
- **Docker** 

---

##  Installation & lancement

### 1. Cloner le dépôt

```bash
git clone https://github.com/kakabi-christian/EDUSMART-CM.git
cd edusmart-cm
```

### 2. Installer le hook Git (commit-msg)

```bash
cp hooks/commit-msg .git/hooks/commit-msg
chmod +x .git/hooks/commit-msg
```

### 3. Installer les dépendances

```bash
# Back-end
cd backend
composer install

# Front-end
cd ../frontend
npm install
```

### 4. Configurer les variables d'environnement

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
# Éditer les fichiers .env avec vos valeurs locales
```

---

## 🔐 Variables d'environnement

### `backend/.env`

```env
# Serveur
NODE_ENV=development
PORT=3001

# Base de données Mysql
DB_HOST=localhost
DB_PORT=3306
DB_NAME=edusmart_cm_db
DB_USER=root
DB_PASSWORD=your_password


# Chiffrement AES-256
AES_SECRET_KEY=your_aes_256_key_32_bytes



# Email (notifications)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=no-reply@edusmart-cm.cm
SMTP_PASS=your_smtp_password
```

### `frontend/.env`

```env
VITE_API_URL=http://localhost:5173
VITE_APP_NAME=EDUSMART-CM
VITE_OFFLINE_ENABLED=true
```

> ⚠️ **Ne jamais commiter les fichiers `.env`** — ils sont dans `.gitignore`.

---

## 📁 Structure du projet

```
edusmart-cm/
│
├── backend/
│   ├── src/
│   │   ├── controllers/        # Contrôleurs REST (admin, enseignant, auth...)
│   │   ├── models/             # Modèles PostgreSQL (Sequelize)
│   │   ├── routes/             # Définition des routes API
│   │   ├── middlewares/        # Auth JWT, RBAC, audit log, chiffrement
│   │   ├── services/           # Logique métier (bulletins PDF, OTP SMS...)
│   │   └── request/          
│   ├── tests/
│   │   ├── unit/               # Tests unitaires (Jest)
│   │   └── integration/        # Tests d'intégration (Supertest)
│   ├── migrations/             # Scripts SQL de migration
│   ├── seeders/                # Données de test
│   └── swagger/                # Documentation OpenAPI 3.0
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── admin/          # Portail Administration (élèves, EDT, bulletins)
│   │   │   ├── enseignant/     # Portail Enseignant (notes, absences, messagerie)
│   │   │   └── parent/         # Portail Parent/Élève
│   │   ├── components/         # Composants React réutilisables
│   │   ├── hooks/              # Custom hooks (useOffline, useSync, useAuth...)
│   │   ├── store/              # État global (Redux / Zustand)
│   │   ├── services/           # Appels API + gestion cache offline
│   │   ├── sw/                 # Service Workers (Workbox)
│   │   └── utils/              # IndexedDB, sync manager, helpers
│   └── public/
│       ├── manifest.json       # PWA manifest
│       └── icons/              # Icônes PWA (512x512, 192x192...)
│
├── .github/
│   └── workflows/
│       ├── deploy.yml          # Pipeline CI/CD 
│       └── tests.yml           # Lancement automatique des tests PR
│
├── .githooks/
│   └── commit-msg              # Hook validation messages de commit
│
├── docs/
│   ├── swagger/                # Documentation API exportée
│   ├── mcd-mld/                # Schémas base de données
│   ├── architecture/           # Diagrammes architecture
│   └── guides/                 # Guide déploiement, guide utilisateur
│
├── .gitignore
├── .env.example
└── README.md
```

---

## 🌿 Conventions Git

Ce projet utilise la stratégie **Git Flow** et les **Conventional Commits**.

### Branches

| Branche | Rôle |
|---|---|
| `main` | Production — code stable et déployé |
| `develop` | Intégration — branche de travail principale |
| `feature/<scope>-<description>` | Nouvelle fonctionnalité |
| `fix/<scope>-<description>` | Correction de bug |
| `hotfix/<description>` | Correction urgente en production |
| `release/<version>` | Préparation d'une version |

### Format des commits (Conventional Commits)

```
<type>(<scope>): <description courte>
```

**Types autorisés :**

| Type | Usage |
|---|---|
| `feat` | Nouvelle fonctionnalité |
| `fix` | Correction de bug |
| `docs` | Documentation |
| `test` | Ajout ou modification de tests |
| `style` | Mise en forme (CSS, lint) |
| `chore` | Tâche technique (config, dépendances) |
| `refactor` | Refactoring |
| `perf` | Optimisation performance |
| `ci` | Pipeline CI/CD |
| `build` | Système de build / déploiement |
| `revert` | Annulation d'un commit |

**Scopes du projet :**
`admin` · `enseignant` · `parent` · `auth` · `api` · `ui` · `db` · `pwa` · `sync` · `cicd` · `tests` · `docs` · `security` · `bulletins` · `notes` · `absences` · `messagerie` · `edt` · `eleves` · `dashboard`

**Exemples de commits valides :**

```bash
feat(admin): ajout de la génération automatique des bulletins PDF
fix(sync): résolution du conflit offline/online sur la saisie de notes
feat(pwa): implémentation Service Worker IndexedDB offline-first
feat(auth): mise en place 2FA OTP SMS pour chefs d'établissement
test(api): couverture unitaire API élèves portail admin ≥ 80%
ci(cicd): configuration pipeline GitHub Actions vers VPS Afrique du Sud
docs(api): documentation Swagger endpoints portail enseignant
perf(ui): optimisation chargement < 500Ko première charge 3G
```

> 💡 Le hook `commit-msg` valide automatiquement chaque message au moment du commit.

---

## ⚙️ Pipeline CI/CD

Le pipeline GitHub Actions se déclenche automatiquement sur :
- Chaque **Pull Request** vers `develop` → exécution des tests
- Chaque **merge** sur `develop` → déploiement en **staging** (VPS Afrique du Sud)
- Chaque **merge** sur `main` → déploiement en **production**

```
Push / PR
   │
   ▼
[Lint & Format check]
   │
   ▼
[Tests unitaires — Jest]  ──────► Couverture ≥ 80% obligatoire
   │
   ▼
[Tests d'intégration — Supertest]
   │
   ▼
[Build production — Vite]
   │
   ▼
[Deploy → VPS (SSH + rsync)]  ──► Temps cible : ≤ 10 min
   │
   ▼
[Health check endpoint /api/health]
```

---

## 🧪 Tests

```bash
# Lancer tous les tests
cd backend && php artisan test 


**Cibles de couverture (exigence MINESEC) :**

| Métrique | Cible |
|---|---|
| Couverture globale | ≥ 80 % |
| Bugs critiques / sprint | ≤ 3 |
| Temps déploiement CI/CD | ≤ 10 min |

---

## ⚠️ Contraintes techniques

| Contrainte | Détail |
|---|---|
| **Offline-first** | ≥ 70% fonctionnalités sans réseau (modules Admin & Enseignant) |
| **Performance 3G** | Pages critiques < 3 secondes sur connexion 2 Mbps |
| **Poids des pages** | < 500 Ko en première charge |
| **Sécurité** | AES-256 au repos · HTTPS obligatoire · 2FA OTP SMS |
| **Souveraineté données** | Conformité loi n°2010/012 (cybersécurité Cameroun) |
| **Hébergement** | VPS Afrique du Sud (staging) — datacenter local prévu 2027 |
| **Budget** | 210 000 000 FCFA — forfait ferme et définitif |

---

## 👥 Équipe projet

| Nom | Rôle | Responsabilités principales |
|---|---|---|
| **KAKABI Christian** | Chef de Projet | Planification · Registre risques · Suivi KPI · Compte rendu · Soutenance |
| **DONKENG Caroline** | Développeur Full-Stack | API REST · React.js · PWA offline-first · MCD/MLD · Bulletins PDF |
| **NYEM Dimitri** | Qualité / DevOps | CI/CD · Tests (≥80%) · Sécurité RBAC · Audit log · Documentation Swagger |

**Encadrement :** Direction Technique — NEXATEC SOLUTIONS SARL  
**Client :** Ministère des Enseignements Secondaires (MINESEC) — Cameroun

---

## 📄 Licence

Ce projet est développé dans le cadre d'un marché public entre **NEXATEC SOLUTIONS SARL** et le **MINESEC**.  
Toute reproduction ou distribution sans autorisation écrite est interdite.

© 2025–2026 NEXATEC SOLUTIONS SARL — Tous droits réservés.

---

> *"Connecter chaque lycée camerounais au numérique, même sans connexion."*  
> — Équipe EDUSMART-CM