'use client';
import { useEffect } from 'react';

export default function Analytics() {
  useEffect(() => {
    // Google Analytics 4 (replace with your actual GA4 ID)
    const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';
    
    // Load Google Analytics
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_MEASUREMENT_ID}', {
        page_title: 'DOPO by BStudios',
        page_location: window.location.href,
        custom_map: {
          'custom_parameter_1': 'creator_collaboration',
          'custom_parameter_2': 'innovation_platform'
        }
      });
    `;
    document.head.appendChild(script2);

    // Microsoft Clarity (replace with your actual Clarity ID)
    const clarityScript = document.createElement('script');
    clarityScript.innerHTML = `
      (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "YOUR_CLARITY_ID");
    `;
    document.head.appendChild(clarityScript);

    // Hotjar (replace with your actual Hotjar ID)
    const hotjarScript = document.createElement('script');
    hotjarScript.innerHTML = `
      (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:YOUR_HOTJAR_ID,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
      })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
    `;
    document.head.appendChild(hotjarScript);

    // Custom event tracking for DOPO
    window.dopoTrack = function(event, properties = {}) {
      if (typeof gtag !== 'undefined') {
        gtag('event', event, {
          event_category: 'DOPO_Interaction',
          event_label: properties.label || '',
          value: properties.value || 0,
          custom_parameter_1: 'creator_collaboration',
          custom_parameter_2: 'innovation_platform',
          ...properties
        });
      }
    };

    // Track page performance
    if ('performance' in window) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const perfData = performance.getEntriesByType('navigation')[0];
          if (perfData && typeof gtag !== 'undefined') {
            gtag('event', 'page_performance', {
              event_category: 'Performance',
              event_label: 'Page Load Time',
              value: Math.round(perfData.loadEventEnd - perfData.loadEventStart),
              custom_parameter_1: 'performance_monitoring'
            });
          }
        }, 0);
      });
    }

    return () => {
      // Cleanup scripts on unmount
      const scripts = document.querySelectorAll('script[src*="googletagmanager"], script[src*="clarity"], script[src*="hotjar"]');
      scripts.forEach(script => script.remove());
    };
  }, []);

  return null;
}