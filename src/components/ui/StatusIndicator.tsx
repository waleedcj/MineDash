import { Component } from 'solid-js';
import { MiningRigStatus } from '../../types/mining.types';

interface StatusIndicatorProps {
  status: MiningRigStatus;
}

const StatusIndicator: Component<StatusIndicatorProps> = (props) => {
  const statusClasses = {
    online: 'bg-mining-green',
    offline: 'bg-mining-red',
    maintenance: 'bg-mining-yellow',
  };

  return (
    <div class="flex items-center">
      <span class={`w-3 h-3 rounded-full mr-2 ${statusClasses[props.status]}`}></span>
      <span class="capitalize">{props.status}</span>
    </div>
  );
};

export default StatusIndicator;