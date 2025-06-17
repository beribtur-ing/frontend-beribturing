import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {FindReportsByResolvedStateAdmQuery, ReportAdmSeekApi, Report, QueryResponse} from '@beribturing/api-stub';

export const useReportsByResolvedState = (resolved: boolean) => {
  //
  const query: FindReportsByResolvedStateAdmQuery = {
    resolved
  };

  const {queryKey, queryFn} = ReportAdmSeekApi.query.findReportsByResolvedState(query);

  const {data, refetch, isLoading}: UseQueryResult<QueryResponse<Report[]>> = useQuery(
    {
      queryKey,
      queryFn,
    }
  );

  return {
    reports: data?.result || [],
    refetch,
    isLoading,
  };
};