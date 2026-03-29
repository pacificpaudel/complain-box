// Vercel Speed Insights initialization
// Import and inject Speed Insights for performance monitoring
import { injectSpeedInsights } from 'https://cdn.jsdelivr.net/npm/@vercel/speed-insights@2/dist/index.mjs';

// Initialize Speed Insights
// This will automatically track Core Web Vitals (LCP, FID, CLS, TTFB, FCP)
// and send performance metrics to Vercel
injectSpeedInsights();
