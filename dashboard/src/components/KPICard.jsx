import React from 'react'

export default function KPICard({ title, value, subtitle, icon: Icon, color = 'orange', badgeText, badgeColor = 'emerald' }) {
  const colorStyles = {
    orange: 'from-orange-500/10 to-orange-500/5 border-orange-500/20 text-orange-400',
    green: 'from-emerald-500/10 to-emerald-500/5 border-emerald-500/20 text-emerald-400',
    red: 'from-rose-500/10 to-rose-500/5 border-rose-500/20 text-rose-400',
    amber: 'from-amber-500/10 to-amber-500/5 border-amber-500/20 text-amber-400',
    blue: 'from-sky-500/10 to-sky-500/5 border-sky-500/20 text-sky-400',
  }

  const badgeStyles = {
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    rose: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    blue: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
  }

  return (
    <div className={`p-5 rounded-2xl glass-card border bg-gradient-to-br ${colorStyles[color] || colorStyles.orange}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-400 tracking-wide uppercase">{title}</p>
          <h3 className="text-2xl font-extrabold text-white mt-1 tracking-tight">{value}</h3>
        </div>
        {Icon && (
          <div className={`p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 ${colorStyles[color]?.split(' ').pop()}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-slate-400 font-normal">{subtitle}</span>
        {badgeText && (
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${badgeStyles[badgeColor] || badgeStyles.emerald}`}>
            {badgeText}
          </span>
        )}
      </div>
    </div>
  )
}
