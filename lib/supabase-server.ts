import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { AUTH_CONFIG } from './auth-config'

export function createServerSupabaseClient() {
  try {
    const cookieStore = cookies()

    return createServerClient(
      AUTH_CONFIG.SUPABASE_URL,
      AUTH_CONFIG.SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              )
            } catch (error) {
              // Ignore cookie setting errors in server components
              console.warn('Cookie setting error:', error)
            }
          },
        },
      }
    )
  } catch (error) {
    console.error('Error creating server Supabase client:', error)
    // Fallback to basic client without cookies
    const { createClient } = require('@supabase/supabase-js')
    return createClient(AUTH_CONFIG.SUPABASE_URL, AUTH_CONFIG.SUPABASE_ANON_KEY)
  }
}
