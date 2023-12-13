import { generateMockData, createPieChartMockData, GenerateMockDataParams } from './generator';

export function mockPowerAnalysisWidgetData() {
  return [
    {
      title: 'Power Transfer',
      subtitle: '$45,231.89',
      description: '+20.1% from last month',
      iconKey: 'cart',
    },
    {
      title: 'Yearly Power',
      subtitle: '+2350',
      description: '+180.1% from last month',
      iconKey: 'zap',
    },
    {
      title: 'Surplus Cost',
      subtitle: '+12,234',
      description: '+19% from last month',
      iconKey: 'refresh',
    },
    {
      title: 'Total Cost',
      subtitle: '+573',
      description: '+201 since last hour',
      iconKey: 'dollar',
    },
  ];
}

export function mockSankeyChartData({
  type,
  dataPoints,
  interval = 'day',
}: GenerateMockDataParams) {
  return {
    type: 'sankeySimple',
    title: 'Power Mix',
    data: generateMockData({ type, dataPoints, interval }),
  };
}

export function mockPieChartData() {
  return {
    type: 'pie',
    title: 'Power Mix',
    data: createPieChartMockData(),
  };
}

export function mockBarChartData({ type, dataPoints, interval = 'day' }: GenerateMockDataParams) {
  return {
    type: 'barSimple',
    title: 'Power Mix',
    data: generateMockData({ type, dataPoints, interval }),
  };
}

export const powerAnalysis = {
  widget: [
    {
      title: 'Avg. monthly transferred power',
      subtitle: '$45,231.89',
      description: '+20.1% from last month',
      iconKey: 'cart',
    },
    {
      title: 'Avg. Monthly Power',
      subtitle: '+2350',
      description: '+180.1% from last month',
      iconKey: 'zap',
    },
    {
      title: 'Total transferred power',
      subtitle: '+12,234',
      description: '+19% from last month',
      iconKey: 'refresh',
    },
    {
      title: 'Total power',
      subtitle: '+573',
      description: '+201 since last hour',
      iconKey: 'dollar',
    },
  ],
  chart: {
    chart1: {
      type: 'sankeySimple',
      title: 'Sankey',
    },
    chart2: {
      type: 'pie',
      title: 'RE Ratio',
    },
    chart3: {
      type: 'barSimple',
      title: 'Overview3',
      data: [
        {
          name: 'Page A',
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
        {
          name: 'Page B',
          uv: 3000,
          pv: 1398,
          amt: 2210,
        },
        {
          name: 'Page C',
          uv: 2000,
          pv: 9800,
          amt: 2290,
        },
        {
          name: 'Page D',
          uv: 2780,
          pv: 3908,
          amt: 2000,
        },
        {
          name: 'Page E',
          uv: 1890,
          pv: 4800,
          amt: 2181,
        },
        {
          name: 'Page F',
          uv: 2390,
          pv: 3800,
          amt: 2500,
        },
        {
          name: 'Page G',
          uv: 3490,
          pv: 4300,
          amt: 2100,
        },
      ],
      dataKeys: ['uv', 'pv', 'amt'],
    },
    chart4: {
      type: 'geoMercator',
      title: 'Overview',
    },
  },
};
