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

          console.log('📊 Performance Metrics:', {
            '🌐 DNS Time': `${metrics.dnsTime.toFixed(2)}ms`,
            '🔗 TCP Time': `${metrics.tcpTime.toFixed(2)}ms`,
            '⏱️ TTFB (Time to First Byte)': `${metrics.ttfb.toFixed(2)}ms`,
            '📄 DOM Interactive': `${metrics.domInteractive.toFixed(2)}ms`,
            '✅ DOM Complete': `${metrics.domComplete.toFixed(2)}ms`,
            '🚀 Page Load Time': `${metrics.pageLoadTime.toFixed(2)}ms`,
          });

          // Send to Google Analytics if available (checking for gtag function)
          if (typeof window.gtag === 'function') {
            window.gtag('event', 'page_view', {
              page_load_time: Math.round(metrics.pageLoadTime),
              page_path: window.location.pathname,
            });
          }
        }
      } catch (error) {
        console.error('❌ Error reporting page metrics:', error);
      }
    };

    // Monitor Largest Contentful Paint (LCP)
    const monitorLCP = () => {
      if ('PerformanceObserver' in window) {
        try {
          const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            const lcpValue = lastEntry.renderTime || lastEntry.loadTime;
            
            // LCP thresholds: Good <2.5s, Needs Improvement <4s, Poor >4s
            const status = lcpValue < 2500 ? '✅' : lcpValue < 4000 ? '⚠️' : '❌';
            console.log(`${status} Largest Contentful Paint (LCP): ${lcpValue.toFixed(2)}ms`);
          });
          observer.observe({ entryTypes: ['largest-contentful-paint'] });
          observers.push(observer);
        } catch (error) {
          console.debug('LCP Observer not available:', error.message);
        }
      }
    };

    // Monitor First Input Delay (FID) / Interaction to Next Paint (INP)
    const monitorInputDelay = () => {
      if ('PerformanceObserver' in window) {
        try {
          const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry) => {
              const delay = entry.processingDuration;
              // FID thresholds: Good <100ms, Needs Improvement <300ms, Poor >300ms
              const status = delay < 100 ? '✅' : delay < 300 ? '⚠️' : '❌';
              console.log(`${status} First Input Delay (FID): ${delay.toFixed(2)}ms`);
            });
          });
          observer.observe({ entryTypes: ['first-input'] });
          observers.push(observer);
        } catch (error) {
          console.debug('FID Observer not available:', error.message);
        }
      }
    };

    // Monitor Cumulative Layout Shift (CLS)
    const monitorCLS = () => {
      if ('PerformanceObserver' in window) {
        try {
          let clsValue = 0;
          const observer = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
              if (!entry.hadRecentInput) {
                clsValue += entry.value;
                // CLS thresholds: Good <0.1, Needs Improvement <0.25, Poor >0.25
                const status = clsValue < 0.1 ? '✅' : clsValue < 0.25 ? '⚠️' : '❌';
                console.log(`${status} Cumulative Layout Shift (CLS): ${clsValue.toFixed(4)}`);
              }
            });
          });
          observer.observe({ entryTypes: ['layout-shift'] });
          observers.push(observer);
        } catch (error) {
          console.debug('CLS Observer not available:', error.message);
        }
      }
    };

    // Monitor Resource Timing
    const monitorResourceTiming = () => {
      try {
        const resources = window.performance.getEntriesByType('resource');
        const slowResources = resources.filter(r => r.duration > 1000);
        
        if (slowResources.length > 0) {
          console.warn('⏱️ Slow Resources (>1s):', slowResources.map(r => ({
            name: r.name.split('/').pop() || r.name,
            duration: `${r.duration.toFixed(2)}ms`,
            size: r.transferSize ? `${(r.transferSize / 1024).toFixed(2)}KB` : 'N/A',
          })));
        }

        // Show total resources summary
        const totalSize = resources.reduce((sum, r) => sum + (r.transferSize || 0), 0);
        console.log(`📦 Total Resources: ${resources.length} | Total Size: ${(totalSize / 1024 / 1024).toFixed(2)}MB`);
      } catch (error) {
        console.debug('Resource timing error:', error.message);
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

    console.log('📈 Performance monitoring initialized');

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


