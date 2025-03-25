export interface Household {
  id: string;
  name: string;
  password: string;
  owner: User[];
  logs: Log[];
  createdAt: Date;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  households: Household[];
  refreshToken: string;
  createdAt: Date;
}

export interface Device {
  id: string;
  name: string;
  type: string;
  active: boolean;
  alarm_triggerd: Number;
  createdAt: Date;
}

export interface Log {
  id: string;
  userId: string;
  deviceId: string;
  type: string;
  message: string;
  time: Date;
  createdAt: Date;
}
