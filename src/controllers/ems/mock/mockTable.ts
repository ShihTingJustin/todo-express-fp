import { faker } from '@faker-js/faker';
import { makeData } from './makeData';
import { LNG_MAP } from './generator';

function getRandomElements(array: any[], numberOfElements: number) {
  const shuffledArray = array.sort(() => Math.random() - 0.5);
  return shuffledArray.slice(0, numberOfElements);
}

export function mockTableData({ dataPoints, lng }: { dataPoints: number; lng: string }) {
  const MOCK_TABLE_DATA = [
    {
      factoryName: 'Factory 1',
      type: LNG_MAP[lng].solar,
      uuid: faker.string.uuid(),
      kwh: '1000',
      price: '$1.00',
    },
    {
      factoryName: 'Factory 2',
      type: LNG_MAP[lng].wind,
      uuid: faker.string.uuid(),
      kwh: '2000',
      price: '$2.00',
    },
    {
      factoryName: 'Factory 3',
      type: LNG_MAP[lng].solar,
      uuid: faker.string.uuid(),
      kwh: '3000',
      price: '$3.00',
    },
    {
      factoryName: 'Factory 4',
      type: LNG_MAP[lng].wind,
      uuid: faker.string.uuid(),
      kwh: '4000',
      price: '$4.00',
    },
    {
      factoryName: 'Factory 5',
      type: LNG_MAP[lng].solar,
      uuid: faker.string.uuid(),
      kwh: '5000',
      price: '$5.00',
    },
    {
      factoryName: 'Factory 6',
      type: LNG_MAP[lng].wind,
      uuid: faker.string.uuid(),
      kwh: '6000',
      price: '$6.00',
    },
    {
      factoryName: 'Factory 7',
      type: LNG_MAP[lng].solar,
      uuid: faker.string.uuid(),
      kwh: '7000',
      price: '$7.00',
    },
    {
      factoryName: 'Factory 8',
      type: LNG_MAP[lng].wind,
      uuid: faker.string.uuid(),
      kwh: '8000',
      price: '$8.00',
    },
    {
      factoryName: 'Factory 9',
      type: 'Solar',
      uuid: faker.string.uuid(),
      kwh: '9000',
      price: '$9.00',
    },
    {
      factoryName: 'Factory 10',
      type: LNG_MAP[lng].wind,
      uuid: faker.string.uuid(),
      kwh: '10000',
      price: '$10.00',
    },
  ];

  return getRandomElements(MOCK_TABLE_DATA, dataPoints);
}

export function mockDataTableData(dataPoints = 100) {
  return makeData(dataPoints);
}
