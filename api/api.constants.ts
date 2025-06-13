/**
 * Base URL for API endpoints
 * @constant
 * @type {string}
 * @example
 * // Development
 * BASE_URL === 'http://localhost:3000/api'
 * // Production
 * BASE_URL === 'https://your-production-api.com/api'
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

