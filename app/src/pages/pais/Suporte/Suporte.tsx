import { useState } from 'react';
import { Toast } from '../../../components/Toast/Toast';
import { useToast } from '../../../hooks/useToast';
import styles from './Suporte.module.css';

export function PaisSuporte() {
  const [form, setForm] = useState({ assunto: '', mensagem: '' });
  const { toast, mostrarToast } = useToast();

  function enviar(e: React.FormEvent) {
    e.preventDefault();
    setForm({ assunto: '', mensagem: '' });
    mostrarToast('Mensagem enviada com sucesso!');
  }

  return (
    <div>
      <div className="page-header">
        <h1>Suporte</h1>
        <p>Fale com nossa equipe</p>
      </div>

      <div className={`card ${styles.formCard}`}>
        <form onSubmit={enviar}>
          <div className="form-group">
            <label>Assunto</label>
            <input value={form.assunto} onChange={e => setForm(f => ({ ...f, assunto: e.target.value }))} placeholder="Descreva o assunto" required />
          </div>
          <div className="form-group">
            <label>Mensagem</label>
            <textarea value={form.mensagem} onChange={e => setForm(f => ({ ...f, mensagem: e.target.value }))} placeholder="Escreva sua mensagem..." required />
          </div>
          <button type="submit" className="btn btn-primary-green">
            <i className="fa-solid fa-paper-plane" /> Enviar
          </button>
        </form>
      </div>

      <Toast {...toast} />
    </div>
  );
}
