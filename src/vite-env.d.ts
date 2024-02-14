/// <reference types="vite/client" />

interface ImportMetaEnv {
    VITE_BACKEND_API: string;
    VITE_APP_TITLE: string;
    // more env variables...
  }
  
  interface ImportMeta {
    env: ImportMetaEnv;
  }
  