# Belediye Envanter Sistemi - Frontend Development Guidelines

## Project Overview
- **Type**: Single Page Application (SPA) for municipal inventory management
- **Framework**: React with TypeScript and tailwind for frontend
- **Backend**: .NET Core providing web services through RESTful APIs
- **Languages**: Development in English, UI in Turkish
- **Target Users**: Municipality staff, department managers, and inventory administrators
- **HTTP Client**: Always use Axios for API requests and data fetching
- **Charts**: Always use Chart.js for all data visualization needs

## Architecture & Structure

### Design Approach
- Mobile-first responsive design for field staff access
- Support for dark and light themes with consistent color variables
- Layout consists of sidebar (left) and navbar (top)
- Consistent spacing and component sizing throughout the application

### Directory Structure
- `/components`: Reusable UI components organized by function
  - `/components/common`: Shared components (buttons, cards, etc.)
  - `/components/dialogs`: Shared dialogs (alert, input,etc.)
  - `/components/forms`: Form-related components
  - `/components/layout`: Layout-related components
  - `/components/tables`: Table and list components
  - `/components/charts`: Chart components based on Chart.js
- `/pages`: Main application pages/views organized by feature
- `/models`: TypeScript interfaces and types for API communication
- `/services`: API services with TypeScript typing and Axios
- `/utils`: Helper functions and utilities
- `/hooks`: React custom hooks for shared logic
- `/context`: React context providers for state management
- `/assets`: Static assets (images, icons, etc.)
- `/constants`: Application constants and enums
- `/styles`: Global styles and theme definitions

## Naming Conventions

### General
- Use **English** for all code, comments, variable names, and functions
- Use **Turkish** for all user-facing content and URL paths
- Never mix languages within the same identifier

### TypeScript Guidelines
- Always define explicit types instead of using `any`
- Use interfaces for object shapes that represent entities
- Use type aliases for unions, primitives, and other types
- Use readonly for immutable properties
- Follow the pattern: `interface EntityName { ... }`
- Prefer type inference where it makes code clearer

### Components
- PascalCase for component names: `InventoryList.tsx`, `AssetDetail.tsx`
- Props should follow this pattern: `interface ComponentNameProps { ... }`
- State interfaces should follow: `interface ComponentNameState { ... }`
- Include proper JSDoc comments for all components

### Files
- Components: PascalCase with `.tsx` extension (`UserProfile.tsx`)
- Services: camelCase with "Service" suffix (`inventoryService.ts`)
- Models: PascalCase (`InventoryItemModel.ts`, `DepartmentModel.ts`)
- Utilities: camelCase (`formatCurrency.ts`, `dateHelpers.ts`)
- Hooks: camelCase with "use" prefix (`useInventoryData.ts`)
- Context: PascalCase with "Context" suffix (`InventoryContext.tsx`)

## UI/UX Guidelines

### Theme Support
- Use the `ThemeContext` for accessing current theme
- Access theme with `useTheme()` hook
- Use CSS variables defined in `styles/theme.css`
- All components must support both dark and light modes
- Test all components in both themes before completion

### Municipal Branding
- Use the municipality's primary and secondary colors as defined in the theme
- Maintain consistent header and footer styling across all pages
- Include the municipality logo in appropriate locations
- Follow accessibility guidelines for text and interactive elements

### Icon Usage
- Use Heroicons (@heroicons/react) package for all icons in the application
- Import icons from the appropriate style collection:
  ```typescript
  import { BeakerIcon } from '@heroicons/react/24/solid'; // Solid style
  import { BeakerIcon } from '@heroicons/react/24/outline'; // Outline style
  ```
- Use icons consistently throughout the application
- Use appropriate sizing through Tailwind classes:
  ```tsx
  <BeakerIcon className="h-6 w-6 text-blue-500" /> // Fixed size with color
  <BeakerIcon className="size-6 text-blue-500" /> // Using size shorthand
  ```
- Apply different colors to icons using Tailwind text-color classes
- For icon buttons, ensure proper accessibility by adding aria-label attributes

### Mobile-First Approach
- Design all components mobile-first, then scale up
- Use provided responsive breakpoints:
  ```css
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  ```
- Test on various screen sizes using browser dev tools
- Ensure proper touch target sizing for mobile users (min 44×44px)

### Component Guidelines
- Create atomic, reusable components
- Maintain consistent padding and margin using theme spacing variables
- Use standardized form controls from `/components/forms`
- Implement proper loading, error, and empty states for all data-driven components

## Authentication & Authorization

### User Information
- User data is fetched from `/api/auth/info`
- User roles are available as an array under the `roles` property
- Store user information in `AuthContext`
- Always check role permissions using the `hasPermission(roleOrRoles)` utility

