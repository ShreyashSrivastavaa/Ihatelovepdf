'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type LlmProvider = 'gemini' | 'openai' | 'anthropic';

export interface ByokContextType {
  apiKey: string;
  provider: LlmProvider;
  setApiKey: (key: string) => void;
  setProvider: (provider: LlmProvider) => void;
  clearKey: () => void;
  hasKey: boolean;
}

const ByokContext = createContext<ByokContextType | undefined>(undefined);

export function ByokProvider({ children }: { children: ReactNode }) {
  const [apiKey, setApiKey] = useState<string>('');
  const [provider, setProvider] = useState<LlmProvider>('gemini');

  const clearKey = () => {
    setApiKey('');
  };

  return (
    <ByokContext.Provider
      value={{
        apiKey,
        provider,
        setApiKey,
        setProvider,
        clearKey,
        hasKey: Boolean(apiKey.trim()),
      }}
    >
      {children}
    </ByokContext.Provider>
  );
}

export { ByokContext };

export function useOptionalByok(): ByokContextType | undefined {
  return useContext(ByokContext);
}

export function useByok() {
  const context = useContext(ByokContext);
  if (!context) {
    throw new Error('useByok must be used within a ByokProvider');
  }
  return context;
}
