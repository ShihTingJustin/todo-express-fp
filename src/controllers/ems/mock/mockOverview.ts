import { faker } from '@faker-js/faker';
import { generateMockData, GenerateMockDataParams, LNG_MAP } from './generator';

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
      key: 'power-transfer',
      title: 'Power Transfer',
      subtitle: 'kWh 45,231.89',
      percentage: 20.1,
      iconKey: 'cart',
    },
    {
      key: 'yearly-power',
      title: 'Yearly Power',
      subtitle: 'kWh 2350',
      percentage: 35,
      // description: '+35%',
      iconKey: 'zap',
    },
    {
      key: 'surplus-cost',
      title: 'Surplus Cost',
      subtitle: '$12,234',
      percentage: -5,
      // description: 'from last month',
      iconKey: 'refresh',
    },
    {
      key: 'total-cost',
      title: 'Total Cost',
      subtitle: '$573',
      percentage: 5,
      // description: '+201 since last month',
      iconKey: 'dollar',
    },
  ];
}

export function mockLineChartData({
  type,
  dataPoints,
  interval = 'day',
  lng,
}: GenerateMockDataParams) {
  return {
    type: 'lineSimple',
    title: 'Power Mix',
    data: generateMockData({
      type,
      dataPoints,
      interval,
      lng,
    }),
  };
}

export function mockBarChartData({
  type,
  dataPoints,
  interval = 'day',
  lng,
}: GenerateMockDataParams) {
  return {
    type,
    title: 'Overview1',
    data: generateMockData({
      type,
      dataPoints,
      interval,
      lng,
    }),
  };
}

export function mockSummaryData(lng: keyof typeof LNG_MAP) {
  return {
    upper: [
      {
        key: 'surplus',
        title: LNG_MAP[lng].surplus,
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
        title: LNG_MAP[lng].gray,
        value: faker.number.float({ min: 10, max: 25, precision: 0.1 }),
        bgColor: 'gray',
      },
    ],
    lower: {
      title: LNG_MAP[lng].reCostRatio,
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
