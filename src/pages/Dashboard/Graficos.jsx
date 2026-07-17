import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import './Graficos.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function Graficos() {
  const [period, setPeriod] = useState('30D');
  const [compare, setCompare] = useState(true);

  const data = {
    labels: ['21 Abr', '25 Abr', '29 Abr', '03 May', '07 May', '11 May', '15 May', '19 May'],
    datasets: [
      {
        label: 'USD/ARS',
        data: [1210, 1240, 1220, 1286.3, 1260, 1290, 1280, 1298.75],
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
        pointRadius: 0,
        pointHoverRadius: 6,
      },
      ...(compare ? [{
        label: 'EUR/ARS',
        data: [1310, 1340, 1320, 1387.2, 1360, 1390, 1380, 1387.20],
        borderColor: '#A855F7',
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
        pointRadius: 0,
        pointHoverRadius: 6,
      }] : [])
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1A2436',
        titleColor: '#A0A0A0',
        bodyColor: '#FFF',
        borderColor: '#2A3441',
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        boxPadding: 4,
      }
    },
    scales: {
      x: {
        grid: { display: false, drawBorder: false },
        ticks: { color: '#A0A0A0' }
      },
      y: {
        grid: { color: '#2A3441', drawBorder: false },
        ticks: { color: '#A0A0A0' }
      }
    }
  };

  return (
    <div className="graficos-container">
      <div className="graficos-header">
        <h1>Gráficos</h1>
        <p>Analizá la evolución de cualquier moneda en el tiempo.</p>
      </div>

      <div className="graficos-layout">
        
        {/* Left Sidebar */}
        <div className="graficos-sidebar">
          
          <div className="graficos-section">
            <h3>Moneda principal</h3>
            <div className="graficos-dropdown">
              <div className="gd-left">
                <span className="gd-flag">🇺🇸</span>
                <div className="gd-info">
                  <span className="gd-title">USD/ARS</span>
                  <span className="gd-sub">Dólar Estadounidense / Peso Argentino</span>
                </div>
              </div>
              <span>⌄</span>
            </div>
          </div>

          <div className="graficos-section">
            <h3>Comparar con (opcional)</h3>
            <div className="graficos-dropdown">
              <div className="gd-left">
                <span className="gd-flag">🇪🇺</span>
                <div className="gd-info">
                  <span className="gd-title">EUR/ARS</span>
                  <span className="gd-sub">Euro / Peso Argentino</span>
                </div>
              </div>
              <div className={`toggle-switch ${compare ? 'active' : ''}`} onClick={() => setCompare(!compare)}>
                <div className="toggle-knob"></div>
              </div>
            </div>
          </div>

          <div className="graficos-section">
            <h3>Tipo de gráfico</h3>
            <div className="chart-type-selector">
              <button className="ct-btn active"><i>📈</i>Línea</button>
              <button className="ct-btn"><i>🌊</i>Área</button>
              <button className="ct-btn"><i>🕯</i>Velas</button>
              <button className="ct-btn"><i>📊</i>Barras</button>
            </div>
            <button className="btn-outline">+ Comparar</button>
          </div>

          <div className="graficos-section" style={{marginTop: 'auto'}}>
            <h3>Resumen rápido</h3>
            <div className="graficos-summary-card">
              <div className="gsc-title">USD/ARS</div>
              <div className="gsc-price">1.298,75 <span>ARS</span></div>
              <div className="gsc-change">↗ +12,45 (0,97%)</div>
              <div className="gsc-mini-chart"></div>
            </div>
          </div>

        </div>

        {/* Main Chart Area */}
        <div className="graficos-main">
          
          <div className="chart-header">
            <div className="ch-left">
              <div className="ch-title">
                <div className="pair">USD/ARS <span className="live">Cotización en tiempo real</span></div>
              </div>
              <div style={{display: 'flex', alignItems: 'baseline', marginTop: '8px'}}>
                <span className="ch-price">1.298,75 <span style={{fontSize: '16px', fontWeight: 'normal'}}>ARS</span></span>
                <span style={{color: 'var(--success)', fontWeight: '600'}}>↗ +12,45 (0,97%)</span>
              </div>
              <div className="ch-sub" style={{marginTop: '4px'}}>Dólar Estadounidense / Peso Argentino</div>
            </div>

            <div className="ch-right" style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '16px'}}>
              <div className="time-selector">
                {['24H', '7D', '30D', '6M', '1A', '5A', 'Máx.'].map(p => (
                  <button key={p} className={`ts-btn ${period === p ? 'active' : ''}`} onClick={() => setPeriod(p)}>
                    {p}
                  </button>
                ))}
                <button className="ts-btn" style={{borderLeft: '1px solid var(--border-color)', borderRadius: '0 8px 8px 0'}}>📅</button>
              </div>
              
              <div className="chart-actions">
                <button>📥</button>
                <button>⛶</button>
              </div>
            </div>
          </div>

          <div className="chart-container">
            <Line data={data} options={options} />
          </div>

          <div className="stats-grid">
            <div className="stat-box">
              <span className="stat-label">Apertura</span>
              <span className="stat-val">1.286,30</span>
            </div>
            <div className="stat-box">
              <span className="stat-label">Máximo</span>
              <span className="stat-val up">1.302,40</span>
            </div>
            <div className="stat-box">
              <span className="stat-label">Mínimo</span>
              <span className="stat-val down">1.284,10</span>
            </div>
            <div className="stat-box">
              <span className="stat-label">Cierre anterior</span>
              <span className="stat-val">1.286,30</span>
            </div>
            <div className="stat-box">
              <span className="stat-label">Volatilidad (30D)</span>
              <span className="stat-val">2,35%</span>
            </div>
            <div className="stat-box">
              <span className="stat-label">Rango (30D)</span>
              <span className="stat-val">1.220,50 - 1.305,80</span>
            </div>
          </div>

          <div className="period-stats">
            <div className="ps-item">
              <span className="ps-label">Estadísticas del periodo (30D)</span>
              <span className="ps-label" style={{marginTop: '16px'}}>Variación en el periodo</span>
              <span className="ps-val" style={{color: 'var(--success)'}}>+78,25 ARS (6,43%)</span>
            </div>
            <div className="ps-item">
              <span className="ps-label">Rendimiento promedio diario</span>
              <span className="ps-val" style={{color: 'var(--success)'}}>0,21%</span>
            </div>
            <div className="ps-item">
              <span className="ps-label">Días en alza</span>
              <span className="ps-val" style={{color: 'var(--success)'}}>18 (60%)</span>
            </div>
            <div className="ps-item">
              <span className="ps-label">Días en baja</span>
              <span className="ps-val" style={{color: 'var(--danger)'}}>12 (40%)</span>
            </div>
            <div className="ps-gauge">
              <div className="gauge-circle"><span>60%</span></div>
              <div className="gauge-legend">
                <div className="gl-item up">Al alza</div>
                <div className="gl-item down">A la baja</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
