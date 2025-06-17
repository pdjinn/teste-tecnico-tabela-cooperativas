// src/lib/api.ts
import { Cooperativa } from '@/types/cooperativa';

export async function fetchCooperativas(): Promise<Cooperativa[]> {
  try {
    const response = await fetch(
      'https://subscribe-api-production.up.railway.app/api/v1/coops'
    );
    
    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status} - ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar cooperativas:', error);
    throw error;
  }
}