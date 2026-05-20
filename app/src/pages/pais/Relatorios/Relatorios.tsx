import { useState } from 'react';
import { filhos, relatorios } from '../../../data/mock';
import styles from './Relatorios.module.css';

export function PaisRelatorios() {
  const [filhoId, setFilhoId] = useState('');
  const [data, setData] = useState('');
  const [filtrados, setFiltrados] = useState(relatorios);

  function filtrar() {
    setFiltrados(relatorios.filter(r => {
      const matchFilho = !filhoId || r.filho === filhos.find(f => String(f.id) === filhoId)?.nome;
      const matchData = !data || r.data === data;
      return matchFilho && matchData;
    }));
  }

  return (
    <div>
      <div className="page-header"><h1>Relatórios</h1></div>

      <div className={`card ${styles.filtros}`}>
        <select value={filhoId} onChange={e => setFilhoId(e.target.value)}>
          <option value="">Todos os filhos</option>
          {filhos.map(f => <option key={f.id} value={f.id}>{f.nome}</option>)}
        </select>
        <input type="date" value={data} onChange={e => setData(e.target.value)} />
        <button className="btn btn-primary-green btn-sm" onClick={filtrar}>Filtrar</button>
      </div>

      <div className="table-container" style={{ marginTop: '20px' }}>
        <table>
          <thead><tr><th>Filho</th><th>Data</th><th>Tipo</th><th>Resumo</th></tr></thead>
          <tbody>
            {filtrados.map(r => (
              <tr key={r.id}>
                <td>{r.filho}</td>
                <td>{r.data}</td>
                <td><span className="badge badge-active">{r.tipo}</span></td>
                <td>{r.resumo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
