import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  MdSwapHorizontalCircle,
  MdLogout,
  MdAccountCircle,
  MdPeople,
  MdMenu,
  MdDashboard,
  MdBarChart,
  MdSchool,
} from "react-icons/md";
import { authService } from "../services/authService";

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, setIsCollapsed }) => {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const confirmLogout = async () => {
    try {
      await authService.logout();
      setShowLogoutModal(false);
      navigate("/login");
    } catch (error) {
      console.error("Erreur lors de la déconnexion", error);
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user_data");
      setShowLogoutModal(false);
      navigate("/login");
    }
  };

  // Gestion dynamique des classes Bootstrap & États au survol
  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "nav-link active text-white fw-bold shadow-sm"
      : "nav-link fw-bold opacity-75 text-white-50";

  // Application stricte de la charte graphique CametiOn
  const navLinkStyle = ({ isActive }: { isActive: boolean }) => ({
    borderRadius: "12px",
    transition: "all 0.3s ease",
    backgroundColor: isActive ? "var(--green)" : "transparent",
    boxShadow: isActive ? "0 4px 12px rgba(0, 166, 99, 0.3)" : "none",
    display: "flex",
    alignItems: "center",
    justifyContent: isCollapsed ? "center" : "flex-start",
    padding: isCollapsed ? "12px 0" : "12px 18px",
    position: "relative" as const,
  });

  return (
    <>
      {/* STYLE CSS INTERNE ADAPTÉ AUX NEUTRES PREMIUM */}
      <style>{`
        .sidebar-container .nav-item .nav-link {
          color: var(--white) !important;
        }
        .sidebar-container .nav-item .nav-link:hover {
          background-color: rgba(52, 211, 153, 0.15) !important;
          opacity: 1 !important;
        }
        .sidebar-container.collapsed .nav-item .nav-link::after {
          content: attr(data-label);
          position: absolute;
          left: 100%;
          margin-left: 15px;
          padding: 6px 12px;
          background: var(--indigo);
          color: var(--white);
          border: 1px solid var(--border);
          border-radius: 8px;
          white-space: nowrap;
          opacity: 0;
          visibility: hidden;
          transition: 0.2s ease;
          z-index: 2000;
          font-size: 0.8rem;
          box-shadow: 0 4px 10px rgba(0,0,0,0.3);
        }
        .sidebar-container.collapsed .nav-item .nav-link:hover::after {
          opacity: 1;
          visibility: visible;
        }
      `}</style>

      <div
        className={`d-flex flex-column flex-shrink-0 p-3 shadow sidebar-container ${isCollapsed ? "collapsed" : ""}`}
        style={{
          width: isCollapsed ? "80px" : "280px",
          minHeight: "100vh",
          backgroundColor: "var(--dark-mid)", // Fond de carte vitré pro sombre
          borderRight: "1px solid var(--border)",
          transition: "all 0.3s ease",
          position: "fixed",
          left: 0,
          top: 0,
          zIndex: 1000,
        }}
      >
        {/* Header de la Sidebar */}
        <div
          className={`d-flex align-items-center mb-4 mt-2 ${isCollapsed ? "justify-content-center" : "justify-content-between"}`}
        >
          {!isCollapsed && (
            <div className="d-flex align-items-center text-decoration-none">
              <MdSwapHorizontalCircle
                className="me-2"
                style={{ color: "var(--green)" }}
                size={34}
              />
              <div className="d-flex flex-column">
                <span
                  className="fs-5 fw-bold text-white"
                  style={{ lineHeight: "1.2", letterSpacing: "0.5px" }}
                >
                  EDUSMART
                </span>
                <small
                  className="fw-bold text-uppercase"
                  style={{
                    fontSize: "0.65rem",
                    letterSpacing: "1px",
                    color: "var(--yellow)",
                  }}
                >
                  Admin Panel
                </small>
              </div>
            </div>
          )}
          <button
            className="btn p-0 border-0 d-flex align-items-center justify-content-center"
            onClick={() => setIsCollapsed(!isCollapsed)}
            style={{ fontSize: "26px", background: "transparent" }}
          >
            <MdMenu style={{ color: "var(--green-light)" }} />
          </button>
        </div>

        <hr
          style={{
            backgroundColor: "var(--border)",
            height: "1px",
            border: "none",
            margin: "10px 0 20px 0",
          }}
        />

        {/* Menu Navigation */}
        <ul className="nav nav-pills flex-column mb-auto gap-1">
          <li className="nav-item">
            <NavLink
              to="/admin/stats"
              className={navLinkClasses}
              style={navLinkStyle}
              data-label="Tableau de Bord"
            >
              <div className="d-flex align-items-center">
                <MdDashboard
                  className={isCollapsed ? "" : "me-3"}
                  size={22}
                  style={{ color: "inherit" }}
                />
                {!isCollapsed && <span>Tableau de Bord</span>}
              </div>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/admin/stats-graphe"
              className={navLinkClasses}
              style={navLinkStyle}
              data-label="Analyses Graphiques"
            >
              <div className="d-flex align-items-center">
                <MdBarChart
                  className={isCollapsed ? "" : "me-3"}
                  size={22}
                  style={{ color: "inherit" }}
                />
                {!isCollapsed && <span>Analyses Graphiques</span>}
              </div>
            </NavLink>
          </li>

          {/* N'oublie pas d'ajouter MdSchool dans tes imports en haut du fichier Sidebar.tsx */}
          <li className="nav-item">
            <NavLink
              to="/admin/school"
              className={navLinkClasses}
              style={navLinkStyle}
              data-label="Établissements"
            >
              <div className="d-flex align-items-center">
                <MdSchool
                  className={isCollapsed ? "" : "me-3"}
                  size={22}
                  style={{ color: "inherit" }}
                />
                {!isCollapsed && <span>Établissements</span>}
              </div>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/admin/user"
              className={navLinkClasses}
              style={navLinkStyle}
              data-label="Utilisateurs"
            >
              <div className="d-flex align-items-center">
                <MdPeople
                  className={isCollapsed ? "" : "me-3"}
                  size={22}
                  style={{ color: "inherit" }}
                />
                {!isCollapsed && <span>Utilisateurs</span>}
              </div>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/admin/profile-admin"
              className={navLinkClasses}
              style={navLinkStyle}
              data-label="Mon Profil"
            >
              <div className="d-flex align-items-center">
                <MdAccountCircle
                  className={isCollapsed ? "" : "me-3"}
                  size={22}
                  style={{ color: "inherit" }}
                />
                {!isCollapsed && <span>Mon Profil</span>}
              </div>
            </NavLink>
          </li>
        </ul>

        <hr
          style={{
            backgroundColor: "var(--border)",
            height: "1px",
            border: "none",
            margin: "20px 0",
          }}
        />

        {/* Section Déconnexion */}
        <div className="mt-auto">
          <button
            onClick={() => setShowLogoutModal(true)}
            className={`btn w-100 d-flex align-items-center gap-3 p-2.5 text-white border-0 ${isCollapsed ? "justify-content-center" : "justify-content-start"}`}
            style={{
              borderRadius: "12px",
              backgroundColor: "rgba(230, 33, 52, 0.08)",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor =
                "rgba(230, 33, 52, 0.15)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor =
                "rgba(230, 33, 52, 0.08)")
            }
          >
            <MdLogout size={22} style={{ color: "var(--red-light)" }} />
            {!isCollapsed && (
              <span
                className="fw-bold"
                style={{ color: "var(--white)", fontSize: "0.95rem" }}
              >
                Déconnexion
              </span>
            )}
          </button>
        </div>
      </div>

      {/* MODAL DE DÉCONNEXION DESIGN CAMETION PREMIUM */}
      {showLogoutModal && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          style={{
            backgroundColor: "rgba(10, 15, 13, 0.8)",
            backdropFilter: "blur(6px)",
            zIndex: 2050,
          }}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            style={{ maxWidth: "380px" }}
          >
            <div
              className="modal-content border-0 shadow-lg text-white"
              style={{
                borderRadius: "24px",
                backgroundColor: "var(--dark-mid)",
                border: "1px solid var(--border)",
              }}
            >
              <div className="modal-body p-4 text-center">
                <div
                  className="mb-3 d-inline-flex p-3 rounded-circle"
                  style={{ backgroundColor: "rgba(230, 33, 52, 0.1)" }}
                >
                  <MdLogout size={40} style={{ color: "var(--red)" }} />
                </div>
                <h5 className="fw-bold mb-2">Déconnexion</h5>
                <p className="small px-2" style={{ color: "var(--gray)" }}>
                  Êtes-vous sûr de vouloir mettre fin à votre session
                  d'administration ?
                </p>

                <div className="d-flex gap-2 mt-4">
                  <button
                    type="button"
                    className="btn fw-bold w-50 py-2 border text-white"
                    style={{
                      borderRadius: "12px",
                      borderColor: "var(--gray-light)",
                      backgroundColor: "transparent",
                    }}
                    onClick={() => setShowLogoutModal(false)}
                  >
                    Annuler
                  </button>
                  <button
                    type="button"
                    className="btn fw-bold w-50 py-2 text-white border-0"
                    style={{
                      borderRadius: "12px",
                      backgroundColor: "var(--red)",
                    }}
                    onClick={confirmLogout}
                  >
                    Quitter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
