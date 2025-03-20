export interface Household {
  id: string;
  name: string;
  admin: User[];
  members: User[];
  devices: Device[];
  logs: Log[];
  current_state: string;
  trigger_alarm: boolean;
  createdAt: Date;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
}

export interface Device {
  id: string;
  name: string;
  type: string;
  createdAt: Date;
}

export interface Log {
  id: string;
  userId: string;
  deviceId: string;
  type: string;
  message: string;
  date: Date;
}
