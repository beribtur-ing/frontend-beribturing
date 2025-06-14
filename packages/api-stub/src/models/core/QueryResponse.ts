import { Offset } from './Offset';

export interface QueryResponse<T> {
  result: T;
  offset: Offset;
} 