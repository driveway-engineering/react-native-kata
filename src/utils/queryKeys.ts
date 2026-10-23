export const queryKeys = {
  services: ["services"] as const,
  allAppointments: ["appointments"] as const,
  serviceAppointments: (serviceId: number) => ["appointments", serviceId] as const,
};
