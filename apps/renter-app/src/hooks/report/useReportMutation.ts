import {useMutation} from '@tanstack/react-query';
import {AxiosResponse} from 'axios';
import {CommandResponse, FirstParameter, ReportRntFlowApi} from '@beribturing/api-stub';

export const useReportMutation = () => {
  //
  return {
    mutation: {
      registerReport: useMutation<
        AxiosResponse<CommandResponse<string>>,
        unknown,
        FirstParameter<typeof ReportRntFlowApi.registerReport>
      >(ReportRntFlowApi.registerReport as any, {}),
      modifyReport: useMutation<
        AxiosResponse<CommandResponse<string>>,
        unknown,
        FirstParameter<typeof ReportRntFlowApi.modifyReport>
      >(ReportRntFlowApi.modifyReport as any, {}),
      removeReport: useMutation<
        AxiosResponse<CommandResponse<string>>,
        unknown,
        FirstParameter<typeof ReportRntFlowApi.removeReport>
      >(ReportRntFlowApi.removeReport as any, {}),
    },
  };
};