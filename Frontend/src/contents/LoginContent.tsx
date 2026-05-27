import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { authService } from "../services/authService";
import { MdEmail, MdLock, MdArrowForward, MdErrorOutline, MdCheckCircleOutline } from "react-icons/md";
import { LuShieldCheck } from "react-icons/lu";
import AOS from 'aos';
import 'aos/dist/aos.css';
import "../styles/LoginContent.css"; 
import "../theme.css";
import logoEdusmart from '../assets/LogoEdusmart.png';

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
      
      // Adaptation des redirections selon les rôles EDUSMART-CM
      if (response.user.type === 'admin') {
        navigate("/admin/dashboard");
      } else if(response.user.type === 'teacher') {
        navigate("/teacher/dashboard");
      } else if(response.user.type === 'student') {
        navigate("/student/dashboard");
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
    <div className="login-page-wrapper d-flex align-items-center justify-content-center" 
          style={{ 
            minHeight: '100vh', 
            background: 'linear-gradient(135deg, #F4FBF7 0%, #E6F9F4 50%, #D1FAE5 100%)',
            position: 'relative',
            overflow: 'hidden',
            padding: '1rem 0'
          }}>
      
      {/* Blobs décoratifs en arrière-plan */}
      <div style={{
        position: 'absolute',
        width: '100px',
        height: '400px',
        background: 'var(--green)',
        opacity: 0.1,
        borderRadius: '50%',
        filter: 'blur(80px)',
        top: '-100px',
        left: '-100px',
        animation: 'float 8s ease-in-out infinite'
      }}></div>
      <div style={{
        position: 'absolute',
        width: '300px',
        height: '300px',
        background: 'var(--yellow)',
        opacity: 0.1,
        borderRadius: '50%',
        filter: 'blur(80px)',
        bottom: '-50px',
        right: '-50px',
        animation: 'float 10s ease-in-out infinite reverse'
      }}></div>

      <div className="login-card p-3 p-md-4 shadow-2xl bg-white rounded-4 border-0" 
            data-aos="zoom-in-up"
            style={{ 
              maxWidth: '420px', 
              width: '90%',
              position: 'relative',
              zIndex: 1,
              border: '1px solid rgba(0, 166, 99, 0.1) !important'
            }}>
        
        <div className="text-center mb-3" data-aos="fade-down" data-aos-delay="200">
          {/* Logo EDUSMART-CM */}
          <div className="mb-2">
            <img 
              src={logoEdusmart} 
              alt="Logo EDUSMART-CM" 
              style={{ 
                height: '45px',
                width: 'auto',
                objectFit: 'contain'
              }}
            />
          </div>
          
          <h2 className="fw-bold mb-1 text-edu-indigo" style={{ fontSize: '1.5rem' }}>
            Bon retour !
          </h2>
          <p className="text-muted mb-1" style={{ fontSize: '0.85rem' }}>
            Accédez à votre espace <span className="fw-bold text-edu-green">EDUSMART-CM</span>
          </p>
          <div className="d-flex align-items-center justify-content-center gap-1">
            <LuShieldCheck className="text-edu-teal" style={{ fontSize: '0.9rem' }} />
            <small className="text-edu-teal fw-medium" style={{ fontSize: '0.7rem' }}>
              Connexion sécurisée MINESEC
            </small>
          </div>
        </div>

        {message && (
          <div className={`d-flex align-items-center p-2 mb-3 rounded-3`} 
                data-aos="shake"
                style={{ 
                  backgroundColor: message.type === 'success' ? 'var(--bg-edu-green-subtle)' : 'var(--bg-edu-red-subtle)',
                  borderLeft: `3px solid ${message.type === 'success' ? 'var(--green)' : 'var(--red)'}`,
                  color: message.type === 'success' ? 'var(--green-dark)' : 'var(--red-dark)'
                }}>
            <span className="fs-5 me-2">
              {message.type === "success" ? <MdCheckCircleOutline /> : <MdErrorOutline />}
            </span>
            <span style={{ fontSize: '0.8rem' }} className="fw-medium">{message.text}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="mb-2" data-aos="fade-up" data-aos-delay="400">
            <label htmlFor="login-email" className="form-label fw-bold mb-1 text-edu-indigo" style={{ fontSize: '0.8rem' }}>
              Adresse Email
            </label>
            <div className="input-group input-group-sm">
              <span className="input-group-text bg-edu-green-subtle border-0 px-2 text-edu-green">
                <MdEmail style={{ fontSize: '0.9rem' }} />
              </span>
              <input 
                id="login-email"
                type="email" 
                className="form-control border-0 bg-light"
                style={{ borderRadius: '0 10px 10px 0', padding: '0.5rem 0.75rem', fontSize: '0.85rem' }}
                name="email" 
                placeholder="votre@email.com" 
                value={formData.email} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div><br />

          <div className="mb-2" data-aos="fade-up" data-aos-delay="600">
            <div className="d-flex justify-content-between mb-1">
              <label htmlFor="login-password" className="form-label fw-bold text-edu-indigo" style={{ fontSize: '0.8rem' }}>
                Mot de passe
              </label>
              <Link to="/forgot-password" className="fw-bold text-decoration-none text-edu-yellow hover-underline" style={{ fontSize: '0.75rem' }}>
                Oublié ?
              </Link>
            </div>
            <div className="input-group input-group-sm">
              <span className="input-group-text bg-edu-green-subtle border-0 px-2 text-edu-green">
                <MdLock style={{ fontSize: '0.9rem' }} />
              </span>
              <input 
                id="login-password"
                type="password" 
                className="form-control border-0 bg-light"
                style={{ borderRadius: '0 10px 10px 0', padding: '0.5rem 0.75rem', fontSize: '0.85rem' }}
                name="password" 
                placeholder="••••••••" 
                value={formData.password} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div><br />

          <div data-aos="fade-up" data-aos-delay="800">
            <button type="submit" 
                    className="btn btn-edu-green w-100 mt-2 py-2 rounded-pill fw-bold shadow-lg d-flex align-items-center justify-content-center gap-2" 
                    disabled={loading}
                    style={{ 
                      fontSize: '0.9rem',
                      height: '42px'
                    }}>
              {loading ? (
                <span className="spinner-border spinner-border-sm text-white" style={{ width: '0.9rem', height: '0.9rem' }}></span>
              ) : (
                <>Se connecter <MdArrowForward /></>
              )}
            </button>
          </div>
        </form>

        <div className="mt-3 text-center" data-aos="fade-in" data-aos-delay="1000">
          <p className="mb-0 text-muted" style={{ fontSize: '0.8rem' }}>
            Pas encore de compte ? 
            <Link to="/register" className="ms-1 fw-bold text-decoration-none text-edu-teal">
              Créer un compte
            </Link>
          </p>
          <div className="mt-2 pt-2 border-top">
            <small className="text-muted" style={{ fontSize: '0.7rem' }}>
              © 2026 EDUSMART-CM • <span className="text-edu-green fw-bold">MINESEC</span>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}