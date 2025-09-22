import { Component, Accessor, Show, createMemo } from 'solid-js';
import { useMiningStatsQuery } from '../../hooks/miningApi';
import { CoinGeckoCoinPrices } from '../../types/dashboard.types';
import { useSingleCoinQuery } from '../../hooks/coinGeckoApi';

interface HeaderProps {
  coinPrices: Accessor<CoinGeckoCoinPrices>;
}

const Header: Component<HeaderProps> = (props) => {
  // Use the core mining stats query
  const statsQuery = useMiningStatsQuery(props.coinPrices);

  // Fetch real-time BTC price for the header
  const btcQuery = useSingleCoinQuery(() => 'bitcoin');

  const btcPrice = createMemo(() => btcQuery.data?.market_data.current_price.usd);

  const formatHashrate = (hashrate: number) => {
    if (hashrate < 1000) return `${hashrate.toFixed(2)} MH/s`;
    if (hashrate < 1000000) return `${(hashrate / 1000).toFixed(2)} GH/s`;
    return `${(hashrate / 1000000).toFixed(2)} TH/s`;
  };

  return (
    <header class="bg-mining-gray shadow-md p-4 flex justify-between items-center flex-shrink-0 z-10">
      <div class="flex items-center space-x-6">
        <div class="flex items-center">
          <span class="text-gray-400 mr-2">Total Hashrate:</span>
          <Show when={!statsQuery.isLoading} fallback={<span class="text-lg font-bold text-white">...</span>}>
            <span class="text-lg font-bold text-mining-light-blue">{formatHashrate(statsQuery.data?.totalHashrate || 0)}</span>
          </Show>
        </div>
        <div class="hidden sm:flex items-center">
          <span class="text-gray-400 mr-2">Daily Profit:</span>
          <Show when={!statsQuery.isLoading} fallback={<span class="text-lg font-bold text-white">...</span>}>
            <span class="text-lg font-bold text-mining-green">${statsQuery.data?.dailyProfitUSD.toFixed(2)}</span>
          </Show>
        </div>
      </div>
      <div class="flex items-center space-x-4">
        <div class="hidden md:flex items-center bg-mining-dark p-2 rounded-lg">
          <img src="https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579" alt="BTC" class="w-6 h-6 mr-2" />
          <Show when={btcPrice()} fallback={<span class="font-semibold text-white">Loading...</span>}>
            <span class="font-semibold text-white">${btcPrice()?.toLocaleString()}</span>
          </Show>
        </div>
        <div class="relative">
          <button class="p-2 bg-mining-dark rounded-full hover:bg-mining-light-gray">
            <svg class="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
          </button>
          <span class="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-mining-gray"></span>
        </div>
        <div class="w-10 h-10 bg-mining-light-blue rounded-full flex items-center justify-center font-bold text-lg">
          U
        </div>
      </div>
    </header>
  );
};

export default Header;