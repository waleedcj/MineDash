import { Component, createMemo, createSignal, Switch, Match } from 'solid-js';
import Layout from './components/layout/Layout';
import { useInfiniteCoinsQuery } from './hooks/coinGeckoApi';
import { CoinGeckoCoinPrices } from './types/dashboard.types';
import DashboardOverview from './components/dashboard/DashboardOverview';
import MiningRigsPage from './components/mining/MiningRigPage'; // <-- Import the new page

// Define the pages for type safety
type Page = 'Dashboard' | 'Mining Rigs' | 'Crypto Prices' | 'Settings';

const App: Component = () => {
  const [currentPage, setCurrentPage] = createSignal<Page>('Dashboard');
  const [currency] = createSignal<'usd' | 'eur'>('usd');
  const [timeFrame] = createSignal<'24h' | '7d' | '30d'>('24h');

  const coinsQuery = useInfiniteCoinsQuery(() => timeFrame(), () => currency());

  const coinPrices = createMemo<CoinGeckoCoinPrices>(() => {
    const prices: CoinGeckoCoinPrices = { 'bitcoin': 60000, 'ethereum': 3000, 'monero': 150 };
    if (coinsQuery.data) {
      for (const page of coinsQuery.data.pages) {
        for (const coin of page) {
          if (Object.prototype.hasOwnProperty.call(prices, coin.id)) {
            prices[coin.id] = coin.current_price;
          }
        }
      }
    }
    return prices;
  });

  return (
    // Pass page state and setter to Layout/Sidebar
    <Layout 
      coinPrices={coinPrices} 
      currentPage={currentPage()} 
      setCurrentPage={setCurrentPage}
    >
      <Switch fallback={<DashboardOverview coinPrices={coinPrices} />}>
        <Match when={currentPage() === 'Dashboard'}>
          <DashboardOverview coinPrices={coinPrices} />
        </Match>
        <Match when={currentPage() === 'Mining Rigs'}>
          <MiningRigsPage />
        </Match>
        <Match when={currentPage() === 'Crypto Prices'}>
          <div class="p-4 bg-mining-gray rounded-lg">Coming soon...</div>
        </Match>
        <Match when={currentPage() === 'Settings'}>
           <div class="p-4 bg-mining-gray rounded-lg">Coming soon...</div>
        </Match>
      </Switch>
    </Layout>
  );
};

export default App;