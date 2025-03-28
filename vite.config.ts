import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
 
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    define: {
      'import.meta.env.VITE_BASE_URL': JSON.stringify(env.VITE_BASE_URL),
      'import.meta.env.VITE_SERVER_URL': JSON.stringify(env.VITE_SERVER_URL),
      'import.meta.env.VITE_STRIPE_PUBLISABLE_KEY': JSON.stringify(env.VITE_STRIPE_PUBLISABLE_KEY),
      'import.meta.env.VITE_GEMINI_CHATBOT_API_KEY': JSON.stringify(env.VITE_GEMINI_CHATBOT_API_KEY),
      'import.meta.env.VITE_CLOUDINARY_URL': JSON.stringify(env.VITE_CLOUDINARY_URL),
    },
  };
});
