export interface Household {
  id: string;
  name: string;
  admin: User[];
  members: User[];
  devices: Device[];
  logs: Log[];
  active: boolean;
  alarm_triggerd: boolean;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Device {
  id: string;
  name: string;
  type: string;
}

export interface Log {
  id: string;
  userId: string;
  deviceId: string;
  type: string;
  message: string;
  date: Date;
}
