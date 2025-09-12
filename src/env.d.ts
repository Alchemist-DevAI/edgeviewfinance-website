/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

// Google Analytics global types
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    GA_MEASUREMENT_ID: string;
  }
  
  function gtag(...args: any[]): void;
}

export {};
