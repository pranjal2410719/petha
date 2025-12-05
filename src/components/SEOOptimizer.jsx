'use client';
import { useEffect } from 'react';

export default function SEOOptimizer() {
  useEffect(() => {
    // Add structured data for better SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "DOPO by BStudios",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "Web",
      "description": "Premier creator collaboration platform connecting elite developers, designers, and innovators worldwide for revolutionary project development",
      "url": "https://dopo-bstudios.vercel.app",
      "author": {
        "@type": "Organization",
        "name": "DOPO by BStudios",
        "url": "https://dopo-bstudios.vercel.app"
      },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "ratingCount": "1500",
        "bestRating": "5",
        "worstRating": "1"
      },
      "featureList": [
        "AI-Powered Project Discovery",
        "Real-time Collaboration",
        "Blockchain Integration",
        "Global Talent Network",
        "Advanced Analytics",
        "Enterprise Security"
      ]
    };

    // Add structured data to head
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    // Add performance monitoring
    if (typeof window !== 'undefined' && 'performance' in window) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const perfData = performance.getEntriesByType('navigation')[0];
          if (perfData) {
            // Log performance metrics for optimization
            console.log('Page Load Performance:', {
              loadTime: perfData.loadEventEnd - perfData.loadEventStart,
              domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
              firstPaint: performance.getEntriesByType('paint')[0]?.startTime || 0
            });
          }
        }, 0);
      });
    }

    return () => {
      // Cleanup
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      scripts.forEach(script => {
        if (script.textContent?.includes('DOPO by BStudios')) {
          script.remove();
        }
      });
    };
  }, []);

  return null; // This component doesn't render anything
}