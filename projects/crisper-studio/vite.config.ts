import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Program-test is a project site: https://arkansasio.github.io/Program-test/
  // Set CRISPER_PAGES_BASE=/ for a root/custom-domain deployment.
  base: process.env.CRISPER_PAGES_BASE || '/Program-test/',
  plugins: [react()],
  server: { port: 5173, strictPort: true },
  test: { environment: 'node' }
});
