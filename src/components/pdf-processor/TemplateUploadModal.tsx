'use client';

import React, { useState, useRef } from 'react';
import {
  X,
  Upload,
  Code2,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Info,
  Palette,
  Tag,
} from 'lucide-react';
import { validateCustomTex } from '../../lib/latex/template-parser';
import { saveCustomTemplate, CustomTemplateRecord } from '../../lib/latex/custom-template-store';

interface TemplateUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTemplateSaved: (savedTemplate: CustomTemplateRecord) => void;
}

const COMMON_TOKENS = [
  '{{FULL_NAME}}',
  '{{JOB_TITLE}}',
  '{{EMAIL}}',
  '{{PHONE}}',
  '{{LOCATION}}',
  '{{WEBSITE}}',
  '{{LINKEDIN}}',
  '{{GITHUB}}',
  '{{SUMMARY}}',
  '{{SKILLS_BLOCK}}',
  '{{EXPERIENCE_ITEMS}}',
  '{{EDUCATION_ITEMS}}',
  '{{PROJECTS_BLOCK}}',
];

const PRESET_COLORS = [
  '#2563EB', // Blue
  '#059669', // Emerald
  '#7C3AED', // Purple
  '#C2410C', // Orange
  '#0891B2', // Cyan
  '#0F172A', // Slate
  '#1E3A8A', // Navy
  '#3730A3', // Indigo
];

