import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Sidebar } from '../components/Sidebar/Sidebar';

const NAV = [
  { icon: 'fa-solid fa-house', label: 'Dashboard', path: '/clinica' },
  { icon: 'fa-solid fa-calendar-days', label: 'Cronograma', path: '/clinica/agenda' },
  { icon: 'fa-solid fa-users', label: 'Pacientes', path: '/clinica/pacientes' },
  { icon: 'fa-solid fa-user-doctor', label: 'Profissionais', path: '/clinica/profissionais' },
  { icon: 'fa-solid fa-dollar-sign', label: 'Financeiro', path: '/clinica/financeiro' },
  { icon: 'fa-solid fa-file-medical', label: 'Reg. Evolução', path: '/clinica/evolucao' },
];

export function ClinicaLayout() {
  const { user } = useAuth();
  if (!user || user.role !== 'clinica') return <Navigate to="/" replace />;

  return (
    <div className="container">
      <Sidebar items={NAV} titulo="Portal Clínica" tema="verde" />
      <main id="content"><Outlet /></main>
    </div>
  );
}
