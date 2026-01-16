'use client';

import { useState } from 'react';
import SearchPanel from '@/components/SearchPanel';
import AnalysisPanel from '@/components/AnalysisPanel';
import VaultPanel from '@/components/VaultPanel';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('search');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [analysis, setAnalysis] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white">
      {/* Animated background */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl animate-pulse pointer-events-none animate-delay-2s"></div>
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-cyan-600/5 rounded-full blur-3xl animate-pulse pointer-events-none animate-delay-2s"></div>

      {/* Header */}
      <header className="relative z-10 border-b border-blue-500/20 bg-blue-950/30 backdrop-blur-sm sticky top-0">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center font-bold">
                OM
              </div>
              <div>
                <h1 className="text-2xl font-bold">OmniMind</h1>
                <p className="text-xs text-gray-400">AI Research Intelligence</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">Research Dashboard</p>
              <p className="text-xs text-gray-400">System Online</p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 border-b border-blue-500/10">
            {[
              { id: 'search', label: '🔍 Search' },
              { id: 'analysis', label: '✨ Analysis' },
              { id: 'vault', label: '🔐 Vault' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-3 font-medium transition-all border-b-2 ${
                  activeTab === tab.id
                    ? 'border-cyan-400 text-cyan-400 bg-blue-900'
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:bg-blue-500'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-5 max-w-7xl mx-auto px-6 py-8">
        {/* Search Tab */}
        {activeTab === 'search' && (
          <div className="grid md:grid-cols-4 gap-6">
            <div className="md:col-span-3">
              <div className="bg-blue-600/10 border border-blue-500/20 rounded-xl p-6 backdrop-blur-sm">
                <h2 className="text-xl font-bold mb-4">Multi-Source Search</h2>
                <SearchPanel
                  onResults={setSearchResults}
                  onAnalysis={setAnalysis}
                />
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <div className="bg-blue-600/10 border border-blue-500/20 rounded-xl p-6 backdrop-blur-sm">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <span>📊</span> Search Stats
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-gray-400">Results Found</p>
                    <p className="text-xl font-bold text-cyan-400">{searchResults.length}</p>
                  </div>
                  <div className="border-t border-blue-500/10 pt-3">
                    <p className="text-gray-400">Status</p>
                    <p className="text-sm text-green-400">✓ Ready</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-600/10 border border-blue-500/20 rounded-xl p-6 backdrop-blur-sm">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <span>💡</span> Tips
                </h3>
                <ul className="space-y-2 text-xs text-gray-300 leading-relaxed">
                  <li>• Use keywords specific to your topic</li>
                  <li>• Select "academic" for peer-reviewed</li>
                  <li>• Combine with analysis for insights</li>
                  <li>• Save to vault for later review</li>
                </ul>
              </div>
            </aside>
          </div>
        )}

        {/* Analysis Tab */}
        {activeTab === 'analysis' && (
          <div className="space-y-6">
            {analysis ? (
              <AnalysisPanel data={analysis} />
            ) : (
              <div className="bg-blue-600/10 border border-blue-500/20 rounded-xl p-12 text-center backdrop-blur-sm">
                <p className="text-gray-400">Perform a search first and click "Analyze Results" to see analysis</p>
              </div>
            )}
          </div>
        )}

        {/* Vault Tab */}
        {activeTab === 'vault' && (
          <div className="bg-blue-600/10 border border-blue-500/20 rounded-xl p-6 backdrop-blur-sm">
            <VaultPanel />
          </div>
        )}
      </main>

      {/* Footer Status Bar */}
      <footer className="relative z-10 border-t border-blue-500/20 bg-blue-950/30 backdrop-blur-sm mt-12">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>System Online</span>
            </div>
            <span className="text-xs">|</span>
            <span>Backend: http://localhost:8000</span>
          </div>
          <span>© 2026 OmniMind - All Rights Reserved</span>
        </div>
      </footer>
    </div>
  );
}
