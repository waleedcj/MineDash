// src/lib/miningMockApi.ts
import { MiningRig, MiningPool, MiningStats, MiningRigStatus, MiningAlgorithm, HistoricalDataPoint } from '../types/mining.types';
import { CoinGeckoCoinPrices } from '../types/dashboard.types';

// Mock data generation utilities
const getRandom = (min: number, max: number) => Math.random() * (max - min) + min;
const getRandomInt = (min: number, max: number) => Math.floor(getRandom(min, max));

const initialRigs: MiningRig[] = [
  {
    id: 'rig-001', name: 'GPU Rig #1', status: 'online', hashrate: getRandom(120, 150), power: getRandom(450, 500), temperature: getRandom(55, 65), fan_speed: getRandomInt(60, 80), uptime: getRandomInt(100, 500), shares_accepted: getRandomInt(10000, 20000), shares_rejected: getRandomInt(10, 50), algorithm: 'Ethash', coin: 'Ethereum', efficiency: 0, gpuCount: 6, lastUpdate: Date.now()
  },
  {
    id: 'rig-002', name: 'GPU Rig #2', status: 'online', hashrate: getRandom(110, 140), power: getRandom(420, 480), temperature: getRandom(58, 68), fan_speed: getRandomInt(65, 85), uptime: getRandomInt(80, 400), shares_accepted: getRandomInt(8000, 18000), shares_rejected: getRandomInt(15, 60), algorithm: 'Ethash', coin: 'Ethereum', efficiency: 0, gpuCount: 5, lastUpdate: Date.now()
  },
  {
    id: 'rig-003', name: 'ASIC Miner S19', status: 'online', hashrate: getRandom(95000, 110000), power: getRandom(3000, 3250), temperature: getRandom(70, 80), fan_speed: getRandomInt(90, 100), uptime: getRandomInt(200, 700), shares_accepted: getRandomInt(500000, 1000000), shares_rejected: getRandomInt(100, 500), algorithm: 'SHA-256', coin: 'Bitcoin', efficiency: 0, gpuCount: 1, lastUpdate: Date.now()
  },
  {
    id: 'rig-004', name: 'CPU Miner R7', status: 'offline', hashrate: 0, power: 0, temperature: 0, fan_speed: 0, uptime: 0, shares_accepted: 0, shares_rejected: 0, algorithm: 'RandomX', coin: 'Monero', efficiency: 0, gpuCount: 0, lastUpdate: Date.now()
  },
  {
    id: 'rig-005', name: 'GPU Rig #3', status: 'maintenance', hashrate: 0, power: 0, temperature: 0, fan_speed: 0, uptime: 0, shares_accepted: 0, shares_rejected: 0, algorithm: 'Ethash', coin: 'Ethereum', efficiency: 0, gpuCount: 4, lastUpdate: Date.now()
  },
];

const initialPools: MiningPool[] = [
  {
    id: 'pool-ethermine', name: 'Ethermine', url: 'https://ethermine.org', ping: getRandomInt(30, 80), workers: 2, hashrate: '100 TH/s', lastBlockFound: '17:34:01', payoutScheme: 'PPLNS', minPayout: 0.01, fee: 1
  },
  {
    id: 'pool-f2pool', name: 'F2Pool', url: 'https://f2pool.com', ping: getRandomInt(40, 90), workers: 1, hashrate: '300 EH/s', lastBlockFound: '17:35:10', payoutScheme: 'PPS', minPayout: 0.005, fee: 2.5
  },
];

let currentRigs: MiningRig[] = JSON.parse(JSON.stringify(initialRigs)); // Deep copy for mutation
let currentPools: MiningPool[] = JSON.parse(JSON.stringify(initialPools));

const ELECTRICITY_COST_PER_KWH = 0.12; // USD per kWh

const calculateMiningStats = (rigs: MiningRig[], coinPrices: CoinGeckoCoinPrices): MiningStats => {
  let totalHashrate = 0;
  let totalPower = 0;
  let activeRigs = 0;
  let offlineRigs = 0;
  let dailyProfitUSD = 0;

  rigs.forEach(rig => {
    if (rig.status === 'online') {
      activeRigs++;
      totalHashrate += rig.hashrate;
      totalPower += rig.power;

      // Profitability based on real-time prices
      const coinPrice = coinPrices[rig.coin.toLowerCase()] || 0;
      let profitFactor = 0;
      switch (rig.algorithm) {
        case 'Ethash': profitFactor = rig.hashrate * 0.00000005; break;
        case 'SHA-256': profitFactor = rig.hashrate * 0.0000000000005; break;
        case 'RandomX': profitFactor = rig.hashrate * 0.0000001; break;
        default: profitFactor = 0;
      }
      dailyProfitUSD += profitFactor * coinPrice;
    } else if (rig.status === 'offline') {
      offlineRigs++;
    }
    rig.efficiency = rig.power > 0 ? rig.hashrate / rig.power : 0;
  });

  const totalPowerKWh = totalPower / 1000;
  const electricityCostUSD = totalPowerKWh * ELECTRICITY_COST_PER_KWH * 24;
  const netDailyProfitUSD = dailyProfitUSD - electricityCostUSD;

  return {
    totalHashrate, totalPower, activeRigs, offlineRigs,
    totalRigs: rigs.length,
    dailyProfitUSD: Math.max(0, netDailyProfitUSD),
    monthlyProfitUSD: Math.max(0, netDailyProfitUSD * 30),
    electricityCostUSD,
    overallEfficiency: totalPower > 0 ? totalHashrate / totalPower : 0,
    lastUpdate: Date.now(),
  };
};

