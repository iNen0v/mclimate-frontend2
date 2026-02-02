import React, { useMemo } from 'react';
import { useAppStore } from '../store/useAppStore';
import { Building, Floor, Space, Room } from '../types';

interface SidebarItemProps {
  id: string;
  name: string;
  level: number;
  type: 'building' | 'floor' | 'space' | 'room';
  children?: React.ReactNode;
  hasChildren: boolean;
}

// Sidebar item component - displays a single item in the hierarchy
// Компонент за sidebar елемент - показва един елемент от йерархията
const SidebarItem: React.FC<SidebarItemProps> = React.memo(({ id, name, level, type, children, hasChildren }) => {
  const { selectedItem, expandedItems, toggleExpanded, setSelectedItem } = useAppStore();
  const isExpanded = expandedItems.has(id);
  const isSelected = selectedItem?.id === id;

  // Handle click to select item / Обработва клик за избор на елемент
  const handleClick = () => {
    setSelectedItem({ type, id, name });
  };

  // Handle expand/collapse toggle / Обработва разгъване/сгъване
  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasChildren) {
      toggleExpanded(id);
    }
  };

  // Get icon based on type / Взима икона според типа
  const icon = useMemo(() => {
    switch (type) {
      case 'building':
        // Building icon with windows - matches design / Икона на сграда с прозорци - съответства на дизайна
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 22 28" stroke="currentColor" strokeWidth="2">
            <rect x="1" y="1" width="20" height="26" rx="2" />
            <path d="M1 9H21M1 17H21" />
            <rect x="4" y="4" width="3" height="3" rx="0.5" />
            <rect x="9" y="4" width="3" height="3" rx="0.5" />
            <rect x="14" y="4" width="3" height="3" rx="0.5" />
            <rect x="4" y="12" width="3" height="3" rx="0.5" />
            <rect x="9" y="12" width="3" height="3" rx="0.5" />
            <rect x="14" y="12" width="3" height="3" rx="0.5" />
            <rect x="4" y="20" width="3" height="3" rx="0.5" />
            <rect x="9" y="20" width="3" height="3" rx="0.5" />
            <rect x="14" y="20" width="3" height="3" rx="0.5" />
            <path d="M8 25V23C8 22.4477 8.44772 22 9 22H13C13.5523 22 14 22.4477 14 23V25" />
          </svg>
        );
      case 'floor':
        // Floor icon - building with horizontal lines / Икона на етаж - сграда с хоризонтални линии
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 22 28" stroke="currentColor" strokeWidth="2">
            <rect x="1" y="1" width="20" height="26" rx="2" />
            <path d="M1 9H21M1 17H21" />
            <rect x="4" y="4" width="3" height="3" rx="0.5" />
            <rect x="9" y="4" width="3" height="3" rx="0.5" />
            <rect x="14" y="4" width="3" height="3" rx="0.5" />
            <rect x="4" y="12" width="3" height="3" rx="0.5" />
            <rect x="9" y="12" width="3" height="3" rx="0.5" />
            <rect x="14" y="12" width="3" height="3" rx="0.5" />
            <rect x="4" y="20" width="3" height="3" rx="0.5" />
            <rect x="9" y="20" width="3" height="3" rx="0.5" />
            <rect x="14" y="20" width="3" height="3" rx="0.5" />
            <path d="M8 25V23C8 22.4477 8.44772 22 9 22H13C13.5523 22 14 22.4477 14 23V25" />
          </svg>
        );
      case 'space':
        // Space icon - hexagon shape matching design / Икона на пространство - шестоъгълна форма съответстваща на дизайна
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L20 7V17L12 22L4 17V7L12 2Z" strokeLinejoin="round" />
            <path d="M12 2V8M20 7L20 13M12 22V16M4 17L4 11" />
          </svg>
        );
      case 'room':
        // Room icon - simple rectangle with door / Икона на стая - прост правоъгълник с врата
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 22 28" stroke="currentColor" strokeWidth="2">
            <rect x="1" y="1" width="20" height="26" rx="2" />
            <path d="M8 25V23C8 22.4477 8.44772 22 9 22H13C13.5523 22 14 22.4477 14 23V25" />
            <rect x="4" y="4" width="3" height="3" rx="0.5" />
            <rect x="9" y="4" width="3" height="3" rx="0.5" />
            <rect x="14" y="4" width="3" height="3" rx="0.5" />
            <rect x="4" y="12" width="3" height="3" rx="0.5" />
            <rect x="14" y="12" width="3" height="3" rx="0.5" />
          </svg>
        );
    }
  }, [type]);

  return (
    <div>
      <div
        className={`
          flex items-center gap-2 px-4 py-2.5 cursor-pointer transition-colors relative
          ${isSelected ? 'bg-[#EBF5FF] text-[#6BADDC] font-medium' : 'hover:bg-gray-50 text-[#75788B]'}
        `}
        style={{ paddingLeft: `${16 + level * 24}px` }}
        onClick={handleClick}
      >
        {isSelected && (
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#6BADDC]" style={{ left: `${level * 24}px` }} />
        )}
        {hasChildren && (
          <button
            onClick={handleToggle}
            className="flex-shrink-0 w-5 h-5 flex items-center justify-center hover:bg-gray-200 rounded transition-colors"
          >
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-[90deg]' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
        {!hasChildren && <div className="w-5 flex-shrink-0" />}
        <div className={`flex-shrink-0 w-5 h-5 flex items-center justify-center ${isSelected ? 'text-[#6BADDC]' : 'text-[#75788B]'}`}>
          {icon}
        </div>
        <span className="truncate flex-1 text-sm font-normal leading-relaxed">{name}</span>
      </div>
      {hasChildren && isExpanded && children && <div>{children}</div>}
    </div>
  );
});

