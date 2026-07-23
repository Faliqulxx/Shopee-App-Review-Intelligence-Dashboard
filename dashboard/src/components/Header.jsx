import React from 'react'
import { LayoutDashboard, Smartphone, Layers, Star, ShoppingBag, Activity } from 'lucide-react'

export default function Header({ activeTab, setActiveTab, totalReviews }) {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'version', label: 'Version Quality', icon: Smartphone },
    { id: 'topics', label: 'Topic Analysis', icon: Layers },
    { id: 'reviews', label: 'Top Impact Reviews', icon: Star },
  ]

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800 bg-[#0B0F19]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#EE4D2D] to-[#FF7347] flex items-center justify-center shadow-lg shadow-orange-500/20">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-lg font-bold text-white tracking-tight">Shopee Review Intelligence</h1>
                <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wider text-orange-400 bg-orange-500/10 border border-orange-500/20 rounded-full">
                  v1.0 ML
                </span>
              </div>
              <p className="text-xs text-slate-400">Google Play Store Review Analytics Dashboard</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-1 bg-slate-900/60 p-1 rounded-xl border border-slate-800">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeTab === item.id
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#EE4D2D] to-[#FF5722] text-white shadow-md shadow-orange-500/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </nav>

          {/* Live Data Badge */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-semibold text-slate-200">
                {totalReviews ? totalReviews.toLocaleString('id-ID') : '85,499'} Reviews
              </span>
            </div>
          </div>

        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden overflow-x-auto space-x-1 py-2 border-t border-slate-800">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${
                  isActive
                    ? 'bg-[#EE4D2D] text-white'
                    : 'text-slate-400 bg-slate-900/50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            )
          })}
        </div>

      </div>
    </header>
  )
}
