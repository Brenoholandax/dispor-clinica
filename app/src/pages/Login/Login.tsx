import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import type { Role } from '../../types';
import styles from './Login.module.css';

type Tab = Role;

const TABS: { id: Tab; label: string }[] = [
  { id: 'pais', label: 'Pais / Responsáveis' },
  { id: 'clinica', label: 'Portal Clínica' },
  { id: 'adm', label: 'Administrador' },
];

const REDIRECT: Record<Tab, string> = {
  pais: '/pais',
  clinica: '/clinica',
  adm: '/adm',
};

export function Login() {
  const [tab, setTab] = useState<Tab>('pais');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    login(tab, email.split('@')[0] || 'Usuário');
    navigate(REDIRECT[tab]);
  }

  return (
    <div className={`${styles.page} ${styles[tab]}`}>
      <div className={styles.card}>
        <div className={styles.brand}>
          <i className="fa-solid fa-brain" />
          <span>Clínica TEA</span>
        </div>

        <div className={styles.tabs}>
          {TABS.map(t => (
            <button
              key={t.id}
              className={`${styles.tab} ${tab === t.id ? styles.tabActive : ''}`}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <i className="fa-solid fa-envelope" />
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.field}>
            <i className="fa-solid fa-lock" />
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={`btn ${styles.btnLogin} ${tab === 'adm' ? styles.btnAdm : styles.btnGreen}`}>
            Entrar
          </button>
        </form>

        <a href="/recuperar-senha" className={styles.forgot}>Esqueceu sua senha?</a>
      </div>
    </div>
  );
}
