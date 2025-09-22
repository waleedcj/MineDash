import { Component, For, Show } from 'solid-js';
import { useInfiniteCoinsQuery } from '../../hooks/coinGeckoApi';

const CryptoPriceCard: Component = () => {
  // We only care about these specific coins for our mining dashboard
  const mineableCoins = ['bitcoin', 'ethereum', 'monero'];
  const coinsQuery = useInfiniteCoinsQuery(() => '24h', () => 'usd');

  const filteredCoins = () => 
    coinsQuery.data?.pages
      .flat()
      .filter(coin => mineableCoins.includes(coin.id));

  return (
    <div class="bg-mining-gray p-6 rounded-lg shadow-lg">
      <h3 class="text-lg font-semibold text-white mb-4">Live Coin Prices</h3>
      <Show 
        when={!coinsQuery.isLoading && filteredCoins()} 
        fallback={<p class="text-gray-400">Loading prices...</p>}
      >
        <ul class="space-y-4">
          <For each={filteredCoins()}>
            {(coin) => {
              const priceChange = coin.price_change_percentage_24h;
              const isPositive = priceChange >= 0;
              return (
                <li class="flex items-center justify-between">
                  <div class="flex items-center">
                    <img src={coin.image} alt={coin.name} class="w-8 h-8 mr-3"/>
                    <div>
                      <p class="font-bold text-white">{coin.name}</p>
                      <p class="text-sm text-gray-400 uppercase">{coin.symbol}</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="font-semibold text-white">${coin.current_price.toLocaleString()}</p>
                    <p class={`text-sm font-bold ${isPositive ? 'text-mining-green' : 'text-mining-red'}`}>
                      {isPositive ? '+' : ''}{priceChange.toFixed(2)}%
                    </p>
                  </div>
                </li>
              );
            }}
          </For>
        </ul>
      </Show>
    </div>
  );
};

export default CryptoPriceCard;