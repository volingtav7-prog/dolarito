import React, { useState, useEffect } from 'react';
import { fetchRates } from '../../services/api';
import './Calculadora.css';

export default function Calculadora() {
  const [rates, setRates] = useState([]);
  const [amount, setAmount] = useState('1000');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('ARS');
  
  // Fake history for demo matching mockup
  const history = [
    { from: 'USD', to: 'ARS', in: '1000', out: '1298750', time: 'Hace 1 min' },
    { from: 'EUR', to: 'USD', in: '500', out: '537.85', time: 'Hace 1 hora' },
    { from: 'ARS', to: 'BRL', in: '10000', out: '55.28', time: 'Ayer' },
    { from: 'USD', to: 'EUR', in: '100', out: '92.35', time: 'Ayer' }
  ];

  useEffect(() => {
    // We would fetch real rates here and populate the dropdowns
    // For now, we mock the rate matching the image: 1 USD = 1298.75 ARS
  }, []);

  const handleSwap = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  return (
    <div className="calc-container">
      <div className="calc-header">
        <h1>Calculadora</h1>
        <p>Convertí cualquier moneda al instante con cotizaciones en tiempo real.</p>
      </div>

      <div className="calc-grid">
        
        {/* Left Side: Inputs */}
        <div className="calc-box">
          <div className="calc-inputs">
            
            <div className="calc-group">
              <span className="calc-label">Desde</span>
              <div className="calc-select">
                <span className="flag">🇺🇸</span>
                <div className="details">
                  <span className="code">{fromCurrency}</span>
                  <span className="name">{fromCurrency === 'USD' ? 'Dólar Estadounidense' : 'Peso Argentino'}</span>
                </div>
                <span>⌄</span>
              </div>
              <span className="calc-label">Ingresá el monto</span>
              <input 
                type="text" 
                className="calc-amount" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)} 
              />
            </div>

            <button className="calc-swap-btn" onClick={handleSwap}>⇄</button>

            <div className="calc-group">
              <span className="calc-label">Hacia</span>
              <div className="calc-select">
                <span className="flag">🇦🇷</span>
                <div className="details">
                  <span className="code">{toCurrency}</span>
                  <span className="name">{toCurrency === 'ARS' ? 'Peso Argentino' : 'Dólar Estadounidense'}</span>
                </div>
                <span>⌄</span>
              </div>
              <span className="calc-label">Resultado</span>
              <input 
                type="text" 
                className="calc-amount" 
                value="1.298.750,00" 
                disabled 
                style={{ backgroundColor: 'transparent', color: 'var(--text-main)' }}
              />
            </div>

          </div>

          <div className="calc-rate-info">
            <span>1 USD = 1.298,75 ARS</span>
            <span style={{ color: 'var(--success)' }}>↗ +12,45 (0,97%)</span>
          </div>

          <button className="btn-primary" style={{ marginBottom: '16px' }}>Convertir ➔</button>
          <button className="btn-secondary" style={{ backgroundColor: 'transparent' }}>☆ Agregar a favoritos</button>

          <div style={{ marginTop: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', backgroundColor: 'rgba(255,215,0,0.05)', borderRadius: '12px', border: '1px solid rgba(255,215,0,0.2)' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <span style={{ color: 'var(--brand-gold)', fontSize: '24px' }}>💡</span>
              <div>
                <div style={{ fontWeight: '600', fontSize: '14px', color: 'var(--text-main)' }}>Tip Dolarito</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Agregá monedas a favoritos para acceder más rápido.</div>
              </div>
            </div>
            <button style={{ background: 'none', border: '1px solid var(--border-color)', color: 'var(--text-main)', padding: '8px 16px', borderRadius: '8px', fontSize: '12px' }}>Ir a favoritos</button>
          </div>
        </div>

        {/* Right Side: Result */}
        <div className="calc-result-panel">
          <div className="calc-box" style={{ marginBottom: '24px' }}>
            <div className="calc-result-header">
              <span className="calc-label">Resultado de la conversión</span>
              <div className="badge">● Cotización en tiempo real</div>
            </div>
            
            <div className="calc-big-result">
              1.298.750,00 <span>ARS</span>
            </div>
            <div className="calc-result-words">Mil doscientos noventa y ocho mil setecientos cincuenta pesos</div>

            <div className="calc-used-rate">
              <div className="title">Cotización utilizada</div>
              <div className="row">
                <span>1 USD = 1.298,75 ARS</span>
                <span style={{ color: 'var(--success)' }}>+12,45 (0,97%) ↗</span>
              </div>
              <div className="time">Última actualización: hace 1 minuto</div>
            </div>
          </div>

          <div className="calc-box calc-history">
            <div className="calc-history-header">
              <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>Últimas conversiones</span>
              <a href="#" className="auth-link">Ver todas</a>
            </div>
            
            <div className="history-list">
              {history.map((h, i) => (
                <div className="calc-history-item" key={i}>
                  <div className="chi-left">
                    <div className="chi-flags">
                      {/* Icons placeholder */}
                      <span style={{marginRight: '-8px', zIndex: 1}}>🇺🇸</span>
                      <span>🇦🇷</span>
                    </div>
                    <div className="chi-pair">{h.from} ➔ {h.to}</div>
                  </div>
                  <div className="chi-right">
                    <div className="chi-amounts">{h.in} {h.from} = {h.out} {h.to}</div>
                    <div className="chi-time">{h.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
