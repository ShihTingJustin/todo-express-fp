import { Request, Response } from 'express';
import { mockTableData, mockDataTableData } from './mock/mockTable';
import {
  mockWidgetData,
  mockLineChartData,
  mockBarChartData,
  mockSummaryData,
} from './mock/mockOverview';
import { sidebar } from './mock/mockSidebar';
import {
  mockGeoChartData,
  mockSankeyChartData,
  mockPieChartData,
  mockPowerAnalysisWidgetData,
} from './mock/mockPowerAnalysis';
import {
  generateMockData,
  createPieChartMockData,
  GenerateMockDataParams,
} from '../ems/mock/generator';

const emsController = {
  getSidebarData: async (req: Request, res: Response<any>) => {
    try {
      return res.status(200).json({
        status: 'success',
        data: sidebar,
      });
    } catch (error) {
      console.log(error);
    }
  },

  getTableData: async (req: Request, res: Response<any>) => {
    try {
      const { dataPoints, type } = req.query;

      switch (type) {
        case 'simple':
          return res.status(200).json({
            status: 'success',
            data: mockTableData({ dataPoints: Number(dataPoints) }),
          });

        case 'data':
          return res.status(200).json({
            status: 'success',
            data: mockDataTableData(),
          });

        default:
          return;
      }
    } catch (error) {
      console.log(error);
    }
  },

  getOverviewWidgetData: async (req: Request, res: Response<any>) => {
    try {
      return res.status(200).json({
        status: 'success',
        data: mockWidgetData(),
      });
    } catch (error) {
      console.log(error);
    }
  },

  getOverviewChartData: async (req: Request, res: Response<any>) => {
    try {
      const { dataPoints: rawDataPoints, interval: rawInterval, type } = req.query;
      const dataPoints = Number(rawDataPoints);
      const interval = String(rawInterval);

      let data;

      switch (type) {
        case 'lineSimple':
          data = mockLineChartData({
            type,
            dataPoints,
            interval,
          });
          break;

        case 'barSimple':
          data = mockBarChartData({
            type,
            dataPoints,
            interval,
          });
          break;

        default:
          break;
      }

      return res.status(200).json({
        status: 'success',
        data,
      });
    } catch (error) {
      console.log(error);
    }
  },

  getOverviewSummaryData: async (req: Request, res: Response<any>) => {
    try {
      return res.status(200).json({
        status: 'success',
        data: mockSummaryData(),
      });
    } catch (error) {
      console.log(error);
    }
  },

  getPowerAnalysisWidgetData: async (req: Request, res: Response<any>) => {
    try {
      return res.status(200).json({
        status: 'success',
        data: mockPowerAnalysisWidgetData(),
      });
    } catch (error) {
      console.log(error);
    }
  },

  getPowerAnalysisChartData: async (req: Request, res: Response<any>) => {
    try {
      const { dataPoints, interval, type } = req.query;
      let data;

      switch (type) {
        case 'sankeySimple':
          data = mockSankeyChartData({
            type,
            dataPoints: Number(dataPoints),
            interval: String(interval),
          });
          break;

        case 'pie':
          if (req.query?.subType) {
            // @ts-ignore
            data = mockPieChartData(req.query?.subType);
          }
          break;

        case 'barSimple':
          data = mockBarChartData({
            type: 'barGroup',
            dataPoints: Number(dataPoints),
            interval: String(interval),
          });
          break;

        case 'geoMercator':
          data = {
            type: 'geoMercator',
            title: 'Power Mix',
            data: generateMockData({
              type,
              dataPoints: Number(dataPoints),
              interval: String(interval),
            }),
          };
          break;

        default:
          break;
      }

      return res.status(200).json({
        status: 'success',
        data,
      });
    } catch (error) {
      console.log(error);
    }
  },
};

export default emsController;
