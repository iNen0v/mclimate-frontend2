import React, { useMemo } from 'react';
import { useAppStore } from '../store/useAppStore';
import { calculateBuildingStats } from '../utils/dataTransformations';
import { EmptyState } from './EmptyState';

// Building card component - displays a single building / Компонент за карта на сграда - показва една сграда
const BuildingCard: React.FC<{ buildingId: string }> = React.memo(({ buildingId }) => {
  const { buildings, selectedItem, setSelectedItem } = useAppStore();

  // Find building by ID / Намира сграда по ID
  const building = useMemo(() => {
    return buildings.find((b) => b.id === buildingId);
  }, [buildings, buildingId]);

  // Calculate building statistics / Изчислява статистики за сградата
  const stats = useMemo(() => {
    if (!building) return null;
    return calculateBuildingStats(building);
  }, [building]);

  if (!building || !stats) return null;

  const isSelected = selectedItem?.id === building.id;

  // Handle card click / Обработва клик върху картата
  const handleClick = () => {
    setSelectedItem({ type: 'building', id: building.id, name: building.name });
  };

  return (
    <div
      onClick={handleClick}
      className={`
        bg-white rounded-[14px] border cursor-pointer transition-all shadow-custom hover:shadow-lg
        ${isSelected ? 'border-[#6BADDC] ring-2 ring-[#EBF5FF]' : 'border-gray-200 hover:border-[#6BADDC]'}
      `}
      style={{ minHeight: '332px' }}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-4 sm:p-6 h-full">
        {/* Large Building Icon - matches design exactly / Голяма икона на сграда - точно съответства на дизайна */}
        <div className="flex-shrink-0 self-center sm:self-auto">
          <svg className="w-16 h-20 sm:w-20 sm:h-24 text-[#6BADDC]" fill="none" viewBox="0 0 80 100" stroke="currentColor" strokeWidth="2.5">
            <rect x="5" y="5" width="70" height="90" rx="4" />
            <path d="M5 30H75M5 60H75" />
            <rect x="12" y="10" width="10" height="10" rx="1" />
            <rect x="28" y="10" width="10" height="10" rx="1" />
            <rect x="44" y="10" width="10" height="10" rx="1" />
            <rect x="60" y="10" width="10" height="10" rx="1" />
            <rect x="12" y="35" width="10" height="10" rx="1" />
            <rect x="28" y="35" width="10" height="10" rx="1" />
            <rect x="44" y="35" width="10" height="10" rx="1" />
            <rect x="60" y="35" width="10" height="10" rx="1" />
            <rect x="12" y="65" width="10" height="10" rx="1" />
            <rect x="28" y="65" width="10" height="10" rx="1" />
            <rect x="44" y="65" width="10" height="10" rx="1" />
            <rect x="60" y="65" width="10" height="10" rx="1" />
            <path d="M28 85V80C28 79.4477 28.4477 79 29 79H51C51.5523 79 52 79.4477 52 80V85" />
            <rect x="18" y="50" width="12" height="25" rx="2" />
          </svg>
        </div>

        {/* Building Details / Детайли за сградата */}
        <div className="flex-1 min-w-0 w-full">
          <div className="mb-4 sm:mb-5">
            <h3 className="text-xl sm:text-2xl lg:text-[32px] font-medium text-[#4A5057] mb-2 sm:mb-2.5 leading-tight">{building.name}</h3>
            <div className="flex items-center gap-1.5 text-sm sm:text-base lg:text-[20px] font-normal text-[#75788B]">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="truncate">{building.address || 'No address provided'}</span>
            </div>
          </div>

          {/* Statistics Row - matches design exactly / Ред със статистики - точно съответства на дизайна */}
          <div className="flex items-center gap-3 sm:gap-4 lg:gap-6 flex-wrap text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#75788B] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <span className="text-sm font-normal text-[#75788B] whitespace-nowrap">Floors: {stats.floorCount}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#75788B] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="text-sm font-normal text-[#75788B] whitespace-nowrap">Apartments: {stats.spaceCount}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#75788B] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="text-sm font-normal text-[#75788B] whitespace-nowrap">Rooms: {stats.roomCount}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#75788B] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
              <span className="text-sm font-normal text-[#75788B] whitespace-nowrap">Devices: {stats.deviceCount}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-[6px] h-[6px] bg-green-500 rounded-full flex-shrink-0"></div>
              <span className="text-sm font-normal text-[#75788B] whitespace-nowrap">Online devices: {stats.onlineDeviceCount}</span>
            </div>
          </div>
        </div>

        {/* Action Icons - Vertically Stacked - matches design / Икони за действия - подредени вертикално - съответства на дизайна */}
        <div className="flex flex-col items-center gap-3 flex-shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              // Handle edit / Обработва редактиране
            }}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Edit building"
          >
            <svg className="w-5 h-5 text-[#75788B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              // Handle view details / Обработва преглед на детайли
            }}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="View details"
          >
            <svg className="w-5 h-5 text-[#75788B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
});

BuildingCard.displayName = 'BuildingCard';

export const BuildingsList: React.FC = () => {
  const { buildings } = useAppStore();

  const buildingIds = useMemo(() => buildings.map((b) => b.id), [buildings]);

  if (buildings.length === 0) {
    return (
      <EmptyState
        title="No buildings found"
        message="There are no buildings to display."
        icon={
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        }
      />
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-[#F8FAFF] min-h-full pt-16 lg:pt-8">
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-8">
        <div className="flex-1">
          <h2 className="text-2xl sm:text-3xl lg:text-[48px] font-medium text-[#4A5057] mb-2 leading-tight">Buildings ({buildings.length})</h2>
          <p className="text-sm sm:text-base lg:text-[20px] font-normal text-[#75788B] leading-relaxed">Select a building to view details and manage devices</p>
        </div>
        <button className="w-full sm:w-auto sm:min-w-[200px] lg:w-[355px] h-12 sm:h-14 lg:h-[77px] rounded-full bg-gradient-to-r from-[#4AADEA] via-[#4AACEA] to-[#2871E9] text-white text-base sm:text-lg lg:text-[29px] font-medium shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 flex-shrink-0 px-4">
          <svg className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          <span className="whitespace-nowrap">+ Create a new building</span>
        </button>
      </div>

      <div className="space-y-4">
        {buildingIds.map((id) => (
          <BuildingCard key={id} buildingId={id} />
        ))}
      </div>
    </div>
  );
};
