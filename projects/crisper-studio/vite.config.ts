import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // GitHub Pages project URL: https://arkansasio.github.io/Program-test/
  base: '/Program-test/',
  plugins: [react()],
  server: { port: 5173, strictPort: true },
  test: { environment: 'node' }
});
