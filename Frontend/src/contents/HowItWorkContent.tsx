import React, { useEffect } from 'react';
import '../styles/HowItWork.Content.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { 
  LuUserPlus, 
  LuFileText, 
  LuClipboardCheck,
  LuSmartphone, 
  LuCircleCheck 
} from "react-icons/lu";
import { FaChartBar } from "react-icons/fa";

const HowItWorkContent: React.FC = () => {
  useEffect(() => {
    AOS.init({ 
      duration: 800, 
      once: false, 
      mirror: true 
    });
  }, []);

  const steps = [
    {
      id: "step-register",
      icon: <LuUserPlus />,
      title: "Inscription & Gestion des Élèves",
      desc: "Créez votre compte et enregistrez les informations des élèves en quelques clics. Centralisez toutes les données scolaires en un seul endroit.",
      color: "green"
    },
    {
      id: "step-notes",
      icon: <LuFileText />,
      title: "Saisie des Notes",
      desc: "Enregistrez les notes des élèves par matière et par trimestre. Le système calcule automatiquement les moyennes et génère les bulletins.",
      color: "yellow"
    },
    {
      id: "step-absences",
      icon: <LuClipboardCheck />,
      title: "Suivi des Absences",
      desc: "Marquez les présences et absences quotidiennes. Générez des rapports d'assiduité et alertez automatiquement les parents en cas d'absence.",
      color: "red"
    },
    {
      id: "step-stats",
      icon: <FaChartBar />,
      title: "Statistiques & Rapports",
      desc: "Consultez les tableaux de bord avec statistiques en temps réel. Exportez les rapports pour le MINESEC et suivez la performance globale de l'établissement.",
      color: "teal"
    }
  ];

  return (
    <div className="how-it-work-wrapper">
      {/* Hero Section */}
      <section className="how-hero text-center text-white">
        <div className="container" data-aos="zoom-in">
          <span className="badge rounded-pill bg-edu-green mb-3" style={{ fontSize: '0.85rem', padding: '8px 20px' }}>
            SIMPLICITÉ & EFFICACITÉ
          </span>
          <h1 className="display-4 fw-bold">
            Comment fonctionne <span className="text-edu-yellow">EDUSMART-CM</span> ?
          </h1>
          <p className="lead opacity-75 mx-auto" style={{maxWidth: '700px'}}>
            Gérez votre établissement scolaire, suivez les notes et absences, et générez des rapports en toute simplicité.
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="container py-5">
        <div className="row g-5 align-items-center">
          <div className="col-lg-6" data-aos="fade-right">
            <div className="steps-timeline">
              {steps.map((step) => (
                <div className="step-item d-flex gap-4 mb-5" key={step.id}>
                  <div className={`step-icon-wrapper icon-${step.color}`}>
                    {step.icon}
                  </div>
                  <div className="step-text">
                    <h4 className="fw-bold text-edu-indigo">{step.title}</h4>
                    <p className="text-muted">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="col-lg-6 d-none d-lg-block" data-aos="fade-left">
             <div className="how-visual-box p-5 rounded-5 shadow-lg bg-white text-center">
                <LuSmartphone className="display-1 text-edu-green mb-4 animate-bounce" />
                <h3 className="fw-bold mb-3 text-edu-indigo">Votre lycée à portée de main</h3>
                <p className="text-muted">
                  Une plateforme intuitive pensée pour simplifier la gestion scolaire et administrative des établissements au Cameroun.
                </p>
                <div className="d-flex justify-content-center align-items-center gap-2 mt-4">
                    <LuCircleCheck className="text-edu-green" style={{ fontSize: '1.2rem' }} /> 
                    <span className="text-muted" style={{ fontSize: '0.9rem' }}>
                      Données sécurisées et conformes MINESEC
                    </span>
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorkContent;