import { Component, JSX, Accessor, Setter } from 'solid-js';
import Header from './Header';
import Sidebar from './Sidebar';
import { CoinGeckoCoinPrices } from '../../types/dashboard.types';

type Page = 'Dashboard' | 'Mining Rigs' | 'Crypto Prices' | 'Settings';

interface LayoutProps {
  children: JSX.Element;
  coinPrices: Accessor<CoinGeckoCoinPrices>;
  currentPage: string;
  setCurrentPage: Setter<Page>;
}

const Layout: Component<LayoutProps> = (props) => {
  return (
    <div class="flex h-screen bg-mining-dark text-gray-200 font-sans">
      <Sidebar currentPage={props.currentPage} setCurrentPage={props.setCurrentPage} />
      <div class="flex-1 flex flex-col overflow-hidden">
        <Header coinPrices={props.coinPrices} />
        <main class="flex-1 overflow-x-hidden overflow-y-auto bg-mining-dark p-4 sm:p-6 lg:p-8">
          {props.children}
        </main>
      </div>
    </div>
  );
};

export default Layout;