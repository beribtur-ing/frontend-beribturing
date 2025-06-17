import {useMutation} from '@tanstack/react-query';
import {AxiosResponse} from 'axios';
import {CommandResponse, FirstParameter, ReportAdmFlowApi} from '@beribturing/api-stub';

export const useReportMutation = () => {
  //
  return {
    mutation: {
      resolveReport: useMutation<
        AxiosResponse<CommandResponse<string>>,
        unknown,
        FirstParameter<typeof ReportAdmFlowApi.resolveReport>
      >(ReportAdmFlowApi.resolveReport as any, {}),
    },
  };
};