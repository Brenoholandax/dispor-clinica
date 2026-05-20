import { useState } from 'react';
import { disciplinas } from '../../../data/mock';
import { Modal } from '../../../components/Modal/Modal';
import { Toast } from '../../../components/Toast/Toast';
import { useToast } from '../../../hooks/useToast';
import styles from './Inscricao.module.css';

export function PaisInscricao() {
  const [selecionada, setSelecionada] = useState<number | null>(null);
  const { toast, mostrarToast } = useToast();
  const disciplina = disciplinas.find(d => d.id === selecionada);

  function inscrever() {
    setSelecionada(null);
    mostrarToast('Inscrição realizada com sucesso!');
  }

  return (
    <div>
      <div className="page-header">
        <h1>Inscrição em Disciplinas</h1>
        <p>Selecione uma disciplina para inscrever seu filho</p>
      </div>

      <div className={styles.grid}>
        {disciplinas.map(d => (
          <div key={d.id} className={styles.card} onClick={() => setSelecionada(d.id)}>
            <div className={styles.icon}><i className="fa-solid fa-puzzle-piece" /></div>
            <h3>{d.nome}</h3>
            <p>{d.descricao}</p>
            <p className={styles.prof}><i className="fa-solid fa-user-doctor" /> {d.profissional}</p>
            <button className="btn btn-primary-green btn-sm">Ver Detalhes</button>
          </div>
        ))}
      </div>

      {selecionada && disciplina && (
        <Modal titulo={disciplina.nome} onClose={() => setSelecionada(null)}>
          <p style={{ marginBottom: '12px', color: '#64748b' }}>{disciplina.descricao}</p>
          <p style={{ marginBottom: '24px' }}><strong>Profissional:</strong> {disciplina.profissional}</p>
          <div className="form-group">
            <label>Filho</label>
            <select><option>João</option><option>Maria</option></select>
          </div>
          <button className="btn btn-primary-green" style={{ width: '100%', marginTop: '8px' }} onClick={inscrever}>
            Confirmar Inscrição
          </button>
        </Modal>
      )}

      <Toast {...toast} />
    </div>
  );
}
