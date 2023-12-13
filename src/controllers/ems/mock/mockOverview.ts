import { generateMockData, GenerateMockDataParams } from './generator';

export const sidebar = {
  upper: [
    {
      key: 'overview',
      pathname: '/overview',
      title: 'Overview',
      icon: null,
    },
    {
      key: 'power-analysis',
      pathname: '/power-analysis',
      title: 'Power Analysis',
      icon: null,
    },
    {
      key: 'power-quantity',
      pathname: '/power-quantity',
      title: 'Power Quantity',
      icon: null,
    },
    {
      key: 'information',
      pathname: '/information',
      title: 'Information',
      icon: null,
    },
    {
      key: 'power-optimization',
      pathname: '/power-optimization',
      title: 'Power Optimization',
      icon: null,
    },
    {
      key: 'contract-optimization',
      pathname: '/contract-optimization',
      title: 'Contract Optimization',
      icon: null,
    },
    {
      key: 'help',
      pathname: '/help',
      title: 'Help',
      icon: null,
    },
  ],
  lower: [],
};

export function mockWidgetData() {
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

export function mockLineChartData({ type, dataPoints, interval = 'day' }: GenerateMockDataParams) {
  return {
    type: 'lineSimple',
    title: 'Power Mix',
    data: generateMockData({ type, dataPoints, interval }),
  };
}

export function mockBarChartData({ type, dataPoints, interval = 'day' }: GenerateMockDataParams) {
  return {
    type: 'barSimple',
    title: 'Overview1',
    data: generateMockData({ type, dataPoints, interval }),
  };
}
