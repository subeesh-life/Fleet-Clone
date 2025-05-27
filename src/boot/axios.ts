import { boot } from 'quasar/wrappers'
import axios, { AxiosError } from 'axios'

interface LoginRequest {
  email: string
  password: string
  timezone: string
  portal?: string
}

// Create axios instance with environment-specific configuration
const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? '/api' // This will be handled by the proxy
      : 'http://saas-dev.wiot360.com/api',
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true, // Important for CORS requests with credentials
})

// Request interceptor
instance.interceptors.request.use(
  (config) => {
    // Add any common headers or auth tokens here
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error instanceof Error ? error : new Error(String(error)))
  },
)

// Response interceptor
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common error cases
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('auth_token')
      // Maybe redirect to login
    }
    return Promise.reject(error instanceof Error ? error : new Error(String(error)))
  },
)

export const api = {
  login: async ({ email, password, timezone }: LoginRequest) => {
    try {
      // Remove any existing authorization header for login request
      delete instance.defaults.headers.common['Authorization']
      delete instance.defaults.headers.common['authorization']

      const response = await instance.post('/auth/external/sign-in', {
        email,
        password,
        portal: 'tpc',
        timezone,
      })

      // Check for token in headers (case-insensitive check)
      const token = response.headers['authorization'] || response.headers['Authorization']
      if (token) {
        // Remove 'Bearer ' prefix if present
        const cleanToken = token.replace('Bearer ', '')
        localStorage.setItem('auth_token', cleanToken)
        // Add token to axios instance default headers for subsequent requests
        instance.defaults.headers.common['Authorization'] = `Bearer ${cleanToken}`
      }

      return response
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data?.message || error.message
        throw new Error(errorMessage)
      }
      throw new Error('An unexpected error occurred')
    }
  },
}

// Inject axios to the app
export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = instance
})

export { instance }
