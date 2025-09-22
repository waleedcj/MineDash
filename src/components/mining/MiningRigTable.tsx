import { Component, For } from 'solid-js';
import { MiningRig } from '../../types/mining.types';
import MiningRigRow from './MiningRigRow';

interface MiningRigTableProps {
  rigs: MiningRig[];
}

const MiningRigTable: Component<MiningRigTableProps> = (props) => {
  return (
    <div class="relative overflow-x-auto shadow-md rounded-lg">
      <table class="w-full text-sm text-left text-gray-300">
        <thead class="text-xs text-gray-400 uppercase bg-mining-dark">
          <tr>
            <th scope="col" class="px-6 py-3">Rig Name</th>
            <th scope="col" class="px-6 py-3">Status</th>
            <th scope="col" class="px-6 py-3">Hashrate</th>
            <th scope="col" class="px-6 py-3">Power</th>
            <th scope="col" class="px-6 py-3">Temp</th>
            <th scope="col" class="px-6 py-3">Efficiency</th>
            <th scope="col" class="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          <For each={props.rigs}>
            {(rig) => <MiningRigRow rig={rig} />}
          </For>
        </tbody>
      </table>
    </div>
  );
};

export default MiningRigTable;