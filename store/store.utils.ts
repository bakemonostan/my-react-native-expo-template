import AsyncStorage from '@react-native-async-storage/async-storage';
import { StateCreator, StoreApi } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Creates a persistence middleware using SecureStore
 * @template T - The type of the store state
 * @param {StateCreator<T>} store - The store to persist
 * @param {string} [storeName='app-store'] - The name of the store in SecureStore
 * @returns {StateCreator<T>} The store with persistence middleware
 * @example
 * const useStore = create(
 *   withPersist<StoreState>(
 *     (set) => ({
 *       count: 0,
 *       increment: () => set((state) => ({ count: state.count + 1 }))
 *     }),
 *     'counter-store'
 *   )
 * );
 */
export const withPersist = <T extends object>(
  store: StateCreator<T>,
  storeName: string = 'app-store'
) => {
  return persist(store, {
    name: storeName,
    storage: {
      getItem: async (name) => {
        const value = await AsyncStorage.getItem(name);
        return value ? JSON.parse(value) : null;
      },
      setItem: async (name, value) => {
        await AsyncStorage.setItem(name, JSON.stringify(value));
      },
      removeItem: async (name) => {
        await AsyncStorage.removeItem(name);
      },
    },
  });
};

/**
 * Creates type-safe selectors for a store to prevent unnecessary rerenders
 * @template T - The type of the store state
 * @param {StoreApi<T>} store - The store to create selectors for
 * @returns {Record<keyof T, () => T[keyof T]>} Object containing selectors for each store property
 * @example
 * interface StoreState {
 *   count: number;
 *   name: string;
 *   increment: () => void;
 * }
 * 
 * const useStore = create<StoreState>((set) => ({
 *   count: 0,
 *   name: 'Counter',
 *   increment: () => set((state) => ({ count: state.count + 1 }))
 * }));
 * 
 * const selectors = createSelectors(useStore);
 * 
 * // In your component:
 * function Counter() {
 *   const count = useStore(selectors.count);
 *   return <Text>Count: {count}</Text>;
 * }
 */
export const createSelectors = <T extends object>(store: StoreApi<T>) => {
  const storeState = store.getState();
  return Object.keys(storeState).reduce((acc, key) => {
    const typedKey = key as keyof T;
    acc[typedKey] = () => storeState[typedKey];
    return acc;
  }, {} as { [K in keyof T]: () => T[K] });
};

/**
 * Creates a reset action for a store
 * @template T - The type of the store state
 * @param {T} initialState - The initial state of the store
 * @returns {(set: SetState<T>) => { reset: () => void }} Function that adds reset capability to store
 * @example
 * interface StoreState {
 *   count: number;
 *   name: string;
 *   reset: () => void;
 * }
 * 
 * const initialState = {
 *   count: 0,
 *   name: 'Counter'
 * };
 * 
 * const useStore = create<StoreState>((set) => ({
 *   ...initialState,
 *   ...createResetAction(initialState)(set),
 *   increment: () => set((state) => ({ count: state.count + 1 }))
 * }));
 * 
 * // In your logout function:
 * const handleLogout = () => {
 *   useStore.getState().reset();
 * };
 */
export const createResetAction = <T extends object>(initialState: T) => 
  (set: (fn: (state: T) => Partial<T>) => void) => ({
    reset: () => set(() => initialState)
  });

/**
 * Combines multiple store utilities
 * @template T - The type of the store state
 * @param {StateCreator<T>} store - The store to enhance
 * @param {T} initialState - The initial state of the store
 * @param {string} [storeName='app-store'] - The name of the store in SecureStore
 * @returns {StateCreator<T>} The enhanced store
 * @example
 * interface StoreState {
 *   count: number;
 *   name: string;
 *   reset: () => void;
 *   increment: () => void;
 * }
 * 
 * const initialState = {
 *   count: 0,
 *   name: 'Counter'
 * };
 * 
 * const useStore = create(
 *   createStoreWithUtils<StoreState>(
 *     (set) => ({
 *       ...initialState,
 *       increment: () => set((state) => ({ count: state.count + 1 }))
 *     }),
 *     initialState,
 *     'counter-store'
 *   )
 * );
 * 
 * // Create selectors
 * const selectors = createSelectors(useStore);
 * 
 * // In your component:
 * function Counter() {
 *   const count = useStore(selectors.count);
 *   return <Text>Count: {count}</Text>;
 * }
 */
