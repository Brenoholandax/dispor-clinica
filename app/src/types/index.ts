export type Role = 'pais' | 'clinica' | 'adm';

export interface User {
  nome: string;
  email: string;
  role: Role;
}

export interface Filho {
  id: number;
  nome: string;
}

export interface Relatorio {
  id: number;
  filho: string;
  data: string;
  tipo: string;
  resumo: string;
}

export interface Pagamento {
  id: number;
  descricao: string;
  valor: string;
  vencimento: string;
  status: 'Pago' | 'Pendente';
}

export interface Disciplina {
  id: number;
  nome: string;
  descricao: string;
  profissional: string;
  especialidade: string;
}

export interface Paciente {
  id: number;
  nome: string;
  proximaSessao: string;
  disciplinas: string;
  financeiro: 'Em dia' | 'Pendente';
  responsavel: string;
}

export interface Profissional {
  id: number;
  nome: string;
  especialidade: 'ABA' | 'Fono' | 'T.O' | 'Psicopedagogia';
  carga: string;
  pacientesAtivos: number;
}

export interface ItemFinanceiro {
  paciente: string;
  plano: string;
  valor: string;
  vencimento: string;
  status: 'ativo' | 'pendente';
}

export interface Clinica {
  id: number;
  nome: string;
  cnpj: string;
  status: 'Ativa' | 'Inativa';
}

export interface Boleto {
  mes: string;
  vencimento: string;
  valor: string;
  status: 'Pago' | 'Não Pago';
}
