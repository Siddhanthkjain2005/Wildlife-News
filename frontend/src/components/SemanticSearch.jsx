import React, { useState } from 'react';
import { Sparkles, MessageSquare, ArrowRight, Loader2, Info } from 'lucide-react';
import { postJson, ENDPOINTS } from '../lib/api';

export default function SemanticSearch({ onSelectIncident }) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const response = await postJson(ENDPOINTS.ragQuery, {
        query: query.trim(),
        top_k: 5
      });
      setResult(response);
    } catch (err) {
      setError(err.message || "Failed to process natural language query.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="semantic-search-container">
      <form onSubmit={handleSearch} className="semantic-input-group">
        <div className="input-with-icon">
          <Sparkles size={18} className="sparkle-icon" />
          <input
            type="text"
            placeholder="Ask anything (e.g. 'What are the main smuggling routes for pangolins in Odisha?')"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={loading}
          />
        </div>
        <button type="submit" className="btn btn-primary semantic-btn" disabled={loading || !query.trim()}>
          {loading ? <Loader2 size={18} className="spin" /> : <ArrowRight size={18} />}
        </button>
      </form>

      {error && (
        <div className="semantic-error">
          <Info size={14} />
          <span>{error}</span>
        </div>
      )}

      {result && (
        <div className="semantic-result-area animate-fade-in">
          <div className="result-answer">
            <div className="answer-header">
              <MessageSquare size={16} />
              <span>Intelligence Analysis</span>
            </div>
            <div className="answer-text">
              {result.answer}
            </div>
          </div>

          <div className="result-sources">
            <div className="sources-label">Citations ({result.sources?.length || 0})</div>
            <div className="sources-list">
              {result.sources?.map((src, idx) => (
                <div key={idx} className="source-item" onClick={() => onSelectIncident?.(src.id)}>
                  <div className="source-title">{src.title}</div>
                  <div className="source-meta">
                    <span className="source-score">Relevance: {(src.relevance * 100).toFixed(0)}%</span>
                    <span>•</span>
                    <span>{src.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
