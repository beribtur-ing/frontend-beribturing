import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {FindReportsByReporterAndResolvedStateRntQuery, ReportRntSeekApi, Report, QueryResponse} from '@beribturing/api-stub';

export const useReportsByResolvedState = (reporterId: string, resolved: boolean) => {
  //
  const query: FindReportsByReporterAndResolvedStateRntQuery = {
    reporterId,
    resolved
  };

  const {queryKey, queryFn} = ReportRntSeekApi.query.findReportsByReporterAndResolvedState(query);

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