import { useState } from 'react';
import { pacientes } from '../../../data/mock';
import { Toast } from '../../../components/Toast/Toast';
import { useToast } from '../../../hooks/useToast';
import styles from './Evolucao.module.css';

export function ClinicaEvolucao() {
  const [especialidade, setEspecialidade] = useState<string | null>(null);
  const { toast, mostrarToast } = useToast();

  function finalizar(e: React.FormEvent) {
    e.preventDefault();
    setEspecialidade(null);
    mostrarToast('Sessão registrada com sucesso!');
  }

  if (especialidade) {
    return (
      <div>
        <div className={styles.formHeader}>
          <button className="btn btn-ghost btn-sm" onClick={() => setEspecialidade(null)}>
            <i className="fa-solid fa-arrow-left" /> Voltar
          </button>
          <h1>{especialidade}</h1>
        </div>

        <div className={`card ${styles.formCard}`}>
          <form onSubmit={finalizar} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
              <div className="form-group">
                <label>Paciente</label>
                <select required>
                  {pacientes.map(p => <option key={p.id}>{p.nome}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Data / Hora</label>
                <input type="datetime-local" defaultValue={new Date().toISOString().slice(0,16)} />
              </div>
            </div>
            <div className="form-group">
              <label>Nível de Engajamento (1–5)</label>
              <input type="range" min={1} max={5} defaultValue={3} style={{ width: '100%', accentColor: '#53a587' }} />
            </div>
            <div className="form-group">
              <label>Antecedentes / Observações</label>
              <textarea placeholder="Descreva os comportamentos observados..." required />
            </div>
            <div className="form-group">
              <label>Atividades Realizadas</label>
              <textarea placeholder="Descreva as atividades da sessão..." rows={4} required />
            </div>
            <button type="submit" className="btn btn-primary-green" style={{ alignSelf: 'flex-end', minWidth: '200px' }}>
              <i className="fa-solid fa-check" /> Finalizar Registro
            </button>
          </form>
        </div>
        <Toast {...toast} />
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h1>Registrar Evolução</h1>
        <p>Selecione a especialidade para iniciar o registro</p>
      </div>

      <div className={styles.grid}>
        {[
          { nome: 'Relatório ABA', icon: 'fa-puzzle-piece', desc: 'Análise do Comportamento Aplicada e planos de ensino.' },
          { nome: 'Fonoaudiologia', icon: 'fa-comment-dots', desc: 'Comunicação verbal, não-verbal e motricidade orofacial.' },
          { nome: 'Terapia Ocupacional', icon: 'fa-hand-holding-heart', desc: 'Integração sensorial e atividades de vida diária.' },
          { nome: 'Psicopedagogia', icon: 'fa-graduation-cap', desc: 'Dificuldades de aprendizagem e processos cognitivos.' },
        ].map(d => (
          <div key={d.nome} className={styles.card} onClick={() => setEspecialidade(d.nome)}>
            <div className={styles.icon}><i className={`fa-solid ${d.icon}`} /></div>
            <h3>{d.nome}</h3>
            <p>{d.desc}</p>
            <button className="btn btn-primary-green btn-sm">Iniciar Registro</button>
          </div>
        ))}
      </div>
    </div>
  );
}
