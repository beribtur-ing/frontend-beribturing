import {
  FindReportRntQuery,
  FindReportsByReporterAndResolvedStateRntQuery,
  FindReportsByReporterRntQuery
} from '~/apis';
import { FirstParameter, QueryResponse, Report } from '~/models';
import axios from "axios";

const url = (path: string) => `/api/feature/renter/report/${path}`;

const findReport = <T = Report>(params: { reportId: string; }) => {
  const query = <FindReportRntQuery>{...params};
  return axios.post<QueryResponse<T>>(url('/find-report/query'), query);
};

const findReportsByReporter = <T = Report[]>(params: { reporterId: string; }) => {
  const query = <FindReportsByReporterRntQuery>{...params};
  return axios.post<QueryResponse<T>>(url('/find-reports-by-reporter/query'), query);
};

const findReportsByResolvedState = <T = Report[]>(params: { reporterId: string; resolved: boolean; }) => {
  const query = <FindReportsByReporterAndResolvedStateRntQuery>{...params};
  return axios.post<QueryResponse<T>>(url('/find-reports-by-resolved-state/query'), query);
};

export default {
  findReport,
  findReportsByReporter,
  findReportsByResolvedState,

  query: {
    findReport: (params: FirstParameter<typeof findReport>) => ({
      queryKey: ['feature/renter/report', 'findReport', params],
      queryFn: async ({queryKey}: {
        queryKey: readonly any[]
      }) => (await findReport(queryKey.slice().pop()))?.data,
    }),
    findReportsByReporter: (params: FirstParameter<typeof findReportsByReporter>) => ({
      queryKey: ['feature/renter/report', 'findReportsByReporter', params],
      queryFn: async ({queryKey}: {
        queryKey: readonly any[]
      }) => (await findReportsByReporter(queryKey.slice().pop()))?.data,
    }),
    findReportsByResolvedState: (params: FirstParameter<typeof findReportsByResolvedState>) => ({
      queryKey: ['feature/renter/report', 'findReportsByResolvedState', params],
      queryFn: async ({queryKey}: {
        queryKey: readonly any[]
      }) => (await findReportsByResolvedState(queryKey.slice().pop()))?.data,
    }),
  }
}
