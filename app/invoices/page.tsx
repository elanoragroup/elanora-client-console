'use client'

import React, { useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Table from '@/components/ui/Table'
import { motion } from 'framer-motion'
import { safeFormatDate } from '@/lib/date-utils'
import {
  Receipt,
  Download,
  CreditCard,
  FileText,
  Calendar,
  TrendingUp,
  AlertCircle,
} from 'lucide-react'

interface Invoice {
  id: string
  invoiceNo: string
  date: string
  service: string
  amount: number
  status: 'Paid' | 'Pending' | 'Overdue'
  dueDate: string
}

export default function InvoicesPage() {
  const [selectedFilter, setSelectedFilter] = useState<string>('all')

  const invoices: Invoice[] = [
    {
      id: '1',
      invoiceNo: 'INV-2024-089',
      date: '2024-10-01',
      service: 'GST Compliance - September 2024',
      amount: 15000,
      status: 'Pending',
      dueDate: '2024-10-15',
    },
    {
      id: '2',
      invoiceNo: 'INV-2024-076',
      date: '2024-09-01',
      service: 'TDS Filing Q2 FY 2024-25',
      amount: 12000,
      status: 'Paid',
      dueDate: '2024-09-15',
    },
    {
      id: '3',
      invoiceNo: 'INV-2024-065',
      date: '2024-08-01',
      service: 'Payroll Management - August 2024',
      amount: 8500,
      status: 'Paid',
      dueDate: '2024-08-15',
    },
    {
      id: '4',
      invoiceNo: 'INV-2024-052',
      date: '2024-07-15',
      service: 'Annual Audit FY 2023-24',
      amount: 45000,
      status: 'Paid',
      dueDate: '2024-08-15',
    },
    {
      id: '5',
      invoiceNo: 'INV-2024-045',
      date: '2024-06-20',
      service: 'Income Tax Return Filing',
      amount: 5000,
      status: 'Overdue',
      dueDate: '2024-07-05',
    },
  ]

  const filteredInvoices = invoices.filter((invoice) => {
    if (selectedFilter === 'all') return true
    if (selectedFilter === 'pending') return invoice.status === 'Pending'
    if (selectedFilter === 'paid') return invoice.status === 'Paid'
    if (selectedFilter === 'overdue') return invoice.status === 'Overdue'
    return true
  })

  const totalOutstanding = invoices
    .filter((inv) => inv.status === 'Pending' || inv.status === 'Overdue')
    .reduce((sum, inv) => sum + inv.amount, 0)

  const totalPaid = invoices
    .filter((inv) => inv.status === 'Paid')
    .reduce((sum, inv) => sum + inv.amount, 0)

  const columns = [
    {
      key: 'invoiceNo',
      label: 'Invoice No.',
      render: (item: Invoice) => (
        <div>
          <p className="font-semibold text-gray-900">{item.invoiceNo}</p>
          <p className="text-xs text-gray-500 mt-0.5">
            {safeFormatDate(item.date)}
          </p>
        </div>
      ),
    },
    {
      key: 'service',
      label: 'Service',
      render: (item: Invoice) => (
        <span className="text-gray-900">{item.service}</span>
      ),
    },
    {
      key: 'amount',
      label: 'Amount',
      render: (item: Invoice) => (
        <span className="font-semibold text-gray-900">
          ₹{item.amount.toLocaleString('en-IN')}
        </span>
      ),
    },
    {
      key: 'dueDate',
      label: 'Due Date',
      render: (item: Invoice) => (
        <span className="text-gray-600">
          {safeFormatDate(item.dueDate)}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (item: Invoice) => (
        <Badge
          variant={
            item.status === 'Paid'
              ? 'success'
              : item.status === 'Pending'
              ? 'warning'
              : 'danger'
          }
          dot
        >
          {item.status}
        </Badge>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (item: Invoice) => (
        <div className="flex items-center gap-2">
          <Button size="sm" variant="ghost" icon={<FileText className="w-3 h-3" />}>
            View
          </Button>
          <Button size="sm" variant="ghost" icon={<Download className="w-3 h-3" />}>
            Download
          </Button>
          {item.status !== 'Paid' && (
            <Button size="sm" variant="primary">
              Pay Now
            </Button>
          )}
        </div>
      ),
    },
  ]

  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                <Receipt className="w-8 h-8 text-primary" />
                Invoices & Payments
              </h1>
              <p className="text-gray-600">
                View and manage all your invoices and payment history
              </p>
            </div>
            <Button variant="outline" icon={<Download className="w-4 h-4" />}>
              Statement of Accounts
            </Button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <Card hover>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">
                  Total Outstanding
                </p>
                <p className="text-3xl font-bold text-amber-600 mb-1">
                  ₹{totalOutstanding.toLocaleString('en-IN')}
                </p>
                <p className="text-xs text-gray-500">
                  {invoices.filter((i) => i.status === 'Pending' || i.status === 'Overdue').length}{' '}
                  pending invoices
                </p>
              </div>
              <div className="p-3 bg-amber-50 rounded-xl">
                <AlertCircle className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </Card>

          <Card hover>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">Total Paid</p>
                <p className="text-3xl font-bold text-green-600 mb-1">
                  ₹{totalPaid.toLocaleString('en-IN')}
                </p>
                <p className="text-xs text-gray-500">
                  {invoices.filter((i) => i.status === 'Paid').length} paid invoices
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-xl">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card hover>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">Next Due</p>
                <p className="text-3xl font-bold text-gray-900 mb-1">
                  ₹{invoices.find((i) => i.status === 'Pending')?.amount.toLocaleString('en-IN')}
                </p>
                <p className="text-xs text-gray-500">
                  Due on{' '}
                  {safeFormatDate(
                    invoices.find((i) => i.status === 'Pending')?.dueDate || ''
                  )}
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Payment Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-gradient-to-r from-primary to-primary-600 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Quick Payment Options</h3>
                  <p className="text-sm text-white/80">
                    Pay securely using UPI, Cards, or Net Banking
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="accent">Pay All Outstanding</Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm font-medium text-gray-700">Filter:</span>
              {['all', 'pending', 'paid', 'overdue'].map((filter) => (
                <Button
                  key={filter}
                  variant={selectedFilter === filter ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedFilter(filter)}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </Button>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Invoices Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card padding="none">
            <Table
              data={filteredInvoices}
              columns={columns}
              keyExtractor={(item) => item.id}
              emptyMessage="No invoices found"
            />
          </Card>
        </motion.div>
      </div>
  )
}

