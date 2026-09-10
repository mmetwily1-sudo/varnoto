import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.varnoto.store',
  appName: 'VARNOTO',
  webDir: 'www',
  android: {
    allowMixedContent: false,
  },
};

export default config;
