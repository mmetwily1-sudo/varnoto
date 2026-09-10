/** @type {import('@capacitor/cli').CapacitorConfig} */
const config = {
  appId: 'com.varnoto.store',
  appName: 'VARNOTO',
  webDir: 'www',
  // Live URL: the app always shows the latest site code — no rebuild needed for updates.
  // (Bundled www/ stays as offline fallback.)
  server: {
    url: 'https://mmetwily1-sudo.github.io/varnoto/',
    cleartext: false,
  },
  allowNavigation: [
    'mmetwily1-sudo.github.io',
    '*.supabase.co',
    'wa.me',
    'instagram.com',
    'tiktok.com',
    'accept.paymob.com',
    'bosta.co',
    'connect.facebook.net',
    'analytics.tiktok.com',
    'www.googletagmanager.com',
  ],
  android: {
    allowMixedContent: false,
  },
};

module.exports = config;
