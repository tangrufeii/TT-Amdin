interface ImportMetaEnv {
  readonly DEV?: boolean;
  readonly VITE_HTTP_PROXY?: string;
  readonly VITE_SERVICE_BASE_URL?: string;
  readonly VITE_API_BASE?: string;
  readonly VITE_SERVICE_SUCCESS_CODE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
