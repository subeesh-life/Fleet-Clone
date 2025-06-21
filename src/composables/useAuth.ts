import { ref, computed, readonly } from 'vue';
import type { Ref, ComputedRef } from 'vue';

// Types
interface TokenPayload {
  uuid: string;
  iss: string;
  aud: string;
  branch: number;
  user_relation_uuid: string;
  station: number;
  portal: string;
  portal_id: number;
  portal_uuid: string;
  user_id: number;
  key: string;
  user_type: string;
  email: string;
  base_user_uuid: string;
  services: string;
  first_name: string;
  last_name: string;
  address: string;
  country: string;
  phone: string[];
  is_owner: boolean;
  portal_timezone: string | null;
  portal_country: string | null;
  timezone: string;
  image: string;
  actual_departments: string[];
  user_uuid: string;
  tpc_portal_id: number;
  admin_portal_id: number | null;
  admin_type: string | null;
  superadmin_portal_id: number | null;
  superadmin_type: string | null;
  root_department: string;
  admin_department: string | null;
  gender: number;
  position_name: string;
  client: string;
  ip: string;
  agent: string;
  iat: number;
  exp: number;
  [key: string]: any;
}

interface Permission {
  id: number;
  portal: string;
  module: string;
  code: string;
  view: Record<string, string>[];
  edit: Record<string, string>[];
  delete: Record<string, string>[];
  create: Record<string, string>[];
  feature: string;
  created_by: number;
  updated_by: number;
  createdAt: string;
  updatedAt: string;
}

interface UserRoleAccess {
  [key: string]: boolean;
}

interface AuthResponse {
  access_token: string;
  refresh_token: string;
  access: Permission[];
  user_role_access: UserRoleAccess;
}

// Constants
const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const PERMISSIONS_KEY = 'user_permissions';
const ROLE_ACCESS_KEY = 'user_role_access';

// State
const accessToken = ref<string | null>(null);
const refreshToken = ref<string | null>(null);
const user = ref<TokenPayload | null>(null);
const permissions = ref<Permission[]>([]);
const roleAccess = ref<UserRoleAccess>({});

// Computed
const isAuthenticated = computed(() => !!accessToken.value && !!user.value);
const isTokenExpired = computed(() => {
  if (!user.value?.exp) return true;
  return Date.now() >= user.value.exp * 1000;
});

// Helper functions
const parseJwt = (token: string): TokenPayload | null => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url?.replace(/-/g, '+').replace(/_/g, '/');

    if (!base64) {
      console.error('Invalid JWT token format');
      return null;
    }

    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error parsing JWT:', error);
    return null;
  }
};

const saveToStorage = (data: AuthResponse) => {
  try {
    localStorage.setItem(ACCESS_TOKEN_KEY, data.access_token);
    localStorage.setItem(REFRESH_TOKEN_KEY, data.refresh_token);
    localStorage.setItem(PERMISSIONS_KEY, JSON.stringify(data.access));
    localStorage.setItem(ROLE_ACCESS_KEY, JSON.stringify(data.user_role_access));
  } catch (error) {
    console.error('Error saving to storage:', error);
  }
};

const loadFromStorage = () => {
  try {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    const refresh = localStorage.getItem(REFRESH_TOKEN_KEY);
    const perms = localStorage.getItem(PERMISSIONS_KEY);
    const roles = localStorage.getItem(ROLE_ACCESS_KEY);

    if (token) {
      accessToken.value = token;
      refreshToken.value = refresh;
      user.value = parseJwt(token);

      if (perms) permissions.value = JSON.parse(perms);
      if (roles) roleAccess.value = JSON.parse(roles);
    }
  } catch (error) {
    console.error('Error loading from storage:', error);
    clearAuth();
  }
};

const clearStorage = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(PERMISSIONS_KEY);
  localStorage.removeItem(ROLE_ACCESS_KEY);
};

// Main functions
const setAuthorization = (response: AuthResponse) => {
  accessToken.value = response.access_token;
  refreshToken.value = response.refresh_token;
  user.value = parseJwt(response.access_token);
  permissions.value = response.access;
  roleAccess.value = response.user_role_access;

  saveToStorage(response);
};

const logout = () => {
  clearAuth();
};

const clearAuth = () => {
  accessToken.value = null;
  refreshToken.value = null;
  user.value = null;
  permissions.value = [];
  roleAccess.value = {};
  clearStorage();
};

const updateTokens = (newAccessToken: string, newRefreshToken?: string) => {
  accessToken.value = newAccessToken;
  user.value = parseJwt(newAccessToken);

  if (newRefreshToken) {
    refreshToken.value = newRefreshToken;
  }

  // Update storage
  localStorage.setItem(ACCESS_TOKEN_KEY, newAccessToken);
  if (newRefreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, newRefreshToken);
  }
};

// Permission helpers
const hasPermission = (code: string, action: 'view' | 'create' | 'update' | 'delete'): boolean => {
  const key = `${code}.${action}`;
  return roleAccess.value[key] === true;
};

const hasModuleAccess = (moduleCode: string): boolean => {
  return permissions.value.some(p => p.code === moduleCode);
};

const getModulePermissions = (moduleCode: string): Permission | undefined => {
  return permissions.value.find(p => p.code === moduleCode);
};

const canPerformAction = (
  moduleCode: string,
  action: 'view' | 'create' | 'update' | 'delete'
): boolean => {
  return hasPermission(moduleCode, action);
};

// Initialize from storage on module load
loadFromStorage();

// Composable
export const useAuth = () => {
  return {
    // State (readonly)
    accessToken: readonly(accessToken) as Readonly<Ref<string | null>>,
    refreshToken: readonly(refreshToken) as Readonly<Ref<string | null>>,
    user: readonly(user) as Readonly<Ref<TokenPayload | null>>,
    permissions: readonly(permissions) as Readonly<Ref<Permission[]>>,
    roleAccess: readonly(roleAccess) as Readonly<Ref<UserRoleAccess>>,

    // Computed
    isAuthenticated: readonly(isAuthenticated) as ComputedRef<boolean>,
    isTokenExpired: readonly(isTokenExpired) as ComputedRef<boolean>,

    // Methods
    setAuthorization,
    logout,
    updateTokens,
    hasPermission,
    hasModuleAccess,
    getModulePermissions,
    canPerformAction,

    // Utils
    parseJwt,
  };
};

// Optional: Export types for use in other components
export type { AuthResponse, Permission, UserRoleAccess, TokenPayload };
