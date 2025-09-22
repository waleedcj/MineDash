import { Component, onMount, onCleanup, createEffect, Accessor } from 'solid-js';
import Chart, { ChartConfiguration, ChartItem } from 'chart.js/auto';

interface LineChartProps {
  chartId: string;
  data: Accessor<{ labels: (string | Date)[]; datasets: any[] }>;
  title: string;
}

const LineChart: Component<LineChartProps> = (props) => {
  let chartCanvas: HTMLCanvasElement | undefined; // It's good practice to allow undefined initially
  let chartInstance: Chart;

  const chartConfig: ChartConfiguration = {
    type: 'line',
    data: {
      labels: [],
      datasets: [],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: '#2c3e50',
          titleFont: { size: 14, weight: 'bold' },
          bodyFont: { size: 12 },
          padding: 10,
          cornerRadius: 4,
          intersect: false,
          mode: 'index',
        },
      },
      scales: {
        x: {
          ticks: {
            color: '#9ca3af',
            maxRotation: 0,
            autoSkip: true,
            maxTicksLimit: 7,
          },
          grid: {
            color: 'rgba(52, 73, 94, 0.5)',
          },
        },
        y: {
          ticks: { color: '#9ca3af' },
          grid: {
            color: 'rgba(52, 73, 94, 0.5)',
          },
        },
      },
      interaction: {
        mode: 'nearest',
        axis: 'x',
        intersect: false
      },
      elements: {
        point: {
          radius: 0,
          hoverRadius: 5,
        }
      }
    },
  };

  onMount(() => {
    // We can be sure chartCanvas is assigned here.
    if (chartCanvas) {
      const ctx = chartCanvas.getContext('2d');
      if (ctx) {
        chartInstance = new Chart(ctx as ChartItem, chartConfig);
      }
    }
  });

  createEffect(() => {
    if (chartInstance && props.data()) {
      chartInstance.data.labels = props.data().labels;
      chartInstance.data.datasets = props.data().datasets;
      chartInstance.update('default');
    }
  });

  onCleanup(() => {
    if (chartInstance) {
      chartInstance.destroy();
    }
  });

  return (
    <div class="bg-mining-gray p-6 rounded-lg shadow-lg h-full flex flex-col">
      <h3 class="text-lg font-semibold text-white mb-4">{props.title}</h3>
      <div class="relative flex-grow">
        <canvas ref={chartCanvas} id={props.chartId}></canvas>
      </div>
    </div>
  );
};

export default LineChart;