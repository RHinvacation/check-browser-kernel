import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/check-browser-kernel/', // 对应 GitHub 仓库名称，后续需修改为你的仓库名
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
});