export default function TemplateUploadModal({
  isOpen,
  onClose,
  onTemplateSaved,
}: TemplateUploadModalProps) {
  const [tab, setTab] = useState<'upload' | 'paste'>('upload');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('custom');
  const [description, setDescription] = useState('');
  const [colorAccent, setColorAccent] = useState('#2563EB');
  const [rawTex, setRawTex] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const validation = validateCustomTex(rawTex);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!name) {
      const baseName = file.name.replace(/\.tex$/i, '').replace(/[-_]/g, ' ');
      setName(baseName.charAt(0).toUpperCase() + baseName.slice(1));
    }

    const reader = new FileReader();
    reader.onload = () => {
      const text = String(reader.result || '');
      setRawTex(text);
    };
    reader.readAsText(file);
  };

  const handleCopyToken = (token: string) => {
    navigator.clipboard.writeText(token);
    setCopiedToken(token);
    setTimeout(() => setCopiedToken(null), 1500);
  };

  const handleSave = async () => {
    if (!name.trim() || !validation.isValid) return;

    setIsSaving(true);
    try {
      const id = `custom-${Date.now()}-${name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
      const record: CustomTemplateRecord = {
        id,
        name: name.trim(),
        category,
        description: description.trim() || 'Custom user-uploaded LaTeX template.',
        file: `custom/${id}.tex`,
        thumbnail: 'templates/thumbnails/resume-01-ats-plain.webp',
        colorAccent,
        fontFamily: 'Custom LaTeX',
        tags: ['custom', category, 'user-upload'],
        difficulty: 'intermediate',
        sections: ['header', 'summary', 'experience', 'education', 'skills'],
        placeholders: validation.detectedPlaceholders,
        rawTex: validation.sanitizedTex,
        isCustom: true,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      await saveCustomTemplate(record);
      onTemplateSaved(record);
      onClose();
    } catch (err) {
      console.error('Failed to save template to IndexedDB:', err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative flex flex-col w-full max-w-2xl max-h-[90vh] bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden text-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">Upload Custom LaTeX Template</h3>
              <p className="text-xs text-slate-400">
                100% Client-Side: saved privately in your browser storage.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5 custom-scrollbar">
          {/* Tabs */}
          <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-800">
            <button
              type="button"
              onClick={() => setTab('upload')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition ${
                tab === 'upload'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Upload className="w-4 h-4" />
              Upload .tex File
            </button>
            <button
              type="button"
              onClick={() => setTab('paste')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition ${
                tab === 'paste'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Code2 className="w-4 h-4" />
              Paste LaTeX Code
            </button>
          </div>

          {/* Template Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Template Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. My Custom Stanford CV"
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
              >
                <option value="custom">Custom / Personal</option>
                <option value="ats-friendly">ATS-Friendly</option>
                <option value="modern-twocolumn">Modern Two-Column</option>
                <option value="minimalist">Minimalist</option>
                <option value="academic-cv">Academic CV</option>
                <option value="creative-designer">Creative / Designer</option>
                <option value="tech-developer">Tech / Developer</option>
                <option value="executive-senior">Executive / Senior</option>
                <option value="fresh-grad">Fresh Graduate</option>
                <option value="compact-dense">Compact / Dense</option>
                <option value="timeline-style">Timeline Style</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Short Description (Optional)
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Single-page academic CV with publications section"
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Color Accent Picker */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-slate-400" />
              Accent Color
            </label>
            <div className="flex items-center gap-2">
              {PRESET_COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColorAccent(c)}
                  style={{ backgroundColor: c }}
                  className={`w-6 h-6 rounded-full border-2 transition-transform ${
                    colorAccent === c ? 'scale-125 border-white shadow-md' : 'border-transparent hover:scale-110'
                  }`}
                />
              ))}
              <input
                type="color"
                value={colorAccent}
                onChange={(e) => setColorAccent(e.target.value)}
                className="w-7 h-7 rounded-lg border-0 bg-transparent cursor-pointer ml-2"
                title="Custom color"
              />
            </div>
          </div>

          {/* File Upload Tab */}
          {tab === 'upload' && (
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".tex"
                onChange={handleFileChange}
                className="hidden"
              />
              <div
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed border-slate-700/80 hover:border-indigo-500/80 bg-slate-950/40 hover:bg-slate-950/70 transition cursor-pointer text-center"
              >
                <Upload className="w-8 h-8 text-indigo-400 mb-2" />
                <p className="text-xs font-semibold text-slate-200">
                  Click or drag and drop your <span className="text-indigo-400">.tex</span> file here
                </p>
                <p className="text-[11px] text-slate-500 mt-1">Supports standard pdflatex templates up to 500 KB</p>
                {rawTex && (
                  <span className="inline-flex items-center gap-1 mt-3 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    File loaded ({rawTex.length.toLocaleString()} characters)
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Code Paste Tab */}
          {tab === 'paste' && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                LaTeX Source Code
              </label>
              <textarea
                value={rawTex}
                onChange={(e) => setRawTex(e.target.value)}
                rows={10}
                placeholder="Paste your full standalone \documentclass{article} ... \end{document} code here"
                className="w-full p-3 font-mono text-xs rounded-xl bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 custom-scrollbar"
              />
            </div>
          )}

          {/* Placeholder Tokens Helper */}
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-indigo-400" />
                Form-Fill Tokens (Click to Copy)
              </span>
              {copiedToken && (
                <span className="text-[10px] text-emerald-400 font-medium">
                  Copied {copiedToken}!
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-400 mb-2 leading-relaxed">
              Insert these tokens in your .tex code where user data should appear:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {COMMON_TOKENS.map((token) => (
                <button
                  key={token}
                  type="button"
                  onClick={() => handleCopyToken(token)}
                  className="px-2 py-0.5 rounded-md font-mono text-[10px] bg-slate-800/80 hover:bg-indigo-600/30 text-slate-300 hover:text-indigo-200 border border-slate-700/60 transition cursor-pointer"
                >
                  {token}
                </button>
              ))}
            </div>
          </div>

          {/* Validation Feedback */}
          {rawTex && (
            <div className="space-y-2">
              {validation.isValid ? (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Valid standalone LaTeX structure detected!</span>
                </div>
              ) : (
                <div className="flex items-start gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block">Invalid Template:</span>
                    {validation.errors.map((e, idx) => (
                      <p key={idx}>{e}</p>
                    ))}
                  </div>
                </div>
              )}

              {validation.warnings.map((w, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px]"
                >
                  <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <span>{w}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-slate-900/90">
          <div className="text-[11px] text-slate-500">
            Stored locally in your browser (IndexedDB)
          </div>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800 transition"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!name.trim() || !validation.isValid || isSaving}
              onClick={handleSave}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? 'Saving...' : 'Save to My Templates'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
