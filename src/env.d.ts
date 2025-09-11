/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

// Global gtag type for Google Analytics
declare global {
  function gtag(command: 'config' | 'event', targetId: string, config?: any): void;
  
  interface Window {
    gtag?: typeof gtag;
  }
}

export {};
