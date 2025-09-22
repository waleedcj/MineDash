// src/hooks/miningApi.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/solid-query';
import {
  fetchMiningRigs,
  fetchMiningPools,
  fetchMiningStats,
  fetchHistoricalMiningData,
  updateRigStatus,
  updateRigAlgorithm,
} from '../lib/miningMockApi';
import { MiningRig, MiningPool, MiningStats, MiningRigStatus, MiningAlgorithm, HistoricalDataPoint } from '../types/mining.types';
import { CoinGeckoCoinPrices } from '../types/dashboard.types';
import { Accessor } from 'solid-js';

export function useMiningStatsQuery(coinPrices: Accessor<CoinGeckoCoinPrices>) {
  return useQuery(() => ({
    queryKey: ['miningStats'],
    queryFn: () => fetchMiningStats(coinPrices()),
    refetchInterval: 5000,
    staleTime: 4000,
  }));
}

export function useMiningRigsQuery() {
  return useQuery(() => ({
    queryKey: ['miningRigs'],
    queryFn: fetchMiningRigs,
    refetchInterval: 5000,
  }));
}

export function useMiningPoolsQuery() {
  return useQuery(() => ({
    queryKey: ['miningPools'],
    queryFn: fetchMiningPools,
    staleTime: 1000 * 60 * 5,
  }));
}

export function useHistoricalMiningDataQuery(timeframe: Accessor<'24h' | '7d' | '30d'>) {
  return useQuery(() => ({
    queryKey: ['historicalMiningData', timeframe()],
    queryFn: () => fetchHistoricalMiningData(timeframe()),
    staleTime: 1000 * 60,
  }));
}

// --- MUTATIONS (Corrected) ---
export function useUpdateRigStatusMutation() {
  const queryClient = useQueryClient();
  // CORRECTED: useMutation now wraps options in a function and uses `mutation`
  return useMutation(() => ({
    mutation: (variables: { rigId: string; status: MiningRigStatus }) => 
      updateRigStatus(variables.rigId, variables.status),
    
    onMutate: async (newStatus) => {
      await queryClient.cancelQueries({ queryKey: ['miningRigs'] });
      const previousRigs = queryClient.getQueryData<MiningRig[]>(['miningRigs']);
      // queryClient.setQueryData<MiningRig[]>(['miningRigs'], (old) =>
      //   old?.map(rig => rig.id === newStatus.rigId ? { ...rig, status: newStatus.status } : rig)
      // );
      return { previousRigs };
    },
    onError: (err, newStatus, context) => {
      if (context?.previousRigs) {
        queryClient.setQueryData(['miningRigs'], context.previousRigs);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['miningRigs'] });
      queryClient.invalidateQueries({ queryKey: ['miningStats'] });
    },
  }));
}

export function useUpdateRigAlgorithmMutation() {
  const queryClient = useQueryClient();
  // CORRECTED: useMutation now wraps options in a function and uses `mutation`
  return useMutation(() => ({
    mutation: (variables: { rigId: string; algorithm: MiningAlgorithm; coin: string }) =>
      updateRigAlgorithm(variables.rigId, variables.algorithm, variables.coin),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['miningRigs'] });
      queryClient.invalidateQueries({ queryKey: ['miningStats'] });
    },
  }));
}