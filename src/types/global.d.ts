// Global type declarations
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    GA_MEASUREMENT_ID?: string;
  }
  
  function gtag(...args: any[]): void;
}

// Extend PerformanceEntry to include missing properties
declare global {
  interface PerformanceEntry {
    value?: number;
    processingStart?: number;
  }
}

export {};