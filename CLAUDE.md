# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Starting Development Server
```bash
yarn dev
# or
npm run dev
```
The dev server runs on port 8080 by default.

### Building and Deployment
```bash
yarn build
# or
npm run build
```

### Code Quality
```bash
# Linting
yarn lint
# or
npm run lint

# Code formatting
yarn format
# or
npm run format
```

### Dependencies
```bash
# Install dependencies
yarn
# or
npm install
```

## Project Architecture

### Technology Stack
- **Framework**: Vue 3 with Composition API
- **UI Framework**: Quasar Framework
- **Build Tool**: Vite
- **State Management**: Pinia stores
- **Routing**: Vue Router 4
- **Maps**: Leaflet with Vue-Leaflet
- **Charts**: ApexCharts with Vue3-ApexCharts
- **HTTP Client**: Axios
- **Internationalization**: Vue I18n
- **Styling**: SCSS with PostCSS

### Module-Based Architecture
The application follows a modular architecture with domain-specific modules:

- **`src/modules/`**: Feature modules organized by domain
  - `auth/`: Authentication and authorization
  - `dashboard/`: Executive dashboard views
  - `liveMap/`: Real-time mapping functionality
  - `trip-management/`: Trip management with its own API, store, types, and views

- **`src/components/`**: Reusable UI components
  - `shared/`: Common components (FleetTable, FleetBreadcrumbs, modals, etc.)
  - `adminRegulator/`: Admin-specific components
  - `transportCompany/`: Transport company specific components with nested domain structure

### Store Architecture
- **Pinia** for state management with composition API pattern
- Stores follow the pattern: `useXStore` (e.g., `useTripsStore`, `useAuthStore`)
- Store structure includes reactive state with `ref()`, computed getters, and action functions
- Each module can have its own store (e.g., `trip.store.ts` in trip-management module)

### Routing Structure
- **Multi-layout approach**: AuthLayout, MainLayout, AdminLayout
- **Route prefixes**:
  - `/transport-company/`: Transport company features
  - `/admin-regulator/`: Admin regulator features
  - Root `/`: Authentication pages

### API Integration
- **Proxy configuration**: Development server proxies `/api/` requests to `https://saas-stage.wiot360.com/`
- **Module-specific APIs**: Each module can have its own API layer (e.g., `trip.api.ts`)
- **HTTP service**: Centralized HTTP service in `src/helpers/httpService.ts`

### Component Organization
- **Shared components**: Reusable across the application
- **Domain-specific components**: Organized under feature domains
- **Nested component structure**: Complex features have nested component hierarchies

### Development Configuration
- **TypeScript**: Strict mode enabled
- **ESLint**: Flat config with Vue and TypeScript support
- **Development port**: 8080
- **Environment variables**: Support for VITE_ prefixed environment variables
- **Hot reload**: Enabled in development mode

### Key Conventions
- Use Composition API with `<script setup>` syntax
- TypeScript interfaces and types are defined in dedicated type files
- SCSS styling with custom color variables in `fleet_colors.scss`
- i18n support with language files in `src/i18n/`
- Leaflet maps integration through boot file configuration