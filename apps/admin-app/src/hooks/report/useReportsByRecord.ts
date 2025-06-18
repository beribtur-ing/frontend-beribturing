import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {FindReportsByRecordAdmQuery, ReportAdmSeekApi, Report, QueryResponse} from '@beribturing/api-stub';

export const useReportsByRecord = (recordId: string) => {
  //
  const query: FindReportsByRecordAdmQuery = {
    recordId
  };

  const {queryKey, queryFn} = ReportAdmSeekApi.query.findReportsByRecord(query);

  const {data, refetch, isLoading}: UseQueryResult<QueryResponse<Report[]>> = useQuery(
    {
      queryKey,
      queryFn,
      enabled: !!recordId,
    }
  );

  return {
    reports: data?.result || [],
    refetch,
    isLoading,
  };
};