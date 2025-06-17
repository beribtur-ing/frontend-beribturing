import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {FindReportsByReporterRntQuery, ReportRntSeekApi, Report, QueryResponse} from '@beribturing/api-stub';

export const useReportsByReporter = (reporterId: string) => {
  //
  const query: FindReportsByReporterRntQuery = {
    reporterId
  };

  const {queryKey, queryFn} = ReportRntSeekApi.query.findReportsByReporter(query);

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