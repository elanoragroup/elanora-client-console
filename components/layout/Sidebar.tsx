'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useNavigation } from '@/contexts/NavigationContext'
import { useAuth } from '@/contexts/AuthContext'
import {
  LayoutDashboard,
  Briefcase,
  FolderKanban,
  CalendarCheck,
  FileText,
  BarChart3,
  User,
  LogOut,
  ChevronDown,
} from 'lucide-react'
import clsx from 'clsx'

interface NavItem {
  label: string
  href: string
  icon: React.ElementType
}

const navigation: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Services', href: '/services', icon: Briefcase },
  { label: 'Projects', href: '/projects', icon: FolderKanban },
  { label: 'Compliance Tracker', href: '/compliance', icon: CalendarCheck },
  { label: 'Documents', href: '/documents', icon: FileText },
  { label: 'Reports', href: '/reports', icon: BarChart3 },
]

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()
  const { navigateWithLoading, currentPage, isLoading, isTransitioning } = useNavigation()
  const { user, signOut } = useAuth()
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleSignOut = async () => {
    try {
      await signOut()
      setIsProfileDropdownOpen(false)
    } catch (error) {
      setIsProfileDropdownOpen(false)
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false)
      }
    }

    if (isProfileDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isProfileDropdownOpen])

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[55] lg:hidden transition-opacity duration-200"
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          "fixed top-0 h-screen w-56 surface border flex flex-col z-40 transition-transform duration-300 ease-in-out shadow-soft-xl",
          isOpen ? "left-0 translate-x-0" : "left-0 -translate-x-full lg:left-16 lg:translate-x-0"
        )}
      >
        {/* Client Logo Section with Profile Dropdown */}
        <div ref={dropdownRef} className="h-20 flex items-center px-6 border-b border-white/70 relative">
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center ring-2 ring-white/50 overflow-hidden bg-white">
              {user?.company_logo ? (
                <Image
                  src={user.company_logo}
                  alt={`${user.company_name || 'Company'} Logo`}
                  width={40}
                  height={40}
                  className="object-contain"
                />
              ) : (
                <Image
                  src="/favicon.ico"
                  alt="Default Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              )}
            </div>
            <div className="flex-1">
              <h1 className="text-gray-900 font-display font-semibold text-lg leading-tight">
                {user?.company_name || user?.full_name || 'User'}
              </h1>
              <p className="text-xs text-gray-500 font-medium">{user?.role || 'Client'}</p>
            </div>
          </div>

          {/* Profile Dropdown Button */}
          <button
            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            className="p-1 rounded-lg hover:bg-white/60 transition-colors duration-200"
          >
            <ChevronDown
              className={clsx(
                'w-4 h-4 text-gray-500 transition-transform duration-200',
                isProfileDropdownOpen && 'rotate-180'
              )}
            />
          </button>

          {/* Profile Dropdown Menu */}
          {isProfileDropdownOpen && (
            <div className="absolute top-full left-4 right-4 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">
                  {user?.full_name || user?.email || 'User'}
                </p>
                <p className="text-xs text-gray-500">
                  {user?.email}
                </p>
              </div>

              <button
                onClick={() => {
                  navigateWithLoading('/profile', 'Loading Profile...')
                  setIsProfileDropdownOpen(false)
                  onClose()
                }}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
              >
                <User className="w-4 h-4" />
                <span>Profile Settings</span>
              </button>

              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-3 scrollbar-hide">
          <ul className="space-y-1">
            {navigation.map((item) => {
              const isActive = currentPage === item.href
              const Icon = item.icon

              const isDashboard = item.href === '/dashboard' && currentPage === '/dashboard'

              const handleNavigation = () => {
                onClose()
                if (item.href !== currentPage) {
                  navigateWithLoading(item.href, `Loading ${item.label}...`)
                }
              }

              return (
                <li key={item.href}>
                  <button
                    onClick={handleNavigation}
                    className={clsx(
                      'w-full relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-left',
                      isDashboard
                        ? 'text-primary bg-white shadow-soft-lg ring-2 ring-white/80 font-semibold'
                        : isActive
                          ? 'bg-white/70 text-gray-900 shadow-soft'
                          : 'text-gray-700 hover:text-gray-900 hover:bg-white/60'
                    )}
                  >
                    <Icon
                      className={clsx(
                        'w-5 h-5 transition-colors duration-150',
                        isDashboard
                          ? 'text-primary'
                          : isActive
                            ? 'text-gray-900'
                            : 'text-gray-500'
                      )}
                    />
                    <span>{item.label}</span>
                    {isDashboard && (
                      <div className="ml-auto w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                    )}
                    {(isActive && (isLoading || isTransitioning)) && (
                      <div className="ml-auto">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      </div>
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4">
          {/* Separator Line */}
          <div className="w-32 h-px bg-white/70 mx-auto mb-4"></div>
          <div className="chip rounded-2xl p-4">
            <p className="text-xs font-medium text-gray-900 mb-1">Need Help?</p>
            <p className="text-xs text-gray-600 mb-3">Contact your assigned CA</p>
            <button className="w-full bg-white text-primary text-xs font-medium py-2 px-3 rounded-lg hover:bg-white/90 transition-colors">
              Get Support
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}


export default React.memo(Sidebar)
