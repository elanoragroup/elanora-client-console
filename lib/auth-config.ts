// Shared Authentication Configuration
// This file contains shared configuration for both Portal and Client Console

export const AUTH_CONFIG = {
  // Supabase Configuration
  SUPABASE_URL: 'https://xbnqbzqiehjwevkavwbf.supabase.co',
  SUPABASE_ANON_KEY: 'sb_publishable_zoSv5N2Egw-u9Q2bCvm_3A_IpSdXFov',
  
  // Application URLs
  PORTAL_URL: 'http://localhost:8080', // Update this to your portal URL
  CLIENT_CONSOLE_URL: 'http://localhost:3000', // Update this to your client console URL
  
  // Storage Keys
  AUTH_TOKEN_KEY: 'elanora_auth_token',
  
  // Token Expiration (24 hours in milliseconds)
  TOKEN_EXPIRATION: 24 * 60 * 60 * 1000,
  
  // Admin Emails
  ADMIN_EMAILS: [
    'kalpak.elanora@gmail.com',
    // Add more admin emails as needed
  ]
}

// Helper function to get the correct URL based on environment
export function getClientConsoleUrl(): string {
  if (typeof window !== 'undefined') {
    // Client-side: use current origin or configured URL
    return AUTH_CONFIG.CLIENT_CONSOLE_URL
  }
  // Server-side: use configured URL
  return AUTH_CONFIG.CLIENT_CONSOLE_URL
}

// Helper function to get the correct portal URL
export function getPortalUrl(): string {
  if (typeof window !== 'undefined') {
    // Client-side: use current origin or configured URL
    return AUTH_CONFIG.PORTAL_URL
  }
  // Server-side: use configured URL
  return AUTH_CONFIG.PORTAL_URL
}
