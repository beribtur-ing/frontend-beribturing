import {useMutation} from '@tanstack/react-query';
import {AxiosResponse} from 'axios';
import {CommandResponse, FirstParameter, ReviewOwnFlowApi} from '@beribturing/api-stub';

export const useReviewMutation = () => {
  //
  return {
    mutation: {
      registerReview: useMutation<
        AxiosResponse<CommandResponse<string>>,
        unknown,
        FirstParameter<typeof ReviewOwnFlowApi.registerReview>
      >(ReviewOwnFlowApi.registerReview as any, {}),
      modifyReview: useMutation<
        AxiosResponse<CommandResponse<string>>,
        unknown,
        FirstParameter<typeof ReviewOwnFlowApi.modifyReview>
      >(ReviewOwnFlowApi.modifyReview as any, {}),
      removeReview: useMutation<
        AxiosResponse<CommandResponse<string>>,
        unknown,
        FirstParameter<typeof ReviewOwnFlowApi.removeReview>
      >(ReviewOwnFlowApi.removeReview as any, {}),
    },
  };
};