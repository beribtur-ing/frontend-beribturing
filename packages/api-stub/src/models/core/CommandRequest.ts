import { CommandResponse } from './CommandResponse';

export interface CommandRequest<T> {
  response: CommandResponse<T>;
} 