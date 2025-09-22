import { Component, Show, Switch, Match } from 'solid-js';
import { useMiningRigsQuery } from '../../hooks/miningApi';
import MiningRigTable from './MiningRigTable';
import { MiningRig } from 'src/types/mining.types';

const MiningRigsPage: Component = () => {
  const rigsQuery = useMiningRigsQuery();

  return (
    <div>
      <h1 class="text-3xl font-bold text-mining-light-blue mb-6">Mining Rigs Status</h1>
      <Switch>
        <Match when={rigsQuery.isLoading}>
          <div class="text-center p-10">Loading rig data...</div>
        </Match>
        <Match when={rigsQuery.isError}>
          <div class="text-center p-10 text-mining-red">Error fetching rigs: {rigsQuery.error?.message}</div>
        </Match>
        <Match when={rigsQuery.isSuccess && Array.isArray(rigsQuery.data)}>
          <MiningRigTable rigs={rigsQuery.data as MiningRig[]} />
        </Match>
      </Switch>
    </div>
  );
};

export default MiningRigsPage;