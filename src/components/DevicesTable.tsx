import React, { useMemo, useState, useRef, useEffect } from 'react';
import { FixedSizeList as List } from 'react-window';
import { useAppStore } from '../store/useAppStore';
import { Device } from '../types';
import { isDeviceOnline } from '../utils/dataTransformations';
import { EmptyState } from './EmptyState';

interface DeviceRowProps {
  index: number;
  style: React.CSSProperties;
  data: {
    devices: Device[];
    columns: string[];
  };
}

// Device row component for virtualization / Компонент за ред на устройство за виртуализация
const DeviceRow: React.FC<DeviceRowProps> = React.memo(({ index, style, data }) => {
  const device = data.devices[index];
  // Check if device is online / Проверява дали устройството е онлайн
  const isOnline = isDeviceOnline(device);

  return (
      <div
        style={style}
        className="flex items-center border-b border-gray-100 hover:bg-[#EBF5FF]/30 transition-colors bg-white overflow-x-auto"
      >
        <div className="flex-1 px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-normal text-[#4A5057] min-w-[120px] sm:min-w-0 truncate">{device.name || '-'}</div>
        <div className="flex-1 px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-normal text-[#75788B] min-w-[100px] sm:min-w-0 truncate">{device.serialNumber || '-'}</div>
      {data.columns.includes('temperature') && (
        <div className="flex-1 px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-normal text-[#75788B] min-w-[80px] sm:min-w-0">
          {device.temperature !== undefined ? `${device.temperature}°C` : '-'}
        </div>
      )}
      {data.columns.includes('targetTemperature') && (
        <div className="flex-1 px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-normal text-[#75788B] min-w-[80px] sm:min-w-0 hidden sm:block">
          {device.targetTemperature !== undefined ? `${device.targetTemperature}°C` : '-'}
        </div>
      )}
      {data.columns.includes('battery') && (
        <div className="flex-1 px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-normal text-[#75788B] min-w-[60px] sm:min-w-0">
          {device.battery !== undefined ? `${device.battery}%` : '-'}
        </div>
      )}
      <div className="w-20 sm:w-28 px-2 sm:px-4 py-2 sm:py-3 flex-shrink-0">
        <div className={`flex items-center gap-2 px-2 py-1 rounded-full w-fit ${
          isOnline ? 'bg-[#EBF5FF]' : 'bg-gray-100'
        }`}>
          <div className={`w-[6px] h-[6px] rounded-full flex-shrink-0 ${isOnline ? 'bg-green-500' : 'bg-[#963131]'}`} />
          <span className={`text-xs font-medium whitespace-nowrap ${isOnline ? 'text-[#C1D5E9]' : 'text-[#636363]'}`}>
            {isOnline ? 'Online' : 'Offline'}
          </span>
        </div>
      </div>
    </div>
  );
});

DeviceRow.displayName = 'DeviceRow';

interface DeviceTypeTableProps {
  deviceType: string;
  devices: Device[];
}

