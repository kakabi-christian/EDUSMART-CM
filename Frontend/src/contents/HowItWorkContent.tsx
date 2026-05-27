import React, { useEffect } from 'react';
import '../styles/HowItWork.Content.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { 
  LuUserPlus, 
  LuFileText, 
  LuTriangleAlert, // <-- Correction ici
  // LuCheckCircle, 
  LuSmartphone, 
  LuCircleCheck 
} from "react-icons/lu";

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
      title: "Inscription & Liaison",
      desc: "Créez votre compte en quelques instants et associez votre numéro de police d'abonnement pour centraliser vos informations.",
      color: "blue"
    },
    {
      id: "step-invoice",
      icon: <LuFileText />,
      title: "Suivi & Facturation",
      desc: "Consultez l'historique de vos consommations, recevez vos factures d'eau mensuelles en temps réel et payez-les en toute sécurité.",
      color: "green"
    },
    {
      id: "step-report",
      // icon: <LuAlertTriangle />,
      title: "Signalement des Incidents",
      desc: "Une fuite, une baisse de pression ou une coupure ? Signalez l'anomalie instantanément en joignant une photo et votre localisation.",
      color: "orange"
    },
    {
      id: "step-resolution",
      // icon: <LuCheckCircle />,
      title: "Suivi & Intervention",
      desc: "Suivez l'avancement de votre dossier de réclamation et le déploiement des équipes techniques de la CAMWATER sur le terrain.",
      color: "blue"
    }
  ];

  return (
    <div className="how-it-work-wrapper">
      {/* Hero Section */}
      <section className="how-hero text-center text-white">
        <div className="container" data-aos="zoom-in">
          <span className="badge rounded-pill bg-excha-green mb-3">PROXIMITÉ & RÉACTIVITÉ</span>
          <h1 className="display-4 fw-bold">Comment fonctionne l'Espace <span className="text-excha-orange">CAMWATER</span> ?</h1>
          <p className="lead opacity-75 mx-auto" style={{maxWidth: '700px'}}>
            Gérez vos abonnements, suivez votre consommation d'eau et transmettez vos réclamations en toute simplicité.
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
                    <h4 className="fw-bold text-excha-blue">{step.title}</h4>
                    <p className="text-muted">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="col-lg-6 d-none d-lg-block" data-aos="fade-left">
             <div className="how-visual-box p-5 rounded-5 shadow-lg bg-white text-center">
                <LuSmartphone className="display-1 text-excha-green mb-4 animate-bounce" />
                <h3 className="fw-bold mb-3">Votre service d'eau à portée de main</h3>
                <p className="text-muted">Une plateforme intuitive pensée pour simplifier les démarches administratives et techniques des usagers au Cameroun.</p>
                <div className="d-flex justify-content-center gap-2 mt-4">
                    <LuCircleCheck className="text-excha-green" /> Traitement et suivi sécurisés
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorkContent;