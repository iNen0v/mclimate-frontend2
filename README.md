# Enterprise by MClimate

Smart building management dashboard built with React, TypeScript, and Tailwind CSS.

## What is this?

This is a dashboard app for managing buildings and IoT devices. It can handle a lot of data - around 200-300 buildings and 300,000+ devices. The UI is based on a Figma design and uses Tailwind CSS for styling.

## Tech Stack

- **React 18** with TypeScript
- **Create React App** for building
- **Zustand** for state management (I chose it because it's simple and doesn't need a lot of boilerplate)
- **Tailwind CSS** for styling
- **react-window** for virtualization (needed for the huge device lists)

## How to Run

1. Install dependencies:
```bash
npm install
```

2. Start the dev server:
```bash
npm start
```

The app will open at `http://localhost:3000`

3. Build for production:
```bash
npm run build
```

## Project Structure

```
src/
├── components/          # React components
│   ├── Sidebar.tsx     # Left sidebar with buildings
│   ├── BuildingsList.tsx # Main buildings view
│   ├── DevicesTable.tsx  # Devices grouped by type
│   ├── LoadingState.tsx  # Loading spinner
│   ├── ErrorState.tsx    # Error message
│   └── EmptyState.tsx    # Empty state
├── store/              # Zustand store
│   └── useAppStore.ts  # Global state
├── services/           # API calls
│   └── api.ts         # Fetch data from API
├── utils/              # Helper functions
│   └── dataTransformations.ts # Process data
├── types/              # TypeScript types
│   └── index.ts       # Type definitions
└── App.tsx            # Main component
```

## Design System

I tried to match the Figma design as closely as possible:

- **Font**: Fira Sans from Google Fonts
- **Colors**: Used exact hex values from Figma (like `#6BADDC` for primary, `#F8FAFF` for background)
- **Spacing**: Used Tailwind arbitrary values to match exact sizes (e.g., `text-[48px]`, `w-[492px]`)
- **Sidebar**: Fixed width of 492px
- **Cards**: Rounded corners with `rounded-[14px]`

## Features

- **Buildings List**: Shows all buildings with stats (floors, rooms, devices, online devices)
- **Sidebar**: Hierarchical navigation (buildings → floors → spaces → rooms)
- **Devices Table**: All devices grouped by type, with virtualization for performance
- **Loading/Error States**: Proper handling of loading and errors

## Performance

Since we're dealing with 300,000+ devices, I had to optimize:

1. **React.memo**: Used on expensive components to prevent re-renders
2. **useMemo**: Memoized calculations like building stats and device counts
3. **react-window**: Virtualized the device tables so only visible rows are rendered
4. **Pre-computation**: All data processing happens once when data is fetched, then stored in Zustand

The app should handle the large dataset smoothly. Initial load takes 2-3 seconds (depends on API), but after that everything is fast.

## API

The app fetches data from:
```
GET https://frontend-interview-mock-data.s3.eu-central-1.amazonaws.com/mock-buildings-devices.json
```

The response has a nested structure:
- Buildings can have floors, spaces, rooms, and devices
- Floors can have spaces, rooms, and devices
- Spaces can have rooms and devices
- Rooms can have nested rooms and devices

Devices can exist at any level of this hierarchy.

## What I Did

1. **State Management**: Used Zustand because it's simple and works well with TypeScript. I considered Redux but it's too much boilerplate for this project.

2. **Virtualization**: Used react-window for the device tables. Without it, rendering 300k devices would crash the browser.

3. **Data Processing**: Created utility functions to recursively collect devices from the nested structure and group them by type.

4. **Styling**: Used Tailwind CSS with arbitrary values to match the Figma design exactly. All colors and sizes are from the design specs.

5. **Component Structure**: Separated concerns - UI components, business logic (in utils), and data fetching (in services).

## What Could Be Better

If I had more time, I would:

1. **Add search/filter**: Debounced search for buildings and devices, filters by type/status
2. **Pagination**: For buildings list if it grows beyond 300 items
3. **Responsive design**: Make sidebar collapsible on mobile
4. **Skeleton loaders**: Instead of spinner, show skeleton screens while loading
5. **Error handling**: Better error messages and retry logic
6. **Testing**: Add unit tests for utilities and component tests
7. **Accessibility**: Add ARIA labels and keyboard navigation

## Production Considerations

If this was going to production, I would:

1. **Split the API**: Instead of one huge endpoint, have separate endpoints for buildings list, building details, and devices
2. **Add pagination**: Load buildings in chunks, not all at once
3. **Caching**: Cache API responses, use React Query or SWR for better caching
4. **Code splitting**: Lazy load components to reduce initial bundle size
5. **WebSockets**: For real-time device status updates
6. **Error tracking**: Add Sentry or similar for error monitoring

## Known Issues

- The API returns all data at once, which can be slow on slow connections
- No search/filter functionality yet
- Sidebar is fixed width - could be made responsive
- No pagination for buildings (but 200-300 items is manageable)

## Browser Support

Works on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This is a project for MClimate interview task.
