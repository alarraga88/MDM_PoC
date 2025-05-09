/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_USE_MOCK: string;
    readonly VITE_USE_MOCK_OKTA: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }