// src/app/page.tsx
import { CooperativasTable } from '@/components/cooperativas/CooperativasTable';

export default function Home() {
  return (
    <main className="container mx-auto py-8 px-4">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">
            Sistema de Cooperativas - Teste Frontend Fenasbac
          </h1>
          <p className="text-gray-600">
            Tabela responsiva, ordenada e com paginação.
          </p>
        </div>

        {/* Tabela */}
        <CooperativasTable />
      </div>
    </main>
  );
}
