'use client';

import { useState, useEffect, useRef } from 'react';
import { Volume2, Play, Pause, Square, User } from 'lucide-react';

import { extractPdfText } from '../../lib/operations/text-extract';

interface AudioTtsInterfaceProps {
  text?: string;
  file?: File;
  documentTitle?: string;
}

export default function AudioTtsInterface({ text = '', file, documentTitle }: AudioTtsInterfaceProps) {
  const [extractedContent, setExtractedContent] = useState(text);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>('');
  const [rate, setRate] = useState<number>(1.0);
  const [pitch, setPitch] = useState<number>(1.0);
  const [currentSentence, setCurrentSentence] = useState<string>('');

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (file) {
      extractPdfText(file).then((res) => {
        setExtractedContent(res.fullText);
      }).catch(console.error);
    } else if (text) {
      setExtractedContent(text);
    }
  }, [file, text]);

  const resolvedTitle = documentTitle || file?.name || 'Document';

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const updateVoices = () => {
        const available = window.speechSynthesis.getVoices();
        setVoices(available);
        if (available.length > 0 && !selectedVoice) {
          const defaultVoice = available.find((v) => v.default) || available[0];
          setSelectedVoice(defaultVoice.name);
        }
      };

      updateVoices();
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }

    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [selectedVoice]);

  const cleanText = extractedContent.replace(/--- Page \d+ ---/g, '').trim();

  const handlePlay = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }

    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    const chosen = voices.find((v) => v.name === selectedVoice);
    if (chosen) utterance.voice = chosen;
    utterance.rate = rate;
    utterance.pitch = pitch;

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };

    utterance.onboundary = (e) => {
      if (e.name === 'sentence' || e.name === 'word') {
        const word = cleanText.slice(e.charIndex, e.charIndex + e.charLength);
        setCurrentSentence(word);
      }
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setCurrentSentence('');
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const handlePause = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      setIsPlaying(false);
    }
  };

  const handleStop = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setIsPaused(false);
      setCurrentSentence('');
    }
  };

  return (
    <div className="surface-card rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5 sm:p-7 space-y-6 shadow-sm animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border)]">
        <div>
          <h3 className="text-lg font-bold text-[var(--tx)] flex items-center gap-2">
            <Volume2 className="h-5 w-5 text-[var(--accent)]" />
            Neural Text-to-Speech Player
          </h3>
          <p className="text-xs text-[var(--tx-2)] mt-0.5">
            Reading &quot;{resolvedTitle}&quot; aloud with natural on-device speech synthesis.
          </p>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center gap-2">
          {isPlaying && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-semibold border border-emerald-500/20 animate-pulse">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Reading Aloud
            </span>
          )}
        </div>
      </div>

      {/* Control Panel */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl border border-[var(--border)] bg-[var(--bg)]">
        {/* Voice Selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[var(--tx)] flex items-center gap-1.5">
            <User className="h-3.5 w-3.5 text-[var(--accent)]" />
            Voice Selection
          </label>
          <select
            value={selectedVoice}
            onChange={(e) => setSelectedVoice(e.target.value)}
            className="w-full text-xs p-2.5 rounded-lg border border-[var(--border)] bg-[var(--bg-card)] text-[var(--tx)] focus:outline-none focus:border-[var(--accent)]"
          >
            {voices.map((v) => (
              <option key={v.name} value={v.name}>
                {v.name} ({v.lang})
              </option>
            ))}
          </select>
        </div>

        {/* Speed Slider */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-[var(--tx)]">Speed Rate</label>
            <span className="text-xs font-mono text-[var(--accent)] font-bold">{rate}x</span>
          </div>
          <input
            type="range"
            min={0.5}
            max={2.0}
            step={0.1}
            value={rate}
            onChange={(e) => setRate(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-[var(--accent)]"
          />
        </div>

        {/* Pitch Slider */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-[var(--tx)]">Voice Pitch</label>
            <span className="text-xs font-mono text-[var(--accent)] font-bold">{pitch}x</span>
          </div>
          <input
            type="range"
            min={0.5}
            max={1.5}
            step={0.1}
            value={pitch}
            onChange={(e) => setPitch(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-[var(--accent)]"
          />
        </div>
      </div>

      {/* Playback Controls & Highlight Area */}
      <div className="flex flex-col items-center space-y-4 pt-2">
        <div className="flex items-center gap-3">
          {!isPlaying ? (
            <button
              type="button"
              onClick={handlePlay}
              className="px-6 py-3 rounded-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <Play className="h-4 w-4 fill-white" />
              <span>{isPaused ? 'Resume Audio' : 'Start Reading'}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handlePause}
              className="px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <Pause className="h-4 w-4 fill-white" />
              <span>Pause Audio</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleStop}
            disabled={!isPlaying && !isPaused}
            className="p-3 rounded-full border border-[var(--border)] bg-[var(--bg)] hover:bg-[var(--bg-subtle)] disabled:opacity-40 text-[var(--tx)] transition-colors cursor-pointer"
            title="Stop Audio"
          >
            <Square className="h-4 w-4" />
          </button>
        </div>

        {currentSentence && (
          <div className="text-xs font-semibold text-[var(--accent)] italic px-3 py-1.5 rounded-lg bg-[var(--accent)]/10 border border-[var(--accent)]/20 animate-pulse">
            Speaking: &ldquo;{currentSentence}&rdquo;
          </div>
        )}

        {/* Text Preview Box */}
        <div className="w-full p-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-xs text-[var(--tx-2)] max-h-48 overflow-y-auto leading-relaxed font-sans">
          {cleanText.slice(0, 800)}...
        </div>
      </div>
    </div>
  );
}
