declare module "bun" {
  interface Env {
    API_KEY_PEXELS: string;
    API_KEY_GEMINI: string;
    EDGE_TTS_CWD: string | undefined;
  }
}
