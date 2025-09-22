import { Component, createSignal, For, Setter } from 'solid-js';

// Simple SVG icons for demonstration
const DashboardIcon = () => <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2z"></path></svg>;
const RigsIcon = () => <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path></svg>;
const CryptoIcon = () => <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01M12 6v-1m0-1V4m0 12v1m0 1v1m0 1v1m-2.599-1.401A5.993 5.993 0 0012 16m0 0a5.993 5.993 0 01-2.599-1M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>;
const SettingsIcon = () => <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>;


interface SidebarProps {
  currentPage: string;
  setCurrentPage: Setter<Page>;
}
type Page = 'Dashboard' | 'Mining Rigs' | 'Crypto Prices' | 'Settings';
const Sidebar: Component<SidebarProps> = (props) => {
  const [activeItem, setActiveItem] = createSignal('Dashboard');
  const navItems = [
    { name: 'Dashboard', icon: DashboardIcon },
    { name: 'Mining Rigs', icon: RigsIcon },
    { name: 'Crypto Prices', icon: CryptoIcon },
    { name: 'Settings', icon: SettingsIcon },
  ];

  return (
    <aside class="w-64 bg-mining-gray flex-shrink-0 p-4 flex flex-col justify-between">
      <div>
        <div class="flex items-center mb-10">
          <svg class="w-10 h-10 text-mining-light-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6a2 2 0 100-4 2 2 0 000 4zm0 12a2 2 0 100-4 2 2 0 000 4zm6-6a2 2 0 100-4 2 2 0 000 4zm-12 0a2 2 0 100-4 2 2 0 000 4z"></path></svg>
          <span class="text-2xl font-bold ml-2">MineDash</span>
        </div>
        <nav>
          <ul>
            <For each={navItems}>
            {(item) => (
                <li class="mb-2">
                  <a
                    href="#"
                    // Use the setter from props to change the page
                    onClick={(e) => {
                      e.preventDefault();
                      props.setCurrentPage(item.name as Page);
                    }}
                    class="flex items-center p-3 rounded-lg transition-colors"
                    // Use currentPage from props to highlight the active item
                    classList={{
                      'bg-mining-light-blue text-white shadow-lg': props.currentPage === item.name,
                      'hover:bg-mining-light-gray': props.currentPage !== item.name,
                    }}
                  >
                    <item.icon />
                    <span class="ml-4 font-semibold">{item.name}</span>
                  </a>
                </li>
              )}
            </For>
          </ul>
        </nav>
      </div>
      <div class="text-center text-xs text-gray-500">
        <p>MineDash v1.0.0</p>
        <p>Status: <span class="text-mining-green">Connected</span></p>
      </div>
    </aside>
  );
};

export default Sidebar;