import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.gotime',
  appName: 'gotime',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
