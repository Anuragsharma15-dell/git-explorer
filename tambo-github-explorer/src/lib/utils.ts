import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Polyfill for crypto.randomUUID if not available
if (typeof globalThis !== 'undefined' && !globalThis.crypto?.randomUUID) {
  // Ensure crypto object exists
  if (!globalThis.crypto) {
    globalThis.crypto = {} as Crypto;
  }
  
  // Add randomUUID polyfill
  (globalThis.crypto as unknown as Record<string, unknown>).randomUUID = function(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };
}