### Role-Based Access Control
- Municipal roles include: 'admin', 'inventoryManager', 'departmentManager', 'user'
- Sidebar menu items must be filtered based on user roles
- Use the `<ProtectedRoute>` component for route-level protection
- Always check permissions before showing action buttons or sensitive data

## Domain-Specific Concepts

### Inventory Management
- Assets (`Varlik`): Physical items tracked in the inventory
- Departments (`Birim`): Municipal departments that own assets
- Locations (`Konum`): Physical locations where assets are stored
- Categories (`Kategori`): Classification of assets
- Transactions (`Islem`): Records of asset movements, additions, or disposals

### Key Operations
- Asset check-in and check-out
- Asset transfers between departments
- Inventory counts and reconciliation
- Maintenance scheduling and tracking
- Procurement and disposal workflows

## API Communication

### API Client Configuration
- Use Axios for all HTTP requests
- Configure a centralized API client with common settings:
  ```typescript
  // apiClient.ts
  import axios from 'axios';
  
  export const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL || '/api',
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
    }
  });
  
  // Request interceptor for adding auth token
  apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  });
  
  // Response interceptor for error handling
  apiClient.interceptors.response.use(
    response => response,
    error => {
      // Handle common errors (401, 403, etc.)
      if (error.response?.status === 401) {
        // Handle unauthorized access
      }
      return Promise.reject(error);
    }
  );
  ```

### Services
- Create service classes following the pattern:
  ```typescript
  import { apiClient } from '../utils/apiClient';
  
  export class EntityNameService {
    private baseUrl = '/api/route';
    
    async getAll(): Promise<EntityName[]> {
      try {
        const response = await apiClient.get<EntityName[]>(this.baseUrl);
        return response.data;
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
      }
    }
    
    async getById(id: number): Promise<EntityName> { ... }
    async create(entity: EntityNameDto): Promise<EntityName> { ... }
    async update(id: number, entity: EntityNameDto): Promise<EntityName> { ... }
    async delete(id: number): Promise<void> { ... }
  }
  ```
- Use consistent error handling pattern with try/catch
- Implement loading state management
- Use TypeScript typing for all requests and responses

### Models
- Define complete interfaces for all API data structures
- Distinguish between read models and write models (DTOs)
- Use consistent naming patterns:
  ```typescript
  // Read model
  export interface Asset {
    id: number;
    name: string;
    // other properties
  }
  
  // Write model
  export interface AssetCreateDto {
    name: string;
    // other properties without id
  }
  
  export interface AssetUpdateDto {
    name?: string;
    // other optional properties
  }
  ```

## Data Visualization

### Chart.js Integration
- Use Chart.js for all charts and data visualizations
- Create reusable chart components in the `/components/charts` directory
- Always provide proper TypeScript types for chart data and options
- Support both light and dark themes for all charts
- Include loading states and empty states for all chart components

### Chart Component Guidelines
- Follow this pattern for chart components:
  ```typescript
  import React, { useRef, useEffect } from 'react';
  import { Chart, ChartData, ChartOptions } from 'chart.js';
  
  interface ChartNameProps {
    data: ChartData;
    options?: ChartOptions;
    height?: number | string;
    width?: number | string;
    className?: string;
  }
  
  export const ChartName: React.FC<ChartNameProps> = ({
    data,
    options = {},
    height = 300,
    width = '100%',
    className = '',
  }) => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<Chart | null>(null);
    
    useEffect(() => {
      if (!chartRef.current) return;
      
      // Initialize or update chart
      if (chartInstance.current) {
        chartInstance.current.data = data;
        chartInstance.current.update();
      } else {
        chartInstance.current = new Chart(chartRef.current, {
          type: 'bar', // or line, pie, etc.
          data,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            ...options
          }
        });
      }
      
      // Cleanup on unmount
      return () => {
        if (chartInstance.current) {
          chartInstance.current.destroy();
          chartInstance.current = null;
        }
      };
    }, [data, options]);
    
    return (
      <div 
        className={`chart-container ${className}`}
        style={{ height, width }}
      >
        <canvas ref={chartRef} />
      </div>
    );
  };
  ```

### Chart Data Hooks
- Create custom hooks for fetching and formatting chart data:
  ```typescript
  import { useState, useEffect } from 'react';
  import { apiClient } from '../utils/apiClient';
  
  export function useChartData<T>(url: string, interval = 0) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await apiClient.get(url);
          setData(response.data);
          setError(null);
        } catch (err) {
          setError(err instanceof Error ? err : new Error('Unknown error'));
          console.error('Chart data fetch error:', err);
        } finally {
          setLoading(false);
        }
      };
      
      fetchData();
      
      // Set up polling if interval > 0
      let timerId: number | null = null;
      if (interval > 0) {
        timerId = window.setInterval(fetchData, interval);
      }
      
      return () => {
        if (timerId !== null) {
          clearInterval(timerId);
        }
      };
    }, [url, interval]);
    
    return { data, loading, error };
  }
  ```

