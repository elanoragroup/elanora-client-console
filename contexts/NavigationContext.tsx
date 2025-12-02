'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import PageLoader from '@/components/ui/PageLoader'
import ProgressLoader from '@/components/ui/ProgressLoader'

interface NavigationContextType {
  isLoading: boolean
  currentPage: string
  isTransitioning: boolean
  setLoading: (loading: boolean, text?: string) => void
  navigateWithLoading: (path: string, text?: string) => void
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined)

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false)
  const [loadingText, setLoadingText] = useState('Loading...')
  const [progress, setProgress] = useState(0)
  const [currentPage, setCurrentPage] = useState('/dashboard')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  // Update current page when pathname changes
  useEffect(() => {
    setCurrentPage(pathname)
  }, [pathname])

  // Handle page transitions smoothly
  useEffect(() => {
    if (isLoading) {
      setIsTransitioning(true)
      const timer = setTimeout(() => {
        setIsLoading(false)
        setProgress(0)
        // Add a small delay before showing new content to prevent flash
        setTimeout(() => {
          setIsTransitioning(false)
        }, 100)
      }, 300) // Reduced minimum loading time

      return () => clearTimeout(timer)
    }
  }, [pathname, isLoading])

  const setLoading = (loading: boolean, text: string = 'Loading...') => {
    setIsLoading(loading)
    setLoadingText(text)
    if (loading) {
      setProgress(0)
      // Simulate progress
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval)
            return 90
          }
          return prev + Math.random() * 15
        })
      }, 100)
    }
  }

  const navigateWithLoading = (path: string, text: string = 'Loading page...') => {
    // Don't update currentPage immediately to prevent flash
    setLoading(true, text)
    router.push(path)
  }

  return (
    <NavigationContext.Provider value={{ isLoading, currentPage, isTransitioning, setLoading, navigateWithLoading }}>
      {children}
    </NavigationContext.Provider>
  )
}

export function useNavigation() {
  const context = useContext(NavigationContext)
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider')
  }
  return context
}
