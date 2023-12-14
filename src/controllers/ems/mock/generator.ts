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

export function createPieChartMockData() {
  return {
    surplus: [
      {
        name: 'Total',
        value: faker.number.int({ min: 1000, max: 5000 }),
      },
      {
        name: 'Surplus',
        value: faker.number.int({ min: 1000, max: 5000 }),
      },
    ],

    re: [
      {
        name: 'Total',
        value: faker.number.int({ min: 1000, max: 5000 }),
      },
      {
        name: 'Gray',
        value: faker.number.int({ min: 1000, max: 5000 }),
      },
    ],
  };
}

export function generateMockData({ type, dataPoints, interval = 'day' }: GenerateMockDataParams) {
  const data = [];
  let currentDate = dayjs();

  for (let i = 0; i < dataPoints; i++) {
    switch (type) {
      case 'lineSimple':
        data.unshift({
          timestamp: currentDate.toDate(),
          solar: faker.number.int({ min: 1000, max: 5000 }),
          wind: faker.number.int({ min: 1000, max: 5000 }),
          load: faker.number.int({ min: 1000, max: 5000 }),
        });
        break;

      case 'barSimple':
        data.unshift({
          timestamp: currentDate.toDate(),
          total: faker.number.int({ min: 1000, max: 5000 }),
        });
        break;

      case 'barGroup':
        data.unshift({
          timestamp: currentDate.toDate(),
          solar: faker.number.int({ min: 1000, max: 5000 }),
          wind: faker.number.int({ min: 1000, max: 5000 }),
          gray: faker.number.int({ min: 1000, max: 5000 }),
        });
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

      default:
        break;
    }

    currentDate = currentDate.subtract(1, interval as dayjs.ManipulateType);
  }

  return data;
}

export type GenerateMockDataParams = { type: string; dataPoints: number; interval: string };
