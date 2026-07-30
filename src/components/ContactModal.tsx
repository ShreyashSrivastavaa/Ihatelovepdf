'use client';

import { useState, type FormEvent } from 'react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || '44e3c9b7-e4a7-43f8-8c76-0b23246e96f9';

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'PDFhelp Contact Form Message',
          message: formData.message,
          from_name: 'PDFhelp Contact Form',
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
        setErrorMessage(result.message || 'Failed to send message. Please try again.');
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage('Network error. Please check your internet connection and try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-lg bg-[var(--bg)] border border-[var(--ui)] rounded-2xl shadow-2xl p-6 sm:p-8 text-[var(--tx)] animate-in zoom-in-95">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[var(--tx-2)] hover:text-[var(--tx)] rounded-full hover:bg-[var(--bg-2)] transition-colors"
          aria-label="Close contact modal"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-[var(--accent)] font-bold">
            ✉️
          </div>
          <div>
            <h3 className="text-xl font-bold">Contact PDFhelp</h3>
            <p className="text-xs text-[var(--tx-3)]">We respond directly to your email!</p>
          </div>
        </div>

        {status === 'success' ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto text-2xl">
              ✓
            </div>
            <h4 className="text-lg font-semibold text-green-600">Message Sent Successfully!</h4>
            <p className="text-sm text-[var(--tx-2)] max-w-sm mx-auto">
              Thank you for reaching out. We have received your message and will reply to your email address shortly.
            </p>
            <button
              onClick={() => {
                setStatus('idle');
                onClose();
              }}
              className="mt-4 px-6 py-2 bg.accent bg-[var(--accent)] text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {status === 'error' && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg text-xs font-medium">
                {errorMessage}
              </div>
            )}

            <div>
              <label htmlFor="contact-name" className="block text-xs font-medium text-[var(--tx-2)] mb-1">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                id="contact-name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Shreyash"
                className="w-full px-3 py-2 bg-[var(--bg-2)] border border-[var(--ui)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              />
            </div>

            <div>
              <label htmlFor="contact-email" className="block text-xs font-medium text-[var(--tx-2)] mb-1">
                Your Email Address <span className="text-red-500">*</span>
              </label>
              <input
                id="contact-email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@example.com"
                className="w-full px-3 py-2 bg-[var(--bg-2)] border border-[var(--ui)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              />
            </div>

            <div>
              <label htmlFor="contact-subject" className="block text-xs font-medium text-[var(--tx-2)] mb-1">
                Subject
              </label>
              <input
                id="contact-subject"
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Feature suggestion / General question"
                className="w-full px-3 py-2 bg-[var(--bg-2)] border border-[var(--ui)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              />
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-xs font-medium text-[var(--tx-2)] mb-1">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="contact-message"
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="How can we help you?"
                className="w-full px-3 py-2 bg-[var(--bg-2)] border border-[var(--ui)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)] resize-none"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm text-[var(--tx-2)] hover:bg-[var(--bg-2)] rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="px-6 py-2 bg-[var(--accent)] text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
              >
                {status === 'submitting' ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    <span>Sending...</span>
                  </>
                ) : (
                  <span>Send Message</span>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
