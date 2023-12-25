import { faker } from '@faker-js/faker';

export enum SolutionType {
  'HV3' = 'HV3',
}
export enum ProcessStatus {
  COMPUTING = 'computing',
  COMPLETED = 'completed',
  UNPROCESSED = 'unprocessed',
}

export interface ElectricityData {
  contractId: string;
  factoryName: string;
  solutionType: SolutionType;
  electricityId: string;
  electricityAmount: number;
  electricityPrice: number;
  processStatus: string;
  surplusRate: number;
  rePercentage: number;
  startDate: number;
}

const range = (len: number) => {
  const arr: number[] = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newElectricity = (): ElectricityData => {
  const statusData = ['computing', 'completed', 'unprocessed'];
  return {
    contractId: `SKN${faker.string.numeric({ length: 4 })}`,
    factoryName: `Factory${faker.string.numeric({ length: 3 })}`,
    solutionType: faker.helpers.shuffle<SolutionType>([SolutionType.HV3])[0]!,
    electricityId: faker.string.uuid(),
    electricityAmount: faker.number.int(1000),
    electricityPrice: faker.number.int(1000),
    processStatus: faker.helpers.shuffle<string>(statusData)[0]!,
    surplusRate: faker.number.int(100),
    rePercentage: faker.number.int(100),
    startDate: faker.date
      .between({
        from: '2013-01-01T00:00:00.000Z',
        to: '2023-12-01T00:00:00.000Z',
      })
      .getTime(),
  };
};

export function makeData(lens: number) {
  const makeDataLevel = (depth = 0): ElectricityData[] => {
    return range(lens).map((d): ElectricityData => {
      return {
        ...newElectricity(),
        // subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}
