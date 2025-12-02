'use client'

import React, { memo } from 'react'
// import dynamic from 'next/dynamic'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import {
  BarChart3,
  Download,
  FileSpreadsheet,
  TrendingUp,
  Calendar,
  PieChart,
  Activity,
} from 'lucide-react'

// Charts disabled due to SSR issues with recharts
const ComplianceChart = () => <div className="w-full h-[300px] flex items-center justify-center bg-gray-50 rounded-xl text-gray-500">Compliance Chart (Disabled)</div>
const ServicePieChart = () => <div className="w-full h-[300px] flex items-center justify-center bg-gray-50 rounded-xl text-gray-500">Service Pie Chart (Disabled)</div>
const PaymentLineChart = () => <div className="w-full h-[300px] flex items-center justify-center bg-gray-50 rounded-xl text-gray-500">Payment Line Chart (Disabled)</div>

const ReportsPage = memo(function ReportsPage() {
  const complianceData = [
    { month: 'Apr', filed: 8, pending: 2 },
    { month: 'May', filed: 9, pending: 1 },
    { month: 'Jun', filed: 10, pending: 0 },
    { month: 'Jul', filed: 8, pending: 2 },
    { month: 'Aug', filed: 9, pending: 1 },
    { month: 'Sep', filed: 7, pending: 3 },
  ]

  const serviceData = [
    { name: 'Tax Compliance', value: 35 },
    { name: 'Audit', value: 25 },
    { name: 'Corporate', value: 20 },
    { name: 'Payroll', value: 15 },
    { name: 'Others', value: 5 },
  ]

  const paymentData = [
    { month: 'Apr', amount: 25000 },
    { month: 'May', amount: 18000 },
    { month: 'Jun', amount: 52000 },
    { month: 'Jul', amount: 15000 },
    { month: 'Aug', amount: 20500 },
    { month: 'Sep', amount: 24500 },
    { month: 'Sep', amount: 24500 },
  ]

  const COLORS = ['#0E2F5A', '#F5B400', '#3B82F6', '#10B981', '#6B7280']

  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Page Header */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                <BarChart3 className="w-8 h-8 text-primary" />
                Reports & Analytics
              </h1>
              <p className="text-gray-600">
                Insights and analytics on your compliance and financial activities
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" icon={<Download className="w-4 h-4" />}>
                Export PDF
              </Button>
              <Button variant="outline" icon={<FileSpreadsheet className="w-4 h-4" />}>
                Export Excel
              </Button>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card hover>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">51</p>
                <p className="text-xs font-medium text-gray-600">Total Filings</p>
              </div>
            </div>
          </Card>
          <Card hover>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">95%</p>
                <p className="text-xs font-medium text-gray-600">On-Time Rate</p>
              </div>
            </div>
          </Card>
          <Card hover>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">₹1.55L</p>
                <p className="text-xs font-medium text-gray-600">Total Paid</p>
              </div>
            </div>
          </Card>
          <Card hover>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">12</p>
                <p className="text-xs font-medium text-gray-600">Active Services</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Compliance Overview Chart */}
        <div>
          <Card>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Compliance Overview
                </h2>
                <p className="text-sm text-gray-600">Last 6 months filing status</p>
              </div>
              <Badge variant="success">FY 2024-25</Badge>
            </div>
            <ComplianceChart />
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Service Distribution */}
          <div>
            <Card>
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Service Distribution
                </h2>
                <p className="text-sm text-gray-600">Breakdown by service category</p>
              </div>
              <ServicePieChart />
            </Card>
          </div>

          {/* Payment Trends */}
          <div>
            <Card>
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Payment Trends</h2>
                <p className="text-sm text-gray-600">Monthly payment history</p>
              </div>
              <PaymentLineChart />
            </Card>
          </div>
        </div>

        {/* Detailed Reports */}
        <div>
          <Card>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Available Reports
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: 'Compliance Summary Report',
                  description: 'Detailed report of all compliance filings',
                  period: 'FY 2024-25',
                },
                {
                  title: 'Financial Summary',
                  description: 'Complete financial summary and payment history',
                  period: 'Last 12 months',
                },
                {
                  title: 'Service Utilization Report',
                  description: 'Analysis of services undertaken and their status',
                  period: 'FY 2024-25',
                },
                {
                  title: 'Tax Filing Report',
                  description: 'Comprehensive tax filing and return status',
                  period: 'FY 2023-24',
                },
              ].map((report, index) => (
                <div
                  key={index}
                  className="p-4 border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-soft transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{report.title}</h3>
                    <Badge variant="info" size="sm">
                      {report.period}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{report.description}</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" icon={<Download className="w-3 h-3" />}>
                      Download PDF
                    </Button>
                    <Button size="sm" variant="ghost">
                      View Online
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
  )
})

export default ReportsPage
