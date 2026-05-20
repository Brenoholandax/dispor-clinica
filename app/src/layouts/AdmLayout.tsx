import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Sidebar } from '../components/Sidebar/Sidebar';

const NAV = [
  { icon: 'fa-solid fa-hospital', label: 'Clínicas', path: '/adm' },
];

export function AdmLayout() {
  const { user } = useAuth();
  if (!user || user.role !== 'adm') return <Navigate to="/" replace />;

  return (
    <div className="container">
      <Sidebar items={NAV} titulo="Painel ADM" tema="azul" />
      <main id="content"><Outlet /></main>
    </div>
  );
}
