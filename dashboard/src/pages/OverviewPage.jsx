import React from 'react'
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell, BarChart, Bar, Legend
} from 'recharts'
import { MessageSquare, Star, ThumbsUp, AlertTriangle, TrendingUp, Layers } from 'lucide-react'
import KPICard from '../components/KPICard'

export default function OverviewPage({ overview, trend, topics }) {
  if (!overview || !trend) return null

  // Format data for Recharts
  const sentimentPieData = [
    { name: 'Positif', value: overview.sentiment_counts.positif, color: '#10B981', pct: overview.sentiment_percentages.positif },
    { name: 'Negatif', value: overview.sentiment_counts.negatif, color: '#EF4444', pct: overview.sentiment_percentages.negatif },
    { name: 'Netral', value: overview.sentiment_counts.netral, color: '#F59E0B', pct: overview.sentiment_percentages.netral },
  ]

  const ratingBarData = [
    { star: '1 ⭐', count: overview.rating_counts['1'] || 0, fill: '#EF4444' },
    { star: '2 ⭐', count: overview.rating_counts['2'] || 0, fill: '#F97316' },
    { star: '3 ⭐', count: overview.rating_counts['3'] || 0, fill: '#F59E0B' },
    { star: '4 ⭐', count: overview.rating_counts['4'] || 0, fill: '#10B981' },
    { star: '5 ⭐', count: overview.rating_counts['5'] || 0, fill: '#059669' },
  ]

  const topTopicsData = (topics?.topics || []).map(t => ({
    label: t.label,
    count: t.review_count,
    pct: t.pct_of_negative
  })).sort((a, b) => b.count - a.count).slice(0, 5)

  // Custom Recharts Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900/95 border border-slate-700 p-3 rounded-xl shadow-xl text-xs space-y-1">
          <p className="font-semibold text-slate-200">{label}</p>
          {payload.map((p, idx) => (
            <div key={idx} className="flex items-center justify-between space-x-4">
              <span className="flex items-center space-x-1" style={{ color: p.color }}>
                <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: p.color }}></span>
                <span>{p.name}:</span>
              </span>
              <span className="font-bold text-white">{p.value.toLocaleString('id-ID')}</span>
            </div>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-6">
      
      {/* Page Title & Subtitle */}
      <div>
        <h2 className="text-xl font-bold text-white flex items-center space-x-2">
          <span>Overview Analytics</span>
          <span className="text-xs font-normal text-slate-400 bg-slate-800/80 px-2.5 py-0.5 rounded-md border border-slate-700">
            Dataset Google Play Store 2015-2023
          </span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">Ringkasan performa sentimen, sebaran rating, dan tren bulanan ulasan Shopee.</p>
      </div>

      {/* 4 KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Ulasan"
          value={overview.total_reviews.toLocaleString('id-ID')}
          subtitle="Dataset Bersih Mentah"
          icon={MessageSquare}
          color="orange"
          badgeText="85.499 Row"
          badgeColor="amber"
        />
        <KPICard
          title="Rating Rata-Rata"
          value={`${overview.avg_rating} / 5.0`}
          subtitle="Google Play Store Rating"
          icon={Star}
          color="amber"
          badgeText="Score Proxy"
          badgeColor="amber"
        />
        <KPICard
          title="Sentimen Positif"
          value={`${overview.sentiment_percentages.positif}%`}
          subtitle={`${overview.sentiment_counts.positif.toLocaleString('id-ID')} Review`}
          icon={ThumbsUp}
          color="green"
          badgeText="Rating 4-5"
          badgeColor="emerald"
        />
        <KPICard
          title="Sentimen Negatif"
          value={`${overview.sentiment_percentages.negatif}%`}
          subtitle={`${overview.sentiment_counts.negatif.toLocaleString('id-ID')} Review`}
          icon={AlertTriangle}
          color="red"
          badgeText="Rating 1-2"
          badgeColor="rose"
        />
      </div>

      {/* Monthly Sentiment Trend Chart (Full Width) */}
      <div className="glass-card p-6 rounded-2xl border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-semibold text-white flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-orange-400" />
              <span>Trend Sentimen Bulanan</span>
            </h3>
            <p className="text-xs text-slate-400">Volume ulasan Positif, Netral, dan Negatif seiring waktu.</p>
          </div>
          <div className="flex items-center space-x-4 mt-3 sm:mt-0 text-xs">
            <span className="flex items-center space-x-1 text-emerald-400">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span>Positif</span>
            </span>
            <span className="flex items-center space-x-1 text-amber-400">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span>Netral</span>
            </span>
            <span className="flex items-center space-x-1 text-rose-400">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
              <span>Negatif</span>
            </span>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPos" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorNeg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorNeu" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
              <XAxis dataKey="month" stroke="#64748B" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="positif" name="Positif" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorPos)" />
              <Area type="monotone" dataKey="negatif" name="Negatif" stroke="#EF4444" strokeWidth={2} fillOpacity={1} fill="url(#colorNeg)" />
              <Area type="monotone" dataKey="netral" name="Netral" stroke="#F59E0B" strokeWidth={2} fillOpacity={1} fill="url(#colorNeu)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3 Grid Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* 1. Sentiment Donut Chart */}
        <div className="glass-card p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold text-white mb-1">Proporsi Sentimen</h3>
            <p className="text-xs text-slate-400">Persentase sentimen ulasan.</p>
          </div>
          <div className="h-56 my-2 relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sentimentPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {sentimentPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="#0F172A" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => value.toLocaleString('id-ID')} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xs text-slate-400">Negatif</span>
              <span className="text-lg font-extrabold text-rose-400">{overview.sentiment_percentages.negatif}%</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-xs pt-2 border-t border-slate-800">
            <div>
              <p className="text-slate-400">Positif</p>
              <p className="font-bold text-emerald-400">{overview.sentiment_percentages.positif}%</p>
            </div>
            <div>
              <p className="text-slate-400">Netral</p>
              <p className="font-bold text-amber-400">{overview.sentiment_percentages.netral}%</p>
            </div>
            <div>
              <p className="text-slate-400">Negatif</p>
              <p className="font-bold text-rose-400">{overview.sentiment_percentages.negatif}%</p>
            </div>
          </div>
        </div>

        {/* 2. Rating Distribution Bar Chart */}
        <div className="glass-card p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold text-white mb-1">Distribusi Rating (1-5 Bintang)</h3>
            <p className="text-xs text-slate-400">Jumlah ulasan per bintang.</p>
          </div>
          <div className="h-56 my-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ratingBarData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                <XAxis dataKey="star" stroke="#64748B" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
                <Tooltip formatter={(value) => value.toLocaleString('id-ID')} />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {ratingBarData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-xs text-slate-400 text-center pt-2 border-t border-slate-800">
            Polarisasi tinggi: Bintang 1 (34.9%) & Bintang 5 (35.2%) mendominasi.
          </div>
        </div>

        {/* 3. Top Complaint Topics Horizontal Bar Chart */}
        <div className="glass-card p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold text-white flex items-center space-x-1.5 mb-1">
              <Layers className="w-4 h-4 text-orange-400" />
              <span>Top 5 Keluhan Negatif</span>
            </h3>
            <p className="text-xs text-slate-400">Kategori topik paling banyak dikeluhkan.</p>
          </div>
          <div className="space-y-3 my-3">
            {topTopicsData.map((t, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-slate-200 truncate max-w-[170px]">{t.label}</span>
                  <span className="text-slate-400 font-semibold">{t.count.toLocaleString('id-ID')} ({t.pct}%)</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 to-rose-500 rounded-full"
                    style={{ width: `${Math.min(t.pct * 1.6, 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-xs text-slate-400 text-center pt-2 border-t border-slate-800">
            Topik terbesar: General App Experience & Customer Support.
          </div>
        </div>

      </div>

    </div>
  )
}
