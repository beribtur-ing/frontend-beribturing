/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_MENU_LEVEL: number;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
