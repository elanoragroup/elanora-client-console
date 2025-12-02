// Shared Authentication Utilities
// This module handles cross-domain authentication between Portal and Client Console

import { AUTH_CONFIG, getClientConsoleUrl } from './auth-config'

export interface AuthToken {
  access_token: string
  refresh_token: string
  expires_at: number
  user_id: string
  email: string
}

export class SharedAuthManager {
  private static instance: SharedAuthManager
  private readonly STORAGE_KEY = AUTH_CONFIG.AUTH_TOKEN_KEY
  private readonly CLIENT_CONSOLE_URL = getClientConsoleUrl()

  private constructor() {}

  static getInstance(): SharedAuthManager {
    if (!SharedAuthManager.instance) {
      SharedAuthManager.instance = new SharedAuthManager()
    }
    return SharedAuthManager.instance
  }

  // Store authentication token for cross-domain access
  storeAuthToken(token: AuthToken): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(token))
      console.log('Auth token stored successfully')
    } catch (error) {
      console.error('Failed to store auth token:', error)
    }
  }

  // Retrieve authentication token
  getAuthToken(): AuthToken | null {
    try {
      const tokenData = localStorage.getItem(this.STORAGE_KEY)
      if (!tokenData) return null

      const token: AuthToken = JSON.parse(tokenData)
      
      // Check if token is expired
      if (Date.now() > token.expires_at) {
        this.clearAuthToken()
        return null
      }

      return token
    } catch (error) {
      console.error('Failed to retrieve auth token:', error)
      this.clearAuthToken()
      return null
    }
  }

  // Clear authentication token
  clearAuthToken(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY)
      console.log('Auth token cleared')
    } catch (error) {
      console.error('Failed to clear auth token:', error)
    }
  }

  // Redirect to client console landing page with authentication
  redirectToDashboard(): void {
    const token = this.getAuthToken()
    if (!token) {
      console.error('No valid auth token found')
      return
    }

    // Create URL with auth parameters
    const landingUrl = new URL('/landing', this.CLIENT_CONSOLE_URL)
    landingUrl.searchParams.set('auth_token', token.access_token)
    landingUrl.searchParams.set('user_id', token.user_id)
    landingUrl.searchParams.set('email', token.email)

    console.log('Redirecting to landing page:', landingUrl.toString())
    window.location.href = landingUrl.toString()
  }

  // Handle authentication from URL parameters (for client console)
  handleAuthFromUrl(): { token: AuthToken | null; shouldRedirect: boolean } {
    const urlParams = new URLSearchParams(window.location.search)
    const authToken = urlParams.get('auth_token')
    const userId = urlParams.get('user_id')
    const email = urlParams.get('email')

    if (authToken && userId && email) {
      const token: AuthToken = {
        access_token: authToken,
        refresh_token: '', // Will be handled by Supabase
        expires_at: Date.now() + AUTH_CONFIG.TOKEN_EXPIRATION,
        user_id: userId,
        email: email
      }

      // Store the token
      this.storeAuthToken(token)

      // Clean up URL parameters
      const newUrl = new URL(window.location.href)
      newUrl.searchParams.delete('auth_token')
      newUrl.searchParams.delete('user_id')
      newUrl.searchParams.delete('email')
      window.history.replaceState({}, '', newUrl.toString())

      return { token, shouldRedirect: true }
    }

    return { token: null, shouldRedirect: false }
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.getAuthToken() !== null
  }

  // Get current user info
  getCurrentUser(): { id: string; email: string } | null {
    const token = this.getAuthToken()
    if (!token) return null

    return {
      id: token.user_id,
      email: token.email
    }
  }
}

// Export singleton instance
export const sharedAuth = SharedAuthManager.getInstance()
