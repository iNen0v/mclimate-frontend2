// Core data types from the API
export interface Device {
  id: string;
  name: string;
  serialNumber: string;
  deviceType: string;
  temperature?: number;
  targetTemperature?: number;
  battery?: number;
  status?: 'online' | 'offline';
  [key: string]: unknown; // Allow for additional fields
}

export interface Room {
  id: string;
  name: string;
  devices?: Device[];
  rooms?: Room[]; // Nested rooms
}

export interface Space {
  id: string;
  name: string;
  devices?: Device[];
  rooms?: Room[];
  spaces?: Space[]; // Nested spaces
}

export interface Floor {
  id: string;
  name: string;
  devices?: Device[];
  spaces?: Space[];
  rooms?: Room[];
}

export interface Building {
  id: string;
  name: string;
  address: string;
  devices?: Device[];
  floors?: Floor[];
  spaces?: Space[];
  rooms?: Room[];
}

export interface ApiResponse {
  buildings: Building[];
}

// Computed/derived types
export interface BuildingStats {
  buildingId: string;
  floorCount: number;
  spaceCount: number;
  roomCount: number;
  deviceCount: number;
  onlineDeviceCount: number;
}

export interface DeviceGroup {
  deviceType: string;
  devices: Device[];
}

// UI state types
export type ViewMode = 'buildings' | 'devices';

export interface SelectedItem {
  type: 'building' | 'floor' | 'space' | 'room';
  id: string;
  name: string;
}
