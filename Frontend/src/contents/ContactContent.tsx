import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styles/ContactContent.css';
import '../theme.css';
import { Link } from 'react-router-dom';
import {
  FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaFacebookF,
  FaLinkedinIn, FaTwitter, FaWhatsapp
} from 'react-icons/fa';
import {
  MdSend, MdCheckCircle, MdErrorOutline, MdSchool,
  MdAccessTime, MdSupportAgent
} from 'react-icons/md';

export default function ContactContent() {
  const [formData, setFormData] = useState({
    name: '', email: '', subject: '', message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  useEffect(() => {
    AOS.init({ duration: 800, once: false, mirror: true, easing: 'ease-out-cubic' });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    // Simulation d'envoi (à remplacer par un appel API réel)
    setTimeout(() => setStatus('success'), 1800);
  };

  const contactInfos = [
    {
      icon: <FaEnvelope />,
      title: 'Email',
      value: 'support@edusmart-cm.org',
      href: 'mailto:support@edusmart-cm.org',
      colorClass: 'bg-edu-green-subtle text-edu-green',
      delay: 0,
    },
    {
      icon: <FaPhoneAlt />,
      title: 'Téléphone',
      value: '+237 670 000 000',
      href: 'tel:+237670000000',
      colorClass: 'bg-edu-indigo-subtle text-edu-indigo',
      delay: 100,
    },
    {
      icon: <FaMapMarkerAlt />,
      title: 'Adresse',
      value: 'Yaoundé, Cameroun',
      href: '#map',
      colorClass: 'bg-edu-red-subtle text-edu-red',
      delay: 200,
    },
    {
      icon: <MdAccessTime />,
      title: 'Horaires',
      value: 'Lun – Ven : 8h – 17h',
      href: null,
      colorClass: 'bg-edu-amber-subtle text-edu-amber',
      delay: 300,
    },
  ];

  return (
    <div className="contact-wrapper bg-white">

      {/* ── 1. HERO ── */}
      <section className="contact-hero text-center text-white d-flex align-items-center justify-content-center">
        <div className="container" data-aos="zoom-in">
          <span className="badge rounded-pill px-3 py-2 mb-3 fw-bold bg-edu-green-subtle text-edu-green">
            MINESEC · SUPPORT &amp; ASSISTANCE
          </span>
          <h1 className="display-4 fw-black text-white mb-3">
            Contactez <span className="text-edu-green">EDUSMART</span>
          </h1>
          <p className="lead opacity-75 mx-auto fs-5" style={{ maxWidth: 680 }}>
            Notre équipe est disponible pour répondre à toutes vos questions concernant la plateforme de gestion scolaire nationale.
          </p>
        </div>
      </section>

      {/* ── 2. CARTES D'INFO ── */}
      <section className="container py-5 mt-2">
        <div className="row g-4 justify-content-center">
          {contactInfos.map((info, idx) => (
            <div className="col-sm-6 col-lg-3" key={idx} data-aos="fade-up" data-aos-delay={info.delay}>
              <div className="contact-info-card p-4 h-100 d-flex flex-column align-items-center text-center gap-3">
                <div className={`contact-icon-wrapper ${info.colorClass}`}>
                  {info.icon}
                </div>
                <div>
                  <p className="fw-bold text-dark mb-1 small text-uppercase" style={{ letterSpacing: '0.05em' }}>
                    {info.title}
                  </p>
                  {info.href ? (
                    <a href={info.href} className="text-muted text-decoration-none fw-semibold small hover-edu-green">
                      {info.value}
                    </a>
                  ) : (
                    <span className="text-muted fw-semibold small">{info.value}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. FORMULAIRE + CARTE ── */}
      <section className="py-5 bg-light border-top border-bottom border-light-subtle">
        <div className="container">
          <div className="row g-5 align-items-start">

            {/* Formulaire */}
            <div className="col-lg-7" data-aos="fade-right">
              <div className="contact-form-card p-4 p-md-5">
                <div className="mb-4">
                  <span className="text-edu-green fw-bold small text-uppercase d-block mb-1">Formulaire</span>
                  <h3 className="fw-bold text-dark mb-0">Envoyez-nous un message</h3>
                  <div className="accent-bar mt-2 bg-edu-green"></div>
                </div>

                {status === 'success' && (
                  <div className="alert contact-alert alert-success d-flex align-items-center gap-2 mb-4" role="alert">
                    <MdCheckCircle size={20} />
                    Message envoyé avec succès ! Nous vous répondrons sous 24h.
                  </div>
                )}
                {status === 'error' && (
                  <div className="alert contact-alert alert-danger d-flex align-items-center gap-2 mb-4" role="alert">
                    <MdErrorOutline size={20} />
                    Une erreur est survenue. Veuillez réessayer.
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label htmlFor="contact-name">Nom complet</label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Ex : Jean Dupont"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        disabled={status === 'sending' || status === 'success'}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="contact-email">Adresse email</label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Ex : jean@lycee.cm"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={status === 'sending' || status === 'success'}
                      />
                    </div>
                    <div className="col-12">
                      <label htmlFor="contact-subject">Sujet</label>
                      <select
                        id="contact-subject"
                        name="subject"
                        className="form-select"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        disabled={status === 'sending' || status === 'success'}
                      >
                        <option value="">-- Choisissez un sujet --</option>
                        <option value="support">Support technique</option>
                        <option value="compte">Problème de compte</option>
                        <option value="inscription">Inscription / Accès</option>
                        <option value="partenariat">Partenariat institutionnel</option>
                        <option value="autre">Autre</option>
                      </select>
                    </div>
                    <div className="col-12">
                      <label htmlFor="contact-message">Message</label>
                      <textarea
                        id="contact-message"
                        name="message"
                        className="form-control"
                        placeholder="Décrivez votre demande en détail..."
                        value={formData.message}
                        onChange={handleChange}
                        required
                        disabled={status === 'sending' || status === 'success'}
                      />
                    </div>
                    <div className="col-12 mt-2">
                      <button
                        type="submit"
                        className="btn btn-contact-submit w-100 d-flex align-items-center justify-content-center gap-2"
                        disabled={status === 'sending' || status === 'success'}
                      >
                        {status === 'sending' ? (
                          <>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                            Envoi en cours...
                          </>
                        ) : (
                          <>
                            <MdSend /> Envoyer le message
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Infos complémentaires + carte */}
            <div className="col-lg-5 d-flex flex-column gap-4" data-aos="fade-left">

              {/* Support */}
              <div className="p-4 rounded-4 bg-white shadow-sm border border-light-subtle">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div className="contact-icon-wrapper bg-edu-green-subtle text-edu-green" style={{ width: 48, height: 48, fontSize: '1.3rem', borderRadius: 14 }}>
                    <MdSupportAgent />
                  </div>
                  <h6 className="fw-bold text-dark mb-0">Support NEXATEC SOLUTIONS</h6>
                </div>
                <p className="text-muted small mb-0 lh-base">
                  Notre équipe technique, mandatée par le <strong>MINESEC</strong>, assure un support dédié aux établissements pilotes. Temps de réponse moyen : <strong className="text-edu-green">moins de 4h</strong> en jours ouvrés.
                </p>
              </div>

              {/* Établissements */}
              <div className="p-4 rounded-4 bg-white shadow-sm border border-light-subtle">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div className="contact-icon-wrapper bg-edu-indigo-subtle text-edu-indigo" style={{ width: 48, height: 48, fontSize: '1.3rem', borderRadius: 14 }}>
                    <MdSchool />
                  </div>
                  <h6 className="fw-bold text-dark mb-0">Établissements pilotes</h6>
                </div>
                <p className="text-muted small mb-0 lh-base">
                  Vous êtes un chef d'établissement ou un administrateur d'un des <strong>150 lycées pilotes</strong> ? Contactez directement votre référent régional EDUSMART pour un accompagnement personnalisé.
                </p>
              </div>

              {/* Carte / localisation */}
              <div id="map" className="contact-map-card">
                <div className="contact-map-placeholder p-4">
                  <FaMapMarkerAlt size={40} className="mb-3 opacity-75" />
                  <h6 className="fw-bold mb-1">Yaoundé, Cameroun</h6>
                  <p className="small opacity-75 mb-3 text-center">Siège opérationnel NEXATEC SOLUTIONS SARL</p>
                  <a
                    href="https://maps.google.com/?q=Yaoundé,Cameroun"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-edu-green px-4 rounded-pill"
                  >
                    Voir sur Google Maps
                  </a>
                </div>
              </div>

              {/* Réseaux sociaux */}
              <div className="p-4 rounded-4 bg-white shadow-sm border border-light-subtle">
                <p className="fw-bold text-dark small text-uppercase mb-3" style={{ letterSpacing: '0.05em' }}>
                  Suivez-nous
                </p>
                <div className="d-flex gap-3">
                  <a href="#" className="social-contact-btn bg-edu-indigo-subtle text-edu-indigo" aria-label="Facebook"><FaFacebookF /></a>
                  <a href="#" className="social-contact-btn bg-edu-teal-subtle text-edu-teal" aria-label="Twitter"><FaTwitter /></a>
                  <a href="#" className="social-contact-btn bg-edu-green-subtle text-edu-green" aria-label="LinkedIn"><FaLinkedinIn /></a>
                  <a href="#" className="social-contact-btn bg-edu-amber-subtle text-edu-amber" aria-label="WhatsApp"><FaWhatsapp /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. CTA FINAL ── */}
      <section className="py-5 text-white text-center contact-cta-section">
        <div className="container" data-aos="fade-up">
          <h2 className="fw-bold mb-3">Vous avez une question urgente ?</h2>
          <p className="lead opacity-75 mb-4 mx-auto" style={{ maxWidth: 600 }}>
            Appelez-nous directement ou rejoignez la plateforme pour accéder à l'assistance en ligne intégrée.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <a href="tel:+237670000000" className="btn btn-edu-green px-4 py-2 rounded-pill fw-bold d-flex align-items-center gap-2">
              <FaPhoneAlt /> Appeler maintenant
            </a>
            <Link to="/register" className="btn btn-edu-yellow px-4 py-2 rounded-pill fw-bold">
              Créer mon espace
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
