import { generateMockData, createPieChartMockData, GenerateMockDataParams, LNG_MAP } from './generator';
import { faker } from '@faker-js/faker';

export function mockPowerAnalysisWidgetData() {
  return [
    {
      key: 'avgPowerSupply',
      title: 'Avg. Monthly Power Supply',
      subtitle: 'kWh 111,019',
      percentage: 5.9,
      // description: '+20.1% from last month',
    },
    {
      key: 'avgPowerUse',
      title: 'Avg. Monthly Power Use',
      subtitle: 'kWh 105,468',
      percentage: -0.5,
      // description: '+180.1% from last month',
    },
    {
      key: 'totalPowerSupply',
      title: 'Total Power Supply',
      subtitle: 'kWh 666,117',
      percentage: 1.2,
      // description: '+19% from last month',
    },
    {
      key: 'totalPowerUse',
      title: 'Total Power Use',
      subtitle: 'kWh 880,554',
      percentage: -2,
      // description: '+201 since last hour',
    },
  ];
}

export function mockSankeyChartData({
  type,
  dataPoints,
  interval = 'day',
  lng,
}: GenerateMockDataParams) {
  return {
    type: 'sankeySimple',
    title: 'Power Mix',
    data: generateMockData({ type, dataPoints, interval, lng }),
  };
}

export function mockPieChartData(subType: string, lng: keyof typeof LNG_MAP) {
  return {
    type: 'pie',
    title: 'Power Mix',
    data: createPieChartMockData(subType, lng),
  };
}

export function mockBarChartData({
  type,
  dataPoints,
  interval = 'day',
  lng,
}: GenerateMockDataParams) {
  return {
    type: 'barSimple',
    title: 'Power Mix',
    data: generateMockData({ type, dataPoints, interval, lng }),
  };
}

export function mockGeoChartData({
  type,
  dataPoints,
  interval = 'day',
  lng,
}: GenerateMockDataParams) {
  return {
    type: 'geoMercator',
    title: 'Power Mix',
    data: generateMockData({ type, dataPoints, interval, lng }),
  };
}
