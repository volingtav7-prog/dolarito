import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import './App.css';

// ── Componentes de layout ─────────────────────────────────────────────────────
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import DashboardLayout from './components/Layout/DashboardLayout';

// ── Páginas de autenticación ──────────────────────────────────────────────────
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';

// ── Páginas del Dashboard ─────────────────────────────────────────────────────
import Calculadora from './pages/Dashboard/Calculadora';
import Graficos from './pages/Dashboard/Graficos';

// Placeholder genérico para páginas en construcción
function Placeholder({ title }) {
  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>{title}</h1>
      <p style={{ color: 'var(--text-muted)', marginTop: '16px' }}>Pantalla en construcción.</p>
    </div>
  );
}

// ── App raíz con el router ────────────────────────────────────────────────────
export default function App() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Ruta protegida */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Navigate to="calculadora" replace />} />
        <Route path="divisas" element={<Placeholder title="Divisas" />} />
        <Route path="graficos" element={<Graficos />} />
        <Route path="calculadora" element={<Calculadora />} />
        <Route path="noticias" element={<Placeholder title="Noticias" />} />
        <Route path="alertas" element={<Placeholder title="Alertas" />} />
      </Route>

      {/* Redirige la raíz al dashboard */}
      <Route path="/" element={<Navigate to="/dashboard/calculadora" replace />} />
      <Route path="*" element={<Navigate to="/dashboard/calculadora" replace />} />
    </Routes>
  );
}
