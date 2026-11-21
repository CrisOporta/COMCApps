import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';

  return {
    plugins: [
      react(),
      tailwindcss(),
    ],

    resolve: {
      alias: {
        '@': `${import.meta.dirname}/src`,
      },
    },

    build: {
      target: 'es2022',
      minify: 'terser',
      cssMinify: true,
      sourcemap: false,
      terserOptions: {
        compress: {
          drop_console: isProd,
          drop_debugger: isProd,
          passes: 2,
        },
        mangle: {
          toplevel: true,
        },
        format: {
          comments: false,
        },
      },
      rollupOptions: {
        output: {
          chunkFileNames: isProd ? 'assets/[hash].js' : 'assets/[name]-[hash].js',
          entryFileNames: isProd ? 'assets/[hash].js' : 'assets/[name]-[hash].js',
          assetFileNames: isProd ? 'assets/[hash].[ext]' : 'assets/[name]-[hash].[ext]',
        },
      },
    },

    server: {
      port: 3000,
    },
  };
});
