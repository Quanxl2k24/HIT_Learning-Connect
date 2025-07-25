// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react-swc'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// ✅ ADD cái này
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  // ✅ Cấu hình này rất quan trọng cho Vercel SPA
  build: {
    outDir: "dist",
  },
  server: {
    historyApiFallback: true,
  },
});
