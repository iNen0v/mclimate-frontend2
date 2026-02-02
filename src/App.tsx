import React, { useEffect } from 'react';
import { useAppStore } from './store/useAppStore';
import { Sidebar } from './components/Sidebar';
import { BuildingsList } from './components/BuildingsList';
import { DevicesTable } from './components/DevicesTable';
import { LoadingState } from './components/LoadingState';
import { ErrorState } from './components/ErrorState';

// Main App component / Главен App компонент
function App() {
  const { viewMode, isLoading, error, fetchData } = useAppStore();

  // Fetch data on mount / Зарежда данни при монтиране
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Render main content based on state / Рендира основното съдържание според състоянието
  const renderMainContent = () => {
    if (isLoading) {
      return <LoadingState />;
    }

    if (error) {
      return <ErrorState message={error} onRetry={fetchData} />;
    }

    // Show buildings or devices view / Показва изглед за сгради или устройства
    return viewMode === 'buildings' ? <BuildingsList /> : <DevicesTable />;
  };

  const { sidebarOpen, toggleSidebar } = useAppStore();

  return (
    <div className="flex h-screen bg-[#F8FAFF] relative">
      {/* Mobile overlay / Мобилен overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar / Sidebar */}
      <Sidebar />
      
      {/* Main content / Основно съдържание */}
      <main className="flex-1 overflow-y-auto custom-scrollbar bg-[#F8FAFF] w-full lg:w-auto">
        {/* Mobile menu button / Бутон за мобилно меню */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6 text-[#4A5057]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        {renderMainContent()}
      </main>
    </div>
  );
}

export default App;
