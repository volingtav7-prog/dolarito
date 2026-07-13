// ── src/App.jsx ───────────────────────────────────────────────────────────────
// Raíz de la aplicación con React Router v6.
// Rutas:
//   /          → redirige a /dashboard
//   /login     → LoginPage (pública)
//   /register  → RegisterPage (pública)
//   /dashboard → Dashboard (protegida por PrivateRoute)

import React, { useState, useCallback, useRef } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import './App.css';

// ── Componentes de layout ─────────────────────────────────────────────────────
import { useRates } from './hooks/useRates';
import Header       from './components/Header/Header';
import Ticker       from './components/Ticker/Ticker';
import Footer       from './components/Footer/Footer';
import Modal        from './components/Modal/Modal';
import Toast        from './components/Toast/Toast';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

// ── Páginas del dashboard ─────────────────────────────────────────────────────
import Cotizaciones from './pages/Cotizaciones/Cotizaciones';
import Conversor    from './pages/Conversor/Conversor';
import Graficos     from './pages/Graficos/Graficos';
import Mercado      from './pages/Mercado/Mercado';

// ── Páginas de autenticación ──────────────────────────────────────────────────
import LoginPage    from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';

// ── Dashboard (layout completo con tabs) ──────────────────────────────────────
function Dashboard() {
  const rates                     = useRates(4000);
  const [activeTab, setActiveTab] = useState('cotizaciones');
  const [modalOpen, setModalOpen] = useState(false);
  const [toastMsg,  setToastMsg]  = useState('');
  const [toastVis,  setToastVis]  = useState(false);
  const toastTimer                = useRef(null);
  
  const { logout } = useAuth();

  const toast = useCallback((msg) => {
    setToastMsg(msg);
    setToastVis(true);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastVis(false), 3000);
  }, []);

  const handleSaveAlert = ({ divisa, condicion, valor }) => {
    setModalOpen(false);
    toast(`🔔 Alerta activada: ${divisa} — ${condicion} $${valor}`);
  };

  const renderPage = () => {
    switch (activeTab) {
      case 'cotizaciones': return <Cotizaciones rates={rates} toast={toast} />;
      case 'conversor':    return <Conversor    rates={rates} toast={toast} />;
      case 'graficos':     return <Graficos     rates={rates} />;
      case 'mercado':      return <Mercado />;
      default:             return null;
    }
  };

  return (
    <div className="app">
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onAlertClick={() => setModalOpen(true)}
      />

      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '0 2rem 1rem', maxWidth: '1400px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        <button onClick={logout} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer' }}>
          Cerrar Sesión
        </button>
      </div>

      <Ticker rates={rates} />

      <main className="app__main">
        {renderPage()}
      </main>

      <Footer />

      {modalOpen && (
        <Modal
          onClose={() => setModalOpen(false)}
          onSave={handleSaveAlert}
        />
      )}

      <Toast message={toastMsg} visible={toastVis} />
    </div>
  );
}

// ── App raíz con el router ────────────────────────────────────────────────────
export default function App() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/login"    element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Ruta protegida */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      {/* Redirige la raíz al dashboard (PrivateRoute se encargará de redirigir a /login si no hay sesión) */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* 404 — también redirige al dashboard */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
