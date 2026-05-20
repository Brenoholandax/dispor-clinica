import { useState } from 'react';
import { profissionais } from '../../../data/mock';
import styles from './Profissionais.module.css';

type Filtro = 'todos' | 'ABA' | 'Fono' | 'T.O' | 'Psicopedagogia';

export function ClinicaProfissionais() {
  const [filtro, setFiltro] = useState<Filtro>('todos');

  const lista = filtro === 'todos' ? profissionais : profissionais.filter(p => p.especialidade === filtro);

  return (
    <div>
      <div className="section-header">
        <div className="page-header" style={{ margin: 0 }}><h1>Profissionais</h1></div>
        <select
          className={styles.select}
          value={filtro}
          onChange={e => setFiltro(e.target.value as Filtro)}
        >
          {(['todos', 'ABA', 'Fono', 'T.O', 'Psicopedagogia'] as Filtro[]).map(f => (
            <option key={f} value={f}>{f === 'todos' ? 'Todas Especialidades' : f}</option>
          ))}
        </select>
      </div>

      <div className={styles.grid}>
        {lista.map(p => (
          <div key={p.id} className={styles.card}>
            <div className={styles.avatar}><i className="fa-solid fa-user-doctor" /></div>
            <h3>{p.nome}</h3>
            <span className="badge badge-active">{p.especialidade}</span>
            <p className={styles.info}>{p.carga} semanais · <strong>{p.pacientesAtivos}</strong> pacientes</p>
          </div>
        ))}
      </div>
    </div>
  );
}
