import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {FindReportsByReporterAdmQuery, ReportAdmSeekApi, Report, QueryResponse} from '@beribturing/api-stub';

export const useReportsByReporter = (reporterId: string) => {
  //
  const query: FindReportsByReporterAdmQuery = {
    reporterId
  };

  const {queryKey, queryFn} = ReportAdmSeekApi.query.findReportsByReporter(query);

  const {data, refetch, isLoading}: UseQueryResult<QueryResponse<Report[]>> = useQuery(
    {
      queryKey,
      queryFn,
      enabled: !!reporterId,
    }
  );

  return {
    reports: data?.result || [],
    refetch,
    isLoading,
  };
};