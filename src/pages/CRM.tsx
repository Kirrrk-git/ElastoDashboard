import { useState } from 'react';
import { Search, Plus, Mail, Phone, MapPin, Users } from 'lucide-react';
import Modal from '../components/Modal';

const initialClients = [
  { id: 'CLI-001', name: 'Gaisano Mall - Davao', type: 'Corporate', contact: 'Maria Santos', phone: '0917-123-4567', orders: 142, status: 'Active' },
  { id: 'CLI-002', name: 'Bankerohan Wet Market (Stall 14)', type: 'Retail', contact: 'Mang Jose', phone: '0918-987-6543', orders: 85, status: 'Active' },
  { id: 'CLI-003', name: 'Juna Subd Catering Services', type: 'Wholesale', contact: 'Elena Cruz', phone: '0922-333-4444', orders: 12, status: 'Inactive' },
];

export default function CRM() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<any>(null);

  const filteredClients = initialClients.filter(client => 
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    client.contact.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Client Management</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage client relationships, contact info, and order history.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus size={16} />
          Add Client
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search clients by name or contact..." 
              className="pl-10 pr-4 py-2 w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none shadow-sm placeholder:text-slate-400 dark:placeholder:text-slate-500"
            />
          </div>
        </div>

        {filteredClients.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-700 border-b border-slate-200 dark:border-slate-700">
            {filteredClients.map((client) => (
              <div key={client.id} className="p-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group cursor-pointer">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{client.name}</h3>
                    <span className="inline-block mt-1 px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-bold uppercase tracking-wider rounded">
                      {client.type}
                    </span>
                  </div>
                  <span className={`w-2 h-2 rounded-full ${client.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'}`}></span>
                </div>
                
                <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400 mb-6">
                  <div className="flex items-center gap-2">
                    <Users size={14} className="text-slate-400 dark:text-slate-500" />
                    <span>{client.contact}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={14} className="text-slate-400 dark:text-slate-500" />
                    <span>{client.phone}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center">
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-bold text-slate-900 dark:text-white">{client.orders}</span> Lifetime Orders
                  </div>
                  <button 
                    onClick={() => setSelectedClient(client)}
                    className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                  >
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-slate-500 dark:text-slate-400">
            No clients found matching "{searchQuery}"
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Client">
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Business/Client Name</label>
            <input type="text" className="w-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500" placeholder="e.g. NCCC Supermarket" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Client Type</label>
              <select className="w-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                <option>Corporate</option>
                <option>Wholesale</option>
                <option>Retail</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Contact Person</label>
              <input type="text" className="w-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500" placeholder="Name" required />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Phone Number</label>
            <input type="tel" className="w-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500" placeholder="09XX-XXX-XXXX" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Address</label>
            <textarea className="w-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500" rows={2} placeholder="Delivery address" required></textarea>
          </div>
          <div className="pt-4 flex justify-end gap-2">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700">Cancel</button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">Save Client</button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={!!selectedClient} onClose={() => setSelectedClient(null)} title="Client Profile">
        {selectedClient && (
          <div className="space-y-4">
            <div className="flex justify-between items-start border-b border-slate-100 dark:border-slate-700 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{selectedClient.name}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{selectedClient.id}</p>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                selectedClient.status === 'Active' ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}>
                {selectedClient.status}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 py-2">
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase mb-1">Contact Person</p>
                <div className="flex items-center gap-2 text-sm font-medium text-slate-900 dark:text-white">
                  <Users size={14} className="text-slate-400 dark:text-slate-500" />
                  {selectedClient.contact}
                </div>
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase mb-1">Phone</p>
                <div className="flex items-center gap-2 text-sm font-medium text-slate-900 dark:text-white">
                  <Phone size={14} className="text-slate-400 dark:text-slate-500" />
                  {selectedClient.phone}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 py-2 border-t border-slate-100 dark:border-slate-700">
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase mb-1">Client Type</p>
                <p className="text-sm font-medium text-slate-900 dark:text-white">{selectedClient.type}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase mb-1">Lifetime Orders</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">{selectedClient.orders}</p>
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-2 border-t border-slate-100 dark:border-slate-700">
              <button type="button" onClick={() => setSelectedClient(null)} className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700">Close</button>
              <button type="button" onClick={() => alert('Edit profile functionality would open here.')} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">Edit Profile</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
