import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCNPJ(cnpj: string): string {
  // Remove caracteres não numéricos
  const numbers = cnpj.replace(/\D/g, '');
  
  // Aplica o formato do CNPJ solicitado no teste
  return numbers.replace(
    /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
    '$1.$2.$3/$4-$5'
  );
}