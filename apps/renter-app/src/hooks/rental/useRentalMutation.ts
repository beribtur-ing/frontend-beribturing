import {useMutation} from '@tanstack/react-query';
import {AxiosResponse} from 'axios';
import {CommandResponse, FirstParameter, RentalRntFlowApi} from '@beribturing/api-stub';

export const useRentalMutation = () => {
  //
  return {
    mutation: {
      registerReservation: useMutation<
        AxiosResponse<CommandResponse<string>>,
        unknown,
        FirstParameter<typeof RentalRntFlowApi.registerReservation>
      >(RentalRntFlowApi.registerReservation as any, {}),
      modifyReservation: useMutation<
        AxiosResponse<CommandResponse<string>>,
        unknown,
        FirstParameter<typeof RentalRntFlowApi.modifyReservation>
      >(RentalRntFlowApi.modifyReservation as any, {}),
      modifyRentalRecord: useMutation<
        AxiosResponse<CommandResponse<string>>,
        unknown,
        FirstParameter<typeof RentalRntFlowApi.modifyRentalRecord>
      >(RentalRntFlowApi.modifyRentalRecord as any, {}),
      registerItemConditionCheck: useMutation<
        AxiosResponse<CommandResponse<string>>,
        unknown,
        FirstParameter<typeof RentalRntFlowApi.registerItemConditionCheck>
      >(RentalRntFlowApi.registerItemConditionCheck as any, {}),
      registerItemConditionPhoto: useMutation<
        AxiosResponse<CommandResponse<string>>,
        unknown,
        FirstParameter<typeof RentalRntFlowApi.registerItemConditionPhoto>
      >(RentalRntFlowApi.registerItemConditionPhoto as any, {}),
    },
  };
};