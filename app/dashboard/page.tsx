'use client'

import React from 'react'
import { useAuth } from '@/contexts/AuthContext'
import Card from '@/components/ui/Card'
import StatCard from '@/components/ui/StatCard'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import {
  Briefcase,
  FileText,
  CalendarClock,
  Receipt,
  Upload,
  Eye,
  MessageSquare,
  Plus,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Clock,
  ArrowRight,
} from 'lucide-react'

export default function DashboardPage() {
  const { user } = useAuth()
  const upcomingCompliance = [
    {
      type: 'GSTR-3B',
      period: 'September 2024',
      dueDate: '2024-10-20',
      daysRemaining: 3,
      status: 'pending' as const,
    },
    {
      type: 'TDS Return',
      period: 'Q2 FY 2024-25',
      dueDate: '2024-10-31',
      daysRemaining: 14,
      status: 'in-progress' as const,
    },
    {
      type: 'ESI Challan',
      period: 'September 2024',
      dueDate: '2024-10-15',
      daysRemaining: -2,
      status: 'overdue' as const,
    },
  ]

  const recentActivities = [
    {
      title: 'ITR Computation Sheet Uploaded',
      time: '2 hours ago',
      type: 'document',
    },
    {
      title: 'Invoice #INV-2024-089 Generated',
      time: '5 hours ago',
      type: 'invoice',
    },
    {
      title: 'GST Return for August Filed',
      time: '1 day ago',
      type: 'compliance',
    },
  ]

  return (
    <div className="max-w-[1600px] mx-auto space-y-8">
      {/* Welcome Section */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
              Welcome back, {user?.company_name || user?.full_name || 'User'}
            </h1>
            <p className="text-gray-600">
              Here&apos;s what&apos;s happening with your compliance and services
            </p>
          </div>
          {/* Compliance Score */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-4 shadow-soft-lg border border-green-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-700 mb-1">95%</div>
              <div className="text-xs font-medium text-green-600 mb-2">Compliance Score</div>
              <div className="w-16 h-2 bg-green-200 rounded-full overflow-hidden">
                <div className="w-[95%] h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
              </div>
              <div className="text-xs text-green-600 mt-1">Excellent</div>
            </div>
          </div>
        </div>
      </div>

      {/* Next Compliance Due Banner */}
      <div>
        <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-amber-900 mb-1">
                  Next Compliance Due
                </p>
                <p className="text-xl font-bold text-amber-900">
                  GSTR-3B for September 2024
                </p>
                <p className="text-sm text-amber-700 mt-1">
                  Due in <span className="font-semibold">3 days</span> (October 20, 2024)
                </p>
              </div>
            </div>
            <Button variant="accent" icon={<ArrowRight className="w-4 h-4" />}>
              View Details
            </Button>
          </div>
        </Card>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Active Projects"
          value={5}
          icon={Briefcase}
          trend={{ value: '2 new this month', isPositive: true }}
          iconColor="text-blue-600"
          iconBgColor="bg-blue-50"
        />
        <StatCard
          title="Services Undertaken"
          value={12}
          icon={TrendingUp}
          iconColor="text-green-600"
          iconBgColor="bg-green-50"
        />
        <StatCard
          title="Upcoming Deadlines"
          value={8}
          icon={CalendarClock}
          trend={{ value: '3 this week', isPositive: false }}
          iconColor="text-amber-600"
          iconBgColor="bg-amber-50"
        />
        <StatCard
          title="Outstanding Invoices"
          value="₹24,500"
          icon={Receipt}
          iconColor="text-purple-600"
          iconBgColor="bg-purple-50"
        />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-display font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button
            variant="outline"
            size="lg"
            icon={<Upload className="w-5 h-5" />}
            className="justify-start h-auto py-4"
          >
            <span className="flex-1 text-left">Upload Document</span>
          </Button>
          <Button
            variant="outline"
            size="lg"
            icon={<Eye className="w-5 h-5" />}
            className="justify-start h-auto py-4"
          >
            <span className="flex-1 text-left">View Invoices</span>
          </Button>
          <Button
            variant="outline"
            size="lg"
            icon={<MessageSquare className="w-5 h-5" />}
            className="justify-start h-auto py-4"
          >
            <span className="flex-1 text-left">Contact Your CA</span>
          </Button>
          <Button
            variant="outline"
            size="lg"
            icon={<Plus className="w-5 h-5" />}
            className="justify-start h-auto py-4"
          >
            <span className="flex-1 text-left">Request Service</span>
          </Button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Compliance */}
        <div className="lg:col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-display font-semibold text-gray-900">
                Upcoming Compliance
              </h2>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>
            <div className="space-y-4">
              {upcomingCompliance.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all"
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.status === 'overdue'
                      ? 'bg-red-100'
                      : item.status === 'in-progress'
                        ? 'bg-amber-100'
                        : 'bg-blue-100'
                      }`}
                  >
                    {item.status === 'overdue' ? (
                      <AlertCircle className="w-5 h-5 text-red-600" />
                    ) : item.status === 'in-progress' ? (
                      <Clock className="w-5 h-5 text-amber-600" />
                    ) : (
                      <CalendarClock className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-semibold text-gray-900">{item.type}</h3>
                      <Badge
                        variant={
                          item.status === 'overdue'
                            ? 'danger'
                            : item.status === 'in-progress'
                              ? 'warning'
                              : 'info'
                        }
                        size="sm"
                      >
                        {item.status === 'overdue'
                          ? `${Math.abs(item.daysRemaining)} days overdue`
                          : `${item.daysRemaining} days left`}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{item.period}</p>
                    <p className="text-xs text-gray-500 mt-1">Due: {item.dueDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Recent Activity */}
        <div>
          <Card>
            <h2 className="text-lg font-display font-semibold text-gray-900 mb-6">
              Recent Activity
            </h2>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" size="sm" className="w-full mt-4">
              View All Activity
            </Button>
          </Card>

          {/* Compliance Score */}
          <Card className="mt-6">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mb-4 shadow-soft-lg">
                <span className="text-3xl font-bold text-white">95%</span>
              </div>
              <h3 className="font-display font-semibold text-gray-900 mb-1">
                Compliance Score
              </h3>
              <p className="text-sm text-gray-600">
                Excellent! You&apos;re on track with most of your filings.
              </p>
            </div>
          </Card>
        </div>
      </div>

      {/* Active Services Overview */}
      <div>
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-display font-semibold text-gray-900">Active Services</h2>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: 'GST Compliance', status: 'Active', color: 'bg-green-500' },
              { name: 'TDS Filing', status: 'Active', color: 'bg-green-500' },
              { name: 'Payroll Management', status: 'Active', color: 'bg-green-500' },
            ].map((service, index) => (
              <div
                key={index}
                className="p-4 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-soft transition-all"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-2 h-2 ${service.color} rounded-full`} />
                  <Badge variant="success" size="sm">
                    {service.status}
                  </Badge>
                </div>
                <h3 className="font-semibold text-gray-900">{service.name}</h3>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

