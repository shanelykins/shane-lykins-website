import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    // Custom plugin to serve public files before SPA fallback
    {
      name: 'serve-public-files',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          // Serve files from public directory
          if (req.url && req.url.startsWith('/avatar.jpg')) {
            return next();
          }
          next();
        });
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  publicDir: "public",
  server: {
    hmr: {
      overlay: true,
    },
    watch: {
      usePolling: false,
    },
  },
});
