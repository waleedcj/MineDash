// src/lib/apiClient.ts
interface QueueRequest {
    url: string;
    options: RequestInit;
    resolve: (value: any) => void;
    reject: (reason?: any) => void;
  }
  
  const requestQueue: QueueRequest[] = [];
  let isProcessing = false;
  const RATE_LIMIT_INTERVAL = 2100; // 30 requests/min with 100ms buffer (CoinGecko free tier limit)
  
  function processQueue(): void {
    if (isProcessing) return;
    isProcessing = true;
  
    const intervalId = setInterval(async () => {
      if (requestQueue.length === 0) {
        clearInterval(intervalId);
        isProcessing = false;
        return;
      }
  
      const nextRequest = requestQueue.shift();
      if (nextRequest) {
        try {
          const response = await fetch(nextRequest.url, nextRequest.options);
          if (!response.ok) {
            const errorData = await response.json();
            nextRequest.reject(new Error(errorData.error || 'API request failed'));
          } else {
            const data = await response.json();
            nextRequest.resolve(data);
          }
        } catch (error) {
          nextRequest.reject(error);
        }
      }
    }, RATE_LIMIT_INTERVAL);
  }
  
  export const throttledFetch = (url: string, options: RequestInit): Promise<any> => {
    return new Promise((resolve, reject) => {
      requestQueue.push({ url, options, resolve, reject });
      processQueue();
    });
  };