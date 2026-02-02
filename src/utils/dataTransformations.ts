import { Building, Device, BuildingStats, DeviceGroup, Floor, Space, Room } from '../types';

/**
 * Recursively collect all devices from a building hierarchy
 * Рекурсивно събира всички устройства от йерархията на сградата
 */
export function collectDevicesFromBuilding(building: Building): Device[] {
  const devices: Device[] = [];

  // Devices at building level / Устройства на ниво сграда
  if (Array.isArray(building.devices)) {
    devices.push(...building.devices);
  }

  // Devices from floors / Устройства от етажи
  if (Array.isArray(building.floors)) {
    building.floors.forEach((floor) => {
      devices.push(...collectDevicesFromFloor(floor));
    });
  }

  // Devices from spaces (at building level) / Устройства от пространства (на ниво сграда)
  if (Array.isArray(building.spaces)) {
    building.spaces.forEach((space) => {
      devices.push(...collectDevicesFromSpace(space));
    });
  }

  // Devices from rooms (at building level) / Устройства от стаи (на ниво сграда)
  if (Array.isArray(building.rooms)) {
    building.rooms.forEach((room) => {
      devices.push(...collectDevicesFromRoom(room));
    });
  }

  return devices;
}

function collectDevicesFromFloor(floor: Floor): Device[] {
  const devices: Device[] = [];

  if (Array.isArray(floor.devices)) {
    devices.push(...floor.devices);
  }

  if (Array.isArray(floor.spaces)) {
    floor.spaces.forEach((space) => {
      devices.push(...collectDevicesFromSpace(space));
    });
  }

  if (Array.isArray(floor.rooms)) {
    floor.rooms.forEach((room) => {
      devices.push(...collectDevicesFromRoom(room));
    });
  }

  return devices;
}

function collectDevicesFromSpace(space: Space): Device[] {
  const devices: Device[] = [];

  if (Array.isArray(space.devices)) {
    devices.push(...space.devices);
  }

  if (Array.isArray(space.rooms)) {
    space.rooms.forEach((room) => {
      devices.push(...collectDevicesFromRoom(room));
    });
  }

  if (Array.isArray(space.spaces)) {
    space.spaces.forEach((nestedSpace) => {
      devices.push(...collectDevicesFromSpace(nestedSpace));
    });
  }

  return devices;
}

function collectDevicesFromRoom(room: Room): Device[] {
  const devices: Device[] = [];

  if (Array.isArray(room.devices)) {
    devices.push(...room.devices);
  }

  if (Array.isArray(room.rooms)) {
    room.rooms.forEach((nestedRoom) => {
      devices.push(...collectDevicesFromRoom(nestedRoom));
    });
  }

  return devices;
}

/**
 * Count floors, spaces, and rooms in a building
 * Брои етажи, пространства и стаи в сграда
 */
export function countBuildingAssets(building: Building): {
  floors: number;
  spaces: number;
  rooms: number;
} {
  let floorCount = building.floors?.length || 0;
  let spaceCount = building.spaces?.length || 0;
  let roomCount = building.rooms?.length || 0;

  // Count nested assets / Брои вложени активи
  if (Array.isArray(building.floors)) {
    building.floors.forEach((floor) => {
      spaceCount += Array.isArray(floor.spaces) ? floor.spaces.length : 0;
      roomCount += Array.isArray(floor.rooms) ? floor.rooms.length : 0;

      if (Array.isArray(floor.spaces)) {
        floor.spaces.forEach((space) => {
          roomCount += countNestedRooms(space);
          spaceCount += countNestedSpaces(space);
        });
      }
    });
  }

  if (Array.isArray(building.spaces)) {
    building.spaces.forEach((space) => {
      roomCount += countNestedRooms(space);
      spaceCount += countNestedSpaces(space);
    });
  }

  return { floors: floorCount, spaces: spaceCount, rooms: roomCount };
}

function countNestedSpaces(space: Space): number {
  let count = 0;
  if (Array.isArray(space.spaces)) {
    count += space.spaces.length;
    space.spaces.forEach((nestedSpace) => {
      count += countNestedSpaces(nestedSpace);
    });
  }
  return count;
}

function countNestedRooms(spaceOrRoom: Space | Room): number {
  let count = 0;
  if ('rooms' in spaceOrRoom && Array.isArray(spaceOrRoom.rooms)) {
    count += spaceOrRoom.rooms.length;
    spaceOrRoom.rooms.forEach((room) => {
      count += countNestedRooms(room);
    });
  }
  return count;
}

/**
 * Calculate building statistics
 * Изчислява статистики за сграда
 */
export function calculateBuildingStats(building: Building): BuildingStats {
  const devices = collectDevicesFromBuilding(building);
  const assets = countBuildingAssets(building);

  // Filter online devices / Филтрира онлайн устройства
  // Assume online if status not specified / Приема онлайн ако статусът не е указан
  const onlineDevices = devices.filter(
    (device) => device.status === 'online' || device.status === undefined
  );

  return {
    buildingId: building.id,
    floorCount: assets.floors,
    spaceCount: assets.spaces,
    roomCount: assets.rooms,
    deviceCount: devices.length,
    onlineDeviceCount: onlineDevices.length,
  };
}

/**
 * Group devices by deviceType
 * Групира устройства по тип
 */
export function groupDevicesByType(devices: Device[]): DeviceGroup[] {
  const grouped = new Map<string, Device[]>();

  // Group devices by type / Групира устройства по тип
  devices.forEach((device) => {
    const type = device.deviceType || 'Unknown';
    if (!grouped.has(type)) {
      grouped.set(type, []);
    }
    grouped.get(type)!.push(device);
  });

  // Convert to array and sort / Конвертира в масив и сортира
  return Array.from(grouped.entries())
    .map(([deviceType, devices]) => ({
      deviceType,
      devices,
    }))
    .sort((a, b) => a.deviceType.localeCompare(b.deviceType));
}

/**
 * Check if a device is online
 * Проверява дали устройството е онлайн
 */
export function isDeviceOnline(device: Device): boolean {
  // Assume online if status is undefined / Приема онлайн ако статусът е undefined
  return device.status === 'online' || device.status === undefined;
}