## URL and Routing

- Use Turkish language for route paths
  - `/varliklar` instead of `/assets`
  - `/birimler` instead of `/departments`
- Organize routes hierarchically:
  - `/varliklar` - list view
  - `/varliklar/:id` - detail view
  - `/varliklar/ekle` - create view
  - `/varliklar/:id/duzenle` - edit view
- Implement lazy loading using React.lazy and Suspense
- Use consistent route parameters across similar features
- Implement proper route guards based on user permissions

## State Management

### Global State
- Use the Context API for global state management
- Separate contexts by domain:
  - `AuthContext`: User authentication and role information
  - `ThemeContext`: Theme preferences
  - `NotificationContext`: System messages and alerts
- Follow the pattern:
  ```tsx
  export const SomeContext = createContext<SomeContextType | undefined>(undefined);
  export const SomeProvider: React.FC<PropsWithChildren> = ({ children }) => {
    // state and handlers
    return (
      <SomeContext.Provider value={contextValue}>
        {children}
      </SomeContext.Provider>
    );
  }
  export const useSomeContext = () => {
    const context = useContext(SomeContext);
    if (context === undefined) {
      throw new Error('useSomeContext must be used within a SomeProvider');
    }
    return context;
  }
  ```

### Local State
- Use React hooks for component-level state
- Extract complex state logic into custom hooks
- Use reducer pattern for complex state transitions
- Maintain consistent state structure across similar components

## Error Handling

### API Errors
- Handle all API errors with appropriate user feedback
- Use the notification system for displaying errors
- Log detailed errors to the console in development mode
- Implement consistent error boundary components

### Form Validation
- Use consistent validation approach across all forms
- Provide clear, user-friendly error messages in Turkish
- Validate both client-side and server-side
- Use the same validation visual style throughout the application

## Internationalization

- Keep all user-visible text in Turkish
- Organize text by feature area
- Format dates according to Turkish locale (DD.MM.YYYY)
- Format numbers according to Turkish locale (using comma as decimal separator)
- Format currency as TRY with the symbol ₺

## Coding Standards

### TypeScript Best Practices
- Enable strict mode in TypeScript configuration
- Avoid using `any` type
- Use type guards for narrowing types
- Prefer interfaces for object types and type aliases for unions
- Use readonly modifier for immutable properties
- Document complex types with JSDoc comments

### Component Structure
- Follow consistent component structure:
  ```tsx
  // Imports grouped by external, internal, and styles
  import React, { useState, useEffect } from 'react';
  import { useNavigate } from 'react-router-dom';
  
  import { useAuth } from '../hooks/useAuth';
  import { AssetService } from '../services/assetService';
  
  import './ComponentName.css';
  
  // Interface definitions
  interface ComponentProps {
    // props definition
  }
  
  // Component definition
  export const ComponentName: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
    // hooks
    // state management
    // effects
    // event handlers
    
    // rendering helpers
    
    return (
      <div className="component-name">
        {/* component content */}
      </div>
    );
  };
  ```

### Testing Guidelines
- Write tests for all components and utility functions
- Test both success and error paths
- Mock external dependencies and services
- Test responsive behavior where applicable
- Ensure tests pass in CI/CD pipeline before merging

## Examples

### Model Example:
```typescript
// Asset model representing a municipal inventory item
export interface Asset {
  id: number;
  inventoryNumber: string;
  name: string;
  description: string;
  categoryId: number;
  departmentId: number;
  locationId: number;
  acquisitionDate: string;
  acquisitionCost: number;
  status: AssetStatus;
  lastInventoryCount: string;
  isActive: boolean;
}

export enum AssetStatus {
  Available = 'available',
  InUse = 'inUse',
  UnderMaintenance = 'underMaintenance',
  Disposed = 'disposed'
}

export interface AssetCreateDto {
  inventoryNumber: string;
  name: string;
  description: string;
  categoryId: number;
  departmentId: number;
  locationId: number;
  acquisitionDate: string;
  acquisitionCost: number;
}

export interface AssetUpdateDto {
  name?: string;
  description?: string;
  categoryId?: number;
  departmentId?: number;
  locationId?: number;
  status?: AssetStatus;
}
```

