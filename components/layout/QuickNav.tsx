'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  User,
  HeadphonesIcon,
  HelpCircle,
  MessageCircle,
  Receipt,
  Settings,
  ExternalLink,
} from 'lucide-react'
import clsx from 'clsx'

interface QuickNavItem {
  label: string
  href: string
  icon: React.ElementType
}

const quickNavItems: QuickNavItem[] = [
  { label: 'Invoices', href: '/invoices', icon: Receipt },
  { label: 'Support', href: '/support', icon: HeadphonesIcon },
  { label: 'Feedback', href: '/feedback', icon: MessageCircle },
  { label: 'Settings', href: '/settings', icon: Settings },
  { label: 'Help', href: '/help', icon: HelpCircle },
]

const bottomNavItems: QuickNavItem[] = [
  { label: 'Profile', href: '/profile', icon: User },
]

export default function QuickNav() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 h-screen w-16 surface border-r flex flex-col z-50 shadow-soft-lg hidden lg:flex">
      {/* Elanora Logo */}
      <Link
        href="/dashboard"
        title="Elanora - Go to Dashboard"
        className="h-20 flex items-center justify-center border-b border-primary-700/50 px-2 py-2 group relative"
      >
        <div className="w-full aspect-square bg-white rounded-2xl p-1 shadow-soft-lg ring-1 ring-black/5 flex items-center justify-center transition-all duration-200 group-hover:scale-105 group-hover:shadow-soft-xl overflow-hidden">
          <Image
            src="/favicon.ico"
            alt="Elanora Logo"
            width={52}
            height={52}
            className="object-contain"
          />
        </div>
        {/* Tooltip */}
        <div className="absolute left-full ml-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
          Elanora Home
        </div>
      </Link>

      {/* Quick Navigation */}
      <nav className="flex-1 flex flex-col items-center py-6 gap-2">
        {quickNavItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              title={item.label}
              className={clsx(
                'group relative w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-200',
                isActive
                  ? 'bg-white/70 text-gray-900 shadow-soft'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
              )}
            >
              <Icon className="w-5 h-5" />

              {/* Tooltip */}
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                {item.label}
              </div>
            </Link>
          )
        })}
      </nav>

      {/* Separator Line */}
      <div className="w-8 h-px bg-white/70 mx-auto"></div>

      {/* Bottom Navigation */}
      <nav className="flex flex-col items-center py-4 gap-2">
        {bottomNavItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              title={item.label}
              className={clsx(
                'group relative w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-200',
                isActive
                  ? 'bg-white/70 text-gray-900 shadow-soft'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
              )}
            >
              <Icon className="w-5 h-5" />

              {/* Tooltip */}
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                {item.label}
              </div>
            </Link>
          )
        })}

        {/* Back to Website Button */}
        <a
          href="https://elanora.com"
          target="_blank"
          rel="noopener noreferrer"
          title="Back to Website"
          className="group relative w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-200 text-gray-600 hover:text-gray-900 hover:bg-white/60"
        >
          <ExternalLink className="w-5 h-5" />

          {/* Tooltip */}
          <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
            Back to Website
          </div>
        </a>
      </nav>
    </aside>
  )
}
