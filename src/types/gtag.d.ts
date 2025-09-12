declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'exception',
      targetId: string,
      config?: {
        page_title?: string;
        page_location?: string;
        page_path?: string;
        custom_map?: Record<string, string>;
        send_page_view?: boolean;
        [key: string]: any;
      }
    ) => void;
    GA_MEASUREMENT_ID?: string;
  }

  var gtag: Window['gtag'];
}

export {};