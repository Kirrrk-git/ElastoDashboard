import { useState } from 'react';
import { Download, Calendar, TrendingUp, Package, Users, Activity } from 'lucide-react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { monthlyRevenue, topProducts, orderStatusData, arAgingData } from '../lib/mockData';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#64748b', '#ef4444'];
const PIE_COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#64748b', '#ef4444'];

export default function Reports() {
  const [timeframe, setTimeframe] = useState('YTD');

  const handleExport = () => {
    const element = document.createElement("a");
    const file = new Blob([`Sales Report Data - ${timeframe}\n\nRevenue: ...\nTop Products: ...`], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `Sales_Report_${timeframe}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const displayRevenue = timeframe === 'YTD' ? '₱1,720,000' : '₱170,000';
  const displayFulfillment = timeframe === 'YTD' ? '94.5%' : '96.5%';
  const displayAOV = timeframe === 'YTD' ? '₱12,450' : '₱13,100';
  const displayClients = timeframe === 'YTD' ? '165' : '128';
  
  const displayMonthlyRevenue = timeframe === 'YTD' ? monthlyRevenue : monthlyRevenue.slice(-1);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Sales & Analytics</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Comprehensive insights into business performance and trends.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setTimeframe(timeframe === 'YTD' ? 'This Month' : 'YTD')}
            className="inline-flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
          >
            <Calendar size={16} />
            {timeframe === 'YTD' ? 'Year to Date' : 'This Month'}
          </button>
          <button 
            onClick={handleExport}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Download size={16} />
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 mb-2">
            <TrendingUp size={18} className="text-blue-500" />
            <h3 className="text-sm font-medium">YTD Revenue</h3>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">{displayRevenue}</p>
          <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 font-medium">+15.2% vs last year</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 mb-2">
            <Package size={18} className="text-emerald-500" />
            <h3 className="text-sm font-medium">Fulfillment Rate</h3>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">{displayFulfillment}</p>
          <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 font-medium">+2.1% vs last month</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 mb-2">
            <Activity size={18} className="text-amber-500" />
            <h3 className="text-sm font-medium">Avg Order Value</h3>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">{displayAOV}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">Stable</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 mb-2">
            <Users size={18} className="text-purple-500" />
            <h3 className="text-sm font-medium">Active Clients</h3>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">{displayClients}</p>
          <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 font-medium">+12 new this month</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend Chart */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm h-96 flex flex-col">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Revenue Trend (Actual vs Target)</h3>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={displayMonthlyRevenue} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" strokeOpacity={0.2} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} tickFormatter={(value) => `₱${value / 1000}k`} />
                <Tooltip 
                  formatter={(value: number) => [`₱${value.toLocaleString()}`, undefined]}
                  contentStyle={{ borderRadius: '8px', border: 'none', backgroundColor: 'rgba(15, 23, 42, 0.9)', color: '#fff', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Line type="monotone" dataKey="revenue" name="Actual Revenue" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6' }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="target" name="Target Revenue" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Selling Products Chart */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm h-96 flex flex-col">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Top Selling Products (by Volume)</h3>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topProducts} layout="vertical" margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" strokeOpacity={0.2} />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} width={140} />
                <Tooltip 
                  formatter={(value: number) => [value.toLocaleString(), 'Units Sold']}
                  contentStyle={{ borderRadius: '8px', border: 'none', backgroundColor: 'rgba(15, 23, 42, 0.9)', color: '#fff' }}
                />
                <Bar dataKey="volume" name="Volume" fill="#10b981" radius={[0, 4, 4, 0]}>
                  {topProducts.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Order Status Breakdown */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm h-[450px] sm:h-96 flex flex-col">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Order Fulfillment Status</h3>
          <div className="flex-1 min-h-0 flex flex-col sm:flex-row items-center justify-center">
            <div className="w-full sm:w-1/2 h-48 sm:h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={orderStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {orderStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [value, 'Orders']}
                    contentStyle={{ borderRadius: '8px', border: 'none', backgroundColor: 'rgba(15, 23, 42, 0.9)', color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full sm:w-1/2 mt-4 sm:mt-0 pl-0 sm:pl-4">
              <ul className="space-y-3">
                {orderStatusData.map((item, index) => (
                  <li key={item.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: PIE_COLORS[index % PIE_COLORS.length] }}></span>
                      <span className="text-slate-600 dark:text-slate-300">{item.name}</span>
                    </div>
                    <span className="font-medium text-slate-900 dark:text-white">{item.value} Orders</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Accounts Receivable Aging */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm h-96 flex flex-col">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Accounts Receivable Aging</h3>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={arAgingData} margin={{ top: 20, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" strokeOpacity={0.2} />
                <XAxis dataKey="range" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} tickFormatter={(value) => `₱${value / 1000}k`} />
                <Tooltip 
                  formatter={(value: number) => [`₱${value.toLocaleString()}`, 'Amount']}
                  contentStyle={{ borderRadius: '8px', border: 'none', backgroundColor: 'rgba(15, 23, 42, 0.9)', color: '#fff' }}
                  cursor={{ fill: 'rgba(148, 163, 184, 0.1)' }}
                />
                <Bar dataKey="amount" name="Amount" radius={[4, 4, 0, 0]}>
                  {arAgingData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={
                        index === 0 ? '#10b981' : // 0-30 days (Good)
                        index === 1 ? '#f59e0b' : // 31-60 days (Warning)
                        index === 2 ? '#f97316' : // 61-90 days (Danger)
                        '#ef4444' // 90+ days (Critical)
                      } 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
