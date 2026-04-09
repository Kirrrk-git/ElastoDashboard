import { ReactNode, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { 
  LayoutDashboard, Package, ShoppingCart, Receipt, 
  Truck, BarChart3, Users, Bell, Search, Menu, UserCircle,
  ChevronLeft, ChevronRight, Sun, Moon
} from 'lucide-react';
import { motion } from 'motion/react';
import emcLogo from '../emc-logo.png';

const navItems = [
  { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
  { name: 'Inventory', path: '/inventory', icon: <Package size={20} /> },
  { name: 'Orders', path: '/orders', icon: <ShoppingCart size={20} /> },
  { name: 'Billing', path: '/billing', icon: <Receipt size={20} /> },
  { name: 'Logistics', path: '/logistics', icon: <Truck size={20} /> },
  { name: 'Reports', path: '/reports', icon: <BarChart3 size={20} /> },
  { name: 'CRM', path: '/crm', icon: <Users size={20} /> },
];

export default function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900 font-sans overflow-hidden">
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 md:relative
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        ${isSidebarCollapsed ? 'w-20' : 'w-64'} 
        bg-slate-900 text-white flex flex-col shadow-xl transition-all duration-300 ease-in-out
      `}>
        <div className={`py-4 border-b border-slate-800 flex items-center ${isSidebarCollapsed ? 'justify-center gap-1 px-2' : 'justify-between px-4'}`}>
          <div className="flex items-center gap-2 overflow-hidden">
            <img 
              src={emcLogo} 
              alt="EMC Logo" 
              className="w-8 h-8 object-contain bg-white rounded shrink-0 p-0.5"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=EMC&background=fff&color=b91c1c&bold=true';
              }}
            />
            {!isSidebarCollapsed && (
              <div className="whitespace-nowrap">
                <h1 className="text-lg font-bold tracking-tight text-white leading-tight">Elasto</h1>
                <p className="text-[10px] text-blue-400 font-medium uppercase tracking-wider">Marketing Corp</p>
              </div>
            )}
          </div>
          <button 
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="text-slate-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-slate-800 shrink-0 flex items-center justify-center"
            title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isSidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>
        
        <nav className="flex-1 py-6 overflow-y-auto overflow-x-hidden">
          {!isSidebarCollapsed && <div className="px-4 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">Main Menu</div>}
          <ul className="space-y-1 px-3">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.name} title={isSidebarCollapsed ? item.name : undefined}>
                  <Link
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                      isActive 
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-900/20' 
                        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
                    } ${isSidebarCollapsed ? 'justify-center' : ''}`}
                  >
                    <span className={`${isActive ? 'text-white' : 'text-slate-400'} shrink-0`}>{item.icon}</span>
                    {!isSidebarCollapsed && <span className="font-medium text-sm whitespace-nowrap">{item.name}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer ${isSidebarCollapsed ? 'justify-center' : ''}`} title={isSidebarCollapsed ? "Alvin N. Go" : undefined}>
            <UserCircle size={32} className="text-slate-400 shrink-0" />
            {!isSidebarCollapsed && (
              <div className="flex-1 min-w-0 whitespace-nowrap">
                <p className="text-sm font-medium text-white truncate">Alvin N. Go</p>
                <p className="text-xs text-slate-400 truncate">Sales Rep</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-10 transition-colors">
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
          <div className="flex items-center gap-4 relative">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
              title="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button 
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="relative p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>

            {isNotificationsOpen && (
              <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden z-50">
                <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                  <h3 className="font-bold text-slate-900">Notifications</h3>
                  <button className="text-xs text-blue-600 font-medium hover:text-blue-800">Mark all as read</button>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  <div className="p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">Low Stock Alert</p>
                        <p className="text-xs text-slate-500 mt-1">Styrofoam Fish Container (Large) is below minimum threshold.</p>
                        <p className="text-[10px] text-slate-400 mt-2">10 minutes ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">New Order Received</p>
                        <p className="text-xs text-slate-500 mt-1">Gaisano Mall - Toril placed an order for ₱12,500.</p>
                        <p className="text-[10px] text-slate-400 mt-2">1 hour ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 hover:bg-slate-50 transition-colors cursor-pointer">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 w-2 h-2 bg-transparent rounded-full flex-shrink-0"></div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">Payment Overdue</p>
                        <p className="text-xs text-slate-500 mt-1">Invoice INV-2026-086 is 4 days overdue.</p>
                        <p className="text-[10px] text-slate-400 mt-2">Yesterday</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-3 border-t border-slate-100 text-center bg-slate-50">
                  <button className="text-sm text-slate-500 font-medium hover:text-slate-700">View all notifications</button>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-50/50">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="max-w-7xl mx-auto"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
