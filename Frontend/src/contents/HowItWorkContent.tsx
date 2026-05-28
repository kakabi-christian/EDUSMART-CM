import React, { useEffect } from 'react';
import '../styles/HowItWork.Content.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { 
  LuUserPlus, 
  LuFileText, 
  LuTriangleAlert, 
  LuSmartphone, 
  LuArrowRight 
} from "react-icons/lu";
import { Link } from 'react-router-dom';

export default function HowItWorkContent() {
  useEffect(() => {
    AOS.init({ 
      duration: 800, 
      once: false, 
      mirror: true,
      easing: 'ease-out-cubic'
    });
  }, []);

  // Extraction propre des étapes pour un JSX itérable et dynamique
  const steps = [
    {
      id: "step-register",
      icon: <LuUserPlus />,
      title: "1. Authentification Unique",
      desc: "Créez votre compte via vos identifiants fournis par l'établissement (Enseignant, Parent ou Administration) et validez votre accès par le double facteur SMS.",
      colorClass: "text-edu-indigo bg-light-subtle"
    },
    {
      id: "step-invoice",
      icon: <LuFileText />,
      title: "2. Saisie & Centralisation",
      desc: "Les enseignants reportent les notes et absences en quelques clics, même hors-ligne. Les données sont automatiquement stockées en local dans l'appareil.",
      colorClass: "text-edu-green bg-light-subtle"
    },
    {
      id: "step-report",
      icon: <LuTriangleAlert />,
      title: "3. Traitement & Alertes Sync",
      desc: "Dès qu'une connexion est détectée, le moteur PWA synchronise le tout vers le serveur central du MINESEC et notifie instantanément les parents d'élèves.",
      colorClass: "text-edu-amber bg-light-subtle"
    },
    {
      id: "step-resolution",
      icon: <LuSmartphone />,
      title: "4. Édition des Bulletins",
      desc: "En fin de trimestre, l'administration génère instantanément les livrets scolaires complets au format PDF, sécurisés par un chiffrement d'État.",
      colorClass: "text-edu-indigo bg-light-subtle"
    }
  ];

  return (
    <div className="how-it-work-wrapper bg-white">
      
      {/* --- HERO SECTION --- */}
      <section className="how-hero text-center text-white py-5 position-relative bg-edu-dark-gradient">
        <div className="hero-overlay position-absolute w-100 h-100 top-0 start-0 opacity-10"></div>
        <div className="container position-relative z-2" data-aos="zoom-in">
          <span className="badge rounded-pill px-3 py-2 mb-3 fw-bold bg-edu-green-light text-success">
            TRANSPARENCE & ACCESSIBILITÉ
          </span>
          <h1 className="display-4 fw-black text-white mb-3">
            Comment fonctionne l'écosystème <span className="text-edu-green">EDUSMART</span> ?
          </h1>
          <p className="lead opacity-75 mx-auto fs-5 max-w-700">
            Une synergie fluide et sécurisée entre le Ministère, les chefs d'établissements, les enseignants et les parents.
          </p>
        </div>
      </section>

      {/* --- STEPS & TIMELINE SECTION --- */}
      <section className="container py-5">
        <div className="row g-5 align-items-center">
          
          {/* Colonne Gauche : La Timeline des étapes */}
          <div className="col-lg-6" data-aos="fade-right">
            <div className="steps-timeline position-relative ps-2">
              {steps.map((step, idx) => (
                <div className="step-item d-flex gap-4 mb-4 align-items-start" key={step.id}>
                  <div className={`step-icon-wrapper fs-3 d-flex p-3 rounded-4 shadow-sm ${step.colorClass}`}>
                    {step.icon}
                  </div>
                  <div className="step-text pt-1">
                    <h4 className="fw-bold text-edu-indigo mb-2 fs-5">{step.title}</h4>
                    <p className="text-muted small lh-relaxed mb-0">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Colonne Droite : Le visuel statique d'accompagnement */}
          <div className="col-lg-6 d-none d-lg-block" data-aos="fade-left">
            <div className="how-visual-box p-5 rounded-5 shadow-sm bg-light border border-light-subtle text-center hover-lift transition-all">
              <div className="d-inline-flex p-4 rounded-circle bg-white text-edu-green shadow-sm mb-4 animate-pulse-icon">
                <LuSmartphone size={48} />
              </div>
              <h3 className="fw-bold text-dark mb-3">Le suivi scolaire à portée de main</h3>
              <p className="text-muted small lh-relaxed px-3">
                Une plateforme intuitive conçue pour briser l'enclavement numérique des lycées du Cameroun, garantissant une continuité de service totale, réseau ou pas.
              </p>
              <div className="d-flex justify-content-center align-items-center gap-2 mt-4 text-success fw-semibold small">
                <LuSmartphone /> Architecture et données souveraines certifiées
              </div>
              <div className="mt-4 pt-2">
                <Link to="/login" className="btn btn-outline-secondary btn-sm rounded-pill px-4 fw-bold">
                  Accéder aux portails <LuArrowRight className="ms-1" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}