import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Sidebar } from '../components/Sidebar/Sidebar';

const NAV = [
  { icon: 'fa-solid fa-house', label: 'Dashboard', path: '/pais' },
  { icon: 'fa-solid fa-file-lines', label: 'Relatórios', path: '/pais/relatorios' },
  { icon: 'fa-solid fa-graduation-cap', label: 'Inscrição', path: '/pais/inscricao' },
  { icon: 'fa-solid fa-credit-card', label: 'Pagamentos', path: '/pais/pagamentos' },
  { icon: 'fa-solid fa-headset', label: 'Suporte', path: '/pais/suporte' },
];

export function PaisLayout() {
  const { user } = useAuth();
  if (!user || user.role !== 'pais') return <Navigate to="/" replace />;

  return (
    <div className="container">
      <Sidebar items={NAV} titulo="Portal Pais" tema="verde" />
      <main id="content"><Outlet /></main>
    </div>
  );
}
