'use client'

import React, { useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { motion } from 'framer-motion'
import {
  Settings as SettingsIcon,
  User,
  Lock,
  Bell,
  Shield,
  Users,
  Activity,
  Upload,
  Eye,
  EyeOff,
  Save,
} from 'lucide-react'

export default function SettingsPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)

  const activityLog = [
    {
      action: 'Document uploaded',
      description: 'Purchase_Register_Sept_2024.xlsx',
      timestamp: '2024-10-15 14:30',
      ip: '103.24.56.78',
    },
    {
      action: 'Login successful',
      description: 'Logged in from Chrome on Windows',
      timestamp: '2024-10-15 09:15',
      ip: '103.24.56.78',
    },
    {
      action: 'Password changed',
      description: 'Password successfully updated',
      timestamp: '2024-10-10 16:45',
      ip: '103.24.56.78',
    },
    {
      action: 'Profile updated',
      description: 'Contact information updated',
      timestamp: '2024-10-05 11:20',
      ip: '103.24.56.78',
    },
  ]

  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                <SettingsIcon className="w-8 h-8 text-primary" />
                Settings
              </h1>
              <p className="text-gray-600">Manage your account preferences and security</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Photo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Profile Photo
                </h3>
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary-700 rounded-2xl flex items-center justify-center shadow-soft-lg">
                    <span className="text-white font-bold text-4xl">A</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-3">
                      Upload a new profile photo for your company
                    </p>
                    <div className="flex gap-3">
                      <Button variant="outline" size="sm" icon={<Upload className="w-4 h-4" />}>
                        Upload New Photo
                      </Button>
                      <Button variant="ghost" size="sm">
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Password & Security */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-primary" />
                  Password & Security
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-200"
                        placeholder="Enter current password"
                      />
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-200"
                      placeholder="Enter new password"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-200"
                      placeholder="Confirm new password"
                    />
                  </div>
                  <Button variant="primary" icon={<Save className="w-4 h-4" />}>
                    Update Password
                  </Button>
                </div>
              </Card>
            </motion.div>

            {/* Two-Factor Authentication */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Two-Factor Authentication
                </h3>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Enhance Your Account Security
                    </h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Add an extra layer of security by enabling two-factor authentication
                    </p>
                    <Badge variant={twoFactorEnabled ? 'success' : 'warning'}>
                      {twoFactorEnabled ? 'Enabled' : 'Disabled'}
                    </Badge>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={twoFactorEnabled}
                      onChange={() => setTwoFactorEnabled(!twoFactorEnabled)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </Card>
            </motion.div>

            {/* Notification Preferences */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <Bell className="w-5 h-5 text-primary" />
                  Notification Preferences
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div>
                      <h4 className="font-medium text-gray-900">Email Notifications</h4>
                      <p className="text-sm text-gray-600">
                        Receive updates about compliance and invoices via email
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={emailNotifications}
                        onChange={() => setEmailNotifications(!emailNotifications)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <h4 className="font-medium text-gray-900">SMS Notifications</h4>
                      <p className="text-sm text-gray-600">
                        Get urgent alerts via SMS for critical deadlines
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={smsNotifications}
                        onChange={() => setSmsNotifications(!smsNotifications)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Manage Sub-Users */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Sub-Users
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Add team members who can access specific sections of the portal
                </p>
                <Button variant="outline" icon={<Users className="w-4 h-4" />}>
                  Manage Sub-Users
                </Button>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Activity Log */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  Recent Activity
                </h3>
                <div className="space-y-4">
                  {activityLog.map((activity, index) => (
                    <div
                      key={index}
                      className="pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                    >
                      <h4 className="text-sm font-semibold text-gray-900 mb-1">
                        {activity.action}
                      </h4>
                      <p className="text-xs text-gray-600 mb-2">{activity.description}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{activity.timestamp}</span>
                        <span>{activity.ip}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="ghost" size="sm" className="w-full mt-4">
                  View Full Log
                </Button>
              </Card>
            </motion.div>

            {/* Account Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Info</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500">Account Created</p>
                    <p className="text-sm font-semibold text-gray-900">January 15, 2022</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Last Login</p>
                    <p className="text-sm font-semibold text-gray-900">Today at 9:15 AM</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Account Status</p>
                    <Badge variant="success" size="sm">Active</Badge>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
  )
}

