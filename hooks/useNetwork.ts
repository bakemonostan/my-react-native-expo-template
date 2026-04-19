/**
 * Device connectivity via Expo Network, plus TanStack Query `onlineManager` integration.
 *
 * @packageDocumentation
 */

import { onlineManager } from "@tanstack/react-query";
import * as Network from "expo-network";
import { useEffect } from "react";

/**
 * Normalized fields from {@link useNetwork} (optional Expo fields coalesced with defaults).
 */
export interface NetworkState {
  /** Whether an active network connection exists (`?? true` while Expo state is still loading). */
  isConnected: boolean;
  /** Whether the active connection can reach the internet (`?? true` while unknown). */
  isInternetReachable: boolean;
  /** Connection technology (Wi‑Fi, cellular, none, unknown, …). */
  type: Network.NetworkStateType;
}

/**
 * Uses `expo-network`’s `useNetworkState` and mirrors `isConnected` into `onlineManager` so React Query
 * pauses/resumes network behavior with the OS. Adds `isOffline` for simple UI branching.
 *
 * @returns Connectivity fields plus `isOffline` (`!isConnected || !isInternetReachable`).
 *
 * @see {@link https://docs.expo.dev/versions/latest/sdk/network/ | Expo Network}
 *
 * @example
 * ```tsx
 * const { isConnected, isOffline, type } = useNetwork();
 *
 * if (isOffline) {
 *   return <Text>No connection</Text>;
 * }
 * ```
 */
export function useNetwork() {
  const state = Network.useNetworkState();

  useEffect(() => {
    onlineManager.setOnline(state.isConnected ?? true);
  }, [state.isConnected]);

  const isConnected = state.isConnected ?? true;
  const isInternetReachable = state.isInternetReachable ?? true;
  const type = state.type ?? Network.NetworkStateType.UNKNOWN;

  return {
    isConnected,
    isInternetReachable,
    type,
    isOffline: !isConnected || !isInternetReachable,
  };
}
