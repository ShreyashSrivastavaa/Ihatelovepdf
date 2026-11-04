'use client';

import { useState, type FormEvent } from 'react';
import { Mail, X, CheckCircle2, AlertCircle, Send } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OWNER_EMAIL = 'shreyashsr2004@gmail.com';

export type ContactCategory = 'General Inquiry' | 'Bug Report' | 'Feature Request' | 'Privacy Concern';

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
  const isFormAvailable = Boolean(accessKey);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'General Inquiry' as ContactCategory,
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  if (!isFormAvailable) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
        <div className="relative w-full max-w-md bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-xl p-6 sm:p-8 text-[var(--text-main)] animate-fade-in">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 text-[var(--text-muted)] hover:text-[var(--text-main)] rounded-lg hover:bg-[var(--subtle)] transition-colors cursor-pointer"
            aria-label="Close contact modal"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="py-6 text-center space-y-3">
            <div className="w-10 h-10 bg-[var(--brand-soft)] border border-[var(--brand)]/20 rounded-xl flex items-center justify-center mx-auto text-[var(--brand)]">
              <Mail className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-[var(--text-main)]">Contact via Email</h3>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-sm mx-auto leading-relaxed">
              Please reach out directly to our maintainer at{' '}
              <a
                href={`mailto:${OWNER_EMAIL}?subject=[ihatelovepdf]%20Inquiry`}
                className="text-[var(--brand)] underline font-medium"
              >
                {OWNER_EMAIL}
              </a>
              .
            </p>
            <button
              onClick={onClose}
              className="mt-2 px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--subtle)] text-xs font-medium text-[var(--text-main)] hover:border-[var(--brand)] transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (formData.message.trim().length < 20) {
      setStatus('error');
      setErrorMessage('Please provide a more detailed message (minimum 20 characters).');
      return;
    }

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
          access_key: accessKey,
          to_email: OWNER_EMAIL,
          replyto: formData.email,
          name: formData.name,
          email: formData.email,
          subject: `[ihatelovepdf] [${formData.category}] ${formData.subject || 'Inquiry'}`,
          message: `Category: ${formData.category}\nFrom: ${formData.name} <${formData.email}>\n\n${formData.message}`,
          from_name: 'ihatelovepdf Contact Form',
          botcheck: '',
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', category: 'General Inquiry', subject: '', message: '' });
      } else {
        setStatus('error');
        setErrorMessage(result.message || 'Failed to send message. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Network error. Please check your internet connection and try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-xl p-6 sm:p-8 text-[var(--text-main)] animate-fade-in max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-[var(--text-muted)] hover:text-[var(--text-main)] rounded-lg hover:bg-[var(--subtle)] transition-colors cursor-pointer"
          aria-label="Close contact modal"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-xl bg-[var(--brand-soft)] border border-[var(--brand)]/20 flex items-center justify-center text-[var(--brand)]">
            <Mail className="h-4 w-4 stroke-[1.75]" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[var(--text-main)]">Contact ihatelovepdf</h3>
            <p className="text-xs text-[var(--text-muted)]">We respond directly to your email address!</p>
          </div>
        </div>

        {status === 'success' ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center mx-auto">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <h4 className="text-base font-bold text-[var(--text-main)]">Message Sent Successfully!</h4>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-sm mx-auto leading-relaxed">
              Thank you for reaching out! We&apos;ve received your message and will reply directly to your email.
            </p>
            <button
              onClick={() => {
                setStatus('idle');
                onClose();
              }}
              className="px-5 py-2 rounded-lg bg-[var(--brand)] text-white text-xs font-semibold hover:opacity-95 transition-opacity cursor-pointer"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {status === 'error' && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 rounded-lg text-xs font-medium flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1">
                <label htmlFor="contact-name" className="block text-xs font-medium text-[var(--text-muted)]">
                  Your Name <span className="text-rose-500">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your Name"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[var(--border)] bg-[var(--subtle)] text-[var(--text-main)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--brand)] transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="contact-email" className="block text-xs font-medium text-[var(--text-muted)]">
                  Your Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@example.com"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[var(--border)] bg-[var(--subtle)] text-[var(--text-main)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--brand)] transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="contact-category" className="block text-xs font-medium text-[var(--text-muted)]">
                Category <span className="text-rose-500">*</span>
              </label>
              <select
                id="contact-category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as ContactCategory })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[var(--border)] bg-[var(--subtle)] text-[var(--text-main)] focus:outline-none focus:border-[var(--brand)] cursor-pointer"
              >
                <option value="General Inquiry">General Inquiry</option>
                <option value="Bug Report">Bug Report</option>
                <option value="Feature Request">Feature Request</option>
                <option value="Privacy Concern">Privacy Concern</option>
              </select>
            </div>

            <div className="space-y-1">
              <label htmlFor="contact-subject" className="block text-xs font-medium text-[var(--text-muted)]">
                Subject <span className="text-rose-500">*</span>
              </label>
              <input
                id="contact-subject"
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Brief summary of your inquiry"
                className="w-full px-3 py-2 text-xs rounded-lg border border-[var(--border)] bg-[var(--subtle)] text-[var(--text-main)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--brand)] transition-colors"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label htmlFor="contact-message" className="block text-xs font-medium text-[var(--text-muted)]">
                  Message <span className="text-rose-500">*</span>
                </label>
                <span className="text-[11px] text-[var(--text-muted)]">Min 20 characters</span>
              </div>
              <textarea
                id="contact-message"
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="How can we help you today?"
                className="w-full px-3 py-2 text-xs rounded-lg border border-[var(--border)] bg-[var(--subtle)] text-[var(--text-main)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--brand)] transition-colors resize-none"
              />
            </div>

            <div className="flex justify-end gap-2.5 pt-3 border-t border-[var(--border)]">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--subtle)] text-xs font-medium text-[var(--text-main)] hover:border-[var(--brand)] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="px-4 py-2 rounded-lg bg-[var(--brand)] text-white text-xs font-medium hover:opacity-95 transition-opacity flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {status === 'submitting' ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <Send className="h-3.5 w-3.5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
