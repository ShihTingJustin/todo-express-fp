import { faker } from '@faker-js/faker';
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

export function mockSummaryData() {
  return {
    upper: [
      {
        key: 'surplus',
        title: 'Surplus',
        value: faker.number.float({ min: 1, max: 10, precision: 0.1 }),
        bgColor: 'blue',
      },
      {
        key: 're',
        title: 'RE',
        value: faker.number.float({ min: 70, max: 90, precision: 0.1 }),
        bgColor: 'green',
      },
      {
        key: 'gray',
        title: 'Gray',
        value: faker.number.float({ min: 10, max: 25, precision: 0.1 }),
        bgColor: 'gray',
      },
    ],
    lower: {
      title: '綠能電費比',
      amount: faker.number.float({ min: 80, max: 90, precision: 0.1 }),
      difference: faker.number.float({ min: 1, max: 5, precision: 0.1 }),
      lineChartData: mockLineTinyData(),
    },
  };
}

export function mockLineTinyData() {
  return [
    {
      timestamp: faker.date.recent(),
      value: faker.number.int({ min: 20, max: 60 }),
    },
    {
      timestamp: faker.date.recent(),
      value: faker.number.int({ min: 20, max: 60 }),
    },
    {
      timestamp: faker.date.recent(),
      value: faker.number.int({ min: 20, max: 60 }),
    },
    {
      timestamp: faker.date.recent(),
      value: faker.number.int({ min: 20, max: 50 }),
    },
    {
      timestamp: faker.date.recent(),
      value: faker.number.int({ min: 20, max: 70 }),
    },
    {
      timestamp: faker.date.recent(),
      value: faker.number.int({ min: 50, max: 60 }),
    },
    {
      timestamp: faker.date.recent(),
      value: faker.number.int({ min: 50, max: 60 }),
    },
    {
      timestamp: faker.date.recent(),
      value: faker.number.int({ min: 60, max: 70 }),
    },
    {
      timestamp: faker.date.recent(),
      value: faker.number.int({ min: 60, max: 70 }),
    },
    {
      timestamp: faker.date.recent(),
      value: faker.number.int({ min: 70, max: 80 }),
    },
  ];
}
