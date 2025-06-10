import { FailureMessage } from './FailureMessage';

export interface FailureResponse {
  requestFailed: boolean;
  failureMessage: FailureMessage;
} 