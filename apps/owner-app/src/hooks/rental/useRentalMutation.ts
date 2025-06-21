import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { CommandResponse, FirstParameter, RentalOwnFlowApi } from '@beribturing/api-stub';

export const useRentalMutation = () => {
  //
  return {
    mutation: {
      registerRentalRecord: useMutation<
      AxiosResponse<CommandResponse<string>>,
      unknown,
      FirstParameter<typeof RentalOwnFlowApi.registerRentalRecord>
      >(RentalOwnFlowApi.registerRentalRecord as any, {}),
      modifyRentalRecord: useMutation<
      AxiosResponse<CommandResponse<string>>,
      unknown,
      FirstParameter<typeof RentalOwnFlowApi.modifyRentalRecord>
      >(RentalOwnFlowApi.modifyRentalRecord as any, {}),
      registerItemConditionCheck: useMutation<
      AxiosResponse<CommandResponse<string>>,
      unknown,
      FirstParameter<typeof RentalOwnFlowApi.registerItemConditionCheck>
      >(RentalOwnFlowApi.registerItemConditionCheck as any, {}),
      registerItemConditionPhoto: useMutation<
      AxiosResponse<CommandResponse<string>>,
      unknown,
      FirstParameter<typeof RentalOwnFlowApi.registerItemConditionPhoto>
      >(RentalOwnFlowApi.registerItemConditionPhoto as any, {}),
    },
  };
};