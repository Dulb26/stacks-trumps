import react from "@vitejs/plugin-react";
import { URL, fileURLToPath } from "node:url";
import { loadEnv } from "vite";
import { defineProject } from "vitest/config";

const publicEnvVars = ["APP_NAME", "GOOGLE_CLOUD_PROJECT", "AUTO_INIT"];

const optionalEnvVars = [
  "FIREBASE_APP_ID",
  "FIREBASE_API_KEY",
  "FIREBASE_AUTH_DOMAIN",
  "FIREBASE_PROJECT_ID",
  "FIREBASE_STORAGE_BUCKET",
  "FIREBASE_MESSAGING_SENDER_ID",
  "FIREBASE_REGION",
];

/**
 * Vite configuration.
 * https://vitejs.dev/config/
 */
export default defineProject(async ({ mode }) => {
  const envDir = fileURLToPath(new URL("..", import.meta.url));
  const env = loadEnv(mode, envDir, "");

  // Check required env vars
  publicEnvVars.forEach((key) => {
    if (!env[key]) throw new Error(`Missing environment variable: ${key}`);
    process.env[`VITE_${key}`] = env[key];
  });

  // Add optional env vars if they exist
  optionalEnvVars.forEach((key) => {
    if (env[key]) {
      process.env[`VITE_${key}`] = env[key];
    }
  });

  return {
    cacheDir: fileURLToPath(new URL("../.cache/vite-app", import.meta.url)),

    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            firebase: ["firebase/analytics", "firebase/app", "firebase/auth"],
            react: ["react", "react-dom", "react-router-dom"],
          },
        },
      },
    },

    plugins: [
      // The default Vite plugin for React projects
      // https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md
      react({
        jsxImportSource: "@emotion/react",
        babel: {
          plugins: ["@emotion/babel-plugin"],
        },
      }),
    ],

    server: {
      proxy: {
        "/api": {
          target:
            mode === "development"
              ? "http://127.0.0.1:5001" // Firebase Functions emulator default port
              : `https://${env.FIREBASE_REGION}-${env.GOOGLE_CLOUD_PROJECT}.cloudfunctions.net`,
          changeOrigin: true,
        },
      },
    },

    test: {
      ...{ cache: { dir: "../.cache/vitest" } },
      environment: "happy-dom",
    },
  };
});
