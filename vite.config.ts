import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default ({ mode }: { mode: string }) => {
  // Load environment variables based on the mode
  const env = loadEnv(mode, process.cwd());

  return defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@features': path.resolve(__dirname, './src/features'),
        '@shared': path.resolve(__dirname, './src/shared')
      }
    },
    define: {
      'process.env': env // Make env variables available in the app
    }
  });
};
