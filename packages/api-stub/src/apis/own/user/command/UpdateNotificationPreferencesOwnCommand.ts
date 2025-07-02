export interface UpdateNotificationPreferencesOwnCommand {
  emailNotifications: EmailNotifications;
  smsNotifications: SmsNotifications;
}

export interface EmailNotifications {
  newBookingsAndReservations: boolean;
  messagesFromCustomers: boolean;
  paymentConfirmations: boolean;
}

export interface SmsNotifications {
  newBookingsAndReservations: boolean;
  messagesFromCustomers: boolean;
  paymentConfirmations: boolean;
}