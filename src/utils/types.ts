export type Service = {
  id: number;
  name: string;
  /** Duration in seconds. */
  duration: number;
};

export type Appointment = {
  id: string;
  serviceName: string;
  serviceId: number;
  /** ISO 8601 start time. */
  start: string;
  /** Duration in seconds. */
  duration: number;
  booked: boolean;
};

export type BookingRequest = {
  email: string;
  customerName: string;
  modelYear: number;
  make: string;
  model: string;
};

export type BookingConfirmation = {
  id: string;
  serviceName: string;
  start: string;
  duration: number;
  booked: boolean;
  email: string;
  customerName: string;
  modelYear: number | string;
  make: string;
  model: string;
};
