'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import QuickNav from './QuickNav'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import LoadingBar from './LoadingBar'
import PageWrapper from './PageWrapper'

interface AppLayoutProps {
  children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  // Define public routes that don't require authentication
  const publicRoutes = ['/login', '/signup', '/complete-profile', '/landing']
  const isPublicRoute = publicRoutes.includes(pathname)

  useEffect(() => {

    // Only redirect if not loading and not on a public route
    if (!loading && !user && !isPublicRoute) {
      router.push('/login')
    }

    // If user is authenticated and on login/signup page, redirect to landing page
    if (!loading && user && (pathname === '/login' || pathname === '/signup')) {
      router.push('/landing')
    }
  }, [user, loading, pathname, router, isPublicRoute])

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-bg flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  // If user is not authenticated and not on a public route, don't render the layout
  if (!user && !isPublicRoute) {
    return null
  }

  // For public routes (login/signup), render without the main layout
  if (isPublicRoute) {
    return (
      <div className="min-h-screen bg-neutral-bg">
        <LoadingBar />
        <PageWrapper>{children}</PageWrapper>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-app">
      <LoadingBar />
      <QuickNav />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <main className="lg:ml-72 pt-24">
        <div className="px-4 md:px-6 lg:px-8 pb-8">
          <PageWrapper>{children}</PageWrapper>
        </div>
      </main>
    </div>
  )
}

