'use client';

import { useState, useMemo, useEffect } from 'react';
import { Sparkles, Bot, Search, BookOpen, Clock, AlertCircle } from 'lucide-react';
import { runLocalExtractiveSummary, runLocalSemanticSearch, type LocalSummaryResult } from '../../lib/operations/ai-local';
import { extractPdfText } from '../../lib/operations/text-extract';
import { useOptionalByok } from '../../context/ByokContext';

interface AiSummarizerInterfaceProps {
  fullText?: string;
  pageTexts?: string[];
  file?: File;
}

export default function AiSummarizerInterface({ fullText = '', pageTexts = [], file }: AiSummarizerInterfaceProps) {
  const [extractedFullText, setExtractedFullText] = useState(fullText);
  const [extractedPageTexts, setExtractedPageTexts] = useState(pageTexts);
  const [summaryMode, setSummaryMode] = useState<'short' | 'medium' | 'detailed'>('medium');
  const [searchQuery, setSearchQuery] = useState('');
  const [useByok, setUseByok] = useState(false);

  const byokCtx = useOptionalByok();
  const [localApiKey, setLocalApiKey] = useState('');
  const [localProvider, setLocalProvider] = useState<'gemini' | 'openai' | 'anthropic'>('gemini');

  const apiKey = byokCtx ? byokCtx.apiKey : localApiKey;
  const setApiKey = byokCtx ? byokCtx.setApiKey : setLocalApiKey;
  const provider = byokCtx ? byokCtx.provider : localProvider;
  const setProvider = byokCtx ? byokCtx.setProvider : setLocalProvider;

  const [llmResponse, setLlmResponse] = useState<string | null>(null);
  const [isCallingLlm, setIsCallingLlm] = useState(false);

  useEffect(() => {
    if (file) {
      extractPdfText(file).then((res) => {
        setExtractedFullText(res.fullText);
        setExtractedPageTexts(res.pageTexts);
      }).catch(console.error);
    } else {
      setExtractedFullText(fullText);
      setExtractedPageTexts(pageTexts);
    }
  }, [file, fullText, pageTexts]);

  // Run 100% offline local extractive summary
  const summary: LocalSummaryResult = useMemo(() => {
    return runLocalExtractiveSummary(extractedFullText, summaryMode);
  }, [extractedFullText, summaryMode]);

  // Run local semantic search
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return runLocalSemanticSearch(extractedPageTexts, searchQuery);
  }, [extractedPageTexts, searchQuery]);

  const handleRunLlm = async () => {
    if (!apiKey) return;
    setIsCallingLlm(true);
    setLlmResponse(null);

    try {
      if (provider === 'gemini') {
        const prompt = `Summarize the following document into key insights and executive takeaways:\n\n${fullText.slice(0, 15000)}`;
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
          }
        );
        const data = await res.json();
        const output = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated.';
        setLlmResponse(output);
      } else if (provider === 'openai') {
        const res = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              { role: 'system', content: 'You are a helpful document assistant.' },
              { role: 'user', content: `Summarize the document into key takeaways:\n\n${fullText.slice(0, 15000)}` },
            ],
          }),
        });
        const data = await res.json();
        const output = data?.choices?.[0]?.message?.content || 'No response generated.';
        setLlmResponse(output);
      }
    } catch (err) {
      console.error('LLM API Error:', err);
      setLlmResponse('Error contacting API. Please verify your API key.');
    } finally {
      setIsCallingLlm(false);
    }
  };

  return (
    <div className="surface-card rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5 sm:p-7 space-y-6 shadow-sm animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border)]">
        <div>
          <h3 className="text-lg font-bold text-[var(--tx)] flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[var(--accent)]" />
            AI Document Summarizer &amp; Insights
          </h3>
          <p className="text-xs text-[var(--tx-2)] mt-0.5">
            100% offline local NLP engine extracts executive summaries, bullet points, and key metrics with zero cloud calls.
          </p>
        </div>

        {/* Local vs BYOK toggle */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setUseByok(false)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              !useByok ? 'bg-[var(--accent)] text-white shadow-xs' : 'bg-[var(--bg-subtle)] text-[var(--tx-2)] hover:text-[var(--tx)]'
            }`}
          >
            100% Offline Local
          </button>
          <button
            type="button"
            onClick={() => setUseByok(true)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              useByok ? 'bg-[var(--accent)] text-white shadow-xs' : 'bg-[var(--bg-subtle)] text-[var(--tx-2)] hover:text-[var(--tx)]'
            }`}
          >
            Custom API Key (BYOK)
          </button>
        </div>
      </div>

      {!useByok ? (
        <div className="space-y-6">
          {/* Document Intelligence Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] space-y-1">
              <span className="text-[11px] font-semibold text-[var(--tx-3)] uppercase">Reading Time</span>
              <p className="text-base font-extrabold text-[var(--tx)] flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-[var(--accent)]" />
                ~{summary.statistics.estimatedReadingTimeMinutes} min
              </p>
            </div>
            <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] space-y-1">
              <span className="text-[11px] font-semibold text-[var(--tx-3)] uppercase">Total Word Count</span>
              <p className="text-base font-extrabold text-[var(--tx)]">
                {summary.statistics.totalWords.toLocaleString()}
              </p>
            </div>
            <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] space-y-1">
              <span className="text-[11px] font-semibold text-[var(--tx-3)] uppercase">Sentences</span>
              <p className="text-base font-extrabold text-[var(--tx)]">
                {summary.statistics.totalSentences}
              </p>
            </div>
            <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] space-y-1">
              <span className="text-[11px] font-semibold text-[var(--tx-3)] uppercase">Vocabulary Richness</span>
              <p className="text-base font-extrabold text-emerald-500">
                {summary.statistics.vocabularyRichness}
              </p>
            </div>
          </div>

          {/* Executive Overview */}
          <div className="space-y-3 p-5 rounded-xl border border-[var(--border)] bg-[var(--bg)]">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-[var(--tx)] uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="h-3.5 w-3.5 text-[var(--accent)]" />
                Executive Overview
              </h4>

              <div className="flex items-center gap-1">
                {(['short', 'medium', 'detailed'] as const).map((len) => (
                  <button
                    key={len}
                    type="button"
                    onClick={() => setSummaryMode(len)}
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase transition-colors ${
                      summaryMode === len
                        ? 'bg-[var(--accent-soft)] text-[var(--accent)] border border-[var(--accent-border)]'
                        : 'text-[var(--tx-3)] hover:text-[var(--tx)]'
                    }`}
                  >
                    {len}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[var(--tx-2)] leading-relaxed font-sans">
              {summary.overview}
            </p>
          </div>

          {/* Key Takeaway Bullet Points */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[var(--tx)] uppercase tracking-wider">
              Salient Points &amp; Highlights
            </h4>
            <ul className="space-y-2">
              {summary.keyPoints.map((pt, i) => (
                <li key={i} className="flex items-start gap-2.5 p-3 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-xs text-[var(--tx-2)] leading-relaxed">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[10px] font-bold text-[var(--accent)] border border-[var(--accent-border)] mt-0.5">
                    {i + 1}
                  </span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Top Keyword Tags */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-[var(--tx)] uppercase tracking-wider">
              Top Concept Keywords
            </h4>
            <div className="flex flex-wrap gap-2">
              {summary.topKeywords.map(({ word, count }) => (
                <span
                  key={word}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-xs font-medium text-[var(--tx)]"
                >
                  <span>{word}</span>
                  <span className="text-[10px] font-mono text-[var(--accent)] font-bold">×{count}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Instant Q&A / Semantic Search */}
          <div className="space-y-3 pt-4 border-t border-[var(--border)]">
            <h4 className="text-xs font-bold text-[var(--tx)] uppercase tracking-wider flex items-center gap-1.5">
              <Search className="h-3.5 w-3.5 text-[var(--accent)]" />
              Instant Document Semantic Search
            </h4>
            <input
              type="text"
              placeholder="Ask a question or search for key terms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 text-xs rounded-xl border border-[var(--border)] bg-[var(--bg)] text-[var(--tx)] placeholder:text-[var(--tx-3)] focus:outline-none focus:border-[var(--accent)]"
            />

            {searchResults.length > 0 && (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {searchResults.map((res, i) => (
                  <div key={i} className="p-3 rounded-xl border border-[var(--border)] bg-[var(--bg)] space-y-1">
                    <span className="text-[10px] font-bold text-[var(--accent)] uppercase">
                      Page {res.pageNumber}
                    </span>
                    <p className="text-xs text-[var(--tx-2)] leading-relaxed">{res.snippet}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* BYOK Mode */
        <div className="space-y-5 p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg)]">
          <div className="flex items-start gap-3 p-3.5 rounded-xl border border-amber-500/20 bg-amber-500/10 text-amber-600 text-xs">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <p>
              <strong>Opt-In AI API:</strong> Your API key is stored only in your local session and sent directly from your browser to the selected AI provider. No files or keys are stored on our servers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[var(--tx)]">Select Provider</label>
              <select
                value={provider}
                onChange={(e) => setProvider(e.target.value as 'gemini' | 'openai' | 'anthropic')}
                className="w-full text-xs p-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] text-[var(--tx)]"
              >
                <option value="gemini">Google Gemini (Recommended)</option>
                <option value="openai">OpenAI (GPT-4o Mini)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[var(--tx)]">Enter API Key</label>
              <input
                type="password"
                placeholder="Paste your API key here"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] text-[var(--tx)] focus:outline-none focus:border-[var(--accent)] font-mono"
              />
            </div>
          </div>

          <button
            type="button"
            disabled={!apiKey || isCallingLlm}
            onClick={handleRunLlm}
            className="w-full py-3 px-4 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] disabled:opacity-40 text-white font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <Bot className="h-4 w-4" />
            <span>{isCallingLlm ? 'Analyzing with AI Model...' : 'Run Generative AI Analysis'}</span>
          </button>

          {llmResponse && (
            <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] space-y-2">
              <h5 className="text-xs font-bold text-[var(--tx)]">AI Response</h5>
              <div className="text-xs sm:text-sm text-[var(--tx-2)] leading-relaxed whitespace-pre-wrap">
                {llmResponse}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