// Device type table component - groups devices by type / Компонент за таблица по тип устройство - групира устройства по тип
const DeviceTypeTable: React.FC<DeviceTypeTableProps> = React.memo(({ deviceType, devices }) => {
  const [expanded, setExpanded] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(800);

  // Update container width on resize / Обновява ширината на контейнера при промяна на размера
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Determine which columns to show based on available data / Определя кои колони да показва според наличните данни
  const columns = useMemo(() => {
    const cols: string[] = [];
    if (devices.some((d) => d.temperature !== undefined)) cols.push('temperature');
    if (devices.some((d) => d.targetTemperature !== undefined)) cols.push('targetTemperature');
    if (devices.some((d) => d.battery !== undefined)) cols.push('battery');
    return cols;
  }, [devices]);

  // Count online devices / Брои онлайн устройства
  const onlineCount = useMemo(() => {
    return devices.filter((d) => isDeviceOnline(d)).length;
  }, [devices]);

  // Calculate list height for virtualization / Изчислява височината на списъка за виртуализация
  const listHeight = Math.min(600, Math.max(200, devices.length * 48));

  return (
    <div ref={containerRef} className="bg-white rounded-[14px] border border-gray-200 mb-6 overflow-hidden shadow-custom hover:shadow-lg transition-shadow">
      {/* Header - matches design exactly / Заглавна част - точно съответства на дизайна */}
      <div
        className="px-4 sm:px-6 py-3 sm:py-4 bg-[#F3FBFF] border-b border-gray-200 cursor-pointer hover:bg-[#EBF5FF]/50 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <button 
              className="text-[#75788B] hover:text-[#4A5057] transition-transform flex-shrink-0"
              onClick={(e) => {
                e.stopPropagation();
                setExpanded(!expanded);
              }}
            >
              <svg
                className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 ${expanded ? 'rotate-[90deg]' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#EBF5FF] rounded-lg flex items-center justify-center border border-[#7C818F]/20 flex-shrink-0">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#6BADDC]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            </div>
            <div className="min-w-0">
              <h3 className="text-base sm:text-lg lg:text-[20px] font-medium text-[#4A5057] leading-tight truncate">{deviceType}</h3>
              <span className="text-xs sm:text-sm font-normal text-[#75788B] leading-relaxed">{devices.length} devices</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 bg-[#EBF5FF] px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-[#7C818F]/20 flex-shrink-0">
            <div className="w-[6px] h-[6px] bg-green-500 rounded-full flex-shrink-0"></div>
            <span className="text-xs sm:text-sm font-medium text-[#C1D5E9] whitespace-nowrap">{onlineCount} online</span>
          </div>
        </div>
      </div>

      {/* Table / Таблица */}
      {expanded && (
        <div className="overflow-hidden">
          {/* Table Header - matches design exactly / Заглавна част на таблицата - точно съответства на дизайна */}
          <div className="flex items-center bg-[#F3FBFF] border-b border-gray-200 font-medium text-[10px] sm:text-xs text-[#75788B] uppercase tracking-wider sticky top-0 z-10 overflow-x-auto">
            <div className="flex-1 px-2 sm:px-4 py-2 sm:py-3.5 min-w-[120px] sm:min-w-0">Device Name</div>
            <div className="flex-1 px-2 sm:px-4 py-2 sm:py-3.5 min-w-[100px] sm:min-w-0">Serial Number</div>
            {columns.includes('temperature') && (
              <div className="flex-1 px-2 sm:px-4 py-2 sm:py-3.5 min-w-[80px] sm:min-w-0">Temperature</div>
            )}
            {columns.includes('targetTemperature') && (
              <div className="flex-1 px-2 sm:px-4 py-2 sm:py-3.5 min-w-[80px] sm:min-w-0 hidden sm:block">Target Temp</div>
            )}
            {columns.includes('battery') && <div className="flex-1 px-2 sm:px-4 py-2 sm:py-3.5 min-w-[60px] sm:min-w-0">Battery</div>}
            <div className="w-20 sm:w-28 px-2 sm:px-4 py-2 sm:py-3.5 flex-shrink-0">Status</div>
          </div>

          {/* Virtualized List / Виртуализиран списък */}
          {devices.length > 0 ? (
            <List
              height={listHeight}
              itemCount={devices.length}
              itemSize={48}
              itemData={{ devices, columns }}
              width={containerWidth}
            >
              {DeviceRow}
            </List>
          ) : (
            <div className="p-8 text-center text-gray-500">No devices in this category</div>
          )}
        </div>
      )}
    </div>
  );
});

DeviceTypeTable.displayName = 'DeviceTypeTable';

export const DevicesTable: React.FC = () => {
  const { deviceGroups } = useAppStore();

  if (deviceGroups.length === 0) {
    return (
      <EmptyState
        title="No devices found"
        message="There are no devices to display."
        icon={
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
        }
      />
    );
  }

  return (
      <div className="p-4 sm:p-6 lg:p-8 bg-[#F8FAFF] min-h-full pt-16 lg:pt-8">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-[48px] font-medium text-[#4A5057] mb-2 leading-tight">Devices by Type</h2>
          <p className="text-sm sm:text-base lg:text-[20px] font-normal text-[#75788B] leading-relaxed">All devices grouped by device type for easy management</p>
        </div>

      <div>
        {deviceGroups.map((group) => (
          <DeviceTypeTable key={group.deviceType} deviceType={group.deviceType} devices={group.devices} />
        ))}
      </div>
    </div>
  );
};
