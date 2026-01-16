'use client';

interface AnalysisData {
  summary: string;
  key_insights: string[];
  potential_gaps: string[];
  next_research_directions: string[];
  bias_analysis?: string;
  sources_cited: string[]; 
}

interface AnalysisPanelProps {
  data: AnalysisData;
}

export default function AnalysisPanel({ data }: AnalysisPanelProps) {
  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-cyan-500/30 rounded-lg p-6">
        <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
          <span>✨</span> AI Analysis Summary
        </h3>
        <p className="text-gray-200 leading-relaxed">{data.summary}</p>
      </div>

      {/* Key Insights */}
      <div className="bg-blue-600/10 border border-blue-500/20 rounded-lg p-6">
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
          <span>💡</span> Key Insights
        </h3>
        <div className="space-y-3">
          {data.key_insights.map((insight, idx) => (
            <div key={idx} className="flex gap-3 p-3 bg-blue-900/30 rounded-lg border border-blue-500/20">
              <span className="text-cyan-400 font-bold">{idx + 1}.</span>
              <span className="text-gray-200">{insight}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Potential Gaps */}
      <div className="bg-blue-600/10 border border-blue-500/20 rounded-lg p-6">
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
          <span>🔍</span> Research Gaps Identified
        </h3>
        <div className="space-y-2">
          {data.potential_gaps.map((gap, idx) => (
            <div key={idx} className="flex items-start gap-3 p-2">
              <span className="text-orange-400 mt-1">⚠️</span>
              <span className="text-gray-300">{gap}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Next Directions */}
      <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-lg p-6">
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
          <span>🚀</span> Suggested Next Directions
        </h3>
        <div className="space-y-3">
          {data.next_research_directions.map((direction, idx) => (
            <button
              key={idx}
              className="w-full text-left p-3 bg-purple-900/30 hover:bg-purple-900/50 rounded-lg border border-purple-500/20 hover:border-purple-400/50 transition"
            >
              <div className="flex items-center justify-between">
                <span className="text-gray-200">{direction}</span>
                <span className="text-purple-400">→</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Bias Analysis */}
      {data.bias_analysis && (
        <div className="bg-yellow-600/10 border border-yellow-500/20 rounded-lg p-6">
          <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
            <span>⚖️</span> Bias Analysis
          </h3>
          <p className="text-gray-200 text-sm whitespace-pre-line">{data.bias_analysis}</p>
        </div>
      )}

      {/* Sources */}
      <div className="bg-blue-600/10 border border-blue-500/20 rounded-lg p-6">
        <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
          <span>📚</span> Sources Cited ({data.sources_cited.length})
        </h3>
        <div className="space-y-2">
          {data.sources_cited.map((source, idx) => (
            <div key={idx} className="flex items-center gap-2 p-2 text-sm text-gray-300">
              <span className="text-cyan-400">[{idx + 1}]</span>
              <span>{source}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Export Options */}
      <div className="flex gap-2 justify-center">
        <button className="px-4 py-2 bg-blue-600/50 hover:bg-blue-600/70 rounded-lg text-sm font-medium transition border border-blue-400/50">
          📥 Export PDF
        </button>
        <button className="px-4 py-2 bg-blue-600/50 hover:bg-blue-600/70 rounded-lg text-sm font-medium transition border border-blue-400/50">
          💾 Save to Vault
        </button>
        <button className="px-4 py-2 bg-blue-600/50 hover:bg-blue-600/70 rounded-lg text-sm font-medium transition border border-blue-400/50">
          🔗 Copy Link
        </button>
      </div>
    </div>
  );
}
