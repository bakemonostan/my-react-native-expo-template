/**
 * Base URL for API endpoints.
 *
 * REPLACE THESE before shipping:
 *  - Dev:  replace 'http://localhost:3000/api' with your local/ngrok/dev tunnel URL
 *  - Prod: replace 'https://your-production-api.com/api' with your real API URL
 *
 * Tip: move these to app.json `extra` + expo-constants so they can vary per EAS build profile.
 */
const BASE_URL = __DEV__
  ? 'http://localhost:3000/api'
  : 'https://your-production-api.com/api';

/**
 * Key used for storing authentication token
 * @constant
 * @type {string}
 */
const TOKEN_KEY = 'auth_token';

export { BASE_URL, TOKEN_KEY };

