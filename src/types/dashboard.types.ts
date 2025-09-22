// src/types/dashboard.types.ts

/**
 * This file contains types that are shared across different domains of the dashboard,
 * acting as a bridge between crypto data, mining data, and UI state.
 */

import type { Currency } from './coinGecko.types';

/**
 * A simplified dictionary (hash map) for quick lookups of cryptocurrency prices.
 * This is the critical type used to pass real price data into the mock mining API
 * for realistic profitability calculations.
 * 
 * @example
 * const prices: CoinGeckoCoinPrices = {
 *   'bitcoin': 71050,
 *   'ethereum': 3810.55,
 *   'monero': 175.20
 * };
 */
export type CoinGeckoCoinPrices = {
  [coinId: string]: number; // Key is the lowercase CoinGecko ID (e.g., 'bitcoin')
};

/**
 * Defines the structure for global dashboard settings that the user can configure.
 * This can be managed by a SolidJS store or context.
 */
export interface DashboardSettings {
  currency: Currency;
  theme: 'dark' | 'light';
  electricityCost: number; // Cost per kWh in the selected currency
}

/**
 * Defines the structure for an alert or notification within the UI.
 * Used for events like rig failures, high temperatures, or successful actions.
 */
export interface AlertNotification {
  id: string; // A unique identifier for the notification
  message: string;
  severity: 'info' | 'warning' | 'error' | 'success';
  timestamp: number;
  isRead: boolean;
}

/**
 * A generic type for chart datasets, useful for passing structured data
 * to reusable chart components.
 */
export interface ChartDataset {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor?: string;
  fill?: boolean;
}