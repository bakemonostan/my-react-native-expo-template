import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Simple AsyncStorage wrapper with error handling.
 * Use this for non-sensitive data (preferences, settings, onboarding state, etc.).
 * For sensitive data (tokens, credentials) use expo-secure-store instead.
 */
export const storage = {
  /**
   * Retrieve a stored string value.
   * Returns null if the key doesn't exist or on error.
   */
  get: async (key: string): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem(key);
    } catch {
      return null;
    }
  },

  /**
   * Store a string value.
   */
  set: async (key: string, value: string): Promise<void> => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch {
      // Silent fail — non-critical persistence
    }
  },

  /**
   * Store an object (JSON-serialised internally).
   */
  setObject: async <T>(key: string, value: T): Promise<void> => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Silent fail
    }
  },

  /**
   * Retrieve and parse a stored object.
   * Returns null if the key doesn't exist, the value isn't valid JSON, or on error.
   */
  getObject: async <T>(key: string): Promise<T | null> => {
    try {
      const raw = await AsyncStorage.getItem(key);
      if (!raw) return null;
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  },

  /**
   * Remove a stored value.
   */
  remove: async (key: string): Promise<void> => {
    try {
      await AsyncStorage.removeItem(key);
    } catch {
      // Silent fail
    }
  },
};
