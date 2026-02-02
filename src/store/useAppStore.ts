import { create } from 'zustand';
import { Building, Device, ViewMode, SelectedItem } from '../types';
import { fetchBuildingsData } from '../services/api';
import { collectDevicesFromBuilding, groupDevicesByType } from '../utils/dataTransformations';

// App state interface / Интерфейс за състоянието на приложението
interface AppState {
  // Data / Данни
  buildings: Building[];
  allDevices: Device[];
  deviceGroups: ReturnType<typeof groupDevicesByType>;
  
  // UI State / Състояние на UI
  viewMode: ViewMode;
  selectedItem: SelectedItem | null;
  expandedItems: Set<string>;
  buildingsCollapsed: boolean;
  sidebarOpen: boolean; // Mobile sidebar state / Състояние на мобилния sidebar
  
  // Loading & Error / Зареждане и грешки
  isLoading: boolean;
  error: string | null;

  // Actions / Действия
  fetchData: () => Promise<void>;
  setViewMode: (mode: ViewMode) => void;
  setSelectedItem: (item: SelectedItem | null) => void;
  toggleExpanded: (id: string) => void;
  setExpanded: (id: string, expanded: boolean) => void;
  expandAllBuildings: () => void;
  collapseAllBuildings: () => void;
  toggleBuildingsVisibility: () => void;
  toggleSidebar: () => void; // Toggle mobile sidebar / Превключва мобилния sidebar
}

export const useAppStore = create<AppState>((set, get) => ({
  buildings: [],
  allDevices: [],
  deviceGroups: [],
  viewMode: 'buildings',
  selectedItem: null,
  expandedItems: new Set<string>(),
  buildingsCollapsed: false,
  sidebarOpen: false, // Mobile sidebar closed by default / Мобилният sidebar е затворен по подразбиране
  isLoading: false,
  error: null,

  // Fetch data from API / Зарежда данни от API
  fetchData: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetchBuildingsData();
      
      // Validate response structure / Валидира структурата на отговора
      if (!response || !Array.isArray(response.buildings)) {
        throw new Error('Invalid API response: buildings array not found');
      }

      const allDevices: Device[] = [];
      
      // Collect all devices from all buildings / Събира всички устройства от всички сгради
      response.buildings.forEach((building) => {
        const devices = collectDevicesFromBuilding(building);
        allDevices.push(...devices);
      });

      // Group devices by type / Групира устройства по тип
      const deviceGroups = groupDevicesByType(allDevices);

      set({
        buildings: response.buildings,
        allDevices,
        deviceGroups,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch data',
      });
    }
  },

  setViewMode: (mode) => set({ viewMode: mode }),

  setSelectedItem: (item) => set({ selectedItem: item }),

  toggleExpanded: (id) => {
    const { expandedItems } = get();
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    set({ expandedItems: newExpanded });
  },

  setExpanded: (id, expanded) => {
    const { expandedItems } = get();
    const newExpanded = new Set(expandedItems);
    if (expanded) {
      newExpanded.add(id);
    } else {
      newExpanded.delete(id);
    }
    set({ expandedItems: newExpanded });
  },

  // Expand all buildings / Разгъва всички сгради
  expandAllBuildings: () => {
    const state = get();
    const newExpanded = new Set(state.expandedItems);
    state.buildings.forEach((building) => {
      newExpanded.add(building.id);
    });
    set({ expandedItems: newExpanded });
  },

  // Collapse all buildings / Сгъва всички сгради
  collapseAllBuildings: () => {
    const state = get();
    const newExpanded = new Set(state.expandedItems);
    state.buildings.forEach((building) => {
      newExpanded.delete(building.id);
    });
    set({ expandedItems: newExpanded });
  },

  // Toggle buildings visibility / Превключва видимостта на сградите
  toggleBuildingsVisibility: () => {
    const { buildingsCollapsed } = get();
    set({ buildingsCollapsed: !buildingsCollapsed });
  },

  // Toggle mobile sidebar / Превключва мобилния sidebar
  toggleSidebar: () => {
    const { sidebarOpen } = get();
    set({ sidebarOpen: !sidebarOpen });
  },
}));
