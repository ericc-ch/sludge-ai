/// <reference types="vite-node/client" />

interface ImportMetaEnv {
  VITE_PEXELS_API_KEY: string;
  VITE_GEMINI_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
