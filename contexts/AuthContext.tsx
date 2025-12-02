'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase-client'
import { User } from '@/lib/types'
import { sharedAuth } from '@/lib/shared-auth'

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: string | null }>
  signUp: (email: string, password: string, userData: Partial<User>) => Promise<{ error: string | null }>
  signOut: () => Promise<void>
  completeProfile: (profileData: { full_name?: string; company_name?: string; phone?: string }) => Promise<{ error: string | null }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    let mounted = true

    // Set a timeout to prevent infinite loading
    const loadingTimeout = setTimeout(() => {
      if (mounted) {
        setLoading(false)
      }
    }, 5000) // Increased timeout to 5 seconds

    // Check for URL-based authentication first
    const handleUrlAuth = async () => {
      const { token, shouldRedirect } = sharedAuth.handleAuthFromUrl()
      if (token && shouldRedirect) {
        // Set the session using the token from URL
        await supabase.auth.setSession({
          access_token: token.access_token,
          refresh_token: token.refresh_token
        })
        await fetchUserProfile(token.user_id, token.email)
        return true
      }
      return false
    }

    // Get initial session - simplified version
    const getInitialSession = async () => {
      try {
        // First check for URL-based auth
        const urlAuthHandled = await handleUrlAuth()
        if (urlAuthHandled) {
          if (mounted) {
            clearTimeout(loadingTimeout)
            setLoading(false)
          }
          return
        }

        // Otherwise, get session normally
        const { data: { session } } = await supabase.auth.getSession()
        if (session?.user) {
          await fetchUserProfile(session.user.id, session.user.email)
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error('Error getting initial session:', error)
        setUser(null)
      } finally {
        if (mounted) {
          clearTimeout(loadingTimeout)
          setLoading(false)
        }
      }
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          await fetchUserProfile(session.user.id, session.user.email)
        } else {
          setUser(null)
        }
        if (mounted) {
          clearTimeout(loadingTimeout)
          setLoading(false)
        }
      }
    )

    return () => {
      mounted = false
      subscription.unsubscribe()
      clearTimeout(loadingTimeout)
    }
  }, [])

  const fetchUserProfile = async (userId: string, email?: string) => {
    console.log('Fetching user profile for:', userId, email) // Debug log
    
    try {
      // Try a very simple database test with short timeout
      const testOperation = supabase
        .from('users')
        .select('id')
        .eq('id', userId)
        .limit(1)
        .maybeSingle() // Use maybeSingle instead of single to avoid errors

      // Create a timeout promise
      const timeoutPromise = new Promise<never>((_, reject) => 
        setTimeout(() => reject(new Error('Operation timeout')), 2000)
      )
      
      const { data: testData, error: testError } = await Promise.race([
        testOperation,
        timeoutPromise
      ]) as { data: any; error: any }

      if (testError) {
        console.log('Database not accessible, using memory profile:', testError.message)
        // Database is not accessible, create profile in memory
        const basicProfile: User = {
          id: userId,
          email: email || '',
          full_name: undefined,
          company_name: undefined,
          phone: undefined,
          avatar_url: undefined,
          role: 'client',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
        setUser(basicProfile)
        return
      }

      // If we get here and testData is null, user doesn't exist in database
      if (!testData) {
        console.log('User not found in database, creating profile in memory')
        const basicProfile: User = {
          id: userId,
          email: email || '',
          full_name: undefined,
          company_name: undefined,
          phone: undefined,
          avatar_url: undefined,
          role: 'client',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
        setUser(basicProfile)
        return
      }

      // User exists in database, get full profile
      console.log('User exists in database, fetching full profile')
      const fullProfileOperation = supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()

      // Create a timeout promise for the full profile operation
      const fullProfileTimeoutPromise = new Promise<never>((_, reject) => 
        setTimeout(() => reject(new Error('Operation timeout')), 2000)
      )

      const { data: fullProfile, error: fullError } = await Promise.race([
        fullProfileOperation,
        fullProfileTimeoutPromise
      ]) as { data: any; error: any }

      if (fullError) {
        console.log('Error fetching full profile, using basic profile:', fullError.message)
        const basicProfile: User = {
          id: userId,
          email: email || '',
          full_name: undefined,
          company_name: undefined,
          phone: undefined,
          avatar_url: undefined,
          role: 'client',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
        setUser(basicProfile)
      } else {
        console.log('Full profile fetched successfully:', fullProfile)
        setUser(fullProfile)
      }

    } catch (error) {
      console.log('All database operations failed, using memory profile:', error)
      // Complete fallback - create profile in memory
      const basicProfile: User = {
        id: userId,
        email: email || '',
        full_name: undefined,
        company_name: undefined,
        phone: undefined,
        avatar_url: undefined,
        role: 'client',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      setUser(basicProfile)
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        return { error: error.message }
      }

      return { error: null }
    } catch (error) {
      return { error: 'An unexpected error occurred' }
    }
  }

  const signUp = async (email: string, password: string, userData: Partial<User>) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) {
        return { error: error.message }
      }

      if (data.user) {
        
        // Database trigger will automatically create a basic profile
        // Set user state with basic info - profile completion will happen later
        const basicProfile: User = {
          id: data.user.id,
          email: data.user.email || '',
          full_name: undefined,
          company_name: undefined,
          phone: undefined,
          avatar_url: undefined,
          role: 'client',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
        
        setUser(basicProfile)
      }

      return { error: null }
    } catch (error) {
      return { error: 'An unexpected error occurred' }
    }
  }

  const completeProfile = async (profileData: { full_name?: string; company_name?: string; phone?: string }) => {
    try {
      if (!user) {
        return { error: 'No user logged in' }
      }


      // Update the profile in the database
      const { error: updateError } = await supabase
        .from('users')
        .update({
          full_name: profileData.full_name || null,
          company_name: profileData.company_name || null,
          phone: profileData.phone || null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id)

      if (updateError) {
        return { error: updateError.message }
      }

      // Update local user state
      const updatedUser: User = {
        ...user,
        full_name: profileData.full_name || undefined,
        company_name: profileData.company_name || undefined,
        phone: profileData.phone || undefined,
        updated_at: new Date().toISOString(),
      }

      setUser(updatedUser)

      return { error: null }
    } catch (error) {
      return { error: 'An unexpected error occurred' }
    }
  }

  const signOut = async () => {
    try {
      
      // Sign out from Supabase
      const { error } = await supabase.auth.signOut()
      
      if (error) {
      } else {
      }
      
      // Clear shared auth token
      sharedAuth.clearAuthToken()
      
      // Always clear user state, even if Supabase sign out fails
      setUser(null)
      
    } catch (error) {
      // Even if there's an error, clear the user state
      setUser(null)
    }
  }

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    completeProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}