'use client';

import { useState, useEffect } from 'react';
import { useDictionary } from '../i18n/LocaleProvider';
import { ShieldCheck } from 'lucide-react';

interface WindowWithGtag extends Window {
    gtag: (
        command: 'consent' | 'config' | 'event' | 'js',
        targetId: string,
        config?: Record<string, unknown>
    ) => void;
}

export default function CookieBanner() {
    const dictionary = useDictionary();
    const t = dictionary.components.cookieBanner;
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie_consent');
        if (consent === null) {
            setIsVisible(true);
        } else if (consent === 'true') {
            if (typeof window !== 'undefined' && (window as unknown as WindowWithGtag).gtag) {
                (window as unknown as WindowWithGtag).gtag('consent', 'update', {
                    'ad_storage': 'granted',
                    'analytics_storage': 'granted',
                    'ad_user_data': 'granted',
                    'ad_personalization': 'granted'
                });
            }
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie_consent', 'true');
        setIsVisible(false);

        if (typeof window !== 'undefined' && (window as unknown as WindowWithGtag).gtag) {
            (window as unknown as WindowWithGtag).gtag('consent', 'update', {
                'ad_storage': 'granted',
                'analytics_storage': 'granted',
                'ad_user_data': 'granted',
                'ad_personalization': 'granted'
            });
        }
    };

    const handleDecline = () => {
        localStorage.setItem('cookie_consent', 'false');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 p-4 bg-[var(--bg-card)]/90 backdrop-blur-lg border border-[var(--border)] rounded-2xl shadow-xl animate-fade-in">
            <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-[var(--success)] shrink-0" />
                    <p className="text-xs font-bold text-[var(--tx)] uppercase tracking-wider">Privacy Notice</p>
                </div>
                <p className="text-xs text-[var(--tx-2)] leading-relaxed">
                    {t.message}
                </p>
                <div className="flex items-center justify-end gap-2 pt-1 border-t border-[var(--border)]">
                    <button
                        onClick={handleDecline}
                        className="btn-secondary px-3 py-1.5 text-xs font-medium"
                    >
                        {t.decline}
                    </button>
                    <button
                        onClick={handleAccept}
                        className="btn-primary px-4 py-1.5 text-xs font-semibold"
                    >
                        {t.accept}
                    </button>
                </div>
            </div>
        </div>
    );
}
