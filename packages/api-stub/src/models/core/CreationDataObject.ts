import { JsonSerializable } from './ValueObject';

export interface CreationDataObject extends JsonSerializable {
  genId(): string;
} 