import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styles/HomeContent.css';
import '../theme.css';
import { Link } from 'react-router-dom';
import dashboardGif from '../assets/web2.gif';

import { 
  LuGraduationCap, 
  LuClipboardList, 
  LuShieldCheck, 
  LuPlay, 
  LuZap,
  LuShieldAlert,
  LuSmartphone,
  LuQuote,
  LuFileText,
  LuUsers,
  LuCalendarCheck,
  LuTrendingUp,
  LuAward,
  LuBookOpen
} from "react-icons/lu";
import { FaArrowRight, FaChalkboardTeacher, FaChartBar } from "react-icons/fa";

interface Step {
  num: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  color: string;
}

const HomeContent: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
      easing: 'ease-out-back',
      offset: 100
    });
    AOS.refresh();
  }, []);

  // Adapté au contexte EDUSMART-CM : gestion scolaire
  const steps: Step[] = [
    { num: '01', icon: <LuUsers />, title: 'Gestion des Élèves', desc: 'Inscrivez et gérez les dossiers de vos élèves en quelques clics.', color: 'green' },
    { num: '02', icon: <LuClipboardList />, title: 'Saisie des Notes', desc: 'Enregistrez les notes par matière et générez automatiquement les bulletins.', color: 'yellow' },
    { num: '03', icon: <LuCalendarCheck />, title: 'Suivi des Absences', desc: 'Pointage quotidien et alertes automatiques aux parents.', color: 'red' },
    { num: '04', icon: <FaChartBar />, title: 'Statistiques & Rapports', desc: 'Tableaux de bord en temps réel pour le suivi des performances.', color: 'teal' }
  ];

  const testimonials = [
    { name: "M. Kamga Pierre", role: "Proviseur", text: "EDUSMART-CM a révolutionné notre gestion administrative. Nous avons réduit de 70% le temps consacré aux bulletins.", city: "Lycée de Bafoussam" },
    { name: "Mme Nguefack Marie", role: "Enseignante", text: "La saisie des notes est devenue un jeu d'enfant. L'interface est intuitive et fonctionne même avec une connexion instable.", city: "Lycée de Yaoundé" },
    { name: "Dr. Fotso Jean", role: "Censeur", text: "Le suivi des absences en temps réel nous permet d'intervenir rapidement auprès des élèves en difficulté.", city: "Lycée de Douala" }
  ];

  return (
    <div className="home-content-wrapper overflow-hidden">
      
      {/* HERO SECTION */}
      <section className="container-fluid hero-container py-5">
        <div className="container">
          <div className="row align-items-center min-vh-100">
            <div className="col-lg-6 hero-left text-center text-lg-start" data-aos="fade-right">
              <div className="mb-4">
                <span className="badge bg-edu-green-subtle text-edu-green px-3 py-2 rounded-pill fw-bold">
                  <LuGraduationCap className="me-1" /> MINESEC • Plateforme Officielle
                </span>
              </div>
              <h1 className="display-3 fw-bold mb-4 lh-sm">
                La gestion scolaire <br />
                <span className="text-edu-green">simplifiée</span> pour <br />
                <span className="text-edu-yellow">150 lycées</span> du Cameroun
              </h1>
              <p className="hero-sub mb-5 mx-auto mx-lg-0 lead text-muted" style={{maxWidth: '540px'}}>
                EDUSMART-CM digitalise la gestion des notes, absences et inscriptions. 
                Une solution <strong>offline-first</strong> conçue pour les établissements camerounais.
              </p>
              
              <div className="hero-actions d-flex flex-wrap justify-content-center justify-content-lg-start gap-3 mb-5">
                <Link to="/login" className="btn btn-edu-green px-5 py-3 shadow-lg d-flex align-items-center gap-2 rounded-pill fw-bold text-white text-decoration-none">
                  Accéder à la plateforme <FaArrowRight />
                </Link>
                <Link to="/how-it-work" className="btn btn-edu-outline-indigo px-5 py-3 d-flex align-items-center gap-2 rounded-pill fw-bold text-decoration-none">
                  <LuPlay /> Découvrir
                </Link>
              </div>

              <div className="hero-stats d-flex align-items-center justify-content-center justify-content-lg-start gap-4 flex-wrap">
                <div className="stat-item" data-aos="zoom-in" data-aos-delay="200">
                  <div className="stat-number fw-bold h2 text-edu-green mb-0">150+</div>
                  <div className="stat-label small text-muted">Lycées connectés</div>
                </div>
                <div className="divider-vr bg-gray opacity-25 d-none d-md-block" style={{width: '2px', height: '50px'}}></div>
                <div className="stat-item" data-aos="zoom-in" data-aos-delay="300">
                  <div className="stat-number fw-bold h2 text-edu-yellow mb-0">Offline</div>
                  <div className="stat-label small text-muted">Mode hors ligne</div>
                </div>
                <div className="divider-vr bg-gray opacity-25 d-none d-md-block" style={{width: '2px', height: '50px'}}></div>
                <div className="stat-item" data-aos="zoom-in" data-aos-delay="400">
                  <div className="stat-number fw-bold h2 text-edu-teal mb-0">100%</div>
                  <div className="stat-label small text-muted">Sécurisé</div>
                </div>
              </div>
            </div>

            <div className="col-lg-6 hero-visual position-relative mt-5 mt-lg-0 d-flex justify-content-center" data-aos="fade-left">
              <div className="visual-background-animate">
                <div className="blob b-1 bg-edu-green"></div>
                <div className="blob b-2 bg-edu-yellow"></div>
                <div className="blob b-3 bg-edu-teal"></div>
              </div>
              
              <div className="float-card left glass-effect d-none d-md-flex align-items-center gap-2 shadow-sm" data-aos="fade-down" data-aos-delay="500">
                <LuShieldCheck className="text-edu-green fs-5" />
                <div>
                  <div className="float-card-label small opacity-75">Données</div>
                  <div className="float-card-val text-edu-green fw-bold">Souveraines</div>
                </div>
              </div>
              
              {/* GIF DASHBOARD EDUSMART-CM SIMPLE */}
              <div className="dashboard-image-container" data-aos="zoom-in" data-aos-delay="300">
                <div className="gif-simple-wrapper">
                  <img 
                    src={dashboardGif} 
                    alt="Interface EDUSMART-CM - Démonstration animée du tableau de bord" 
                    className="dashboard-gif-simple"
                  />
                  
                  {/* Badge interactif */}
                  <div className="dashboard-overlay">
                    <div className="overlay-badge-simple">
                      <LuGraduationCap className="me-2" />
                      
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="float-card right glass-effect d-none d-md-flex align-items-center gap-2 shadow-sm" data-aos="fade-up" data-aos-delay="600">
                <LuSmartphone className="text-edu-teal fs-5" />
                <div>
                  <div className="float-card-label small opacity-75">Compatible</div>
                  <div className="float-card-val text-edu-teal fw-bold">Bas débit</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    

      {/* HOW IT WORKS */}
      <section className="container py-5 my-5">
        <div className="text-center mb-5" data-aos="fade-up">
          <span className="badge rounded-pill bg-edu-green-subtle text-edu-green px-4 py-2 mb-3 fw-bold">
            <LuBookOpen className="me-1" /> FONCTIONNALITÉS CLÉS
          </span>
          <h2 className="display-5 fw-bold text-edu-indigo mb-3">
            Une plateforme complète pour votre établissement
          </h2>
          <p className="text-muted lead mx-auto" style={{maxWidth: '600px'}}>
            Toutes les fonctionnalités essentielles pour gérer efficacement votre lycée
          </p>
        </div>
        <div className="row g-4">
          {steps.map((step, i) => (
            <div className="col-sm-6 col-lg-3" key={step.num} data-aos="fade-up" data-aos-delay={i * 100}>
              <div className="step-card h-100 p-4 border-0 shadow-sm rounded-4 position-relative overflow-hidden bg-white value-card hover-lift">
                <div className={`step-num-bg display-1 position-absolute top-0 end-0 opacity-10 fw-bold text-edu-${step.color}`}>
                  {step.num}
                </div>
                <div className={`step-icon mb-3 fs-1 p-3 rounded-4 d-inline-block shadow-sm bg-edu-${step.color}-subtle text-edu-${step.color}`} style={{position: 'relative', zIndex: 1}}>
                  {step.icon}
                </div>
                <h5 className="step-title fw-bold text-edu-indigo mb-2" style={{position: 'relative', zIndex: 1}}>
                  {step.title}
                </h5>
                <p className="step-desc text-muted small mb-0" style={{position: 'relative', zIndex: 1, lineHeight: '1.6'}}>
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="bg-light py-5">
        <div className="container py-5">
          <div className="text-center mb-5" data-aos="fade-up">
            <span className="badge rounded-pill bg-edu-teal-subtle text-edu-teal px-4 py-2 mb-3 fw-bold">
              <FaChalkboardTeacher className="me-1" /> TÉMOIGNAGES
            </span>
            <h2 className="display-6 fw-bold text-edu-indigo mb-3">
              Ils utilisent déjà EDUSMART-CM
            </h2>
            <p className="text-muted lead mx-auto" style={{maxWidth: '600px'}}>
              Découvrez comment notre plateforme transforme la gestion scolaire au quotidien
            </p>
          </div>
          <div className="row g-4">
            {testimonials.map((t, i) => (
              <div className="col-md-4" key={t.name} data-aos="zoom-in" data-aos-delay={i * 150}>
                <div className="testimonial-card p-4 rounded-4 bg-white shadow-sm border-0 h-100 hover-lift">
                  <LuQuote className="text-edu-green fs-2 mb-3 opacity-50" />
                  <p className="fst-italic text-muted mb-4" style={{lineHeight: '1.7'}}>
                    "{t.text}"
                  </p>
                  <div className="d-flex align-items-center gap-3">
                    <div className="avatar-placeholder bg-edu-green-subtle text-edu-green rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{width: '50px', height: '50px', fontSize: '1.2rem'}}>
                      {t.name.split(' ')[1][0]}
                    </div>
                    <div>
                      <h6 className="mb-0 fw-bold text-edu-indigo">{t.name}</h6>
                      <small className="text-edu-teal fw-medium">{t.role}</small>
                      <div className="small text-muted">{t.city}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomeContent;