import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {FindReportRntQuery, ReportRntSeekApi, Report, QueryResponse} from '@beribturing/api-stub';

export const useReport = (reportId: string) => {
  //
  const query: FindReportRntQuery = {
    reportId
  };

  const {queryKey, queryFn} = ReportRntSeekApi.query.findReport(query);

  const {data, refetch, isLoading}: UseQueryResult<QueryResponse<Report>> = useQuery(
    {
      queryKey,
      queryFn,
      enabled: !!reportId,
    }
  );

  return {
    report: data?.result,
    refetch,
    isLoading,
  };
};