import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './DashboardLayout.css';

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-layout">
      {/* Navbar */}
      <nav className="dashboard-nav">
        <div className="nav-left">
          <div className="nav-logo">📈 Dolarito</div>
        </div>
        
        <div className="nav-center">
          <NavLink to="/dashboard" end className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Inicio</NavLink>
          <NavLink to="/dashboard/divisas" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Divisas</NavLink>
          <NavLink to="/dashboard/graficos" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Gráficos</NavLink>
          <NavLink to="/dashboard/calculadora" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Calculadora</NavLink>
          <NavLink to="/dashboard/noticias" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Noticias</NavLink>
          <NavLink to="/dashboard/alertas" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Alertas</NavLink>
        </div>

        <div className="nav-right">
          <button className="nav-icon-btn">🔔</button>
          <div className="user-profile" onClick={handleLogout} title="Cerrar sesión">
            <div className="avatar">
              {user?.nombre?.charAt(0)?.toUpperCase() || 'U'}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  );
}
