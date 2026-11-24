
import { defineConfig } from "vite";
import { resolve } from "node:path";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(process.cwd(), "src"),
    },
  },

  plugins: [
    tanstackStart({
      server: {
        entry: "./server.ts",
      },
    }),
    nitro(),
    viteReact(),
    tailwindcss(),
  ],
});
