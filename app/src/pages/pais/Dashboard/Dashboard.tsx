import { Line, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend, Filler } from 'chart.js';
import styles from './Dashboard.module.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend, Filler);

const lineData = {
  labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
  datasets: [{
    label: 'Sessões',
    data: [8, 10, 9, 12, 11, 14],
    borderColor: '#53a587',
    backgroundColor: 'rgba(83,165,135,0.1)',
    fill: true,
    tension: 0.4,
  }],
};

const doughnutData = {
  labels: ['ABA', 'Fonoaudiologia', 'T.O', 'Psicopedagogia'],
  datasets: [{
    data: [40, 25, 20, 15],
    backgroundColor: ['#53a587', '#1e40af', '#ffa726', '#7c3aed'],
    borderWidth: 0,
  }],
};

const chartOptions = { responsive: true, plugins: { legend: { position: 'bottom' as const } } };

export function PaisDashboard() {
  return (
    <div>
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Acompanhe a evolução do seu filho</p>
      </div>

      <div className="cards-grid">
        {[
          { label: 'Total de Sessões', valor: '47', icon: 'fa-calendar-check', cor: '#53a587' },
          { label: 'Última Sessão', valor: '15/05/2026', icon: 'fa-clock', cor: '#1e40af' },
          { label: 'Progresso Geral', valor: '82%', icon: 'fa-chart-line', cor: '#7c3aed' },
        ].map(c => (
          <div className="card" key={c.label} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div className={styles.cardIcon} style={{ background: `${c.cor}18`, color: c.cor }}>
              <i className={`fa-solid ${c.icon}`} />
            </div>
            <div>
              <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', fontWeight: 600 }}>{c.label}</p>
              <p style={{ fontSize: '22px', fontWeight: 800 }}>{c.valor}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.chartsGrid}>
        <div className="card">
          <h2 className={styles.chartTitle}>Evolução de Atendimentos</h2>
          <Line data={lineData} options={chartOptions} />
        </div>
        <div className="card">
          <h2 className={styles.chartTitle}>Distribuição por Terapia</h2>
          <Doughnut data={doughnutData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}
