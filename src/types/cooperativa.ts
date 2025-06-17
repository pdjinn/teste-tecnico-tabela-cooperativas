// Definição dos tipos com base na estrutura da API
export interface CoopSystem {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string | null;
  updatedBy: string | null;
}

export interface Cooperativa {
  id: string;
  name: string;
  CNPJ: string;
  state: string;
  coopSystem: CoopSystem;
}

export type SortDirection = 'asc' | 'desc' | null;

export interface SortConfig {
  key: keyof Cooperativa | 'coopSystem.name';
  direction: SortDirection;
}