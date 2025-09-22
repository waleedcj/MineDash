// src/types/mining.types.ts

export type MiningRigStatus = 'online' | 'offline' | 'maintenance';
export type MiningAlgorithm = 'SHA-256' | 'Ethash' | 'Scrypt' | 'RandomX';

export interface MiningRig {
  id: string;
  name: string;
  status: MiningRigStatus;
  hashrate: number; // MH/s or H/s depending on algorithm
  power: number; // Watts
  temperature: number; // Celsius
  fan_speed: number; // %
  uptime: number; // hours
  shares_accepted: number;
  shares_rejected: number;
  algorithm: MiningAlgorithm;
  coin: string; // e.g., 'Bitcoin', 'Ethereum', 'Monero'
  efficiency: number; // MH/W or H/W
  gpuCount: number;
  lastUpdate: number; // Timestamp
}

export interface MiningPool {
  id: string;
  name: string;
  url: string;
  ping: number; // ms
  workers: number;
  hashrate: string; // Pool's reported hashrate
  lastBlockFound: string; // Timestamp or block number
  payoutScheme: 'PPLNS' | 'PPS' | 'SOLO';
  minPayout: number; // BTC or ETH equivalent
  fee: number; // %
}

export interface MiningStats {
  totalHashrate: number; // MH/s or H/s
  totalPower: number; // Watts
  activeRigs: number;
  offlineRigs: number;
  totalRigs: number;
  dailyProfitUSD: number;
  monthlyProfitUSD: number;
  electricityCostUSD: number;
  overallEfficiency: number; // MH/W or H/W
  lastUpdate: number; // Timestamp
}

export interface HistoricalDataPoint {
  timestamp: number; // Unix timestamp
  hashrate: number;
  temperature: number;
  power: number;
  profit: number;
}