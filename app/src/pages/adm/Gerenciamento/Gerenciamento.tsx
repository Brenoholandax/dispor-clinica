import { useNavigate, useLocation } from 'react-router-dom';
import { boletos } from '../../../data/mock';
import type { Clinica } from '../../../types';
import styles from './Gerenciamento.module.css';

export function AdmGerenciamento() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const clinica = (state as Clinica) ?? { id: 0, nome: 'Clínica', cnpj: '--', status: 'Ativa' };

  return (
    <div>
      <div className={styles.header}>
        <button className="btn btn-ghost btn-sm" onClick={() => navigate('/adm')}>
          <i className="fa-solid fa-arrow-left" /> Voltar
        </button>
        <div>
          <h1 className={styles.titulo}>{clinica.nome}</h1>
          <p style={{ color: '#64748b', fontSize: '14px' }}>CNPJ: {clinica.cnpj}</p>
        </div>
        <span className={`badge ${clinica.status === 'Ativa' ? 'badge-active' : 'badge-inactive'}`}>{clinica.status}</span>
      </div>

      <div className="cards-grid" style={{ maxWidth: '500px', marginBottom: '28px' }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <p style={{ color: '#64748b', fontSize: '13px', fontWeight: 600 }}>Acessos</p>
          <p style={{ fontSize: '30px', fontWeight: 800, color: '#1e40af' }}>128</p>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <p style={{ color: '#64748b', fontSize: '13px', fontWeight: 600 }}>Alunos</p>
          <p style={{ fontSize: '30px', fontWeight: 800, color: '#53a587' }}>42</p>
        </div>
      </div>

      <div className={styles.proximaCobranca}>
        <i className="fa-solid fa-calendar-days" />
        <div>
          <p className={styles.cobrancaLabel}>Próxima Cobrança</p>
          <p className={styles.cobrancaData}>10/06/2026 — R$ 250,00</p>
        </div>
      </div>

      <div className="table-container" style={{ marginTop: '24px' }}>
        <h2 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 700 }}>Histórico de Boletos</h2>
        <table>
          <thead><tr><th>Mês</th><th>Vencimento</th><th>Valor</th><th>Status</th></tr></thead>
          <tbody>
            {boletos.map((b, i) => (
              <tr key={i}>
                <td>{b.mes}</td>
                <td>{b.vencimento}</td>
                <td>{b.valor}</td>
                <td><span className={`badge ${b.status === 'Pago' ? 'badge-active' : 'badge-pending'}`}>{b.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
