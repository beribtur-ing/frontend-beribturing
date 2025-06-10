export interface JsonSerializable {
  toJson?(): string;
}

export interface ValueObject extends JsonSerializable {} 