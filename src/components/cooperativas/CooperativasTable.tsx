// src/components/cooperativas/CooperativasTable.tsx
'use client';

import { useState, useEffect, useMemo } from 'react';
import { Cooperativa, SortConfig } from '@/types/cooperativa';
import { fetchCooperativas } from '@/lib/api';
import { formatCNPJ } from '@/lib/utils';
import { LoadingSpinner } from './LoadingSpinner';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';

export function CooperativasTable() {
  const [cooperativas, setCooperativas] = useState<Cooperativa[]>([]);
  const [originalData, setOriginalData] = useState<Cooperativa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'name', direction: null });
  const [currentPage, setCurrentPage] = useState(1);
  
  const itemsPerPage = 10;

  // Carregar dados da API
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchCooperativas();
        setCooperativas(data);
        setOriginalData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar dados');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Função de ordenação
  const handleSort = (key: keyof Cooperativa | 'coopSystem.name') => {
    let direction: 'asc' | 'desc' | null = 'asc';
    
    if (sortConfig.key === key) {
      if (sortConfig.direction === 'asc') {
        direction = 'desc';
      } else if (sortConfig.direction === 'desc') {
        direction = null;
      }
    }
    
    setSortConfig({ key, direction });
    setCurrentPage(1); // Volta para primeira página
  };

  // Dados ordenados
  const sortedData = useMemo(() => {
    if (!sortConfig.direction) {
      return originalData;
    }

    const sorted = [...cooperativas].sort((a, b) => {
      let aValue: string;
      let bValue: string;

      if (sortConfig.key === 'coopSystem.name') {
        aValue = a.coopSystem.name;
        bValue = b.coopSystem.name;
      } else {
        aValue = a[sortConfig.key as keyof Cooperativa] as string;
        bValue = b[sortConfig.key as keyof Cooperativa] as string;
      }

      if (sortConfig.direction === 'asc') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });

    return sorted;
  }, [cooperativas, originalData, sortConfig]);

  // Dados paginados
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, currentPage, itemsPerPage]);

  // Informações da paginação
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, sortedData.length);

  // Ícone de ordenação
  const getSortIcon = (key: keyof Cooperativa | 'coopSystem.name') => {
    if (sortConfig.key !== key) {
      return <ChevronsUpDown className="w-4 h-4" />;
    }
    
    if (sortConfig.direction === 'asc') {
      return <ChevronUp className="w-4 h-4" />;
    } else if (sortConfig.direction === 'desc') {
      return <ChevronDown className="w-4 h-4" />;
    } else {
      return <ChevronsUpDown className="w-4 h-4" />;
    }
  };

  if (loading) return <LoadingSpinner />;
  
  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 mb-4">Erro: {error}</p>
        <Button onClick={() => window.location.reload()}>
          Tentar Novamente
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-1"
                >
                  <span>Nome</span>
                  {getSortIcon('name')}
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort('CNPJ')}
                  className="flex items-center space-x-1"
                >
                  <span>CNPJ</span>
                  {getSortIcon('CNPJ')}
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort('state')}
                  className="flex items-center space-x-1"
                >
                  <span>Estado</span>
                  {getSortIcon('state')}
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort('coopSystem.name')}
                  className="flex items-center space-x-1"
                >
                  <span>Sistema Cooperativo</span>
                  {getSortIcon('coopSystem.name')}
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((cooperativa) => (
              <TableRow key={cooperativa.id}>
                <TableCell className="font-medium">{cooperativa.name}</TableCell>
                <TableCell>{formatCNPJ(cooperativa.CNPJ)}</TableCell>
                <TableCell>{cooperativa.state}</TableCell>
                <TableCell>{cooperativa.coopSystem.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Paginação */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Mostrando {startItem} a {endItem} de {sortedData.length} resultados
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Anterior
          </Button>
          <span className="text-sm">
            Página {currentPage} de {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Próxima
          </Button>
        </div>
      </div>
    </div>
  );
}
