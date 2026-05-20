import { useState } from 'react';
import { pacientes } from '../../../data/mock';
import { Modal } from '../../../components/Modal/Modal';
import type { Paciente } from '../../../types';

export function ClinicaPacientes() {
  const [selecionado, setSelecionado] = useState<Paciente | null>(null);

  return (
    <div>
      <div className="section-header">
        <div className="page-header" style={{ margin: 0 }}><h1>Gestão de Pacientes</h1></div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr><th>Paciente</th><th>Próxima Sessão</th><th>Disciplinas</th><th>Financeiro</th><th>Responsável</th><th>Ações</th></tr>
          </thead>
          <tbody>
            {pacientes.map(p => (
              <tr key={p.id}>
                <td>{p.nome}</td>
                <td>{p.proximaSessao}</td>
                <td>{p.disciplinas}</td>
                <td><span className={`badge ${p.financeiro === 'Em dia' ? 'badge-active' : 'badge-pending'}`}>{p.financeiro}</span></td>
                <td>{p.responsavel}</td>
                <td>
                  <button className="btn btn-primary-green btn-sm" onClick={() => setSelecionado(p)}>
                    Ver 360°
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selecionado && (
        <Modal titulo={`Painel 360° — ${selecionado.nome}`} onClose={() => setSelecionado(null)} maxWidth={700}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {[
              ['Próxima Sessão', selecionado.proximaSessao],
              ['Disciplinas', selecionado.disciplinas],
              ['Financeiro', selecionado.financeiro],
              ['Responsável', selecionado.responsavel],
            ].map(([k, v]) => (
              <div key={k} style={{ padding: '14px', background: '#f8fafc', borderRadius: '10px' }}>
                <p style={{ fontSize: '12px', color: '#64748b', fontWeight: 600, marginBottom: '4px' }}>{k}</p>
                <p style={{ fontWeight: 700 }}>{v}</p>
              </div>
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
}
