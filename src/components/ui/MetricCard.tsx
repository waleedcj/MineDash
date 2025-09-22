import { Component, JSX, Show } from 'solid-js';

interface MetricCardProps {
  title: string;
  value: string;
  unit?: string;
  icon: JSX.Element;
  isLoading: boolean;
  trend?: 'up' | 'down' | 'neutral';
}

const TrendIcon = (props: { trend: 'up' | 'down' | 'neutral' }) => {
    if (props.trend === 'up') return <svg class="w-5 h-5 text-mining-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>;
    if (props.trend === 'down') return <svg class="w-5 h-5 text-mining-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17l5-5m0 0l-5-5m5 5H6"></path></svg>;
    return null;
}

const MetricCard: Component<MetricCardProps> = (props) => {
  return (
    <div class="bg-mining-gray p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
      <Show
        when={!props.isLoading}
        fallback={
          <div class="animate-pulse">
            <div class="h-6 bg-mining-light-gray rounded w-3/4 mb-4"></div>
            <div class="h-10 bg-mining-light-gray rounded w-1/2"></div>
          </div>
        }
      >
        <div class="flex justify-between items-start">
            <div>
                <p class="text-sm font-medium text-gray-400">{props.title}</p>
                <div class="flex items-end space-x-2 mt-1">
                    <span class="text-3xl font-bold text-white">{props.value}</span>
                    <span class="text-lg text-gray-400">{props.unit}</span>
                </div>
            </div>
            <div class="p-3 bg-mining-dark rounded-full">{props.icon}</div>
        </div>
      </Show>
    </div>
  );
};

export default MetricCard;