import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';

// Function to generate mock data
// export function generateMockData(startDate, endDate) {
//   const data = [];
//   let currentDate = new Date(startDate);

//   while (currentDate <= endDate) {
//     data.push({
//       timestamp: new Date(currentDate),
//       solar: faker.number.int({ min: 1000, max: 5000 }),
//       wind: faker.number.int({ min: 1000, max: 5000 }),
//       load: faker.number.int({ min: 1000, max: 5000 }),
//     });

//     // Increment the date (e.g., by one day)
//     currentDate.setDate(currentDate.getDate() + 1);
//   }

//   return data;
// }

// export function generateMockData(startYearMonth, endYearMonth, interval = 'day') {
//   const data = [];
//   let currentDate = dayjs(`${startYearMonth}-01`);
//   const endDate = dayjs(`${endYearMonth}-01`).endOf(interval);

//   while (currentDate.isBefore(endDate) || currentDate.isSame(endDate)) {
//     data.push({
//       timestamp: currentDate.toDate(),
//       solar: faker.number.int({ min: 1000, max: 5000 }),
//       wind: faker.number.int({ min: 1000, max: 5000 }),
//       load: faker.number.int({ min: 1000, max: 5000 }),
//     });

//     currentDate = currentDate.add(1, interval);
//   }

//   return data;
// }

export function createPieChartMockData() {
  return {
    surplus: [
      {
        name: 'Total',
        total: faker.number.int({ min: 1000, max: 5000 }),
      },
      {
        name: 'Surplus',
        total: faker.number.int({ min: 1000, max: 5000 }),
      },
    ],

    re: [
      {
        name: 'Total',
        total: faker.number.int({ min: 1000, max: 5000 }),
      },
      {
        name: 'Gray',
        total: faker.number.int({ min: 1000, max: 5000 }),
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

      default:
        break;
    }

    currentDate = currentDate.subtract(1, interval);
  }

  return data;
}

export type GenerateMockDataParams = { type: string; dataPoints: number; interval: string };
