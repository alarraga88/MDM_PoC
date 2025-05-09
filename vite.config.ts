import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteMockServe } from 'vite-plugin-mock';
import dotenv from 'dotenv';
dotenv.config();
export default defineConfig(({ command }) => {  
   const useMock = command === 'serve' && process.env.VITE_USE_MOCK == 'true'
  console.log("useMock",useMock);

  return {
    // css: {
    //   postcss: './postcss.config.js',
    // },
    plugins: [
      react(),
      viteMockServe({
        mockPath: 'src/mock',
        enable: useMock,    
        logger: true,         // Show logs in console
        ignore: /^_/,
        watchFiles: true,
      }),
    ],
    server: {
      // proxy: {
      //   '/API': {
      //     target: 'http://localhost:5170',
      //     changeOrigin: true,
      //     rewrite: path => path.replace(/^\/API/, '/api'),
      //   },
      // },
      port: 5170,
    },
    test: {
      globals: true, // allow using `test`, `expect`, globally
      environment: 'jsdom',
      setupFiles: './src/test/setup.ts',
    },
  };
});


