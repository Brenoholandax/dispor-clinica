import { useState } from 'react';
import { financeiroClinica } from '../../../data/mock';
import styles from './Financeiro.module.css';

type Filtro = 'todos' | 'ativo' | 'pendente';

export function ClinicaFinanceiro() {
  const [filtro, setFiltro] = useState<Filtro>('todos');
  const lista = filtro === 'todos' ? financeiroClinica : financeiroClinica.filter(f => f.status === filtro);

  return (
    <div>
      <div className="page-header"><h1>Gestão Financeira</h1></div>

      <div className={`${styles.stats} cards-grid`} style={{ maxWidth: '500px', marginBottom: '24px' }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <p style={{ color: '#64748b', fontSize: '13px', fontWeight: 600 }}>Total Matriculados</p>
          <p style={{ fontSize: '28px', fontWeight: 800 }}>{financeiroClinica.length}</p>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <p style={{ color: '#64748b', fontSize: '13px', fontWeight: 600 }}>Adimplência</p>
          <p style={{ fontSize: '28px', fontWeight: 800, color: '#53a587' }}>75%</p>
        </div>
      </div>

      <div className={styles.filters}>
        {(['todos', 'ativo', 'pendente'] as Filtro[]).map(f => (
          <button
            key={f}
            className={`btn btn-sm ${filtro === f ? 'btn-primary-green' : 'btn-ghost'}`}
            onClick={() => setFiltro(f)}
          >
            {f === 'todos' ? 'Todos' : f === 'ativo' ? 'Em dia' : 'Pendente'}
          </button>
        ))}
      </div>

      <div className="table-container" style={{ marginTop: '16px' }}>
        <table>
          <thead><tr><th>Paciente</th><th>Plano</th><th>Valor</th><th>Vencimento</th><th>Status</th></tr></thead>
          <tbody>
            {lista.map((f, i) => (
              <tr key={i}>
                <td>{f.paciente}</td>
                <td>{f.plano}</td>
                <td>{f.valor}</td>
                <td>{f.vencimento}</td>
                <td><span className={`badge ${f.status === 'ativo' ? 'badge-active' : 'badge-pending'}`}>{f.status === 'ativo' ? 'Em dia' : 'Pendente'}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
