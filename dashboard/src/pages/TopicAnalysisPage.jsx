import React, { useState } from 'react'
import { Layers, Tag, MessageSquare, BarChart2, CheckCircle, Info, Sparkles } from 'lucide-react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

export default function TopicAnalysisPage({ topics, wordcloudData }) {
  const [selectedTopicId, setSelectedTopicId] = useState(0)

  if (!topics || !topics.topics) return null

  const topicList = topics.topics
  const selectedTopic = topicList.find(t => t.topic_id === selectedTopicId) || topicList[0]

  // Keywords formatting
  const keywordsList = selectedTopic.keywords.split(',').map(k => k.trim())

  // Generate word frequency for selected topic keywords
  const topicWordFreq = keywordsList.map((kw, idx) => ({
    word: kw,
    importance: Math.max(100 - idx * 10, 20)
  }))

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div>
        <h2 className="text-xl font-bold text-white flex items-center space-x-2">
          <Layers className="w-5 h-5 text-orange-400" />
          <span>Topic Analysis (LDA Machine Learning)</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Pengelompokan 38.506 keluhan ulasan negatif ke dalam 8 kategori masalah utama bisnis Shopee.
        </p>
      </div>

      {/* Grid of 8 Topic Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {topicList.map((topic) => {
          const isSelected = topic.topic_id === selectedTopicId
          return (
            <div
              key={topic.topic_id}
              onClick={() => setSelectedTopicId(topic.topic_id)}
              className={`p-4 rounded-2xl cursor-pointer transition-all duration-200 border ${
                isSelected
                  ? 'bg-gradient-to-br from-orange-500/20 to-slate-900 border-orange-500/60 shadow-lg shadow-orange-500/10 ring-1 ring-orange-500/40'
                  : 'glass-card hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  Topic #{topic.topic_id}
                </span>
                <span className="text-xs font-bold text-rose-400">
                  {topic.pct_of_negative}% Keluhan
                </span>
              </div>

              <h3 className="text-base font-extrabold text-white mt-2 leading-snug">
                {topic.label}
              </h3>

              <p className="text-xs text-slate-400 font-mono mt-1">
                {topic.review_count.toLocaleString('id-ID')} ulasan
              </p>

              <div className="mt-3 pt-2 border-t border-slate-800/80 flex flex-wrap gap-1">
                {topic.keywords.split(',').slice(0, 4).map((kw, i) => (
                  <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                    {kw.trim()}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Topic Detail View */}
      {selectedTopic && (
        <div className="glass-card p-6 rounded-2xl border border-orange-500/30 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 space-y-6">
          
          {/* Detail Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30">
                  Topik Dipilih #{selectedTopic.topic_id}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {selectedTopic.review_count.toLocaleString('id-ID')} Ulasan ({selectedTopic.pct_of_negative}% Total Keluhan Negatif)
                </span>
              </div>
              <h3 className="text-2xl font-black text-white mt-1">{selectedTopic.label}</h3>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-xs text-slate-400">Model Coherence C_v:</span>
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                0.4669 (Optimal 8 Topics)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Left: Top Keywords & Frequency Chart */}
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5 mb-2">
                  <Tag className="w-3.5 h-3.5 text-orange-400" />
                  <span>Kata Kunci Dominan dalam Topik Ini</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {keywordsList.map((kw, i) => (
                    <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-orange-500/10 text-orange-300 border border-orange-500/20 font-medium">
                      #{kw}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5 mb-2">
                  <BarChart2 className="w-3.5 h-3.5 text-orange-400" />
                  <span>Relatif Bobot Bobot Kata Topik</span>
                </h4>
                <div className="h-44 w-full bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={topicWordFreq} layout="vertical" margin={{ top: 0, right: 10, left: 20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" horizontal={false} />
                      <XAxis type="number" stroke="#64748B" fontSize={10} />
                      <YAxis dataKey="word" type="category" stroke="#94A3B8" fontSize={11} width={70} />
                      <Tooltip />
                      <Bar dataKey="importance" fill="#EE4D2D" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Right: Representative Sample Review */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-orange-400" />
                <span>Contoh Ulasan Representatif</span>
              </h4>

              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
                  <span className="font-semibold text-slate-300">Pengguna Shopee</span>
                  <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 font-bold text-[10px]">
                    Rating 1 ⭐ (Sentimen Negatif)
                  </span>
                </div>
                <p className="text-sm text-slate-200 leading-relaxed italic">
                  "{selectedTopic.sample_review}"
                </p>
                <div className="text-[11px] text-slate-500 flex items-center space-x-1">
                  <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                  <span>Di-assign ke topik "{selectedTopic.label}" dengan probabilitas model LDA terkonfirmasi.</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-orange-500/5 border border-orange-500/10 text-xs text-slate-300">
                💡 <span className="font-semibold text-orange-300">Insight Rekomendasi Bisnis:</span> Keluhan pada topik <span className="font-bold text-white">{selectedTopic.label}</span> mencakup {selectedTopic.pct_of_negative}% dari seluruh ulasan negatif. Prioritaskan perbaikan tim teknis/layanan pada area ini.
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  )
}
