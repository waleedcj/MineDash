import { Component, createMemo, Accessor, Show } from 'solid-js';
import { useMiningStatsQuery, useMiningRigsQuery, useHistoricalMiningDataQuery } from '../../hooks/miningApi';
import { CoinGeckoCoinPrices } from '../../types/dashboard.types';
import MetricCard from '../ui/MetricCard';
import LineChart from '../charts/LineChart';
import CryptoPriceCard from '../crypto/CryptoPriceCard';

// Icons for Metric Cards
const PowerIcon = () => <svg class="w-6 h-6 text-mining-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>;
const RigIcon = () => <svg class="w-6 h-6 text-mining-light-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path></svg>;
const EfficiencyIcon = () => <svg class="w-6 h-6 text-mining-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>;
const CostIcon = () => <svg class="w-6 h-6 text-mining-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01M12 6v-1m0-1V4m0 12v1m0 1v1m0 1v1m-2.599-1.401A5.993 5.993 0 0012 16m0 0a5.993 5.993 0 01-2.599-1M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>;

interface DashboardOverviewProps {
  coinPrices: Accessor<CoinGeckoCoinPrices>;
}

const DashboardOverview: Component<DashboardOverviewProps> = (props) => {
  const statsQuery = useMiningStatsQuery(props.coinPrices);
  const rigsQuery = useMiningRigsQuery();
  const historyQuery = useHistoricalMiningDataQuery(() => '24h');

  // Memoize the chart data so it's only recalculated when historyQuery changes
  const hashrateChartData = createMemo(() => {
    const data = historyQuery.data;
    if (!data) return { labels: [], datasets: [] };

    return {
      labels: data.map(d => new Date(d.timestamp).toLocaleTimeString()),
      datasets: [
        {
          label: 'Total Hashrate',
          data: data.map(d => d.hashrate / 1000000), // Convert to TH/s for display
          borderColor: '#41a8e1',
          backgroundColor: 'rgba(65, 168, 225, 0.1)',
          fill: true,
          tension: 0.4,
        },
      ],
    };
  });

  return (
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Metric Cards */}
      <div class="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard 
            title="Power Consumption"
            value={
              statsQuery.data?.totalPower !== undefined
                ? (statsQuery.data.totalPower / 1000).toFixed(2)
                : '--'
            }
            unit="kW"
            icon={<PowerIcon />}
            isLoading={statsQuery.isLoading}
          />
          <MetricCard 
            title="Active Rigs"
            value={`${statsQuery.data?.activeRigs || 0} / ${statsQuery.data?.totalRigs || 0}`}
            icon={<RigIcon />}
            isLoading={statsQuery.isLoading || rigsQuery.isLoading}
          />
          <MetricCard 
            title="Efficiency"
            value={
              statsQuery.data?.overallEfficiency !== undefined
                ? statsQuery.data.overallEfficiency.toFixed(2)
                : '--'
            }
            unit="MH/W"
            icon={<EfficiencyIcon />}
            isLoading={statsQuery.isLoading}
          />
          <MetricCard 
            title="Daily Electricity Cost"
            value={`$${statsQuery.data?.electricityCostUSD.toFixed(2)}`}
            icon={<CostIcon />}
            isLoading={statsQuery.isLoading}
          />
      </div>

      {/* Charts and Lists */}
      <div class="lg:col-span-3 h-[24rem] md:h-[28rem]">
        <Show when={!historyQuery.isLoading} fallback={<div class="bg-mining-gray p-6 rounded-lg shadow-lg h-full animate-pulse"></div>}>
            <LineChart 
                chartId="hashrate-chart"
                title="Total Hashrate (TH/s)"
                data={hashrateChartData}
            />
        </Show>
      </div>
      <div class="lg:col-span-1 h-auto md:h-[28rem]">
        <CryptoPriceCard />
      </div>
    </div>
  );
};

export default DashboardOverview;