const historicalData: HistoricalDataPoint[] = [];
for (let i = 0; i < 288; i++) { // Data points for every 5 minutes over 24 hours
  const timestamp = Date.now() - (288 - i) * 5 * 60 * 1000;
  historicalData.push({
    timestamp,
    hashrate: getRandom(45000, 55000),
    temperature: getRandom(65, 75),
    power: getRandom(3500, 4200),
    profit: getRandom(15, 25),
  });
}

// --- Mock API Functions ---

export const fetchMiningRigs = async (): Promise<MiningRig[]> => {
  return new Promise(resolve => setTimeout(() => resolve(currentRigs), getRandomInt(200, 600)));
};

export const fetchMiningPools = async (): Promise<MiningPool[]> => {
  return new Promise(resolve => setTimeout(() => resolve(currentPools), getRandomInt(200, 600)));
};

export const fetchMiningStats = async (coinPrices: CoinGeckoCoinPrices): Promise<MiningStats> => {
  return new Promise(resolve => setTimeout(() => resolve(calculateMiningStats(currentRigs, coinPrices)), getRandomInt(100, 400)));
};

export const fetchHistoricalMiningData = async (timeframe: '24h' | '7d' | '30d'): Promise<HistoricalDataPoint[]> => {
  return new Promise(resolve => setTimeout(() => resolve(historicalData), getRandomInt(300, 1000)));
};

export const updateRigStatus = async (rigId: string, status: MiningRigStatus): Promise<MiningRig> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const rigIndex = currentRigs.findIndex(r => r.id === rigId);
      if (rigIndex !== -1) {
        currentRigs[rigIndex] = { ...currentRigs[rigIndex], status, lastUpdate: Date.now() };
        if (status === 'offline' || status === 'maintenance') {
          currentRigs[rigIndex].hashrate = 0;
          currentRigs[rigIndex].power = 0;
        } else {
            const initialRig = initialRigs.find(r => r.id === rigId);
            if(initialRig){
                currentRigs[rigIndex].hashrate = initialRig.hashrate;
                currentRigs[rigIndex].power = initialRig.power;
            }
        }
        resolve(currentRigs[rigIndex]);
      } else {
        reject(new Error('Rig not found'));
      }
    }, getRandomInt(300, 700));
  });
};

export const updateRigAlgorithm = async (rigId: string, algorithm: MiningAlgorithm, coin: string): Promise<MiningRig> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const rigIndex = currentRigs.findIndex(r => r.id === rigId);
            if (rigIndex !== -1) {
                currentRigs[rigIndex] = { ...currentRigs[rigIndex], algorithm, coin, lastUpdate: Date.now() };
                // Simulate hashrate/power change based on new algorithm
                switch (algorithm) {
                    case 'Ethash':
                        currentRigs[rigIndex].hashrate = getRandom(100, 150);
                        currentRigs[rigIndex].power = getRandom(400, 500);
                        break;
                    case 'SHA-256':
                        currentRigs[rigIndex].hashrate = getRandom(90000, 110000);
                        currentRigs[rigIndex].power = getRandom(2800, 3200);
                        break;
                    case 'RandomX':
                        currentRigs[rigIndex].hashrate = getRandom(5000, 10000);
                        currentRigs[rigIndex].power = getRandom(100, 200);
                        break;
                    default:
                        // Keep current stats if algorithm is unknown
                        break;
                }
                resolve(currentRigs[rigIndex]);
            } else {
                reject(new Error('Rig not found'));
            }
        }, getRandomInt(400, 800));
    });
};


// --- Real-Time Data Simulation ---
// This function runs in the background to make the dashboard feel live.
function simulateRealTimeUpdates() {
  setInterval(() => {
    currentRigs = currentRigs.map(rig => {
      if (rig.status === 'online') {
        // Fluctuate hashrate and power slightly
        const hashrateFluctuation = rig.hashrate * getRandom(-0.03, 0.03); // +/- 3%
        const powerFluctuation = rig.power * getRandom(-0.02, 0.02); // +/- 2%
        
        // Fluctuate temperature and fan speed
        const tempFluctuation = getRandom(-1, 1);
        const fanFluctuation = getRandom(-2, 2);

        // Increment shares
        const newAcceptedShares = getRandomInt(1, 5);
        const newRejectedShares = Math.random() < 0.01 ? 1 : 0; // 1% chance of a rejected share

        return {
          ...rig,
          hashrate: Math.max(0, rig.hashrate + hashrateFluctuation),
          power: Math.max(0, rig.power + powerFluctuation),
          temperature: Math.min(90, Math.max(40, rig.temperature + tempFluctuation)),
          fan_speed: Math.min(100, Math.max(30, rig.fan_speed + fanFluctuation)),
          shares_accepted: rig.shares_accepted + newAcceptedShares,
          shares_rejected: rig.shares_rejected + newRejectedShares,
          uptime: rig.uptime + (5 / 3600), // Increment uptime by 5 seconds
          lastUpdate: Date.now(),
        };
      }
      return rig;
    });

    // Also update historical data to keep charts live
    const lastDataPoint = historicalData[historicalData.length - 1];
    const stats = calculateMiningStats(currentRigs, {}); // Prices aren't needed for this part
    
    historicalData.push({
      timestamp: Date.now(),
      hashrate: stats.totalHashrate,
      temperature: currentRigs.reduce((acc, r) => acc + (r.status === 'online' ? r.temperature : 0), 0) / (stats.activeRigs || 1),
      power: stats.totalPower,
      profit: lastDataPoint.profit * getRandom(0.98, 1.02), // Simulate profit fluctuation
    });
    
    // Keep historical data from growing indefinitely
    if (historicalData.length > 300) {
      historicalData.shift();
    }

  }, 5000); // Update every 5 seconds
}

// Start the simulation as soon as the module is loaded.
simulateRealTimeUpdates();