import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import OverviewPage from './pages/OverviewPage'
import VersionQualityPage from './pages/VersionQualityPage'
import TopicAnalysisPage from './pages/TopicAnalysisPage'
import TopReviewsPage from './pages/TopReviewsPage'
import { Loader2, AlertTriangle, RefreshCw, CheckCircle2 } from 'lucide-react'

export default function App() {
  const [activeTab, setActiveTab] = useState('overview')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Data states
  const [overview, setOverview] = useState(null)
  const [trend, setTrend] = useState(null)
  const [versionData, setVersionData] = useState(null)
  const [topics, setTopics] = useState(null)
  const [topReviews, setTopReviews] = useState(null)
  const [wordcloudData, setWordcloudData] = useState(null)

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    try {
      const [
        overviewRes,
        trendRes,
        versionRes,
        topicsRes,
        topReviewsRes,
        wordcloudRes
      ] = await Promise.all([
        fetch('/data/overview.json'),
        fetch('/data/sentiment_trend.json'),
        fetch('/data/version_quality.json'),
        fetch('/data/topics.json'),
        fetch('/data/top_reviews.json'),
        fetch('/data/wordcloud_data.json')
      ])

      if (!overviewRes.ok || !trendRes.ok || !versionRes.ok || !topicsRes.ok || !topReviewsRes.ok || !wordcloudRes.ok) {
        throw new Error('Gagal memuat satu atau lebih file JSON data dashboard.')
      }

      const [ovData, trData, verData, topData, revData, wcData] = await Promise.all([
        overviewRes.json(),
        trendRes.json(),
        versionRes.json(),
        topicsRes.json(),
        topReviewsRes.json(),
        wordcloudRes.json()
      ])

      setOverview(ovData)
      setTrend(trData)
      setVersionData(verData)
      setTopics(topData)
      setTopReviews(revData)
      setWordcloudData(wcData)
    } catch (err) {
      console.error("Data Fetch Error:", err)
      setError(err.message || 'Terjadi kesalahan saat memuat data.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col justify-between">
      
      <div>
        {/* Header */}
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          totalReviews={overview?.total_reviews}
        />

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
              <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
              <p className="text-sm font-medium text-slate-400 animate-pulse">
                Memuat data analitik ulasan Shopee (85,499 ulasan)...
              </p>
            </div>
          )}

          {/* Error State */}
          {!loading && error && (
            <div className="max-w-md mx-auto p-6 glass-card border border-rose-500/30 rounded-2xl text-center space-y-4 my-12">
              <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto border border-rose-500/30">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Gagal Memuat Data Dashboard</h3>
                <p className="text-xs text-slate-400 mt-1">{error}</p>
              </div>
              <button
                onClick={fetchData}
                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-bold inline-flex items-center space-x-2 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Coba Lagi</span>
              </button>
            </div>
          )}

          {/* Loaded Pages */}
          {!loading && !error && (
            <>
              {activeTab === 'overview' && (
                <OverviewPage overview={overview} trend={trend} topics={topics} />
              )}
              {activeTab === 'version' && (
                <VersionQualityPage versionData={versionData} />
              )}
              {activeTab === 'topics' && (
                <TopicAnalysisPage topics={topics} wordcloudData={wordcloudData} />
              )}
              {activeTab === 'reviews' && (
                <TopReviewsPage topReviews={topReviews} />
              )}
            </>
          )}

        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/60 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-slate-400">Shopee App Review Intelligence Dashboard</span>
            <span>•</span>
            <span>Fase 6 Product Release</span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="flex items-center space-x-1 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Machine Learning Verified</span>
            </span>
            <span>•</span>
            <span>Vite + React + Tailwind CSS</span>
          </div>
        </div>
      </footer>

    </div>
  )
}
