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
  mockSankeyChartData,
  mockPieChartData,
  mockPowerAnalysisWidgetData,
} from './mock/mockPowerAnalysis';
import { LNG_MAP, generateMockData } from '../ems/mock/generator';

const handleLanguage = (req: Request): keyof typeof LNG_MAP => {
  const isAccepted = req.acceptsLanguages()[0] === 'zh-TW'||req.acceptsLanguages()[0] === 'zh' || req.acceptsLanguages()[0] === 'en-US' || req.acceptsLanguages()[0] === 'en';
  const lng = isAccepted ? req.acceptsLanguages()[0] : 'zh-TW';

  return lng.split('-')[0] as keyof typeof LNG_MAP;
};

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
      const lng = handleLanguage(req);

      switch (type) {
        case 'simple':
          return res.status(200).json({
            status: 'success',
            data: mockTableData({ dataPoints: Number(dataPoints), lng }),
          });

        case 'data':
          return res.status(200).json({
            status: 'success',
            data: mockDataTableData(Number(dataPoints)),
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
      const lng = handleLanguage(req);
      console.log(79,lng)
      const dataPoints = Number(rawDataPoints);
      const interval = String(rawInterval);

      let data;

      switch (type) {
        case 'lineSimple':
          data = mockLineChartData({
            type,
            dataPoints,
            interval,
            lng,
          });
          break;

        case 'barSimple':
          data = mockBarChartData({
            type,
            dataPoints,
            interval,
            lng,
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
      const lng = handleLanguage(req);
      return res.status(200).json({
        status: 'success',
        data: mockSummaryData(lng),
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
      const lng = handleLanguage(req);
      const { dataPoints, interval, type } = req.query;
      let data;

      switch (type) {
        case 'sankeySimple':
          data = mockSankeyChartData({
            type,
            dataPoints: Number(dataPoints),
            interval: String(interval),
            lng,
          });
          break;

        case 'pie':
          if (req.query?.subType) {
            // @ts-ignore
            data = mockPieChartData(req.query?.subType, lng);
          }
          break;

        case 'barSimple':
          data = mockBarChartData({
            type: 'barSimple',
            dataPoints: Number(dataPoints),
            interval: String(interval),
            lng,
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
              lng,
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
