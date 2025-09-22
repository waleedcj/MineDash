/* @refresh reload */
import { render } from 'solid-js/web';
import { QueryClient, QueryClientProvider } from '@tanstack/solid-query';
// import { SolidQueryDevtools } from '@tanstack/solid-query-devtools';

import './index.css';
import App from './App';

const queryClient = new QueryClient();

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

render(() => (
  <QueryClientProvider client={queryClient}>
    <App />
    {/* <SolidQueryDevtools /> Devtools are great for debugging queries */}
  </QueryClientProvider>
), root!);