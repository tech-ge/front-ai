'use client';

import { useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface SearchResult {
  title: string;
  url: string;
  source: string;
  snippet: string;
  relevance_score: number; 
  published_date?: string;
  author?: string; 
  citations?: number;
}

interface SearchPanelProps {
  onResults?: (results: SearchResult[]) => void;
  onAnalysis?: (data: any) => void;
}

export default function SearchPanel({ onResults, onAnalysis }: SearchPanelProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedSource, setSelectedSource] = useState('all');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/search/unified`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: query,
          limit: 10
        })
      });

      const data = await response.json();
      const searchResults = data.results || [];
      setResults(searchResults);
      onResults?.(searchResults);
    } catch (error) {
      console.error('Search failed:', error);
      alert(`Search failed. Make sure backend is running on ${API_URL}`);
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyze = async () => {
    if (results.length === 0) return;
    
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/analysis/synthesize`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: query,
          search_results: results
        })
      });

      const data = await response.json();
      onAnalysis?.(data);
    } catch (error) {
      console.error('Analysis failed:', error);
      alert('Analysis failed. Check network tab for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <form onSubmit={handleSearch} className="space-y-3">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask anything... research, predictions, trends, analysis"
            className="w-full bg-blue-900/30 border border-blue-500/50 rounded-lg px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:bg-blue-900/50 transition"
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute right-2 top-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-600 rounded-lg font-medium transition"
          >
            {loading ? '⏳ Searching...' : '🔍 Search'}
          </button>
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all', 'academic', 'news', 'web'].map((source) => (
            <button
              key={source}
              type="button"
              onClick={() => setSelectedSource(source)}
              className={`px-3 py-1 text-xs rounded border transition ${
                selectedSource === source
                  ? 'bg-cyan-600 border-cyan-400'
                  : 'bg-blue-600 hover:bg-blue-500 border-blue-500'
              }`}
            >
              {source === 'all' ? '📚 All' : source === 'academic' ? '🎓 Academic' : source === 'news' ? '📰 News' : '🌐 Web'}
            </button>
          ))}
        </div>
      </form>

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg">Search Results ({results.length})</h3>
            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="px-4 py-2 bg-blue-600/50 hover:bg-blue-600/70 disabled:opacity-50 rounded-lg text-sm font-medium transition border border-blue-400/50"
            >
              ✨ Analyze Results
            </button>
          </div>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {results.map((result, idx) => (
              <div key={idx} className="bg-blue-600/10 border border-blue-500/20 rounded-lg p-4 hover:border-cyan-400/50 transition">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <a href={result.url} target="_blank" rel="noopener noreferrer" className="font-bold text-cyan-400 hover:text-cyan-300 transition block mb-1">
                      {result.title}
                    </a>
                    <p className="text-sm text-gray-300 mb-2">{result.snippet}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span className="px-2 py-1 bg-blue-600/30 rounded">{result.source}</span>
                      {result.author && <span>{result.author}</span>}
                      {result.published_date && <span>{new Date(result.published_date).toLocaleDateString()}</span>}
                      <span className="ml-auto">Relevance: {Math.round(result.relevance_score * 100)}%</span>
                    </div>
                  </div>
                  <button className="px-3 py-1 bg-blue-600/50 hover:bg-blue-600/70 rounded text-sm transition">
                    📌
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && results.length === 0 && query && (
        <div className="text-center py-12">
          <p className="text-gray-400">No results found. Try a different query.</p>
        </div>
      )}

      {!loading && results.length === 0 && !query && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">🔍</div>
          <p className="text-gray-400 mb-4">Start by asking a research question</p>
          <div className="grid grid-cols-2 gap-2 text-left text-sm">
            <div className="bg-blue-600/10 p-3 rounded border border-blue-500/20">
              <p className="font-bold text-cyan-400 mb-1">Research</p>
              <p className="text-gray-400">AI capabilities in healthcare</p>
            </div>
            <div className="bg-blue-600/10 p-3 rounded border border-blue-500/20">
              <p className="font-bold text-cyan-400 mb-1">Trends</p>
              <p className="text-gray-400">Emerging tech in 2026</p>
            </div>
            <div className="bg-blue-600/10 p-3 rounded border border-blue-500/20">
              <p className="font-bold text-cyan-400 mb-1">Compare</p>
              <p className="text-gray-400">Climate policies EU vs US</p>
            </div>
            <div className="bg-blue-600/10 p-3 rounded border border-blue-500/20">
              <p className="font-bold text-cyan-400 mb-1">Predict</p>
              <p className="text-gray-400">Stock market trends</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
