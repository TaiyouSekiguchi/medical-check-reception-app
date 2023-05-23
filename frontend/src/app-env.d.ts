/// <reference types="vite/client" />

interface ImportMetaEnv {
  // ここに定義した変数を追加していく
  readonly VITE_APP_TITLE: string;
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
