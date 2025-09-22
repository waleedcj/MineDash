// src/hooks/coinGeckoApi.ts
import { useQuery, useInfiniteQuery } from '@tanstack/solid-query';
import { throttledFetch } from '../lib/apiClient';
import { CoinDetail, Coin, Currency, TimeFrame } from '../types/coinGecko.types';

const COINGECKO_API_KEY = 'CG-7UhFFFaPoZL847CohsizhKDf';

// --- API Fetcher Functions (Unchanged) ---

const fetchAllCoins = async (page: number = 1, pageSize: number = 10, timeFrame: TimeFrame = '24h', currency: Currency): Promise<Coin[]> => {
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&price_change_percentage=${timeFrame}&order=market_cap_desc&per_page=${pageSize}&page=${page}`;
  const options = { method: 'GET', headers: { 'x-cg-demo-api-key': COINGECKO_API_KEY } };
  try {
    return await throttledFetch(url, options);
  } catch (error) {
    console.error("Fetch failed for allCoins:", error);
    throw error;
  }
};

const fetchCoinOhlc = async (coinId: string, days: number = 7, currency: Currency): Promise<[number, number][]> => {
  const url = `https://api.coingecko.com/api/v3/coins/${coinId}/ohlc?vs_currency=${currency}&days=${days}`;
  const options = { method: 'GET', headers: { 'x-cg-demo-api-key': COINGECKO_API_KEY } };
  try {
    const data: [number, number, number, number, number][] = await throttledFetch(url, options);
    return data.map(pricePoint => [pricePoint[0], pricePoint[4]]); // [timestamp, closing_price]
  } catch (error) {
    console.error(`Fetch failed for coinOhlc (${coinId}):`, error);
    throw error;
  }
};

const fetchSingleCoin = async (coinIdentifier: string): Promise<CoinDetail> => {
  const url = `https://api.coingecko.com/api/v3/coins/${coinIdentifier}?localization=false&market_data=true&community_data=false&developer_data=false&sparkline=false`;
  const options = { method: 'GET', headers: { 'x-cg-demo-api-key': COINGECKO_API_KEY } };
  try {
    return await throttledFetch(url, options);
  } catch (error) {
    console.error(`Fetch failed for singleCoin (${coinIdentifier}):`, error);
    throw error;
  }
};


// --- Solid Query Hooks (Final Version) ---

/**
 * Hook for fetching paginated coin market data.
 */
export function useInfiniteCoinsQuery(timeFrame: () => TimeFrame, currency: () => Currency) {
  return useInfiniteQuery(() => ({
    queryKey: ['allCoins', timeFrame(), currency()],
    queryFn: ({ pageParam }) => fetchAllCoins(pageParam, 10, timeFrame(), currency()),
    initialPageParam: 1,
    // CORRECTED LOGIC: Return the next page number directly.
    // The second argument 'allPages' is provided by TanStack Query.
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length > 0 ? allPages.length + 1 : undefined;
    },
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60 * 5,
  }));
}

/**
 * Hook for fetching historical price data for a chart.
 */
export function useCoinPriceHistoryQuery(coinId: () => string, timeFrame: () => TimeFrame, currency: () => Currency) {
  return useQuery(() => {
    const currentCoinId = coinId();
    const currentTf = timeFrame();
    const currentCurrency = currency();
    
    let days: number;
    switch (currentTf) {
      case '1h': case '24h': days = 1; break;
      case '7d': days = 7; break;
      case '30d': days = 30; break;
      case '1y': days = 365; break;
      default: days = 7;
    }
    
    return {
      queryKey: ['coinOhlc', currentCoinId, currentTf, currentCurrency],
      queryFn: () => fetchCoinOhlc(currentCoinId, days, currentCurrency),
      staleTime: 1000 * 60 * 5,
      refetchInterval: 1000 * 60 * 5,
      enabled: !!currentCoinId,
    };
  });
}

/**
 * Hook for fetching detailed data for a single coin.
 */
export function useSingleCoinQuery(coinIdentifier: () => string) {
  return useQuery(() => ({
    queryKey: ['singleCoin', coinIdentifier().toLowerCase()],
    queryFn: () => fetchSingleCoin(coinIdentifier()),
    staleTime: 1000 * 30,
    refetchInterval: 1000 * 60 * 1,
    enabled: !!coinIdentifier(),
  }));
}