'use client'

import React from 'react'
import { Bell, Search, ChevronDown, Menu } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'

interface NavbarProps {
  onMenuClick: () => void
}

function Navbar({ onMenuClick }: NavbarProps) {
  const [showNotifications, setShowNotifications] = React.useState(false)
  const { user } = useAuth()

  return (
    <header className="fixed top-0 left-0 lg:left-72 right-0 z-40">
      {/* floating surface bar */}
      <div className="mt-3 mx-4 lg:mx-8 h-16 surface rounded-2xl px-3 lg:px-6 flex items-center justify-between">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl hidden md:block">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Ask anything… search services, documents, deadlines"
              className="w-full pl-12 pr-4 py-3 chip rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 lg:gap-4 ml-2 lg:ml-6">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2.5 text-gray-600 hover:text-gray-900 chip rounded-xl transition-colors"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full ring-2 ring-white" />
            </button>

            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 top-12 w-80 surface-strong rounded-2xl overflow-hidden"
              >
                <div className="p-4 border-b border-white/70">
                  <h3 className="font-semibold text-sm text-gray-900">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {[
                    {
                      title: 'GST Return Due',
                      message: 'GSTR-3B for September 2024 is due in 3 days',
                      time: '2 hours ago',
                      type: 'urgent',
                    },
                    {
                      title: 'Document Uploaded',
                      message: 'Your CA has uploaded ITR computation sheet',
                      time: '5 hours ago',
                      type: 'info',
                    },
                    {
                      title: 'Invoice Generated',
                      message: 'New invoice #INV-2024-089 for ₹15,000',
                      time: '1 day ago',
                      type: 'info',
                    },
                  ].map((notification, index) => (
                    <div key={index} className="p-4 hover:bg-white/60 border-b border-white/70 last:border-0 cursor-pointer">
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-2 h-2 mt-1.5 rounded-full ${notification.type === 'urgent' ? 'bg-red-500' : 'bg-blue-500'
                            }`}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">
                            {notification.title}
                          </p>
                          <p className="text-xs text-gray-600 mt-0.5">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-white/70 text-center">
                  <button className="text-sm font-medium text-primary hover:text-primary-600">
                    View All Notifications
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-3 pl-4 border-l border-white/70">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-700 rounded-xl flex items-center justify-center shadow-sm">
              <span className="text-white font-semibold text-sm">
                {user?.company_name ? user.company_name.substring(0, 2).toUpperCase() :
                  user?.full_name ? user.full_name.substring(0, 2).toUpperCase() : 'U'}
              </span>
            </div>
            <div className="hidden lg:block">
              <p className="text-sm font-semibold text-gray-900">
                {user?.company_name || user?.full_name || 'User'}
              </p>
              <p className="text-xs text-gray-500">{user?.role || 'Client'}</p>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default React.memo(Navbar)
