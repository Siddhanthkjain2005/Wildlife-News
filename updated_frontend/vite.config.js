import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(() => {
  const embedBuild = process.env.EMBED_BUILD === "true";
  return {
    plugins: [react()],
    define: {
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "production")
    },
    build: embedBuild
      ? {
          outDir: resolve(__dirname, "../app/static/react-build"),
          emptyOutDir: true,
          cssCodeSplit: false,
          lib: {
            entry: resolve(__dirname, "src/main.jsx"),
            formats: ["es"],
            fileName: () => "dashboard.js"
          },
          rollupOptions: {
            output: {
              assetFileNames: (assetInfo) => {
                if ((assetInfo.name || "").endsWith(".css")) {
                  return "dashboard.css";
                }
                return "assets/[name]-[hash][extname]";
              }
            }
          }
        }
      : {
          outDir: "dist",
          emptyOutDir: true
        }
  };
});
