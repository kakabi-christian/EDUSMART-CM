import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { authService } from "../services/authService";
import { MdEmail, MdLock, MdArrowForward, MdErrorOutline, MdCheckCircleOutline } from "react-icons/md";
import AOS from 'aos';
import 'aos/dist/aos.css';
import "../styles/LoginContent.css"; 
import "../theme.css";

// Importation du logo depuis le dossier assets
import logoEdusmart from "../assets/LogoEdusmart.png";

export default function LoginContent() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-quart',
    });

    if (location.state?.message) {
      setMessage({ type: "success", text: location.state.message });
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await authService.login(formData);
      
      // Gestion des redirections selon les rôles du projet Edusmart
      if (response.user.type === 'admin') {
        navigate("/admin/dashboard");
      } else if(response.user.type === 'user') {
        navigate("/user/dashboard");
      }
    } catch (error: any) {
      const status = error.response?.status;
      const data = error.response?.data;

      if (status === 403 && data?.needs_verification) {
        navigate("/verify-otp", { 
          state: { email: formData.email, message: data.message } 
        });
      } else {
        const errorMsg = data?.message || "Identifiants incorrects ou problème réseau.";
        setMessage({ type: "error", text: errorMsg });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-wrapper d-flex align-items-center justify-content-center py-3" 
          style={{ minHeight: '100vh', backgroundColor: 'var(--white)' }}>
      
      <div className="login-card p-4 shadow-lg bg-white rounded-5 border animate-fade-in" 
            data-aos="zoom-in-up"
            style={{ maxWidth: '440px', width: '90%', borderColor: 'var(--gray-light)' }}>
        
        {/* Section Logo & En-tête (Espacements réduits) */}
        <div className="text-center mb-3" data-aos="fade-down" data-aos-delay="200">
          <div className="mb-2">
            <img 
              src={logoEdusmart} 
              alt="Edusmart Logo" 
              className="animate-pulse-icon"
              style={{ height: '55px', objectFit: 'contain' }} // Logo plus compact
            />
          </div>
          <h3 className="fw-bold mb-1 text-shimmer" style={{ fontSize: '1.5rem' }}>Bon retour !</h3>
          <p className="small mb-0" style={{ color: 'var(--gray)' }}>
            Accédez à votre espace d'excellence <span className="fw-bold text-edu-green">Edusmart</span>
          </p>
        </div>

        {/* Message d'alerte / Notification personnalisé */}
        {message && (
          <div className={`d-flex align-items-center p-2.5 mb-3 rounded-4`} 
                data-aos="shake"
                style={{ 
                  backgroundColor: message.type === 'success' ? 'rgba(0, 166, 99, 0.1)' : 'rgba(230, 33, 52, 0.1)',
                  borderLeft: `5px solid ${message.type === 'success' ? 'var(--green)' : 'var(--red)'}`,
                  color: message.type === 'success' ? 'var(--green-dark)' : 'var(--red-dark)'
                }}>
            <span className="fs-5 me-2 d-flex align-items-center">
              {message.type === "success" ? <MdCheckCircleOutline /> : <MdErrorOutline />}
            </span>
            <span className="small fw-medium" style={{ fontSize: '0.85rem' }}>{message.text}</span>
          </div>
        )}

        {/* Formulaire de connexion */}
        <form onSubmit={handleSubmit} className="login-form">
          {/* Champ Email */}
          <div className="mb-3" data-aos="fade-up" data-aos-delay="400">
            <label htmlFor="login-email" className="form-label small fw-bold mb-1" style={{ color: 'var(--indigo)', fontSize: '0.8rem' }}>
              Adresse Email
            </label>
            <div className="input-group border rounded-3" style={{ borderColor: 'var(--gray-light)', overflow: 'hidden' }}>
              <span className="input-group-text border-0 px-3" style={{ backgroundColor: 'rgba(0,0,0,0.03)', color: 'var(--gray)' }}>
                <MdEmail />
              </span>
              <input 
                id="login-email"
                type="email" 
                className="form-control border-0 bg-transparent text-dark fs-6"
                name="email" 
                placeholder="votre@email.com" 
                value={formData.email} 
                onChange={handleChange} 
                required 
                style={{ height: '46px' }} // Hauteur de champ optimisée
              />
            </div>
          </div>

          {/* Champ Mot de passe */}
          <div className="mb-2" data-aos="fade-up" data-aos-delay="600">
            <div className="d-flex justify-content-between mb-1">
              <label htmlFor="login-password" className="form-label small fw-bold mb-0" style={{ color: 'var(--indigo)', fontSize: '0.8rem' }}>
                Mot de passe
              </label>
              <Link to="/forgot-password" className="small fw-bold text-decoration-none text-edu-amber" style={{ fontSize: '0.8rem' }}>
                Oublié ?
              </Link>
            </div>
            <div className="input-group border rounded-3" style={{ borderColor: 'var(--gray-light)', overflow: 'hidden' }}>
              <span className="input-group-text border-0 px-3" style={{ backgroundColor: 'rgba(0,0,0,0.03)', color: 'var(--gray)' }}>
                <MdLock />
              </span>
              <input 
                id="login-password"
                type="password" 
                className="form-control border-0 bg-transparent text-dark fs-6"
                name="password" 
                placeholder="••••••••" 
                value={formData.password} 
                onChange={handleChange} 
                required 
                style={{ height: '46px' }} // Hauteur de champ optimisée
              />
            </div>
          </div>

          {/* Bouton de Soumission */}
          <div data-aos="fade-up" data-aos-delay="800">
            <button 
              type="submit" 
              className="btn btn-edu-green w-100 mt-3 py-2 rounded-pill fw-bold d-flex align-items-center justify-content-center gap-2" 
              disabled={loading}
              style={{ 
                fontSize: '0.95rem',
                height: '48px', 
                minHeight: '48px' // Bouton un peu moins haut et plus compact
              }}
            >
              {loading ? (
                <span className="spinner-border spinner-border-sm" style={{ width: '1.1rem', height: '1.1rem' }}></span>
              ) : (
                <>Se connecter <MdArrowForward /></>
              )}
            </button>
          </div>
        </form>

        {/* Ligne de séparation stylée avec marges réduites */}
        <div className="divider-edu my-3"></div>

        {/* <div className="text-center" data-aos="fade-in" data-aos-delay="1000">
          <p className="small mb-0" style={{ color: 'var(--gray)', fontSize: '0.85rem' }}>
            Pas encore de compte ? 
            <Link to="/register" className="ms-1 fw-bold text-decoration-none text-edu-indigo">
              Inscrivez-vous
            </Link>
          </p>
        </div> */}

      </div>
    </div>
  );
}