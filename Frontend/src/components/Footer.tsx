import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styles/Footer.css';
import '../theme.css';
import { Link } from 'react-router-dom';
import { 
  FaFacebookF, FaLinkedinIn, FaTwitter, FaInstagram,
  FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaGraduationCap
} from 'react-icons/fa';

export default function Footer() {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <footer className="footer-container bg- border-top border-edu-green">
      <div className="container py-5">
        <div className="row g-4">
          
          {/* Section 1: Brand & Mission */}
          <div className="col-lg-4 col-md-6" data-aos="fade-up">
            <div className="footer-brand mb-3 fs-3 fw-bold">
              <FaGraduationCap className="text-edu-green me-2" />
              <span className="text-edu-green">EDU</span>
              <span className="text-edu-red">SMART</span>
              <span className="text-edu-yellow">-CM</span>
            </div>
            <p className="footer-description mb-4 text-white opacity-75 small">
              Plateforme de gestion scolaire pour les établissements d'enseignement secondaire du Cameroun. 
              Une solution moderne pour la gestion des notes, absences et inscriptions.
            </p>
            <div className="social-links d-flex gap-3">
              <a href="#" className="text-edu-green fs-5 hover-scale" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="#" className="text-edu-yellow fs-5 hover-scale" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="#" className="text-edu-teal fs-5 hover-scale" aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>
              <a href="#" className="text-edu-red fs-5 hover-scale" aria-label="Instagram">
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Section 2: Navigation */}
          <div className="col-lg-2 col-md-3 col-6" data-aos="fade-up" data-aos-delay="100">
            <h6 className="text-edu-yellow fw-bold mb-3 text-uppercase" style={{letterSpacing: '0.5px', fontSize: '0.9rem'}}>
              Navigation
            </h6>
            <ul className="list-unstyled footer-links mb-0">
              <li><Link to="/dashboard" className="text-white opacity-75 text-decoration-none hover-edu-green">Tableau de bord</Link></li>
              <li><Link to="/students" className="text-white opacity-75 text-decoration-none hover-edu-green">Élèves</Link></li>
              <li><Link to="/grades" className="text-white opacity-75 text-decoration-none hover-edu-green">Notes</Link></li>
              <li><Link to="/attendance" className="text-white opacity-75 text-decoration-none hover-edu-green">Absences</Link></li>
            </ul>
          </div>

          {/* Section 3: Ressources */}
          <div className="col-lg-2 col-md-3 col-6" data-aos="fade-up" data-aos-delay="200">
            <h6 className="text-edu-yellow fw-bold mb-3 text-uppercase" style={{letterSpacing: '0.5px', fontSize: '0.9rem'}}>
              Ressources
            </h6>
            <ul className="list-unstyled footer-links mb-0">
              <li><Link to="/help" className="text-white opacity-75 text-decoration-none hover-edu-green">Aide</Link></li>
              <li><Link to="/documentation" className="text-white opacity-75 text-decoration-none hover-edu-green">Documentation</Link></li>
              <li><Link to="/terms" className="text-white opacity-75 text-decoration-none hover-edu-green">CGU</Link></li>
              <li><Link to="/privacy" className="text-white opacity-75 text-decoration-none hover-edu-green">Confidentialité</Link></li>
            </ul>
          </div>

          {/* Section 4: Contact */}
          <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="300">
            <h6 className="text-edu-yellow fw-bold mb-3 text-uppercase" style={{letterSpacing: '0.5px', fontSize: '0.9rem'}}>
              Contact
            </h6>
            <ul className="list-unstyled text-white opacity-75 small mb-3">
              <li className="mb-2">
                <FaEnvelope className="me-2 text-edu-green" /> 
                <a href="mailto:support@edusmart-cm.org" className="text-white text-decoration-none hover-edu-green">
                  support@edusmart-cm.org
                </a>
              </li>
              <li className="mb-2">
                <FaPhoneAlt className="me-2 text-edu-green" /> 
                <a href="tel:+237670000000" className="text-white text-decoration-none hover-edu-green">
                  +237 670 000 000
                </a>
              </li>
              <li className="mb-2">
                <FaMapMarkerAlt className="me-2 text-edu-green" /> 
                Yaoundé, Cameroun
              </li>
            </ul>
            <Link to="/contact" className="btn btn-edu-green w-100 py-2 text-decoration-none">
              Nous contacter
            </Link>
          </div>
        </div>

        <hr className="divider-edu my-4" />

        <div className="footer-bottom d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
          <div className="small text-white opacity-50">
            © {new Date().getFullYear()} <span className="text-edu-green fw-bold">EDUSMART-CM</span>. Tous droits réservés.
            <span className="mx-2">|</span>
            <span className="text-edu-teal">MINESEC</span>
          </div>
          <div className="d-flex gap-3 small fw-bold">
             <span className="text-edu-green">ÉDUCATION</span>
             <span className="text-edu-yellow">•</span>
             <span className="text-edu-red">EXCELLENCE</span>
             <span className="text-edu-yellow">•</span>
             <span className="text-edu-teal">CAMEROUN</span>
          </div>
        </div>
      </div>
    </footer>
  );
}