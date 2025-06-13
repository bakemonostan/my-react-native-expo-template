import { onlineManager } from '@tanstack/react-query';
import * as Network from 'expo-network';
import { useEffect, useState } from 'react';

export interface NetworkState {
  isConnected: boolean;
  isInternetReachable: boolean | null;
  type: Network.NetworkStateType;
}

export function useNetwork() {
  const [networkState, setNetworkState] = useState<NetworkState>({
    isConnected: true,
    isInternetReachable: true,
    type: Network.NetworkStateType.UNKNOWN,
  });

  useEffect(() => {
    // Initial network state check
    Network.getNetworkStateAsync().then((state) => {
      setNetworkState({
        isConnected: state.isConnected ?? true,
        isInternetReachable: state.isInternetReachable ?? true,
        type: state.type ?? Network.NetworkStateType.UNKNOWN,
      });
    });

    // Subscribe to network state changes
    const subscription = Network.addNetworkStateListener((state) => {
      setNetworkState({
        isConnected: state.isConnected ?? true,
        isInternetReachable: state.isInternetReachable ?? true,
        type: state.type ?? Network.NetworkStateType.UNKNOWN,
      });
      // Update React Query's online manager
      onlineManager.setOnline(!!state.isConnected);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return {
    ...networkState,
    isOffline: !networkState.isConnected || !networkState.isInternetReachable,
  };
} 
