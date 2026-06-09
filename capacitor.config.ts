import type { CapacitorConfig } from '@capacitor/cli';

// Toggle dev hot-reload from Lovable sandbox by setting CAP_DEV=1 before `npx cap sync`.
// Production builds (default) load bundled assets from `dist/` for App Store submission.
const isDev = process.env.CAP_DEV === '1';

const config: CapacitorConfig = {
  appId: 'app.biolance.sajjil',
  appName: 'سجّل',
  webDir: 'dist',
  ...(isDev
    ? {
        server: {
          url: 'https://5e599f54-ed68-4a05-85d4-414eb0da9357.lovableproject.com?forceHideBadge=true',
          cleartext: true,
        },
      }
    : {}),
  ios: {
    contentInset: 'always',
    backgroundColor: '#12332A',
    limitsNavigationsToAppBoundDomains: false,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1500,
      launchAutoHide: true,
      backgroundColor: '#12332A',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true,
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#12332A',
      overlaysWebView: false,
    },
  },
};

export default config;
