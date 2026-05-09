import React, { useState } from 'react';
import { Search, Sparkles, MessageSquare, ArrowRight, Loader2, Info } from 'lucide-react';
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
        <button type="submit" className="btn-primary semantic-btn" disabled={loading || !query.trim()}>
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

      <style dangerouslySetInnerHTML={{ __html: `
        .semantic-search-container {
          margin-bottom: 24px;
        }
        .semantic-input-group {
          display: flex;
          gap: 12px;
          position: relative;
        }
        .input-with-icon {
          flex: 1;
          position: relative;
        }
        .sparkle-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #C17F59;
        }
        .semantic-input-group input {
          width: 100%;
          padding: 14px 14px 14px 48px;
          border-radius: 12px;
          border: 2px solid rgba(193, 127, 89, 0.15);
          background: rgba(255, 255, 255, 0.8);
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(193, 127, 89, 0.04);
        }
        .semantic-input-group input:focus {
          outline: none;
          border-color: #C17F59;
          background: #FFFFFF;
          box-shadow: 0 8px 24px rgba(193, 127, 89, 0.08);
        }
        .semantic-btn {
          width: 52px;
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          padding: 0;
        }
        .semantic-error {
          margin-top: 12px;
          padding: 12px 16px;
          background: rgba(199, 80, 80, 0.05);
          border: 1px solid rgba(199, 80, 80, 0.1);
          border-radius: 8px;
          color: #C75050;
          font-size: 13px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .semantic-result-area {
          margin-top: 20px;
          background: #FFFFFF;
          border: 1px solid rgba(26, 25, 23, 0.08);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 12px 40px rgba(26, 25, 23, 0.06);
        }
        .result-answer {
          padding: 24px;
          border-bottom: 1px solid rgba(26, 25, 23, 0.06);
          background: linear-gradient(to bottom right, rgba(193, 127, 89, 0.03), transparent);
        }
        .answer-header {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #C17F59;
          margin-bottom: 12px;
        }
        .answer-text {
          font-size: 15px;
          line-height: 1.6;
          color: #1A1917;
          white-space: pre-wrap;
        }
        .result-sources {
          padding: 20px 24px;
          background: rgba(26, 25, 23, 0.01);
        }
        .sources-label {
          font-size: 11px;
          font-weight: 600;
          color: #6B6966;
          text-transform: uppercase;
          margin-bottom: 12px;
        }
        .sources-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .source-item {
          padding: 12px;
          border-radius: 8px;
          background: #FFFFFF;
          border: 1px solid rgba(26, 25, 23, 0.06);
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .source-item:hover {
          border-color: #C17F59;
          background: rgba(193, 127, 89, 0.02);
          transform: translateX(4px);
        }
        .source-title {
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 4px;
        }
        .source-meta {
          font-size: 11px;
          color: #6B6966;
          display: flex;
          gap: 8px;
        }
        .source-score {
          color: #C17F59;
          font-weight: 600;
        }
        .spin { animation: rotate 1s linear infinite; }
        @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-fade-in { animation: fadeIn 0.4s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}} />
    </div>
  );
}
