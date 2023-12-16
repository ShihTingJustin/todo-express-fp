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

export function mockPieChartData(subType: string) {
  return {
    type: 'pie',
    title: 'Power Mix',
    data: createPieChartMockData(subType),
  };
}

export function mockBarChartData({ type, dataPoints, interval = 'day' }: GenerateMockDataParams) {
  return {
    type: 'barSimple',
    title: 'Power Mix',
    data: generateMockData({ type, dataPoints, interval }),
  };
}

export function mockGeoChartData({ type, dataPoints, interval = 'day' }: GenerateMockDataParams) {
  return {
    type: 'geoMercator',
    title: 'Power Mix',
    data: generateMockData({ type, dataPoints, interval }),
  };
}
