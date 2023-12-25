import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';

const DEFAULT_FILL_COLOR = [
  '#4A95E7',
  '#EF637B',
  '#5BB5B7',
  '#F29A3E',
  '#8B5EFE',
  '#F7C850',
  '#C2C4C8',
  '#7FC97F',
  '#BEAED4',
  '#FDC086',
];

const DEFAULT_STROKE_COLOR = [
  '#8EB5F570',
  '#F7A1B170',
  '#9ED0D270',
  '#F7C19E70',
  '#B59FFD70',
  '#FAD49170',
  '#D8D9DB70',
  '#7FC97F70',
  '#BEAED470',
  '#FDC08670',
];

export function createPieChartMockData(subType: string) {
  switch (subType) {
    case 'surplus':
      return [
        {
          name: 'Total',
          value: faker.number.int({ min: 1000, max: 5000 }),
        },
        {
          name: 'Surplus',
          value: faker.number.int({ min: 1000, max: 5000 }),
        },
      ];

    case 're':
      return [
        {
          name: 'Total',
          value: faker.number.int({ min: 1000, max: 5000 }),
        },
        {
          name: 'Gray',
          value: faker.number.int({ min: 1000, max: 5000 }),
        },
      ];
  }
}

export const LNG_MAP = {
  en: {
    solar: 'Solar',
    wind: 'Wind',
    load: 'Load',
    gray: 'Gray',
    total: 'Total',
    surplus: 'Surplus',
    reCostRatio: 'RE Cost Ratio',
  },
  zh: {
    solar: '太陽能',
    wind: '風力',
    load: '負載',
    gray: '灰電',
    total: '總計',
    surplus: '餘電',
    reCostRatio: '綠能電費比',
  },
};

export function generateMockData({
  type,
  dataPoints,
  interval = 'day',
  lng,
}: GenerateMockDataParams) {
  let data;

  switch (type) {
    case 'lineSimple':
    case 'barSimple':
    case 'barGroup':
      data = [];
      break;

    case 'geoMercator':
      data = {};
      break;
  }

  let currentDate = dayjs();

  for (let i = 0; i < dataPoints; i++) {
    switch (type) {
      case 'lineSimple':
        if (Array.isArray(data)) {
          data.unshift({
            timestamp: currentDate.toDate(),
            [LNG_MAP[lng].solar]: faker.number.int({ min: 1000, max: 5000 }),
            [LNG_MAP[lng].wind]: faker.number.int({ min: 1000, max: 5000 }),
            [LNG_MAP[lng].load]: faker.number.int({ min: 1000, max: 5000 }),
          });
        }
        break;

      case 'barSimple':
        if (Array.isArray(data)) {
          data.unshift({
            timestamp: currentDate.toDate(),
            [LNG_MAP[lng]?.total]: faker.number.int({ min: 1000, max: 5000 }),
          });
        }
        break;

      case 'barGroup':
        if (Array.isArray(data)) {
          data.unshift({
            timestamp: currentDate.toDate(),
            [LNG_MAP[lng].solar]: faker.number.int({ min: 1000, max: 5000 }),
            [LNG_MAP[lng].wind]: faker.number.int({ min: 1000, max: 5000 }),
            [LNG_MAP[lng].gray]: faker.number.int({ min: 1000, max: 5000 }),
          });
        }
        break;

      case 'sankeySimple':
        const nodes = [];
        const links = [];
        // 生成節點數據
        for (let j = 0; j <= dataPoints; j++) {
          nodes.push({ name: `station${j + 1}`, fill: DEFAULT_FILL_COLOR[j] });
        }
        // 生成隨機鏈接數據
        for (let j = 0; j < nodes.length - 1; j++) {
          for (let k = j + 1; k < nodes.length; k++) {
            if (Math.random() > 0.5) {
              links.push({
                source: j,
                target: k,
                value: faker.number.int({ min: 10, max: 100 }),
                stroke: DEFAULT_STROKE_COLOR[j],
              });
            }
          }
        }
        return { nodes, links };

      case 'geoMercator':
        const countryInfo = {
          USA: 'United States of America',
          GBR: 'United Kingdom',
          TWN: 'Taiwan',
          DEU: 'Germany',
          ZAF: 'South Africa',
          CHN: 'China',
          IND: 'India',
          JPN: 'Japan',
          RUS: 'Russia',
          MEX: 'Mexico',
          BRA: 'Brazil',
        };

        Object.keys(countryInfo).forEach((countryCode) => {
          data = {};
          // @ts-ignore
          data[countryCode] = {
            id: countryCode,
            // @ts-ignore
            countryName: countryInfo[countryCode],
            total: faker.number.int({ min: 20, max: 100 }),
            subtotal: [
              {
                type: 'solar',
                title: LNG_MAP[lng].solar,
                value: faker.number.int({ min: 5, max: 50 }),
              },
              {
                type: 'wind',
                title: LNG_MAP[lng].wind,
                value: faker.number.int({ min: 5, max: 50 }),
              },
              {
                type: 'gray',
                title: LNG_MAP[lng].gray,
                value: faker.number.int({ min: 5, max: 50 }),
              },
            ],
          };
        });
        break;

      default:
        break;
    }

    currentDate = currentDate.subtract(1, interval as dayjs.ManipulateType);
  }

  return data;
}

export type GenerateMockDataParams = {
  type: string;
  dataPoints: number;
  interval: string;
  lng: string;
};