### Service Example with Axios:
```typescript
import { Asset, AssetCreateDto, AssetUpdateDto } from '../models/Asset';
import { apiClient } from '../utils/apiClient';

export class AssetService {
  private baseUrl = '/api/varliklar';
  
  async getAll(): Promise<Asset[]> {
    try {
      const response = await apiClient.get<Asset[]>(this.baseUrl);
      return response.data;
    } catch (error) {
      console.error('Error fetching assets:', error);
      throw error;
    }
  }
  
  async getById(id: number): Promise<Asset> {
    try {
      const response = await apiClient.get<Asset>(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching asset ${id}:`, error);
      throw error;
    }
  }
  
  async create(asset: AssetCreateDto): Promise<Asset> {
    try {
      const response = await apiClient.post<Asset>(this.baseUrl, asset);
      return response.data;
    } catch (error) {
      console.error('Error creating asset:', error);
      throw error;
    }
  }
  
  async update(id: number, asset: AssetUpdateDto): Promise<Asset> {
    try {
      const response = await apiClient.put<Asset>(`${this.baseUrl}/${id}`, asset);
      return response.data;
    } catch (error) {
      console.error(`Error updating asset ${id}:`, error);
      throw error;
    }
  }
  
  async delete(id: number): Promise<void> {
    try {
      await apiClient.delete(`${this.baseUrl}/${id}`);
    } catch (error) {
      console.error(`Error deleting asset ${id}:`, error);
      throw error;
    }
  }
}
```

### Chart Component Example:
```tsx
import React, { useRef, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
import { useTheme } from '../../hooks/useTheme';

// Register all Chart.js components
Chart.register(...registerables);

interface AssetPieChartProps {
  data: {
    labels: string[];
    values: number[];
  };
  title?: string;
  height?: number;
}

export const AssetPieChart: React.FC<AssetPieChartProps> = ({ data, title, height = 300 }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  const { theme } = useTheme();
  
  // Colors for different themes
  const colors = {
    light: {
      backgroundColor: [
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 99, 132, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)',
      ],
      borderColor: [
        'rgba(54, 162, 235, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
      ],
      textColor: '#333'
    },
    dark: {
      backgroundColor: [
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 99, 132, 0.7)',
        'rgba(255, 206, 86, 0.7)',
        'rgba(75, 192, 192, 0.7)',
        'rgba(153, 102, 255, 0.7)',
      ],
      borderColor: [
        'rgba(54, 162, 235, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
      ],
      textColor: '#fff'
    }
  };
  
  const currentColors = theme === 'dark' ? colors.dark : colors.light;
  
  useEffect(() => {
    if (!chartRef.current) return;
    
    // Destroy existing chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    
    // Create new chart instance
    chartInstance.current = new Chart(chartRef.current, {
      type: 'pie',
      data: {
        labels: data.labels,
        datasets: [{
          data: data.values,
          backgroundColor: currentColors.backgroundColor,
          borderColor: currentColors.borderColor,
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: currentColors.textColor
            }
          },
          title: {
            display: !!title,
            text: title || '',
            color: currentColors.textColor
          }
        }
      }
    });
    
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, [data, theme, title]);
  
  return (
    <div style={{ height: `${height}px` }}>
      <canvas ref={chartRef} />
    </div>
  );
};
```

### Component Example:
```tsx
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';
import { Button } from './common/Button';
import { MenuItem } from './common/MenuItem';

interface SidebarProps {
  closeSidebar: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ closeSidebar }) => {
  const navigate = useNavigate();
  const { user, hasPermission } = useAuth();
  
  const menuItems = useMemo(() => {
    const items = [
      {
        id: 'dashboard',
        label: 'Gösterge Paneli',
        path: '/',
        icon: 'dashboard',
        permission: ['user', 'departmentManager', 'inventoryManager', 'admin']
      },
      {
        id: 'assets',
        label: 'Varlıklar',
        path: '/varliklar',
        icon: 'inventory',
        permission: ['user', 'departmentManager', 'inventoryManager', 'admin']
      },
      {
        id: 'departments',
        label: 'Birimler',
        path: '/birimler',
        icon: 'department',
        permission: ['departmentManager', 'inventoryManager', 'admin']
      },
      {
        id: 'transactions',
        label: 'İşlemler',
        path: '/islemler',
        icon: 'transaction',
        permission: ['inventoryManager', 'admin']
      },
      {
        id: 'reports',
        label: 'Raporlar',
        path: '/raporlar',
        icon: 'report',
        permission: ['departmentManager', 'inventoryManager', 'admin']
      },
      {
        id: 'settings',
        label: 'Ayarlar',
        path: '/ayarlar',
        icon: 'settings',
        permission: ['admin']
      }
    ];
    
    // Filter items based on user permissions
    return items.filter(item => 
      user && hasPermission(item.permission)
    );
  }, [user, hasPermission]);
  
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1 className="sidebar-title">Envanter Sistemi</h1>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map(item => (
          <MenuItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            path={item.path}
            onClick={() => {
              navigate(item.path);
              closeSidebar();
            }}
          />
        ))}
      </nav>
      
      <div className="sidebar-footer">
        <span className="sidebar-version">v1.0.0</span>
      </div>
    </aside>
  );
};
```
