import {useMutation} from '@tanstack/react-query';
import {AxiosResponse} from 'axios';
import {CommandResponse, FirstParameter, ReviewRntFlowApi} from '@beribturing/api-stub';

export const useReviewMutation = () => {
  //
  return {
    mutation: {
      registerReview: useMutation<
        AxiosResponse<CommandResponse<string>>,
        unknown,
        FirstParameter<typeof ReviewRntFlowApi.registerReview>
      >(ReviewRntFlowApi.registerReview as any, {}),
      modifyReview: useMutation<
        AxiosResponse<CommandResponse<string>>,
        unknown,
        FirstParameter<typeof ReviewRntFlowApi.modifyReview>
      >(ReviewRntFlowApi.modifyReview as any, {}),
      removeReview: useMutation<
        AxiosResponse<CommandResponse<string>>,
        unknown,
        FirstParameter<typeof ReviewRntFlowApi.removeReview>
      >(ReviewRntFlowApi.removeReview as any, {}),
    },
  };
};