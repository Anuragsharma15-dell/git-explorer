"use client";

import React, { createContext, useContext, useRef } from 'react';

interface ChatInputContextValue {
  setInputValue: (value: string) => void;
  registerSetValue: (setValue: (value: string) => void) => void;
}

const ChatInputContext = createContext<ChatInputContextValue | null>(null);

export function ChatInputProvider({ children }: { children: React.ReactNode }) {
  const setValueRef = useRef<((value: string) => void) | null>(null);

  const setInputValue = (value: string) => {
    if (setValueRef.current) {
      setValueRef.current(value);
    }
  };

  const registerSetValue = (setValue: (value: string) => void) => {
    setValueRef.current = setValue;
  };

  return (
    <ChatInputContext.Provider value={{ setInputValue, registerSetValue }}>
      {children}
    </ChatInputContext.Provider>
  );
}

export function useChatInput() {
  const context = useContext(ChatInputContext);
  if (!context) {
    throw new Error('useChatInput must be used within a ChatInputProvider');
  }
  return context;
}