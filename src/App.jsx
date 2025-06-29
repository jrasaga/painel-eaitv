import { useEffect, useState } from 'react';
import { 
  collection, query, onSnapshot, 
  doc, addDoc, updateDoc, deleteDoc 
} from 'firebase/firestore';
import { db } from './firebase';

import ClientsList from './components/ClientsList';
import ClientFormModal from './components/ClientFormModal';
import ThemeToggle from './components/ThemeToggle';

function App() {
  const [clients, setClients] = useState([]);         // lista de clientes do Firestore
  const [modalOpen, setModalOpen] = useState(false);  // controla exibição do modal
  const [editingClient, setEditingClient] = useState(null); // armazena cliente sendo editado (ou null p/ novo)

  // Carrega e observa clientes em tempo real do Firestore
  useEffect(() => {
    const q = query(collection(db, 'clients'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const clientsData = [];
      querySnapshot.forEach((docSnap) => {
        clientsData.push({ id: docSnap.id, ...docSnap.data() });
      });
      setClients(clientsData);
    });
    // Cleanup: cancela subscrição ao desmontar
    return unsubscribe;
  }, []);

  // Função para abrir modal de novo cliente
  const openAddClient = () => {
    setEditingClient(null);
    setModalOpen(true);
  };

  // Função para abrir modal de edição com dados do cliente selecionado
  const openEditClient = (client) => {
    setEditingClient(client);
    setModalOpen(true);
  };

  // Função para salvar (adicionar ou atualizar) um cliente
  const handleSaveClient = async (clientData) => {
    try {
      if (editingClient) {
        // Atualiza documento existente
        await updateDoc(doc(db, 'clients', editingClient.id), clientData);
        alert('Cliente atualizado com sucesso!');
      } else {
        // Adiciona novo documento
        await addDoc(collection(db, 'clients'), clientData);
        alert('Cliente adicionado com sucesso!');
      }
      // Fecha modal e limpa estado de edição
      setModalOpen(false);
      setEditingClient(null);
    } catch (error) {
      console.error('Erro ao salvar cliente:', error);
      alert('Não foi possível salvar os dados do cliente.');
    }
  };

  // Função para excluir um cliente
  const handleDeleteClient = async (clientId) => {
    const confirmDelete = window.confirm('Deseja excluir este cliente?');
    if (!confirmDelete) return;
    try {
      await deleteDoc(doc(db, 'clients', clientId));
      alert('Cliente excluído com sucesso.');
    } catch (error) {
      console.error('Erro ao excluir cliente:', error);
      alert('Não foi possível excluir o cliente.');
    }
  };

  // Evita rolagem de fundo quando modal está aberto
  useEffect(() => {
    document.body.style.overflow = modalOpen ? 'hidden' : 'auto';
  }, [modalOpen]);

  return (
    <div className="min-h-screen p-4">
      {/* Cabeçalho */}
      <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
        <h1 className="text-2xl font-bold mb-2 sm:mb-0">Painel de Clientes</h1>
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <button 
            onClick={openAddClient} 
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
            Adicionar Cliente
          </button>
        </div>
      </header>

      {/* Tabela de clientes */}
      <ClientsList 
        clients={clients} 
        onEdit={openEditClient} 
        onDelete={handleDeleteClient} 
      />

      {/* Modal de formulário (novo/editar cliente) */}
      {modalOpen && (
        <ClientFormModal 
          client={editingClient} 
          onClose={() => setModalOpen(false)} 
          onSave={handleSaveClient} 
        />
      )}
    </div>
  );
}

export default App;