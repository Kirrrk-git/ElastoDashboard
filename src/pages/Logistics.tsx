import { useState } from 'react';
import { MapPin, Truck, CheckCircle2 } from 'lucide-react';
import Modal from '../components/Modal';

const deliveries = [
  { id: 'DEL-092', driver: 'Mario Santos', vehicle: 'Truck A (Plate: ABC-123)', route: 'South Route (Toril/Mintal)', status: 'In Transit', progress: '2/5 Delivered' },
  { id: 'DEL-093', driver: 'Juan Dela Cruz', vehicle: 'Van B (Plate: XYZ-987)', route: 'North Route (Panacan/Tibungco)', status: 'Scheduled', progress: '0/4 Delivered' },
  { id: 'DEL-091', driver: 'Pedro Penduko', vehicle: 'Truck C (Plate: DEF-456)', route: 'Downtown (Agdao/Bankerohan)', status: 'Completed', progress: '6/6 Delivered' },
];

export default function Logistics() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState<any>(null);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Delivery & Logistics</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Schedule deliveries, assign drivers, and track routes.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
        >
          Create Manifest
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {deliveries.map((del) => (
          <div key={del.id} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden flex flex-col">
            <div className="p-5 border-b border-slate-100 dark:border-slate-700 flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-900 dark:text-white">{del.id}</h3>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    del.status === 'Completed' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' :
                    del.status === 'In Transit' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' :
                    'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}>
                    {del.status}
                  </span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{del.route}</p>
              </div>
              <div className={`p-2 rounded-full ${del.status === 'Completed' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400' : 'bg-slate-50 dark:bg-slate-700 text-slate-400 dark:text-slate-500'}`}>
                {del.status === 'Completed' ? <CheckCircle2 size={20} /> : <Truck size={20} />}
              </div>
            </div>
            <div className="p-5 flex-1 bg-slate-50/50 dark:bg-slate-800/50">
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <span className="w-20 text-slate-500 dark:text-slate-400">Driver:</span>
                  <span className="font-medium text-slate-900 dark:text-white">{del.driver}</span>
                </div>
                <div className="flex items-center text-sm">
                  <span className="w-20 text-slate-500 dark:text-slate-400">Vehicle:</span>
                  <span className="font-medium text-slate-900 dark:text-white">{del.vehicle}</span>
                </div>
                <div className="flex items-center text-sm">
                  <span className="w-20 text-slate-500 dark:text-slate-400">Progress:</span>
                  <span className="font-medium text-slate-900 dark:text-white">{del.progress}</span>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800">
              <button 
                onClick={() => setSelectedDelivery(del)}
                className="w-full py-2 text-sm font-medium text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
              >
                View Route Details
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create Delivery Manifest">
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Select Driver</label>
            <select className="w-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
              <option>Mario Santos</option>
              <option>Juan Dela Cruz</option>
              <option>Pedro Penduko</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Select Vehicle</label>
            <select className="w-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
              <option>Truck A (Plate: ABC-123)</option>
              <option>Van B (Plate: XYZ-987)</option>
              <option>Truck C (Plate: DEF-456)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Assign Orders to Route</label>
            <div className="border border-slate-300 dark:border-slate-700 rounded-lg p-3 space-y-2 max-h-40 overflow-y-auto">
              <label className="flex items-center gap-2 text-sm text-slate-900 dark:text-slate-300">
                <input type="checkbox" className="rounded border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-blue-600 focus:ring-blue-500" />
                ORD-1045 (Gaisano Mall - Toril)
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-900 dark:text-slate-300">
                <input type="checkbox" className="rounded border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-blue-600 focus:ring-blue-500" />
                ORD-1044 (NCCC Supermarket)
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-900 dark:text-slate-300">
                <input type="checkbox" className="rounded border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-blue-600 focus:ring-blue-500" />
                ORD-1042 (Gaisano Mall - Davao)
              </label>
            </div>
          </div>
          <div className="pt-4 flex justify-end gap-2">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700">Cancel</button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">Create Manifest</button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={!!selectedDelivery} onClose={() => setSelectedDelivery(null)} title="Route Details">
        {selectedDelivery && (
          <div className="space-y-4">
            <div className="border-b border-slate-100 dark:border-slate-700 pb-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">{selectedDelivery.id}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">{selectedDelivery.route}</p>
            </div>
            
            <div className="space-y-4 py-2">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 p-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
                  <MapPin size={16} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">Stop 1: Gaisano Mall</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Delivered at 09:15 AM</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 p-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
                  <MapPin size={16} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">Stop 2: NCCC Supermarket</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Delivered at 10:30 AM</p>
                </div>
              </div>
              <div className="flex items-start gap-3 opacity-50">
                <div className="mt-0.5 p-1.5 bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 rounded-full">
                  <MapPin size={16} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">Stop 3: Wet Market Vendor</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Pending</p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-2 border-t border-slate-100 dark:border-slate-700">
              <button type="button" onClick={() => setSelectedDelivery(null)} className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700">Close</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
