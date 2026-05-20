import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Sidebar.module.css';

interface NavItem {
  icon: string;
  label: string;
  path: string;
}

interface Props {
  items: NavItem[];
  titulo: string;
  tema: 'verde' | 'azul';
}

export function Sidebar({ items, titulo, tema }: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <aside className={`${styles.sidebar} ${styles[tema]} ${collapsed ? styles.collapsed : ''}`}>
      <div className={styles.menuTitle}>
        <button onClick={() => setCollapsed(c => !c)}>
          <i className="fa-solid fa-bars" />
        </button>
        {!collapsed && <h3>{titulo}</h3>}
      </div>

      <ul>
        {items.map(item => (
          <li
            key={item.path}
            className={location.pathname === item.path ? styles.active : ''}
            onClick={() => navigate(item.path)}
          >
            <i className={item.icon} />
            {!collapsed && <span>{item.label}</span>}
          </li>
        ))}
        <li onClick={handleLogout}>
          <i className="fa-solid fa-right-from-bracket" />
          {!collapsed && <span>Sair</span>}
        </li>
      </ul>

      {!collapsed && (
        <div className={styles.userInfo}>
          <i className="fa-solid fa-circle-user" />
          <span>{user?.nome ?? 'Usuário'}</span>
        </div>
      )}
    </aside>
  );
}
