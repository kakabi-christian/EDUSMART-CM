import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styles/AboutContent.css';
import { 
  MdSchool, 
  MdLock, 
  MdCloudOff, 
  MdPeople, 
  MdArrowForward, 
  MdVerifiedUser,
  MdAnalytics,
  MdGavel,
  MdOutlineSecurity,
  MdCheckCircle
} from 'react-icons/md';
import { Link } from 'react-router-dom';

// Importation du logo officiel
import logoEdusmart from "../assets/LogoEdusmart.png";

export default function AboutContent() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  // Tableaux de données pour un code plus propre et itérable
  const statistics = [
    { total: "150", label: "Lycées Publics Pilotes" },
    { total: "10", label: "Régions Administratives" },
    { total: "80%", prefix: "≥", label: "Couverture de Code Exigée" },
    { total: "210M", suffix: " FCFA", label: "Budget Forfaitaire" }
  ];

  const portals = [
    { icon: <MdSchool />, title: "Administration", desc: "Gestion des fiches élèves, transferts, radiations, validation des emplois du temps et génération automatique des flux de bulletins au format PDF sécurisé.", colorClass: "text-edu-indigo", delay: 100 },
    { icon: <MdPeople />, title: "Corps Enseignant", desc: "Saisie ergonomique des notes par classe et matière, pointage en temps réel des absences justifiées/non-justifiées et canal de messagerie interne direct.", colorClass: "text-edu-green", delay: 200 },
    { icon: <MdAnalytics />, title: "Portail Parent & Élève", desc: "Consultation sécurisée du livret scolaire, alertes SMS immédiates en cas d'absence non justifiée, et accès continu au calendrier de l'établissement.", colorClass: "text-edu-amber", delay: 300 }
  ];

  const team = [
    { name: "KAKABI Christian", role: "Chef de Projet", task: "Planification macro, suivi du registre des risques techniques, validation des jalons et reporting MINESEC.", borderClass: "border-edu-green" },
    { name: "DONKENG Caroline", role: "Développeur Full-Stack", task: "Conception des endpoints de l'API REST, intégration de l'interface React et architecture du cache local IndexedDB.", borderClass: "border-edu-indigo" },
    { name: "NYEM Dimitri", role: "Qualité / DevOps", task: "Automatisation de la chaîne CI/CD GitHub Actions, durcissement des accès RBAC et suivi qualité SonarCloud.", borderClass: "border-edu-amber" }
  ];

  return (
    <div className="about-wrapper bg-white">
      
      {/* --- 1. HERO SECTION --- */}
      <section className="about-hero text-center text-white d-flex align-items-center justify-content-center py-5 position-relative bg-edu-dark-gradient">
        <div className="hero-overlay position-absolute w-100 h-100 top-0 start-0 opacity-10"></div>
        <div className="container position-relative z-2" data-aos="zoom-in">
          <span className="badge rounded-pill px-3 py-2 mb-3 fw-bold bg-edu-green-light text-success">
            MINESEC · PROJET PILOTE NATIONAL
          </span>
          <h1 className="display-4 fw-black text-white mb-3">
            L'Éducation Numérique <span className="text-edu-green">Intelligente</span> 🇨🇲
          </h1>
          <p className="lead opacity-75 mx-auto fs-5 max-w-800">
            EDUSMART-CM modernise la gestion des établissements secondaires du Cameroun en connectant sereinement les directions, les enseignants, les élèves et les familles.
          </p>
          <div className="d-flex justify-content-center gap-3 mt-4">
            <Link to="/register" className="btn btn-edu-green px-4 py-2.5 rounded-pill fw-bold border-0 d-flex align-items-center gap-2 shadow-sm hover-lift">
              Créer mon espace <MdArrowForward />
            </Link>
          </div>
        </div>
      </section>

      {/* --- 2. LOGO & INTRODUCTION CONTEXTUELLE --- */}
      <section className="container py-5 mt-4">
        <div className="row align-items-center g-5">
          <div className="col-lg-5 text-center" data-aos="fade-right">
            <div className="position-relative d-inline-block">
              <div className="logo-glow-effect position-absolute top-50 start-50 translate-middle bg-success opacity-10 rounded-circle"></div>
              <img src={logoEdusmart} alt="Edusmart Logo" className="position-relative animate-pulse-icon img-fluid max-h-200" />
            </div>
          </div>
          <div className="col-lg-7" data-aos="fade-left">
            <h6 className="text-edu-green fw-bold text-uppercase mb-2 tracking-wider">Origines du projet</h6>
            <h2 className="fw-bold mb-3 text-edu-indigo">Une transformation structurelle voulue par le MINESEC</h2>
            <p className="text-muted fs-6 mb-3 lh-relaxed">
              Pensée et commandée par le <strong>Ministère des Enseignements Secondaires (MINESEC)</strong>, l'implémentation d'<strong>EDUSMART-CM</strong> répond à un besoin critique d'automatisation et de transparence au sein du système éducatif national. 
            </p>
            <p className="text-muted small lh-relaxed">
              Sous la supervision technique de <strong>NEXATEC SOLUTIONS SARL</strong>, la plateforme interconnecte initialement 150 lycées pilotes répartis sur l'ensemble des 10 régions administratives du territoire pour centraliser la saisie des notes, fluidifier le suivi des absences et automatiser la génération des bulletins trimestriels.
            </p>
          </div>
        </div>
      </section>

      {/* --- 3. SECTIONS DES CHIFFRES CLÉS (INDICATEURS) --- */}
      <section className="py-5 bg-light border-top border-bottom border-light-subtle">
        <div className="container">
          <div className="row g-4 text-center">
            {statistics.map((stat, idx) => (
              <div className="col-6 col-md-3" key={`stat-${idx}`} data-aos="fade-up" data-aos-delay={idx * 100}>
                <div className="p-4 bg-white shadow-sm rounded-4 border border-light-subtle hover-lift">
                  <h2 className="fw-black mb-1 text-edu-indigo fs-1">
                    {stat.prefix && <span className="fs-3 fw-bold me-1">{stat.prefix}</span>}
                    {stat.total}
                    {stat.suffix && <span className="fs-5 fw-bold text-muted">{stat.suffix}</span>}
                  </h2>
                  <p className="text-muted small fw-semibold mb-0 text-uppercase tracking-wide">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 4. LES PILIERS DE L'ARCHITECTURE FONCTIONNELLE --- */}
      <section className="py-5 bg-edu-soft-blue">
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <span className="text-edu-indigo fw-bold small text-uppercase d-block mb-1">Périmètre Applicatif</span>
            <h3 className="fw-bold text-dark">Une architecture découpée en 3 portails</h3>
            <div className="accent-bar mx-auto mt-2 bg-edu-green"></div>
          </div>

          <div className="row g-4">
            {portals.map((item) => (
              <div className="col-lg-4" key={`portal-${item.title}`} data-aos="fade-up" data-aos-delay={item.delay}>
                <div className="p-4 rounded-5 shadow-sm h-100 bg-white border-0 hover-lift transition-all">
                  <div className={`fs-2 mb-3 d-inline-flex p-3 rounded-4 bg-light-subtle ${item.colorClass}`}>
                    {item.icon}
                  </div>
                  <h5 className="fw-bold text-dark mb-2">{item.title}</h5>
                  <p className="text-muted mb-0 small lh-base">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 5. RÉSILIENCE HORS-CONNEXION (PWA OFFLINE-FIRST) --- */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="row align-items-center g-5 flex-row-reverse">
            <div className="col-lg-5 text-center" data-aos="fade-left">
              <div className="p-4 rounded-5 shadow-lg text-white text-center d-flex flex-column align-items-center justify-content-center bg-edu-red-gradient min-h-260">
                <MdCloudOff size={56} className="mb-3 text-white animate-pulse-icon" />
                <h4 className="fw-bold mb-2">Exigence Offline ≥ 70%</h4>
                <p className="small opacity-90 mb-0">Les coupures de réseau ne bloquent plus la saisie des notes ou des absences.</p>
              </div>
            </div>
            <div className="col-lg-7" data-aos="fade-right">
              <h6 className="text-edu-red fw-bold text-uppercase mb-2">Technologie Résiliente</h6>
              <h2 className="fw-bold mb-3 text-edu-indigo">Mode Offline-First approuvé pour l'arrière-pays</h2>
              <p className="text-muted small mb-3 lh-relaxed">
                Face aux contraintes d'infrastructure réseau de certains départements, le cahier des charges du <strong>MINESEC</strong> impose un fonctionnement déconnecté fort. Grâce aux technologies <strong>Workbox Service Workers</strong> et à la base de données interne <strong>IndexedDB</strong>, les données sont persistées localement.
              </p>
              <ul className="list-unstyled d-flex flex-column gap-2 small text-muted">
                <li className="d-flex align-items-center gap-2"><MdCheckCircle className="text-edu-green" /> Cache applicatif complet des structures de classes</li>
                <li className="d-flex align-items-center gap-2"><MdCheckCircle className="text-edu-green" /> Algorithme de synchronisation automatique au retour du réseau</li>
                <li className="d-flex align-items-center gap-2"><MdCheckCircle className="text-edu-green" /> Système intelligent de résolution des conflits de modifications</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --- 6. SÉCURITÉ & CONFORMITÉ LÉGALE --- */}
      <section className="py-5 bg-light border-top border-light-subtle">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-lg-6" data-aos="fade-right">
              <div className="p-4 bg-white rounded-5 shadow-sm border-start border-5 border-edu-green">
                <h4 className="fw-bold mb-4 text-edu-indigo">Sécurité et intégrité de niveau étatique 🛡️</h4>
                <div className="d-flex flex-column gap-4">
                  <div className="d-flex align-items-start gap-3">
                    <div className="p-2 rounded bg-light text-edu-indigo"><MdLock size={22} /></div>
                    <div>
                      <h6 className="fw-bold mb-1 text-dark">Chiffrement Avancé AES-256</h6>
                      <p className="small text-muted mb-0">Toutes les informations hautement sensibles (identités des mineurs, relevés de notes) sont cryptées au repos et durant le transit.</p>
                    </div>
                  </div>
                  <div className="d-flex align-items-start gap-3">
                    <div className="p-2 rounded bg-light text-edu-green"><MdOutlineSecurity size={22} /></div>
                    <div>
                      <h6 className="fw-bold mb-1 text-dark">Double Authentification (2FA OTP)</h6>
                      <p className="small text-muted mb-0">Chaque connexion administrative ou chef d'établissement requiert la validation d'un code à usage unique (OTP) acheminé par SMS.</p>
                    </div>
                  </div>
                  <div className="d-flex align-items-start gap-3">
                    <div className="p-2 rounded bg-light text-edu-amber"><MdGavel size={22} /></div>
                    <div>
                      <h6 className="fw-bold mb-1 text-dark">Conformité Légale Camerounaise</h6>
                      <p className="small text-muted mb-0">Respect strict de la loi n°2010/012 relative à la cybersécurité et à la cybercriminalité au Cameroun pour garantir la souveraineté des données.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6 text-center text-lg-start ps-lg-5" data-aos="fade-left">
              <span className="text-edu-indigo fw-bold small text-uppercase d-block mb-1">Stack Technologique Souveraine</span>
              <h3 className="fw-bold mb-3 text-edu-indigo">Des fondations robustes &amp; certifiées</h3>
              <p className="text-muted small mb-4 lh-relaxed">
                L'infrastructure système s'appuie sur des technologies modernes à haute disponibilité. Le back-end architecturé sous <strong>Laravel</strong> communique avec un moteur de base de données <strong>PostgreSQL 15</strong>, le tout validé par des pipelines CI/CD automatisés assurant une couverture de tests supérieure à 80%.
              </p>
              <div className="d-flex flex-wrap justify-content-center justify-content-lg-start gap-2">
                {["React 18 · Vite", "Laravel", "PostgreSQL", "Docker"].map((tech) => (
                  <span key={tech} className="badge bg-secondary-subtle text-secondary rounded-pill px-3 py-2 fw-semibold small">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      

      {/* --- 8. BASELINE & CLOSING STATEMENT --- */}
      <section className="py-5 text-white text-center position-relative bg-edu-dark-gradient">
        <div className="container position-relative z-2" data-aos="fade-up">
          <h2 className="fw-bold mb-4">Notre Vision pour le Cameroun </h2>
          <p className="lead mx-auto mb-4 opacity-90 fs-5 fst-italic max-w-800 lh-lg">
            "La barrière de l'enclavement ou de la connectivité ne doit plus être un frein à la transparence de nos évaluations nationales. Nous bâtissons le socle numérique de l'école camerounaise de demain."
          </p>
        
        </div>
      </section>

    </div>
  );
}