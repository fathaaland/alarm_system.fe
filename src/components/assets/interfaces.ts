export interface Household {
  id: string;
  name: string;
  ownerId: string;
  members: string[];
  devices: string[];
  logs: Log[];
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  role: string;
  refreshToken: string;
}

export interface Device {
  id: string;
  name: string;
  type: string;
  active: boolean;
  alarm_triggered: number;
}

export interface Log {
  id: string;
  userId: string;
  deviceId: string;
  type: string;
  message: string;
  time: Date;
}

// ### id to _id
