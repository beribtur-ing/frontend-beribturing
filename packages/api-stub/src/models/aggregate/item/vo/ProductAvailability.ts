export interface ProductAvailability {
  availableFrom?: Date;
  availableUntil?: Date;
  availableDays?: string[]; // Using string array to represent DayOfWeek
}