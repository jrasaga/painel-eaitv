import React, { useEffect, useState } from 'react';

export default function ClientFormModal({ client, onClose, onSave }) {
  // Estados do formulário
  const [mac, setMac] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState('Ativo');
  const [validity, setValidity] = useState('');
  const [observations, setObservations] = useState('');

  // Preenche os campos caso esteja editando um cliente existente, 
  // ou limpa para novo cliente
  useEffect(() => {
    if (client) {
      setMac(client.mac || '');
      setName(client.name || '');
      setStatus(client.status || 'Ativo');
      setValidity(client.validity || '');
      setObservations(client.observations || '');
    } else {
      setMac('');
      setName('');
      setStatus('Ativo');
      setValidity('');
      setObservations('');
    }
  }, [client]);

  // Envia os dados do formulário ao salvar
  const handleSubmit = (e) => {
    e.preventDefault();
    const clientData = { mac, name, status, validity, observations };
    onSave(clientData);
  };

  return (
    // Fundo semitransparente cobrindo a tela toda
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {/* Conteúdo do modal */}
      <div className="bg-white dark:bg-gray-800 w-full max-w-md mx-4 p-6 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">
          {client ? 'Editar Cliente' : 'Novo Cliente'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">MAC</label>
            <input 
              type="text" 
              value={mac} 
              onChange={e => setMac(e.target.value)} 
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 
                         bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100" 
              required 
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Nome</label>
            <input 
              type="text" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 
                         bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100" 
              required 
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Status</label>
            <select 
              value={status} 
              onChange={e => setStatus(e.target.value)} 
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 
                         bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option>Ativo</option>
              <option>Bloqueado</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Validade</label>
            <input 
              type="date" 
              value={validity} 
              onChange={e => setValidity(e.target.value)} 
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 
                         bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100" 
              required 
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Observações</label>
            <textarea 
              value={observations} 
              onChange={e => setObservations(e.target.value)} 
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 
                         bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100" 
              rows="3"
            />
          </div>
          {/* Botões de ação */}
          <div className="text-right">
            <button 
              type="button" 
              onClick={onClose} 
              className="mr-3 px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 
                         text-gray-800 dark:text-gray-200"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              {client ? 'Salvar' : 'Adicionar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}