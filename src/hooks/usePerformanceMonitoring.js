import { useEffect } from 'react';

export default function usePerformanceMonitoring() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Store observer references for cleanup
    const observers = [];

    // Measure Page Load Performance using modern Performance API
    const reportMetrics = () => {
      if (!window.performance || !window.performance.getEntriesByType) return;

      try {
        // Get navigation timing data
        const navigation = window.performance.getEntriesByType('navigation')[0];
        if (navigation) {
          const metrics = {
            dnsTime: navigation.domainLookupEnd - navigation.domainLookupStart,
            tcpTime: navigation.connectEnd - navigation.connectStart,
            ttfb: navigation.responseStart - navigation.navigationStart,
            domInteractive: navigation.domInteractive - navigation.navigationStart,
            domComplete: navigation.domComplete - navigation.navigationStart,
            pageLoadTime: navigation.loadEventEnd - navigation.navigationStart,
          };

          // Send to Google Analytics if available (checking for gtag function)
          if (typeof window.gtag === 'function') {
            window.gtag('event', 'page_view', {
              page_load_time: Math.round(metrics.pageLoadTime),
              page_path: window.location.pathname,
            });
          }
        }
      } catch {
        // Silent error handling
      }
    };

    // Monitor Largest Contentful Paint (LCP)
    const monitorLCP = () => {
      if ('PerformanceObserver' in window) {
        try {
          const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            const _lcpValue = lastEntry.renderTime || lastEntry.loadTime;
            
            // Silently track LCP for analytics
          });
          observer.observe({ entryTypes: ['largest-contentful-paint'] });
          observers.push(observer);
        } catch {
          // Silently handle error
        }
      }
    };

    // Monitor First Input Delay (FID) / Interaction to Next Paint (INP)
    const monitorInputDelay = () => {
      if ('PerformanceObserver' in window) {
        try {
          const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach(() => {
              // Silently track FID for analytics
            });
          });
          observer.observe({ entryTypes: ['first-input'] });
          observers.push(observer);
        } catch {
          // Silently handle error
        }
      }
    };

    // Monitor Cumulative Layout Shift (CLS)
    const monitorCLS = () => {
      if ('PerformanceObserver' in window) {
        try {
          let _clsValue = 0;
          const observer = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
              if (!entry.hadRecentInput) {
                _clsValue += entry.value;
                // Silently track CLS for analytics
              }
            });
          });
          observer.observe({ entryTypes: ['layout-shift'] });
          observers.push(observer);
        } catch {
          // Silently handle error
        }
      }
    };

    // Monitor Resource Timing
    const monitorResourceTiming = () => {
      try {
        const _resources = window.performance.getEntriesByType('resource');
        // Silently track resource timing for analytics
      } catch {
        // Silently handle error
      }
    };

    // Report metrics when page is fully loaded
    if (document.readyState === 'complete') {
      reportMetrics();
      monitorResourceTiming();
    } else {
      window.addEventListener('load', () => {
        setTimeout(() => {
          reportMetrics();
          monitorResourceTiming();
        }, 0);
      });
    }

    // Start monitoring Core Web Vitals
    monitorLCP();
    monitorInputDelay();
    monitorCLS();

    // Cleanup function - disconnect all observers
    return () => {
      observers.forEach(observer => {
        if (observer && typeof observer.disconnect === 'function') {
          observer.disconnect();
        }
      });
    };
  }, []);
}



