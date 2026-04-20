import Constants from "expo-constants";

type Extra = {
  apiBaseUrl?: string;
  appEnv?: string;
  stateMode?: string;
  httpClient?: string;
};

function getExtra(): Extra {
  const e = Constants.expoConfig?.extra;
  if (e && typeof e === "object") return e as Extra;
  return {};
}

const extra = getExtra();
const fromConfig = (extra.apiBaseUrl ?? "").trim();

const DEV_FALLBACK = "http://localhost:3000/api";
const PROD_FALLBACK = "https://your-production-api.com/api";

/**
 * Base URL for API calls.
 *
 * Prefer `EXPO_PUBLIC_API_BASE_URL` (and optional `EXPO_PUBLIC_API_BASE_URL_STAGING`) in `.env`
 * so `app.config.ts` can inject `extra.apiBaseUrl` at build time. If unset, these fallbacks apply.
 */
const BASE_URL = fromConfig
  ? fromConfig
  : __DEV__
    ? DEV_FALLBACK
    : PROD_FALLBACK;

/**
 * Key used for storing authentication token
 * @constant
 * @type {string}
 */
const TOKEN_KEY = "auth_token";

export { BASE_URL, TOKEN_KEY };
