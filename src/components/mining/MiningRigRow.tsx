import { Component, Show } from 'solid-js';
import { MiningRig } from '../../types/mining.types';
import { useUpdateRigStatusMutation } from '../../hooks/miningApi';
import StatusIndicator from '../ui/StatusIndicator';

interface MiningRigRowProps {
  rig: MiningRig;
}

const MiningRigRow: Component<MiningRigRowProps> = (props) => {
  const statusMutation = useUpdateRigStatusMutation();

  const handleStart = () => {
    statusMutation.mutate();
  };

  const handleStop = () => {
    statusMutation.mutate();
  };
  
  const formatHashrate = (hashrate: number, algorithm: string) => {
    if (algorithm === 'SHA-256') {
        return `${(hashrate / 1000000).toFixed(2)} TH/s`
    }
    return `${hashrate.toFixed(2)} MH/s`
  }

  return (
    <tr class="bg-mining-gray border-b border-mining-light-gray hover:bg-mining-light-gray/50 transition-colors">
      <td class="px-6 py-4 font-bold text-white">{props.rig.name}</td>
      <td class="px-6 py-4"><StatusIndicator status={props.rig.status} /></td>
      <td class="px-6 py-4 text-mining-light-blue font-mono">{formatHashrate(props.rig.hashrate, props.rig.algorithm)}</td>
      <td class="px-6 py-4 font-mono">{props.rig.power.toFixed(0)} W</td>
      <td class="px-6 py-4 font-mono">{props.rig.temperature.toFixed(1)}°C</td>
      <td class="px-6 py-4 font-mono">{props.rig.efficiency.toFixed(2)} MH/W</td>
      <td class="px-6 py-4">
        <div class="flex items-center space-x-2">
          <Show when={props.rig.status === 'offline'}>
            <button
              onClick={handleStart}
              disabled={statusMutation.isPending}
              class="px-3 py-1 bg-mining-green text-white font-semibold rounded-md shadow-md hover:bg-green-500 disabled:bg-gray-500 disabled:cursor-not-allowed transition-all"
            >
              Start
            </button>
          </Show>
          <Show when={props.rig.status === 'online'}>
            <button
              onClick={handleStop}
              disabled={statusMutation.isPending}
              class="px-3 py-1 bg-mining-red text-white font-semibold rounded-md shadow-md hover:bg-red-500 disabled:bg-gray-500 disabled:cursor-not-allowed transition-all"
            >
              Stop
            </button>
          </Show>
        </div>
      </td>
    </tr>
  );
};

export default MiningRigRow;