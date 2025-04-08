export interface Household {
  _id: string;
  name: string;
  ownerId: string;
  members: string[];
  devices: string[];
  logs: Log[];
  createdAt: Date;
  __v: number;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  role: string;
  refreshToken: string;
}

export interface Device {
  _id: string;
  name: string;
  type: string;
  active: boolean;
  alarm_triggered: number;
}

export interface Log {
  _id: string;
  userId: string;
  deviceId: string;
  type: string;
  message: string;
  time: Date;
}

// ### id to _id
