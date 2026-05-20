import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { clinicas as dadosIniciais } from '../../../data/mock';
import { Modal } from '../../../components/Modal/Modal';
import { Toast } from '../../../components/Toast/Toast';
import { useToast } from '../../../hooks/useToast';
import type { Clinica } from '../../../types';
import styles from './ClinicasList.module.css';

const POR_PAGINA = 5;

export function AdmClinicasList() {
  const [lista, setLista] = useState<Clinica[]>(dadosIniciais);
  const [busca, setBusca] = useState('');
  const [filtroStatus, setFiltroStatus] = useState<'todas' | 'Ativa' | 'Inativa'>('todas');
  const [pagina, setPagina] = useState(1);
  const [modalAberto, setModalAberto] = useState(false);
  const [form, setForm] = useState({ nome: '', cnpj: '', status: 'Ativa' as 'Ativa' | 'Inativa' });
  const { toast, mostrarToast } = useToast();
  const navigate = useNavigate();

  const filtrada = useMemo(() => lista.filter(c => {
    const matchStatus = filtroStatus === 'todas' || c.status === filtroStatus;
    const matchBusca = c.nome.toLowerCase().includes(busca.toLowerCase()) || c.cnpj.includes(busca);
    return matchStatus && matchBusca;
  }), [lista, busca, filtroStatus]);

  const totalPaginas = Math.max(1, Math.ceil(filtrada.length / POR_PAGINA));
  const paginada = filtrada.slice((pagina - 1) * POR_PAGINA, pagina * POR_PAGINA);
  const ativas = lista.filter(c => c.status === 'Ativa').length;
  const inativas = lista.filter(c => c.status === 'Inativa').length;

  function adicionar(e: React.FormEvent) {
    e.preventDefault();
    setLista(l => [...l, { id: Date.now(), ...form }]);
    setForm({ nome: '', cnpj: '', status: 'Ativa' });
    setModalAberto(false);
    mostrarToast('Clínica adicionada com sucesso!', 'azul');
  }

  function excluir(id: number) {
    if (!confirm('Tem certeza que deseja excluir esta clínica?')) return;
    setLista(l => l.filter(c => c.id !== id));
    mostrarToast('Clínica removida.', 'azul');
  }

  return (
    <div>
      <div className="section-header">
        <h1 className={styles.titulo}>Gerenciar Clínicas</h1>
        <button className="btn btn-primary-blue" onClick={() => setModalAberto(true)}>
          <i className="fa-solid fa-plus" /> Nova Clínica
        </button>
      </div>

      <div className={styles.statsGrid}>
        {[
          { label: 'Total de Clínicas', valor: lista.length, icon: 'fa-hospital', tipo: 'total', onClick: () => { setFiltroStatus('todas'); setPagina(1); } },
          { label: 'Clínicas Ativas', valor: ativas, icon: 'fa-circle-check', tipo: 'ativa', onClick: () => { setFiltroStatus('Ativa'); setPagina(1); } },
          { label: 'Clínicas Inativas', valor: inativas, icon: 'fa-circle-xmark', tipo: 'inativa', onClick: () => { setFiltroStatus('Inativa'); setPagina(1); } },
        ].map(s => (
          <div key={s.label} className={`${styles.statCard} ${filtroStatus === (s.tipo === 'total' ? 'todas' : s.tipo === 'ativa' ? 'Ativa' : 'Inativa') ? styles.statActive : ''}`} onClick={s.onClick}>
            <div className={`${styles.statIcon} ${styles[s.tipo]}`}><i className={`fa-solid ${s.icon}`} /></div>
            <div><p className={styles.statLabel}>{s.label}</p><p className={styles.statValue}>{s.valor}</p></div>
          </div>
        ))}
      </div>

      <div className="table-container">
        <div className={styles.tableHeader}>
          <div className={styles.searchBox}>
            <i className="fa-solid fa-magnifying-glass" />
            <input placeholder="Pesquisar clínica ou CNPJ..." value={busca} onChange={e => { setBusca(e.target.value); setPagina(1); }} />
          </div>
        </div>

        <table>
          <thead>
            <tr><th>Nome da Clínica</th><th>CNPJ</th><th>Status</th><th>Ações</th></tr>
          </thead>
          <tbody>
            {paginada.length === 0 ? (
              <tr><td colSpan={4}>
                <div className={styles.emptyState}>
                  <i className="fa-solid fa-magnifying-glass" />
                  <h3>Nenhuma clínica encontrada</h3>
                  <p>Ajuste sua busca ou filtro.</p>
                </div>
              </td></tr>
            ) : paginada.map(c => (
              <tr key={c.id}>
                <td>{c.nome}</td>
                <td>{c.cnpj}</td>
                <td><span className={`badge ${c.status === 'Ativa' ? 'badge-active' : 'badge-inactive'}`}>{c.status}</span></td>
                <td style={{ display: 'flex', gap: '8px' }}>
                  <button className="btn btn-primary-blue btn-sm" onClick={() => navigate(`/adm/gerenciamento/${c.id}`, { state: c })}>Detalhes</button>
                  <button className="btn btn-danger btn-sm" onClick={() => excluir(c.id)}><i className="fa-solid fa-trash" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className={styles.pagination}>
          <button className="btn btn-ghost btn-sm" disabled={pagina === 1} onClick={() => setPagina(p => p - 1)}>
            <i className="fa-solid fa-chevron-left" />
          </button>
          <span>Página {pagina} de {totalPaginas}</span>
          <button className="btn btn-ghost btn-sm" disabled={pagina === totalPaginas} onClick={() => setPagina(p => p + 1)}>
            <i className="fa-solid fa-chevron-right" />
          </button>
        </div>
      </div>

      {modalAberto && (
        <Modal titulo="Adicionar Clínica" onClose={() => setModalAberto(false)}>
          <form onSubmit={adicionar}>
            <div className="form-group"><label>Nome</label><input value={form.nome} onChange={e => setForm(f => ({ ...f, nome: e.target.value }))} placeholder="Ex: Clínica Esperança" required /></div>
            <div className="form-group"><label>CNPJ</label><input value={form.cnpj} onChange={e => setForm(f => ({ ...f, cnpj: e.target.value }))} placeholder="00.000.000/0000-00" required /></div>
            <div className="form-group">
              <label>Status</label>
              <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as 'Ativa' | 'Inativa' }))}>
                <option value="Ativa">Ativa</option>
                <option value="Inativa">Inativa</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary-blue" style={{ width: '100%', marginTop: '8px' }}>Cadastrar Clínica</button>
          </form>
        </Modal>
      )}

      <Toast {...toast} />
    </div>
  );
}
