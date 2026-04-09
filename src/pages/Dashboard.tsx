import { useState } from 'react';
import { ArrowUpRight, ArrowDownRight, Package, ShoppingCart, DollarSign, Users } from 'lucide-react';
import { useNavigate } from 'react-router';
import Modal from '../components/Modal';

const stats = [
  { name: 'Total Revenue', value: '₱124,500', change: '+12.5%', trend: 'up', icon: DollarSign },
  { name: 'Active Orders', value: '42', change: '+5.2%', trend: 'up', icon: ShoppingCart },
  { name: 'Low Stock Items', value: '8', change: '-2.1%', trend: 'down', icon: Package },
  { name: 'New Clients', value: '12', change: '+18.1%', trend: 'up', icon: Users },
];

const recentOrders = [
  { id: 'ORD-1042', client: 'Gaisano Mall - Davao', amount: '₱15,400', status: 'Processing', date: 'Today, 10:42 AM' },
  { id: 'ORD-1041', client: 'Bankerohan Wet Market', amount: '₱4,200', status: 'Out for Delivery', date: 'Today, 09:15 AM' },
  { id: 'ORD-1040', client: 'NCCC Supermarket', amount: '₱28,900', status: 'Delivered', date: 'Yesterday' },
  { id: 'ORD-1039', client: 'Juna Subd Catering', amount: '₱1,850', status: 'Delivered', date: 'Yesterday' },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [isReorderModalOpen, setIsReorderModalOpen] = useState(false);
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Dashboard Overview</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Here's what's happening with your operations today.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                <stat.icon size={24} />
              </div>
              <div className={`flex items-center text-sm font-medium ${stat.trend === 'up' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                {stat.change}
                {stat.trend === 'up' ? <ArrowUpRight size={16} className="ml-1" /> : <ArrowDownRight size={16} className="ml-1" />}
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium">{stat.name}</h3>
              <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <h3 className="font-semibold text-slate-900 dark:text-white">Recent Orders</h3>
            <button 
              onClick={() => navigate('/orders')}
              className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300"
            >
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-800/50 uppercase border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="px-6 py-3 font-medium">Order ID</th>
                  <th className="px-6 py-3 font-medium">Client</th>
                  <th className="px-6 py-3 font-medium">Amount</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{order.id}</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{order.client}</td>
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{order.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        order.status === 'Delivered' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' :
                        order.status === 'Processing' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400' :
                        'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions / Alerts */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-6">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Action Needed</h3>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-900/50">
              <h4 className="text-sm font-semibold text-rose-800 dark:text-rose-400">Low Stock Alert</h4>
              <p className="text-xs text-rose-600 dark:text-rose-300 mt-1">Clear Cups 16oz is out of stock. 3 pending orders are affected.</p>
              <button 
                onClick={() => setIsReorderModalOpen(true)}
                className="mt-3 text-xs font-medium text-rose-700 dark:text-rose-300 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-md border border-rose-200 dark:border-rose-800 hover:bg-rose-50 dark:hover:bg-rose-900/40 transition-colors"
              >
                Reorder Now
              </button>
            </div>
            <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/50">
              <h4 className="text-sm font-semibold text-amber-800 dark:text-amber-400">Overdue Invoice</h4>
              <p className="text-xs text-amber-600 dark:text-amber-300 mt-1">Bankerohan Vendor A has an overdue balance of ₱12,000.</p>
              <button 
                onClick={() => setIsReminderModalOpen(true)}
                className="mt-3 text-xs font-medium text-amber-700 dark:text-amber-300 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-md border border-amber-200 dark:border-amber-800 hover:bg-amber-50 dark:hover:bg-amber-900/40 transition-colors"
              >
                Send Reminder
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isReorderModalOpen} onClose={() => setIsReorderModalOpen(false)} title="Reorder Stock">
        <div className="space-y-4">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg">
            <p className="text-sm font-medium text-slate-900 dark:text-white">Clear Cups 16oz</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Current Stock: 0 | Reorder Point: 1000</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Order Quantity</label>
            <input type="number" defaultValue={2000} className="w-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Supplier</label>
            <select className="w-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
              <option>Manila Plastics Mfg.</option>
              <option>Cebu Packaging Corp.</option>
            </select>
          </div>
          <div className="pt-4 flex justify-end gap-2">
            <button type="button" onClick={() => setIsReorderModalOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700">Cancel</button>
            <button type="button" onClick={() => { alert('Purchase order created!'); setIsReorderModalOpen(false); }} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">Submit PO</button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={isReminderModalOpen} onClose={() => setIsReminderModalOpen(false)} title="Send Payment Reminder">
        <div className="space-y-4">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg">
            <p className="text-sm font-medium text-slate-900 dark:text-white">Bankerohan Vendor A</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Overdue Amount: ₱12,000 | Invoice: INV-2026-082</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Method</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                <input type="checkbox" defaultChecked className="rounded text-blue-600 focus:ring-blue-500 dark:bg-slate-800 dark:border-slate-600" />
                Email
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                <input type="checkbox" defaultChecked className="rounded text-blue-600 focus:ring-blue-500 dark:bg-slate-800 dark:border-slate-600" />
                SMS
              </label>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Message Preview</label>
            <textarea 
              rows={4} 
              defaultValue="Dear Bankerohan Vendor A, this is a gentle reminder that your payment of ₱12,000 for invoice INV-2026-082 is now overdue. Please arrange payment as soon as possible."
              className="w-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none" 
            />
          </div>
          <div className="pt-4 flex justify-end gap-2">
            <button type="button" onClick={() => setIsReminderModalOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700">Cancel</button>
            <button type="button" onClick={() => { alert('Reminder sent successfully!'); setIsReminderModalOpen(false); }} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">Send Now</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
