/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TMDB_BASE_URL: string;
  readonly VITE_TMDB_BEARER_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
