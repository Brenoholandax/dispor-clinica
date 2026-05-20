import type { Filho, Relatorio, Pagamento, Disciplina, Paciente, Profissional, ItemFinanceiro, Clinica, Boleto } from '../types';

export const filhos: Filho[] = [
  { id: 1, nome: 'João' },
  { id: 2, nome: 'Maria' },
];

export const relatorios: Relatorio[] = [
  { id: 1, filho: 'João', data: '2026-05-10', tipo: 'ABA', resumo: 'Boa evolução na comunicação verbal.' },
  { id: 2, filho: 'Maria', data: '2026-05-12', tipo: 'Fonoaudiologia', resumo: 'Progresso em motricidade orofacial.' },
  { id: 3, filho: 'João', data: '2026-05-15', tipo: 'T.O', resumo: 'Integração sensorial melhorada.' },
];

export const pagamentos: Pagamento[] = [
  { id: 1, descricao: 'Sessão ABA — Maio', valor: 'R$ 400,00', vencimento: '05/05/2026', status: 'Pago' },
  { id: 2, descricao: 'Fonoaudiologia — Maio', valor: 'R$ 300,00', vencimento: '10/05/2026', status: 'Pago' },
  { id: 3, descricao: 'T.O — Junho', valor: 'R$ 350,00', vencimento: '05/06/2026', status: 'Pendente' },
];

export const disciplinas: Disciplina[] = [
  { id: 1, nome: 'ABA', descricao: 'Análise do Comportamento Aplicada.', profissional: 'Dra. Camila Sousa', especialidade: 'ABA' },
  { id: 2, nome: 'Fonoaudiologia', descricao: 'Comunicação verbal e não-verbal.', profissional: 'Dra. Fernanda Reis', especialidade: 'Fono' },
  { id: 3, nome: 'Terapia Ocupacional', descricao: 'Integração sensorial e AVD.', profissional: 'Dr. Lucas Mendes', especialidade: 'T.O' },
  { id: 4, nome: 'Psicopedagogia', descricao: 'Processos cognitivos e aprendizagem.', profissional: 'Dra. Patricia Alves', especialidade: 'Psicopedagogia' },
];

export const pacientes: Paciente[] = [
  { id: 1, nome: 'João Silva', proximaSessao: '20/05/2026 14:00', disciplinas: 'ABA, Fono', financeiro: 'Em dia', responsavel: 'Maria Silva' },
  { id: 2, nome: 'Ana Costa', proximaSessao: '20/05/2026 15:30', disciplinas: 'T.O', financeiro: 'Pendente', responsavel: 'Carlos Costa' },
  { id: 3, nome: 'Pedro Santos', proximaSessao: '21/05/2026 09:00', disciplinas: 'ABA', financeiro: 'Em dia', responsavel: 'Lucia Santos' },
  { id: 4, nome: 'Beatriz Lima', proximaSessao: '21/05/2026 11:00', disciplinas: 'Fono, T.O', financeiro: 'Em dia', responsavel: 'Roberto Lima' },
];

export const profissionais: Profissional[] = [
  { id: 1, nome: 'Dra. Camila Sousa', especialidade: 'ABA', carga: '40h', pacientesAtivos: 12 },
  { id: 2, nome: 'Dra. Fernanda Reis', especialidade: 'Fono', carga: '30h', pacientesAtivos: 8 },
  { id: 3, nome: 'Dr. Lucas Mendes', especialidade: 'T.O', carga: '36h', pacientesAtivos: 10 },
  { id: 4, nome: 'Dra. Patricia Alves', especialidade: 'ABA', carga: '40h', pacientesAtivos: 14 },
];

export const financeiroClinica: ItemFinanceiro[] = [
  { paciente: 'João Silva', plano: 'Básico', valor: 'R$ 1.200,00', vencimento: '05/06/2026', status: 'ativo' },
  { paciente: 'Ana Costa', plano: 'Plus', valor: 'R$ 1.800,00', vencimento: '10/06/2026', status: 'pendente' },
  { paciente: 'Pedro Santos', plano: 'Básico', valor: 'R$ 1.200,00', vencimento: '15/06/2026', status: 'ativo' },
  { paciente: 'Beatriz Lima', plano: 'Plus', valor: 'R$ 1.800,00', vencimento: '20/06/2026', status: 'ativo' },
];

export const clinicas: Clinica[] = [
  { id: 1, nome: 'Clínica TEA', cnpj: '12.345.678/0001-90', status: 'Ativa' },
  { id: 2, nome: 'Centro de Apoio Azul', cnpj: '98.765.432/0001-10', status: 'Ativa' },
  { id: 3, nome: 'Espaço Estimular', cnpj: '45.678.901/0001-22', status: 'Inativa' },
  { id: 4, nome: 'Jhon TEA', cnpj: '47.878.211/0001-22', status: 'Ativa' },
  { id: 5, nome: 'Breno TEA', cnpj: '90.753.981/0001-42', status: 'Ativa' },
  { id: 6, nome: 'Huoc TEA', cnpj: '24.123.874/0001-66', status: 'Inativa' },
  { id: 7, nome: 'Central Azul', cnpj: '23.834.965/0001-99', status: 'Inativa' },
];

export const boletos: Boleto[] = [
  { mes: 'Janeiro/2026', vencimento: '10/01/2026', valor: 'R$ 250,00', status: 'Pago' },
  { mes: 'Fevereiro/2026', vencimento: '10/02/2026', valor: 'R$ 250,00', status: 'Pago' },
  { mes: 'Março/2026', vencimento: '10/03/2026', valor: 'R$ 250,00', status: 'Pago' },
  { mes: 'Abril/2026', vencimento: '10/04/2026', valor: 'R$ 250,00', status: 'Não Pago' },
  { mes: 'Maio/2026', vencimento: '10/05/2026', valor: 'R$ 250,00', status: 'Não Pago' },
];
