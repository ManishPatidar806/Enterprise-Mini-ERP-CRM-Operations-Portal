import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Package,
  Boxes,
  FileText,
  ShieldCheck,
  User,
  Building2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Sidebar: React.FC = () => {
  const { user } = useAuth();

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Customers CRM', path: '/customers', icon: Users },
    { label: 'Products Catalog', path: '/products', icon: Package },
    { label: 'Inventory & Stock', path: '/inventory', icon: Boxes },
    { label: 'Sales Challans', path: '/challans', icon: FileText },
    ...(user?.role === 'ADMIN' || user?.role === 'ACCOUNTS'
      ? [{ label: 'Audit Logs', path: '/audit-logs', icon: ShieldCheck }]
      : []),
    { label: 'My Profile', path: '/profile', icon: User },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-screen sticky top-0 shrink-0 select-none text-slate-300">
      {/* Brand Header */}
      <div className="h-16 flex items-center px-6 border-b border-slate-800 gap-3">
        <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center shadow-xs">
          <Building2 className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="font-bold text-white tracking-tight leading-none text-base">NexERP <span className="text-blue-400 font-normal">CRM</span></h1>
          <p className="text-[10px] text-slate-400 tracking-wider uppercase font-semibold mt-0.5">Wholesale Enterprise</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <p className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">Navigation Menu</p>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`
              }
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* System Footer Info */}
      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800/60 rounded-lg p-3 text-xs border border-slate-700/60">
          <p className="font-semibold text-slate-200">Operations Portal v1.0</p>
          <p className="text-[11px] mt-0.5 text-slate-400">Connected: Local Instance</p>
        </div>
      </div>
    </aside>
  );
};