SidebarItem.displayName = 'SidebarItem';

// Floor item component / Компонент за етаж
const FloorItem: React.FC<{ floor: Floor; level: number }> = React.memo(({ floor, level }) => {
  // Check if floor has children (spaces or rooms) / Проверява дали етажът има деца (пространства или стаи)
  const hasChildren = !!(Array.isArray(floor.spaces) && floor.spaces.length > 0) || 
                      !!(Array.isArray(floor.rooms) && floor.rooms.length > 0);
  
  return (
    <SidebarItem
      id={floor.id}
      name={floor.name}
      level={level}
      type="floor"
      hasChildren={hasChildren}
    >
      {Array.isArray(floor.spaces) && floor.spaces.map((space) => (
        <SpaceItem key={space.id} space={space} level={level + 1} />
      ))}
      {Array.isArray(floor.rooms) && floor.rooms.map((room) => (
        <RoomItem key={room.id} room={room} level={level + 1} />
      ))}
    </SidebarItem>
  );
});

FloorItem.displayName = 'FloorItem';

// Space item component / Компонент за пространство
const SpaceItem: React.FC<{ space: Space; level: number }> = React.memo(({ space, level }) => {
  // Check if space has children / Проверява дали пространството има деца
  const hasChildren = !!(Array.isArray(space.rooms) && space.rooms.length > 0) || 
                      !!(Array.isArray(space.spaces) && space.spaces.length > 0);
  
  return (
    <SidebarItem
      id={space.id}
      name={space.name}
      level={level}
      type="space"
      hasChildren={hasChildren}
    >
      {Array.isArray(space.spaces) && space.spaces.map((nestedSpace) => (
        <SpaceItem key={nestedSpace.id} space={nestedSpace} level={level + 1} />
      ))}
      {Array.isArray(space.rooms) && space.rooms.map((room) => (
        <RoomItem key={room.id} room={room} level={level + 1} />
      ))}
    </SidebarItem>
  );
});

SpaceItem.displayName = 'SpaceItem';

// Room item component / Компонент за стая
const RoomItem: React.FC<{ room: Room; level: number }> = React.memo(({ room, level }) => {
  // Check if room has nested rooms / Проверява дали стаята има вложени стаи
  const hasChildren = !!(Array.isArray(room.rooms) && room.rooms.length > 0);
  
  return (
    <SidebarItem
      id={room.id}
      name={room.name}
      level={level}
      type="room"
      hasChildren={hasChildren}
    >
      {Array.isArray(room.rooms) && room.rooms.map((nestedRoom) => (
        <RoomItem key={nestedRoom.id} room={nestedRoom} level={level + 1} />
      ))}
    </SidebarItem>
  );
});

