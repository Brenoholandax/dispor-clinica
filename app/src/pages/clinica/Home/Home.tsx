import { pacientes, profissionais } from '../../../data/mock';
import styles from './Home.module.css';

export function ClinicaHome() {
  const hoje = new Date().toLocaleDateString('pt-BR');
  return (
    <div>
      <div className="page-header">
        <h1>Dashboard Administrativo</h1>
        <p>{hoje}</p>
      </div>

      <div className="cards-grid">
        {[
          { label: 'Pacientes Ativos', valor: pacientes.length, icon: 'fa-users', cor: '#53a587' },
          { label: 'Sessões Hoje', valor: 3, icon: 'fa-calendar-check', cor: '#1e40af' },
          { label: 'Profissionais', valor: profissionais.length, icon: 'fa-user-doctor', cor: '#7c3aed' },
        ].map(c => (
          <div className="card" key={c.label} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div className={styles.icon} style={{ background: `${c.cor}18`, color: c.cor }}>
              <i className={`fa-solid ${c.icon}`} />
            </div>
            <div>
              <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', fontWeight: 600 }}>{c.label}</p>
              <p style={{ fontSize: '26px', fontWeight: 800 }}>{c.valor}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="table-container">
        <h2 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 700 }}>Próximas Sessões</h2>
        <table>
          <thead><tr><th>Paciente</th><th>Profissional</th><th>Especialidade</th><th>Horário</th></tr></thead>
          <tbody>
            {pacientes.slice(0, 3).map((p, i) => (
              <tr key={p.id}>
                <td>{p.nome}</td>
                <td>{profissionais[i % profissionais.length].nome}</td>
                <td>{p.disciplinas.split(',')[0].trim()}</td>
                <td>{p.proximaSessao.split(' ')[1]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
