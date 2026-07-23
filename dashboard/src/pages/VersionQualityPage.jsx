import React, { useState } from 'react'
import { ResponsiveContainer, ComposedChart, Bar, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import { Smartphone, AlertOctagon, Search, CheckCircle2, ArrowUpDown, Filter } from 'lucide-react'

export default function VersionQualityPage({ versionData }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortField, setSortField] = useState('review_count')
  const [sortOrder, setSortOrder] = useState('desc')

  if (!versionData) return null

  // Filter versions by search term
  const filteredVersions = versionData.filter(v => 
    v.version.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Sort versions
  const sortedVersions = [...filteredVersions].sort((a, b) => {
    let aVal = a[sortField]
    let bVal = b[sortField]
    if (typeof aVal === 'string') {
      return sortOrder === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
    }
    return sortOrder === 'asc' ? aVal - bVal : bVal - aVal
  })

  // Top 3 Worst versions by negative_pct
  const worstVersions = [...versionData]
    .filter(v => v.review_count >= 100)
    .sort((a, b) => b.negative_pct - a.negative_pct)
    .slice(0, 3)

  // Chart data: Top 15 versions by review count
  const chartVersions = [...versionData]
    .slice(0, 15)
    .sort((a, b) => a.version.localeCompare(b.version, undefined, { numeric: true }))

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('desc')
    }
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-slate-900/95 border border-slate-700 p-3 rounded-xl shadow-xl text-xs space-y-1">
          <p className="font-bold text-white">Shopee v{label}</p>
          <p className="text-slate-300">Total Ulasan: <span className="font-semibold text-white">{data.review_count.toLocaleString('id-ID')}</span></p>
          <p className="text-amber-400">Rating Rata-rata: <span className="font-semibold">{data.avg_rating} ⭐</span></p>
          <p className="text-rose-400">Sentimen Negatif: <span className="font-semibold">{data.negative_pct}%</span> ({data.negative_count.toLocaleString('id-ID')} ulasan)</p>
          <p className="text-emerald-400">Sentimen Positif: <span className="font-semibold">{data.positive_pct}%</span></p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div>
        <h2 className="text-xl font-bold text-white flex items-center space-x-2">
          <Smartphone className="w-5 h-5 text-orange-400" />
          <span>Version Quality Tracking</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">Lacak penurunan kualitas aplikasi, persentase keluhan, dan performa rating per rilis versi Shopee.</p>
      </div>

      {/* Worst Version Highlights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {worstVersions.map((ver, idx) => (
          <div key={idx} className="p-4 rounded-2xl glass-card border border-rose-500/30 bg-gradient-to-br from-rose-500/10 to-transparent">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20">
                  Perhatian Regresi Rilis
                </span>
                <h3 className="text-xl font-extrabold text-white mt-1">Shopee v{ver.version}</h3>
              </div>
              <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
                <AlertOctagon className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs border-t border-slate-800 pt-2">
              <div>
                <span className="text-slate-400">Tingkat Negatif</span>
                <p className="font-bold text-rose-400 text-sm">{ver.negative_pct}%</p>
              </div>
              <div>
                <span className="text-slate-400">Rating Rata-rata</span>
                <p className="font-bold text-amber-400 text-sm">{ver.avg_rating} ⭐</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chart: Version Quality Trend */}
      <div className="glass-card p-6 rounded-2xl border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-semibold text-white">Analisis Skor Rating & Regresi Negatif per Versi</h3>
            <p className="text-xs text-slate-400">Batang menunjukkan persentase keluhan negatif (%), Garis menunjukkan skor rating rata-rata.</p>
          </div>
          <div className="flex items-center space-x-4 mt-2 sm:mt-0 text-xs">
            <span className="flex items-center space-x-1 text-rose-400">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
              <span>% Keluhan Negatif</span>
            </span>
            <span className="flex items-center space-x-1 text-amber-400">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
              <span>Rating Rata-rata</span>
            </span>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartVersions} margin={{ top: 10, right: 10, left: -10, bottom: 25 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
              <XAxis dataKey="version" stroke="#64748B" fontSize={10} angle={-35} textAnchor="end" />
              <YAxis yAxisId="left" stroke="#EF4444" fontSize={11} domain={[0, 100]} unit="%" />
              <YAxis yAxisId="right" orientation="right" stroke="#F59E0B" fontSize={11} domain={[1, 5]} />
              <Tooltip content={<CustomTooltip />} />
              <Bar yAxisId="left" dataKey="negative_pct" name="% Negatif" fill="#EF4444" radius={[4, 4, 0, 0]} opacity={0.8} />
              <Line yAxisId="right" type="monotone" dataKey="avg_rating" name="Avg Rating" stroke="#F59E0B" strokeWidth={3} dot={{ r: 4, fill: '#F59E0B' }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Version Quality Table */}
      <div className="glass-card p-5 rounded-2xl border border-slate-800">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-3">
          <div>
            <h3 className="text-base font-semibold text-white">Daftar Lengkap Versi Aplikasi</h3>
            <p className="text-xs text-slate-400">Total {sortedVersions.length} versi aplikasi yang memiliki &ge; 30 ulasan.</p>
          </div>
          
          {/* Search box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari versi (misal: 2.90)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
              <tr>
                <th className="py-3 px-4 cursor-pointer hover:text-white" onClick={() => handleSort('version')}>
                  <div className="flex items-center space-x-1">
                    <span>Versi Aplikasi</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-4 cursor-pointer hover:text-white" onClick={() => handleSort('review_count')}>
                  <div className="flex items-center space-x-1">
                    <span>Total Ulasan</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-4 cursor-pointer hover:text-white" onClick={() => handleSort('avg_rating')}>
                  <div className="flex items-center space-x-1">
                    <span>Rating Rata-rata</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-4 cursor-pointer hover:text-white" onClick={() => handleSort('negative_pct')}>
                  <div className="flex items-center space-x-1">
                    <span>Tingkat Negatif (%)</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-4 cursor-pointer hover:text-white" onClick={() => handleSort('positive_pct')}>
                  <div className="flex items-center space-x-1">
                    <span>Tingkat Positif (%)</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-4">Status Kualitas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {sortedVersions.map((item, idx) => {
                const isHighNeg = item.negative_pct >= 50
                const isModerate = item.negative_pct >= 40 && item.negative_pct < 50
                return (
                  <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-2.5 px-4 font-bold text-white">v{item.version}</td>
                    <td className="py-2.5 px-4 font-mono">{item.review_count.toLocaleString('id-ID')}</td>
                    <td className="py-2.5 px-4 font-semibold text-amber-400">{item.avg_rating} ⭐</td>
                    <td className="py-2.5 px-4 font-semibold text-rose-400">{item.negative_pct}%</td>
                    <td className="py-2.5 px-4 font-semibold text-emerald-400">{item.positive_pct}%</td>
                    <td className="py-2.5 px-4">
                      {isHighNeg ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                          Critical Regress
                        </span>
                      ) : isModerate ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          Needs Attention
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          Stable
                        </span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}
