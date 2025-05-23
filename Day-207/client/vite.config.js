import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0", // ✅ Allow external access
    port: 5173, // ✅ Set the correct port
    strictPort: true, // ✅ Ensure it binds to 5173
  },
  plugins: [
    tailwindcss(),
    react()
  ],
})
