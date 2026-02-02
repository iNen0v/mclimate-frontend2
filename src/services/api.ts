import { ApiResponse } from '../types';

// API endpoint URL / URL на API endpoint
const API_URL = 'https://frontend-interview-mock-data.s3.eu-central-1.amazonaws.com/mock-buildings-devices.json';

/**
 * Fetch buildings data from API
 * Зарежда данни за сгради от API
 */
export async function fetchBuildingsData(): Promise<ApiResponse> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`Failed to fetch buildings data: ${response.statusText}`);
  }

  const data = await response.json();
  
  // Validate the response structure / Валидира структурата на отговора
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid API response: expected an object');
  }
  
  // Ensure buildings is an array / Уверява се че buildings е масив
  // Handle both {buildings: []} and direct array responses / Обработва и {buildings: []} и директни масивни отговори
  if (Array.isArray(data)) {
    return { buildings: data };
  }
  
  if (!Array.isArray(data.buildings)) {
    throw new Error('Invalid API response: buildings must be an array');
  }
  
  return data as ApiResponse;
}
