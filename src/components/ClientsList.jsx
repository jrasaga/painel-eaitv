import React from 'react';

export default function ClientsList({ clients, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="border-b border-gray-300 dark:border-gray-700">
            <th className="px-3 py-2 text-left">MAC</th>
            <th className="px-3 py-2 text-left">Nome</th>
            <th className="px-3 py-2 text-left">Status</th>
            <th className="px-3 py-2 text-left">Validade</th>
            <th className="px-3 py-2 text-left">Observações</th>
            <th className="px-3 py-2 text-left">Ações</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => (
            <tr 
              key={client.id} 
              className="border-b border-gray-200 dark:border-gray-700 last:border-0 
                         even:bg-gray-50 dark:even:bg-gray-800"
            >
              <td className="px-3 py-2">{client.mac}</td>
              <td className="px-3 py-2">{client.name}</td>
              <td className="px-3 py-2">
                <span className={
                  `px-2 py-1 rounded text-xs font-semibold 
                   ${client.status === 'Ativo' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' 
                      : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'}`
                }>
                  {client.status}
                </span>
              </td>
              <td className="px-3 py-2">{client.validity}</td>
              <td className="px-3 py-2">{client.observations}</td>
              <td className="px-3 py-2">
                <button 
                  onClick={() => onEdit(client)} 
                  className="text-blue-600 hover:underline mr-4"
                >
                  Editar
                </button>
                <button 
                  onClick={() => onDelete(client.id)} 
                  className="text-red-600 hover:underline"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {clients.length === 0 && (
        <p className="text-center text-gray-500 mt-4">
          Nenhum cliente cadastrado.
        </p>
      )}
    </div>
  );
}