import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { authService } from "../services/authService";
import { MdEmail, MdLock, MdArrowForward, MdErrorOutline, MdCheckCircleOutline, MdSecurity } from "react-icons/md";
import AOS from 'aos';
import 'aos/dist/aos.css';
import "../styles/LoginContent.css"; 
import "../theme.css";

// Importation du logo depuis le dossier assets
import logoEdusmart from "../assets/LogoEdusmart.png";

export default function LoginContent() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Étape courante du flux de connexion (1 = Identifiants, 2 = Code OTP)
  const [step, setStep] = useState<1 | 2>(1);

  const [formData, setFormData] = useState({
    login: "",
    password: "",
    two_factor_code: "",
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
      if (step === 1) {
        // ─────────────────────────────────────────────────────────────────────
        // ÉTAPE 1 : Soumission Identifiant + Mot de passe
        // ─────────────────────────────────────────────────────────────────────
        const response = await authService.login({
          login: formData.login,
          password: formData.password
        });

        if (response.step === 2) {
          setMessage({ type: "success", text: response.message });
          setStep(2); // Bascule l'interface sur le champ OTP
        }
      } else {
        // ─────────────────────────────────────────────────────────────────────
        // ÉTAPE 2 : Soumission du code de vérification OTP
        // ─────────────────────────────────────────────────────────────────────
        const response = await authService.verifyOtp({
          login: formData.login,
          two_factor_code: formData.two_factor_code
        });

        if (response.success && response.user) {
          // Gestion des redirections selon les rôles officiels EDUSMART
          if (response.user.role === 'minesec') {
            navigate("/admin/school");
          } else {
            navigate("/user/dashboard");
          }
        }
      }
    } catch (error: any) {
      const data = error.response?.data;
      const errorMsg = data?.message || "Une erreur est survenue lors de l'authentification.";
      setMessage({ type: "error", text: errorMsg });
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
        
        {/* Section Logo & En-tête */}
        <div className="text-center mb-3" data-aos="fade-down" data-aos-delay="200">
          <div className="mb-2">
            <img 
              src={logoEdusmart} 
              alt="Edusmart Logo" 
              className="animate-pulse-icon"
              style={{ height: '55px', objectFit: 'contain' }}
            />
          </div>
          <h3 className="fw-bold mb-1 text-shimmer" style={{ fontSize: '1.5rem' }}>
            {step === 1 ? "Bon retour !" : "Double facteur"}
          </h3>
          <p className="small mb-0" style={{ color: 'var(--gray)' }}>
            {step === 1 ? (
              <>Accédez à votre espace d'excellence <span className="fw-bold text-edu-green">Edusmart</span></>
            ) : (
              <>Veuillez valider votre identité pour continuer</>
            )}
          </p>
        </div>

        {/* Message d'alerte / Notification */}
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

        {/* Formulaire de connexion dynamique */}
        <form onSubmit={handleSubmit} className="login-form">
          
          {step === 1 ? (
            <>
              {/* CHAMP IDENTIFIANT (Email, Téléphone ou Matricule) */}
              <div className="mb-3" data-aos="fade-up" data-aos-delay="400">
                <label htmlFor="login-identifiant" className="form-label small fw-bold mb-1" style={{ color: 'var(--indigo)', fontSize: '0.8rem' }}>
                  Identifiant (Email)
                </label>
                <div className="input-group border rounded-3" style={{ borderColor: 'var(--gray-light)', overflow: 'hidden' }}>
                  <span className="input-group-text border-0 px-3" style={{ backgroundColor: 'rgba(0,0,0,0.03)', color: 'var(--gray)' }}>
                    <MdEmail />
                  </span>
                  <input 
                    id="login-identifiant"
                    type="text" 
                    className="form-control border-0 bg-transparent text-dark fs-6"
                    name="login" 
                    placeholder="Ex:christ@gmail.com" 
                    value={formData.login} 
                    onChange={handleChange} 
                    required 
                    style={{ height: '46px' }}
                  />
                </div>
              </div>

              {/* CHAMP MOT DE PASSE */}
              <div className="mb-2" data-aos="fade-up" data-aos-delay="600">
                <div className="d-flex justify-content-between mb-1">
                  <label htmlFor="login-password" className="form-label small fw-bold mb-0" style={{ color: 'var(--indigo)', fontSize: '0.8rem' }}>
                    Mot de passe
                  </label>
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
                    style={{ height: '46px' }}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              {/* CHAMP CODE DE VÉRIFICATION OTP */}
              <div className="mb-3" data-aos="fade-up" data-aos-delay="400">
                <label htmlFor="login-otp" className="form-label small fw-bold mb-1" style={{ color: 'var(--indigo)', fontSize: '0.8rem' }}>
                  Code secret OTP à 6 chiffres
                </label>
                <div className="input-group border rounded-3" style={{ borderColor: 'var(--gray-light)', overflow: 'hidden' }}>
                  <span className="input-group-text border-0 px-3" style={{ backgroundColor: 'rgba(0,0,0,0.03)', color: 'var(--gray)' }}>
                    <MdSecurity />
                  </span>
                  <input 
                    id="login-otp"
                    type="text" 
                    className="form-control border-0 bg-transparent text-dark fs-6 text-center fw-bold letter-spacing-2"
                    name="two_factor_code" 
                    placeholder="000000" 
                    maxLength={6}
                    value={formData.two_factor_code} 
                    onChange={handleChange} 
                    required 
                    style={{ height: '46px', fontSize: '1.2rem' }}
                  />
                </div>
                <div className="text-end mt-1">
                  <button 
                    type="button" 
                    className="btn btn-link p-0 small fw-bold text-decoration-none text-edu-amber" 
                    style={{ fontSize: '0.75rem' }}
                    onClick={() => setStep(1)}
                  >
                    Retour aux identifiants
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Bouton de Soumission */}
          <div data-aos="fade-up" data-aos-delay="800">
            <button 
              type="submit" 
              className="btn btn-edu-green w-100 mt-3 py-2 rounded-pill fw-bold d-flex align-items-center justify-content-center gap-2" 
              disabled={loading}
              style={{ 
                fontSize: '0.95rem',
                height: '48px', 
                minHeight: '48px'
              }}
            >
              {loading ? (
                <span className="spinner-border spinner-border-sm" style={{ width: '1.1rem', height: '1.1rem' }}></span>
              ) : (
                <>
                  {step === 1 ? "Recevoir le code" : "Vérifier et entrer"} <MdArrowForward />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="divider-edu my-3"></div>
      </div>
    </div>
  );
}