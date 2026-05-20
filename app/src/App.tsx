import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

import { Login } from './pages/Login/Login';

import { PaisLayout } from './layouts/PaisLayout';
import { PaisDashboard } from './pages/pais/Dashboard/Dashboard';
import { PaisRelatorios } from './pages/pais/Relatorios/Relatorios';
import { PaisInscricao } from './pages/pais/Inscricao/Inscricao';
import { PaisPagamentos } from './pages/pais/Pagamentos/Pagamentos';
import { PaisSuporte } from './pages/pais/Suporte/Suporte';

import { ClinicaLayout } from './layouts/ClinicaLayout';
import { ClinicaHome } from './pages/clinica/Home/Home';
import { ClinicaAgenda } from './pages/clinica/Agenda/Agenda';
import { ClinicaPacientes } from './pages/clinica/Pacientes/Pacientes';
import { ClinicaProfissionais } from './pages/clinica/Profissionais/Profissionais';
import { ClinicaFinanceiro } from './pages/clinica/Financeiro/Financeiro';
import { ClinicaEvolucao } from './pages/clinica/Evolucao/Evolucao';

import { AdmLayout } from './layouts/AdmLayout';
import { AdmClinicasList } from './pages/adm/ClinicasList/ClinicasList';
import { AdmGerenciamento } from './pages/adm/Gerenciamento/Gerenciamento';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route path="/pais" element={<PaisLayout />}>
            <Route index element={<PaisDashboard />} />
            <Route path="relatorios" element={<PaisRelatorios />} />
            <Route path="inscricao" element={<PaisInscricao />} />
            <Route path="pagamentos" element={<PaisPagamentos />} />
            <Route path="suporte" element={<PaisSuporte />} />
          </Route>

          <Route path="/clinica" element={<ClinicaLayout />}>
            <Route index element={<ClinicaHome />} />
            <Route path="agenda" element={<ClinicaAgenda />} />
            <Route path="pacientes" element={<ClinicaPacientes />} />
            <Route path="profissionais" element={<ClinicaProfissionais />} />
            <Route path="financeiro" element={<ClinicaFinanceiro />} />
            <Route path="evolucao" element={<ClinicaEvolucao />} />
          </Route>

          <Route path="/adm" element={<AdmLayout />}>
            <Route index element={<AdmClinicasList />} />
            <Route path="gerenciamento/:id" element={<AdmGerenciamento />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
