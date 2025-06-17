import {useMutation} from '@tanstack/react-query';
import {AxiosResponse} from 'axios';
import {CommandResponse, FirstParameter, ReviewAdmFlowApi} from '@beribturing/api-stub';

export const useReviewMutation = () => {
  //
  return {
    mutation: {
      hideReview: useMutation<
        AxiosResponse<CommandResponse<string>>,
        unknown,
        FirstParameter<typeof ReviewAdmFlowApi.hideReview>
      >(ReviewAdmFlowApi.hideReview as any, {}),
    },
  };
};