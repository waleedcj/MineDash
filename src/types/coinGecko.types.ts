// src/types/coinGecko.types.ts

export type Roi = {
    times: number;
    currency: string;
    percentage: number;
  };
  
  export type Image = {
    thumb: string;
    small: string;
    large: string;
  };
  
  export type MarketData = {
    current_price: { [key: string]: number };
    ath: { [key: string]: number };
    ath_change_percentage: { [key: string]: number };
    ath_date: { [key: string]: string };
    atl: { [key: string]: number };
    atl_change_percentage: { [key: string]: number };
    atl_date: { [key: string]: string };
    market_cap: { [key: string]: number };
    market_cap_rank: number;
    fully_diluted_valuation: { [key: string]: number } | null;
    total_volume: { [key: string]: number };
    high_24h: { [key: string]: number };
    low_24h: { [key: string]: number };
    price_change_24h: number;
    price_change_percentage_24h: number;
    price_change_percentage_7d: number;
    price_change_percentage_14d: number;
    price_change_percentage_30d: number;
    price_change_percentage_60d: number;
    price_change_percentage_200d: number;
    price_change_percentage_1y: number;
    market_cap_change_24h: number;
    market_cap_change_percentage_24h: number;
    price_change_24h_in_currency: { [key: string]: number };
    price_change_percentage_1h_in_currency: { [key: string]: number };
    price_change_percentage_24h_in_currency: { [key: string]: number };
    price_change_percentage_7d_in_currency: { [key: string]: number };
    price_change_percentage_30d_in_currency: { [key: string]: number };
    price_change_percentage_1y_in_currency: { [key: string]: number };
    total_supply: number | null;
    max_supply: number | null;
    circulating_supply: number;
    last_updated: string;
  };
  
  export type Description = {
    en: string;
    // Add other languages if needed
  };
  
  export type Links = {
    homepage: string[];
    blockchain_site: string[];
    official_forum_url: string[];
    chat_url: string[];
    announcement_url: string[];
    twitter_screen_name: string;
    facebook_username: string;
    telegram_channel_identifier: string;
    subreddit_url: string;
    repos_url: {
      github: string[];
      bitbucket: string[];
    };
  };
  
  export type Ticker = {
    base: string;
    target: string;
    market: {
      name: string;
      identifier: string;
      has_trading_incentive: boolean;
    };
    last: number;
    volume: number;
    converted_last: { [key: string]: number };
    converted_volume: { [key: string]: number };
    trust_score: string; // 'green', 'yellow', 'red'
    bid_ask_spread_percentage: number;
    timestamp: string;
    last_traded_at: string;
    last_fetch_at: string;
    is_anomaly: boolean;
    is_stale: boolean;
    trade_url: string;
    coin_id: string;
    target_coin_id: string;
  };
  
  export type CommunityData = {
    facebook_likes: number | null;
    twitter_followers: number | null;
    reddit_average_posts_48h: number | null;
    reddit_average_comments_48h: number | null;
    reddit_subscribers: number | null;
    reddit_accounts_active_48h: number | null;
    telegram_channel_user_count: number | null;
  };
  
  export type DeveloperData = {
    forks: number;
    stars: number;
    subscribers: number;
    total_issues: number;
    closed_issues: number;
    pull_requests_merged: number;
    pull_request_contributors: number;
    code_additions_deletions_4_weeks: {
      additions: number;
      deletions: number;
    };
    commit_count_4_weeks: number;
    last_4_weeks_commit_activity_series: number[];
  };
  
  export type PublicInterestStats = {
    alexa_rank: number | null;
    bing_matches: number | null;
  };
  
  export type CoinDetail = {
    id: string;
    symbol: string;
    name: string;
    asset_platform_id: string | null;
    platforms: { [key: string]: string };
    detail_platforms: {
      [key: string]: {
        decimal_place: number | null;
        contract_address: string;
      }[];
    };
    block_time_in_minutes: number;
    hashing_algorithm: string | null;
    categories: string[];
    public_notice: string | null;
    additional_notices: string[];
    localization: { [key: string]: string };
    description: Description;
    links: Links;
    image: Image;
    country_origin: string;
    genesis_date: string | null;
    sentiment_votes_up_percentage: number;
    sentiment_votes_down_percentage: number;
    market_cap_rank: number;
    coingecko_rank: number;
    coingecko_score: number;
    developer_score: number;
    community_score: number;
    liquidity_score: number;
    public_interest_score: number;
    market_data: MarketData;
    community_data: CommunityData;
    developer_data: DeveloperData;
    public_interest_stats: PublicInterestStats;
    status_updates: any[]; // Define a more specific type if needed
    last_updated: string;
  };
  
  
  export type Currency = 'usd' | 'eur' | 'jpy' | 'gbp' | 'aud' | 'cad' | 'chf' | 'cny' | 'krw' | 'inr' | 'rub' | 'brl' | 'btc' | 'eth';
  export type TimeFrame = '1h' | '24h' | '7d' | '30d' | '1y';
  
  // Basic Coin type for markets API
  export type Coin = {
    id: string;
    symbol: string;
    name: string;
    image: string;
    current_price: number;
    market_cap: number;
    market_cap_rank: number;
    fully_diluted_valuation: number | null;
    total_volume: number;
    high_24h: number;
    low_24h: number;
    price_change_24h: number;
    price_change_percentage_24h: number;
    market_cap_change_24h: number;
    market_cap_change_percentage_24h: number;
    circulating_supply: number;
    total_supply: number | null;
    max_supply: number | null;
    ath: number;
    ath_change_percentage: number;
    ath_date: string;
    atl: number;
    atl_change_percentage: number;
    atl_date: string;
    roi: Roi | null;
    last_updated: string;
    price_change_percentage_24h_in_currency: number;
    price_change_percentage_7d_in_currency: number;
    price_change_percentage_30d_in_currency: number;
    price_change_percentage_1y_in_currency: number;
  };