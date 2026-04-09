import { useState } from 'react';
import { Plus, Search, Filter, ChevronDown } from 'lucide-react';
import Modal from '../components/Modal';

const initialOrders = [
  { id: 'ORD-1045', client: 'Gaisano Mall - Toril', items: 3, total: '₱12,500', status: 'Pending', date: 'Oct 24, 2026' },
  { id: 'ORD-1044', client: 'NCCC Supermarket', items: 12, total: '₱45,200', status: 'Processing', date: 'Oct 24, 2026' },
  { id: 'ORD-1043', client: 'Agdao Wet Market Vendor', items: 1, total: '₱3,600', status: 'Out for Delivery', date: 'Oct 24, 2026' },
  { id: 'ORD-1042', client: 'Gaisano Mall - Davao', items: 5, total: '₱15,400', status: 'Processing', date: 'Oct 24, 2026' },
  { id: 'ORD-1041', client: 'Bankerohan Wet Market', items: 2, total: '₱4,200', status: 'Out for Delivery', date: 'Oct 24, 2026' },
  { id: 'ORD-1040', client: 'Juna Subd Catering', items: 8, total: '₱8,900', status: 'Delivered', date: 'Oct 23, 2026' },
];

export default function Orders() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All Orders');
  const [clientFilter, setClientFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [dateRangeStart, setDateRangeStart] = useState('');
  const [dateRangeEnd, setDateRangeEnd] = useState('');

  const filteredOrders = initialOrders.filter(order => {
    const matchesSearch = order.client.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          order.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'All Orders' || order.status === activeTab;
    const matchesClient = clientFilter === 'All' || order.client.includes(clientFilter);
    
    let matchesDate = true;
    if (dateRangeStart && dateRangeEnd) {
      const orderDate = new Date(order.date);
      const start = new Date(dateRangeStart);
      const end = new Date(dateRangeEnd);
      matchesDate = orderDate >= start && orderDate <= end;
    }
    
    return matchesSearch && matchesTab && matchesClient && matchesDate;
  }).sort((a, b) => {
    let valA: any = a[sortBy as keyof typeof a];
    let valB: any = b[sortBy as keyof typeof b];
    
    if (sortBy === 'total') {
      valA = parseFloat((valA as string).replace(/[^0-9.-]+/g,""));
      valB = parseFloat((valB as string).replace(/[^0-9.-]+/g,""));
    } else if (sortBy === 'date') {
      valA = new Date(valA).getTime();
      valB = new Date(valB).getTime();
    }
    
    if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
    if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Order Management</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Track customer orders from placement to delivery.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus size={16} />
          Create Order
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-700 overflow-x-auto">
        {['All Orders', 'Pending', 'Processing', 'Out for Delivery', 'Delivered'].map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === tab 
                ? 'border-blue-600 text-blue-600 dark:text-blue-400' 
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/50 dark:bg-slate-800/50 rounded-t-xl">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search orders..." 
              className="pl-10 pr-4 py-2 w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none shadow-sm placeholder:text-slate-400 dark:placeholder:text-slate-500"
            />
          </div>
          <div className="relative w-full sm:w-auto">
            <select 
              value={clientFilter}
              onChange={(e) => setClientFilter(e.target.value)}
              className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 pl-4 pr-10 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm w-full outline-none appearance-none cursor-pointer"
            >
              <option value="All">All Clients</option>
              <option value="Gaisano Mall">Gaisano Mall</option>
              <option value="NCCC Supermarket">NCCC Supermarket</option>
              <option value="Wet Market">Wet Market</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm w-full sm:w-auto justify-center"
            >
              <Filter size={16} />
              Filter & Sort
              <ChevronDown size={16} className={`transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isFilterOpen && (
              <>
                <div 
                  className="fixed inset-0 bg-slate-900/20 dark:bg-slate-900/60 z-40 sm:hidden" 
                  onClick={() => setIsFilterOpen(false)} 
                />
                <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-sm sm:absolute sm:top-auto sm:left-auto sm:right-0 sm:translate-x-0 sm:translate-y-0 sm:mt-2 sm:w-72 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 p-4 z-50">
                  <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">Sort By</label>
                    <div className="relative">
                      <select 
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg pl-3 pr-8 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none appearance-none"
                      >
                        <option value="date">Date</option>
                        <option value="id">Order ID</option>
                        <option value="client">Client</option>
                        <option value="items">Items</option>
                        <option value="total">Total</option>
                        <option value="status">Status</option>
                      </select>
                      <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">Order</label>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setSortOrder('asc')}
                        className={`flex-1 py-1.5 text-sm font-medium rounded-md border ${sortOrder === 'asc' ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-400' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                      >
                        Ascending
                      </button>
                      <button 
                        onClick={() => setSortOrder('desc')}
                        className={`flex-1 py-1.5 text-sm font-medium rounded-md border ${sortOrder === 'desc' ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-400' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                      >
                        Descending
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">Date Range</label>
                    <div className="grid grid-cols-2 gap-2">
                      <input 
                        type="date" 
                        value={dateRangeStart}
                        onChange={(e) => setDateRangeStart(e.target.value)}
                        className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg px-2 py-1.5 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                      <input 
                        type="date" 
                        value={dateRangeEnd}
                        onChange={(e) => setDateRangeEnd(e.target.value)}
                        className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg px-2 py-1.5 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
              </>
            )}
          </div>
        </div>

        <div className="overflow-x-auto rounded-b-xl">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 uppercase border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="px-6 py-3 font-medium">Order ID</th>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">Client</th>
                <th className="px-6 py-3 font-medium text-right">Items</th>
                <th className="px-6 py-3 font-medium text-right">Total</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {filteredOrders.length > 0 ? filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer">
                  <td className="px-6 py-4 font-medium text-blue-600 dark:text-blue-400 hover:underline">{order.id}</td>
                  <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{order.date}</td>
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{order.client}</td>
                  <td className="px-6 py-4 text-right text-slate-600 dark:text-slate-300">{order.items}</td>
                  <td className="px-6 py-4 text-right font-medium text-slate-900 dark:text-white">{order.total}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                      order.status === 'Delivered' ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800' :
                      order.status === 'Processing' ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800' :
                      order.status === 'Pending' ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700' :
                      'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => setSelectedOrder(order)}
                      className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300"
                    >
                      View
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-slate-500 dark:text-slate-400">
                    No orders found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Order">
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Select Client</label>
            <select className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
              <option>Gaisano Mall - Toril</option>
              <option>NCCC Supermarket</option>
              <option>Bankerohan Wet Market</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Add Products</label>
            <div className="border border-slate-300 rounded-lg p-3 space-y-3">
              <div className="flex gap-2">
                <select className="flex-1 border border-slate-300 rounded-lg px-2 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                  <option>Styrofoam Fish Container (Large)</option>
                  <option>Plastic Food Container 500ml</option>
                </select>
                <input type="number" placeholder="Qty" className="w-20 border border-slate-300 rounded-lg px-2 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none" defaultValue={1} />
              </div>
              <button type="button" className="text-sm text-blue-600 font-medium hover:text-blue-700">+ Add another item</button>
            </div>
          </div>
          <div className="pt-4 flex justify-end gap-2">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50">Cancel</button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">Create Order</button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={!!selectedOrder} onClose={() => setSelectedOrder(null)} title="Order Details">
        {selectedOrder && (
          <div className="space-y-4">
            <div className="flex justify-between items-start border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">{selectedOrder.id}</h3>
                <p className="text-sm text-slate-500">{selectedOrder.date}</p>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                selectedOrder.status === 'Delivered' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                selectedOrder.status === 'Processing' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                selectedOrder.status === 'Pending' ? 'bg-slate-100 text-slate-700 border-slate-200' :
                'bg-blue-50 text-blue-700 border-blue-200'
              }`}>
                {selectedOrder.status}
              </span>
            </div>
            
            <div className="py-2">
              <p className="text-xs text-slate-500 font-medium uppercase mb-1">Client</p>
              <p className="text-sm font-medium text-slate-900">{selectedOrder.client}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 py-2 border-t border-slate-100">
              <div>
                <p className="text-xs text-slate-500 font-medium uppercase mb-1">Total Items</p>
                <p className="text-sm font-medium text-slate-900">{selectedOrder.items} items</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium uppercase mb-1">Total Amount</p>
                <p className="text-sm font-bold text-slate-900">{selectedOrder.total}</p>
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-2 border-t border-slate-100">
              <button type="button" onClick={() => setSelectedOrder(null)} className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50">Close</button>
              <button type="button" onClick={() => alert('Update status functionality would open here.')} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">Update Status</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
