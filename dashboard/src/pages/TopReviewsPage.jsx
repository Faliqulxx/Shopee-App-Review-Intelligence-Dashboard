import React, { useState } from 'react'
import { Star, ThumbsUp, Search, Calendar, Filter, MessageSquare, Tag } from 'lucide-react'

export default function TopReviewsPage({ topReviews }) {
  const [activeSentiment, setActiveSentiment] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  if (!topReviews) return null

  // Combine or filter reviews
  let allReviewsList = []
  if (activeSentiment === 'all') {
    allReviewsList = [
      ...(topReviews.negatif || []),
      ...(topReviews.positif || []),
      ...(topReviews.netral || []),
    ].sort((a, b) => b.thumbsUpCount - a.thumbsUpCount)
  } else {
    allReviewsList = topReviews[activeSentiment] || []
  }

  // Filter by search query
  const filteredReviews = allReviewsList.filter(r => 
    r.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.userName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const sentimentTabs = [
    { id: 'all', label: 'Semua Ulasan Impact' },
    { id: 'negatif', label: 'Negatif High Impact', count: topReviews.negatif?.length || 0 },
    { id: 'positif', label: 'Positif High Impact', count: topReviews.positif?.length || 0 },
    { id: 'netral', label: 'Netral High Impact', count: topReviews.netral?.length || 0 },
  ]

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div>
        <h2 className="text-xl font-bold text-white flex items-center space-x-2">
          <Star className="w-5 h-5 text-orange-400" />
          <span>Top Impact Reviews</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Daftar ulasan yang paling banyak mendapat dukungan (<span className="text-orange-400 font-semibold">thumbsUpCount</span>) dari pengguna lain di Google Play Store.
        </p>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 glass-card p-4 rounded-2xl border border-slate-800">
        
        {/* Tabs */}
        <div className="flex items-center space-x-1 overflow-x-auto w-full sm:w-auto">
          {sentimentTabs.map(tab => {
            const isActive = activeSentiment === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSentiment(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? tab.id === 'negatif'
                      ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20'
                      : tab.id === 'positif'
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                      : tab.id === 'netral'
                      ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20'
                      : 'bg-gradient-to-r from-[#EE4D2D] to-[#FF5722] text-white shadow-lg shadow-orange-500/20'
                    : 'text-slate-400 hover:text-slate-200 bg-slate-900/60 hover:bg-slate-800'
                }`}
              >
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari kata di ulasan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-orange-500"
          />
        </div>

      </div>

      {/* Reviews Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredReviews.map((review, idx) => {
          const isPos = review.predicted_sentiment === 'positif'
          const isNeg = review.predicted_sentiment === 'negatif'

          return (
            <div
              key={idx}
              className={`p-5 rounded-2xl glass-card border flex flex-col justify-between space-y-3 ${
                isNeg
                  ? 'border-rose-500/20 hover:border-rose-500/40'
                  : isPos
                  ? 'border-emerald-500/20 hover:border-emerald-500/40'
                  : 'border-amber-500/20 hover:border-amber-500/40'
              }`}
            >
              <div>
                {/* Review Top Meta */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-slate-300">
                      {review.userName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white max-w-[150px] sm:max-w-[200px] truncate">{review.userName}</h4>
                      <p className="text-[10px] text-slate-500 flex items-center space-x-1">
                        <Calendar className="w-3 h-3 inline" />
                        <span>{review.at ? new Date(review.at).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' }) : '—'}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end space-y-1">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                      isNeg
                        ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                        : isPos
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}>
                      {review.score} ⭐ ({review.predicted_sentiment.toUpperCase()})
                    </span>
                    {review.topic_label && (
                      <span className="text-[10px] text-slate-400 flex items-center space-x-1">
                        <Tag className="w-3 h-3 text-orange-400" />
                        <span className="truncate max-w-[140px]">{review.topic_label}</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Review Content */}
                <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                  "{review.content}"
                </p>
              </div>

              {/* Review Bottom Meta */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="flex items-center space-x-1.5 text-orange-400 font-bold bg-orange-500/10 px-2.5 py-1 rounded-lg border border-orange-500/20">
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>{review.thumbsUpCount.toLocaleString('id-ID')} Pengguna Mendukung</span>
                </span>
                <span className="text-[10px] text-slate-500">Google Play Review</span>
              </div>
            </div>
          )
        })}
      </div>

      {filteredReviews.length === 0 && (
        <div className="glass-card p-12 rounded-2xl border border-slate-800 text-center space-y-2">
          <MessageSquare className="w-8 h-8 text-slate-600 mx-auto" />
          <p className="text-sm font-semibold text-slate-300">Tidak ada ulasan ditemukan.</p>
          <p className="text-xs text-slate-500">Coba ubah filter atau kata kunci pencarian Anda.</p>
        </div>
      )}

    </div>
  )
}
