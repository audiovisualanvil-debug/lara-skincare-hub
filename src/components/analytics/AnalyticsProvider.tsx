import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const GA4_ID = import.meta.env.VITE_GA4_ID as string | undefined;
const FB_PIXEL_ID = import.meta.env.VITE_FB_PIXEL_ID as string | undefined;

const useAnalyticsConsent = () => {
  const consent = typeof window !== "undefined" ? localStorage.getItem("cookie_consent") : null;
  return consent === "all";
};

const AnalyticsProvider = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const initialized = useRef(false);
  const hasConsent = useAnalyticsConsent();

  // Inject scripts on mount if consent given
  useEffect(() => {
    if (!hasConsent || initialized.current) return;
    initialized.current = true;

    // Google Analytics
    if (GA4_ID) {
      const script = document.createElement("script");
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
      script.async = true;
      document.head.appendChild(script);

      (window as any).dataLayer = (window as any).dataLayer || [];
      function gtag(...args: any[]) {
        (window as any).dataLayer.push(args);
      }
      (window as any).gtag = gtag;
      gtag("js", new Date());
      gtag("config", GA4_ID);
    }

    // Facebook Pixel
    if (FB_PIXEL_ID) {
      const fbScript = document.createElement("script");
      fbScript.innerHTML = `
        !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
        n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
        document,'script','https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${FB_PIXEL_ID}');
        fbq('track', 'PageView');
      `;
      document.head.appendChild(fbScript);
    }
  }, [hasConsent]);

  // Track page views on route change
  useEffect(() => {
    if (!hasConsent) return;

    if (GA4_ID && (window as any).gtag) {
      (window as any).gtag("config", GA4_ID, { page_path: location.pathname });
    }
    if (FB_PIXEL_ID && (window as any).fbq) {
      (window as any).fbq("track", "PageView");
    }
  }, [location.pathname, hasConsent]);

  return <>{children}</>;
};

export default AnalyticsProvider;
