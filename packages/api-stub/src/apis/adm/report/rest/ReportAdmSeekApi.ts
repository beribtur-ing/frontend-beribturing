import {
  FindReportAdmQuery,
  FindReportsByRecordAdmQuery,
  FindReportsByReporterAdmQuery,
  FindReportsByResolvedStateAdmQuery
} from '~/apis';
import {FirstParameter, QueryResponse, Report} from '~/models';
import axios from 'axios';

const url = (path: string) => `/api/feature/admin/report/${path}`;

const findReport = (variables: {
  reportId: string;
}) => {
  const query = <FindReportAdmQuery>{...variables};
  return axios.post<QueryResponse<Report>>(url('/find-report/query'), query);
};

const findReportsByRecord = (variables: {
  recordId: string;
}) => {
  const query = <FindReportsByRecordAdmQuery>{...variables};
  return axios.post<QueryResponse<Report[]>>(url('/find-reports-by-record/query'), query);
};

const findReportsByReporter = (variables: {
  reporterId: string;
}) => {
  const query = <FindReportsByReporterAdmQuery>{...variables};
  return axios.post<QueryResponse<Report[]>>(url('/find-reports-by-reporter/query'), query);
};

const findReportsByResolvedState = (variables: {
  resolved: boolean;
}) => {
  const query = <FindReportsByResolvedStateAdmQuery>{...variables};
  return axios.post<QueryResponse<Report[]>>(url('/find-reports-by-resolved-state/query'), query);
};

export default {
  findReport,
  findReportsByRecord,
  findReportsByReporter,
  findReportsByResolvedState,

  query: {
    findReport: (params: FirstParameter<typeof findReport>) => ({
      queryKey: ['feature/admin/report', 'findReport', params],
      queryFn: async ({queryKey}: { queryKey: readonly any[] }) => (await findReport(queryKey.slice().pop()))?.data,
    }),
    findReportsByRecord: (params: FirstParameter<typeof findReportsByRecord>) => ({
      queryKey: ['feature/admin/report', 'findReportsByRecord', params],
      queryFn: async ({queryKey}: {
        queryKey: readonly any[]
      }) => (await findReportsByRecord(queryKey.slice().pop()))?.data,
    }),
    findReportsByReporter: (params: FirstParameter<typeof findReportsByReporter>) => ({
      queryKey: ['feature/admin/report', 'findReportsByReporter', params],
      queryFn: async ({queryKey}: {
        queryKey: readonly any[]
      }) => (await findReportsByReporter(queryKey.slice().pop()))?.data,
    }),
    findReportsByResolvedState: (params: FirstParameter<typeof findReportsByResolvedState>) => ({
      queryKey: ['feature/admin/report', 'findReportsByResolvedState', params],
      queryFn: async ({queryKey}: {
        queryKey: readonly any[]
      }) => (await findReportsByResolvedState(queryKey.slice().pop()))?.data,
    }),
  }
};