RoomItem.displayName = 'RoomItem';

// Dashboards section - shows when a building is selected / Секция за dashboards - показва се когато е избрана сграда
const DashboardsSection: React.FC<{ buildingId: string }> = React.memo(({ buildingId }) => {
  const { selectedItem, expandedItems, toggleExpanded } = useAppStore();
  const isExpanded = expandedItems.has(`dashboards-${buildingId}`);
  const isSelected = selectedItem?.id === buildingId;

  // Only show if building is selected / Показва се само ако сградата е избрана
  if (!isSelected) return null;

  return (
    <div style={{ paddingLeft: '40px' }} className="py-2">
      <div
        className="px-4 py-2.5 text-xs font-medium text-[#75788B] uppercase tracking-wider cursor-pointer hover:bg-gray-50 rounded transition-colors flex items-center gap-2"
        onClick={() => toggleExpanded(`dashboards-${buildingId}`)}
      >
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-[90deg]' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        DASHBOARDS
      </div>
      {isExpanded && (
        <div className="px-4 py-4 mt-2 bg-white rounded-lg border border-gray-200 mx-4 mb-2">
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-24 h-24 bg-[#F3FBFF] rounded-lg flex items-center justify-center mb-4">
              <svg className="w-12 h-12 text-[#6BADDC]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <p className="text-sm font-normal text-[#75788B] text-center mb-4">
              You have not created any dashboards for your building
            </p>
            <button className="px-4 py-2 bg-gradient-to-r from-[#4AADEA] via-[#4AACEA] to-[#2871E9] text-white text-sm font-medium rounded-lg shadow-md hover:shadow-lg transition-shadow">
              + Add a new dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

DashboardsSection.displayName = 'DashboardsSection';

// Building item component / Компонент за сграда
const BuildingItem: React.FC<{ building: Building }> = React.memo(({ building }) => {
  const { selectedItem, expandedItems, toggleExpanded } = useAppStore();
  // Check if building has children / Проверява дали сградата има деца
  const hasChildren = !!(Array.isArray(building.floors) && building.floors.length > 0) || 
                      !!(Array.isArray(building.spaces) && building.spaces.length > 0) || 
                      !!(Array.isArray(building.rooms) && building.rooms.length > 0);
  const isExpanded = expandedItems.has(building.id);
  const isSelected = selectedItem?.id === building.id;
  
  return (
    <>
      <SidebarItem
        id={building.id}
        name={building.name}
        level={0}
        type="building"
        hasChildren={hasChildren}
      >
        {Array.isArray(building.floors) && building.floors.map((floor) => (
          <FloorItem key={floor.id} floor={floor} level={1} />
        ))}
        {Array.isArray(building.spaces) && building.spaces.map((space) => (
          <SpaceItem key={space.id} space={space} level={1} />
        ))}
        {Array.isArray(building.rooms) && building.rooms.map((room) => (
          <RoomItem key={room.id} room={room} level={1} />
        ))}
      </SidebarItem>
      {isExpanded && isSelected && <DashboardsSection buildingId={building.id} />}
    </>
  );
});

BuildingItem.displayName = 'BuildingItem';

// Main Sidebar component / Главен Sidebar компонент
export const Sidebar: React.FC = () => {
  const { buildings, viewMode, setViewMode, buildingsCollapsed, toggleBuildingsVisibility, sidebarOpen, toggleSidebar } = useAppStore();

  // Handle toggle buildings visibility / Обработва скриване/показване на сградите
  const handleToggleBuildings = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleBuildingsVisibility();
  };

  return (
    <div className={`
      fixed lg:static inset-y-0 left-0 z-50
      w-[280px] sm:w-[350px] lg:w-[492px] 
      bg-white border-r border-gray-200 
      flex flex-col h-screen
      transform transition-transform duration-300 ease-in-out
      ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
    `}>
      {/* Mobile close button / Бутон за затваряне на мобилния */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
        aria-label="Close menu"
      >
        <svg className="w-5 h-5 text-[#4A5057]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      {/* Header / Заглавна част */}
      <div className="px-4 sm:px-6 py-4 sm:py-6 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#6BADDC] rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white text-sm sm:text-lg font-bold leading-none">M</span>
          </div>
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl lg:text-[32px] font-medium text-[#4A5057] leading-tight">Enterprise</h1>
            <p className="text-sm sm:text-base lg:text-[20px] font-normal text-[#75788B] leading-tight mt-0.5">Buildings ({buildings.length})</p>
          </div>
        </div>
      </div>

      {/* Navigation / Навигация */}
      <div className="px-3 sm:px-4 py-3 sm:py-4 border-b border-gray-200 bg-[#F3FBFF]">
        <div className="flex gap-2">
          <button
            onClick={() => {
              setViewMode('buildings');
              toggleSidebar(); // Close sidebar on mobile after selection / Затваря sidebar на мобилни след избор
            }}
            className={`flex-1 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              viewMode === 'buildings'
                ? 'bg-gradient-to-r from-[#4AADEA] via-[#4AACEA] to-[#2871E9] text-white shadow-lg'
                : 'bg-white text-[#636363] hover:bg-gray-50 border border-gray-200'
            }`}
          >
            Buildings
          </button>
          <button
            onClick={() => {
              setViewMode('devices');
              toggleSidebar(); // Close sidebar on mobile after selection / Затваря sidebar на мобилни след избор
            }}
            className={`flex-1 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              viewMode === 'devices'
                ? 'bg-gradient-to-r from-[#4AADEA] via-[#4AACEA] to-[#2871E9] text-white shadow-lg'
                : 'bg-white text-[#636363] hover:bg-gray-50 border border-gray-200'
            }`}
          >
            Devices
          </button>
        </div>
      </div>

      {/* Buildings List / Списък със сгради */}
      <div className="flex-1 overflow-y-auto custom-scrollbar bg-white">
        <div className="py-2">
          <div className="px-4 py-2.5 flex items-center justify-between">
            <span className="text-xs font-medium text-[#75788B] uppercase tracking-wider">
              BUILDINGS & ASSETS
            </span>
            {buildings.length > 0 && (
              <button
                onClick={handleToggleBuildings}
                type="button"
                className="p-1.5 hover:bg-gray-100 rounded transition-colors flex items-center justify-center group"
                title={buildingsCollapsed ? 'Show all buildings' : 'Hide all buildings'}
                aria-label={buildingsCollapsed ? 'Show all buildings' : 'Hide all buildings'}
              >
                <svg
                  className={`w-4 h-4 text-[#75788B] group-hover:text-[#4A5057] transition-transform duration-200 ${buildingsCollapsed ? '' : 'rotate-[90deg]'}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>
          {!buildingsCollapsed && (
            <div>
              {buildings.map((building) => (
                <BuildingItem key={building.id} building={building} />
              ))}
            </div>
          )}

          {/* Integrations Section / Секция за интеграции */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="px-4 py-2.5">
              <div className="flex items-center gap-2 text-sm font-normal text-[#75788B]">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Integrations</span>
              </div>
            </div>
          </div>

          {/* Resources Section / Секция за ресурси */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="px-4 py-2.5 text-xs font-medium text-[#75788B] uppercase tracking-wider">
              RESOURCES
            </div>
            <div className="px-4 py-2.5">
              <div className="flex items-center gap-2 text-sm font-normal text-[#75788B] hover:text-[#4A5057] cursor-pointer transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Solutions</span>
              </div>
            </div>
            <div className="px-4 py-2.5">
              <div className="flex items-center gap-2 text-sm font-normal text-[#75788B] hover:text-[#4A5057] cursor-pointer transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                </svg>
                <span>LoRaWAN Resources</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* User Profile Section / Секция за потребителски профил */}
      <div className="border-t border-gray-200 bg-white px-4 py-4">
        <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors">
          <div className="w-10 h-10 bg-[#6BADDC] rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white text-sm font-medium">YN</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[#4A5057] truncate">Your Name</p>
          </div>
          <svg className="w-5 h-5 text-[#75788B] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
};
