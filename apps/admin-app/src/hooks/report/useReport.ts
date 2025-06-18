import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {FindReportAdmQuery, ReportAdmSeekApi, Report, QueryResponse} from '@beribturing/api-stub';

export const useReport = (reportId: string) => {
  //
  const query: FindReportAdmQuery = {
    reportId
  };

  const {queryKey, queryFn} = ReportAdmSeekApi.query.findReport(query);

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