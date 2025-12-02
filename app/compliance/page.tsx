'use client'

import React, { useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Table from '@/components/ui/Table'
import Modal from '@/components/ui/Modal'
import { motion } from 'framer-motion'
import { safeFormatDate } from '@/lib/date-utils'
import {
  CalendarCheck,
  Filter,
  Download,
  Upload,
  MessageSquare,
  AlertCircle,
  Clock,
  CheckCircle2,
  FileText,
  TrendingUp,
  Calendar,
  User,
  ChevronRight,
} from 'lucide-react'

interface ComplianceItem {
  id: string
  type: string
  period: string
  dueDate: string
  status: 'filed' | 'in-progress' | 'pending' | 'overdue'
  assignedPerson: string
  remarks: string
  filedDate?: string
}

export default function CompliancePage() {
  const [selectedFilter, setSelectedFilter] = useState<string>('all')
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [selectedCompliance, setSelectedCompliance] = useState<ComplianceItem | null>(null)

  const complianceData: ComplianceItem[] = [
    {
      id: '1',
      type: 'GSTR-3B',
      period: 'September 2024',
      dueDate: '2024-10-20',
      status: 'pending',
      assignedPerson: 'Rajesh Kumar',
      remarks: 'Awaiting purchase data',
    },
    {
      id: '2',
      type: 'TDS Return (24Q)',
      period: 'Q2 FY 2024-25',
      dueDate: '2024-10-31',
      status: 'in-progress',
      assignedPerson: 'Priya Sharma',
      remarks: 'Under preparation',
    },
    {
      id: '3',
      type: 'ESI Challan',
      period: 'September 2024',
      dueDate: '2024-10-15',
      status: 'overdue',
      assignedPerson: 'Rajesh Kumar',
      remarks: 'Urgent - Payment pending',
    },
    {
      id: '4',
      type: 'GSTR-1',
      period: 'August 2024',
      dueDate: '2024-09-11',
      status: 'filed',
      assignedPerson: 'Rajesh Kumar',
      remarks: 'Filed successfully',
      filedDate: '2024-09-10',
    },
    {
      id: '5',
      type: 'PF Challan',
      period: 'September 2024',
      dueDate: '2024-10-15',
      status: 'filed',
      assignedPerson: 'Priya Sharma',
      remarks: 'Filed on time',
      filedDate: '2024-10-12',
    },
    {
      id: '6',
      type: 'GSTR-3B',
      period: 'August 2024',
      dueDate: '2024-09-20',
      status: 'filed',
      assignedPerson: 'Rajesh Kumar',
      remarks: 'Filed successfully',
      filedDate: '2024-09-19',
    },
  ]

  const getNextDueCompliance = () => {
    const pending = complianceData
      .filter((item) => item.status === 'pending' || item.status === 'in-progress')
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    return pending[0]
  }

  const nextDue = getNextDueCompliance()
  const daysRemaining = nextDue
    ? Math.ceil(
        (new Date(nextDue.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
      )
    : 0

  const filteredData = complianceData.filter((item) => {
    if (selectedFilter === 'all') return true
    if (selectedFilter === 'pending') return item.status === 'pending'
    if (selectedFilter === 'in-progress') return item.status === 'in-progress'
    if (selectedFilter === 'overdue') return item.status === 'overdue'
    if (selectedFilter === 'filed') return item.status === 'filed'
    return true
  })

  const getStatusBadge = (status: ComplianceItem['status']) => {
    const variants = {
      filed: { variant: 'success' as const, icon: CheckCircle2, text: 'Filed' },
      'in-progress': { variant: 'warning' as const, icon: Clock, text: 'In Progress' },
      pending: { variant: 'info' as const, icon: Calendar, text: 'Pending' },
      overdue: { variant: 'danger' as const, icon: AlertCircle, text: 'Overdue' },
    }
    const config = variants[status]
    const Icon = config.icon
    return (
      <Badge variant={config.variant} dot>
        <Icon className="w-3 h-3" />
        {config.text}
      </Badge>
    )
  }

  const columns = [
    {
      key: 'type',
      label: 'Compliance Type',
      render: (item: ComplianceItem) => (
        <div>
          <p className="font-semibold text-gray-900">{item.type}</p>
          <p className="text-xs text-gray-500 mt-0.5">{item.period}</p>
        </div>
      ),
    },
    {
      key: 'dueDate',
      label: 'Due Date',
      render: (item: ComplianceItem) => (
        <div>
          <p className="text-gray-900">{safeFormatDate(item.dueDate)}</p>
          {item.filedDate && (
            <p className="text-xs text-green-600 mt-0.5">
              Filed: {safeFormatDate(item.filedDate)}
            </p>
          )}
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (item: ComplianceItem) => getStatusBadge(item.status),
    },
    {
      key: 'assignedPerson',
      label: 'Assigned To',
      render: (item: ComplianceItem) => (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
            <span className="text-xs font-semibold text-primary">
              {item.assignedPerson
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </span>
          </div>
          <span className="text-gray-900">{item.assignedPerson}</span>
        </div>
      ),
    },
    {
      key: 'remarks',
      label: 'Remarks',
      render: (item: ComplianceItem) => (
        <span className="text-gray-600 text-sm">{item.remarks}</span>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (item: ComplianceItem) => (
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setSelectedCompliance(item)}
          >
            View
          </Button>
          {item.status !== 'filed' && (
            <Button
              size="sm"
              variant="outline"
              icon={<Upload className="w-3 h-3" />}
              onClick={() => {
                setSelectedCompliance(item)
                setShowUploadModal(true)
              }}
            >
              Upload
            </Button>
          )}
        </div>
      ),
    },
  ]

  const stats = {
    filed: complianceData.filter((i) => i.status === 'filed').length,
    pending: complianceData.filter((i) => i.status === 'pending').length,
    inProgress: complianceData.filter((i) => i.status === 'in-progress').length,
    overdue: complianceData.filter((i) => i.status === 'overdue').length,
  }

  const onTimePercentage = Math.round((stats.filed / complianceData.length) * 100)

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
                <CalendarCheck className="w-8 h-8 text-primary" />
                Compliance Tracker
              </h1>
              <p className="text-gray-600">
                Manage all your statutory compliance deadlines in one place
              </p>
            </div>
            <Button variant="primary" icon={<Download className="w-4 h-4" />}>
              Export Report
            </Button>
          </div>
        </motion.div>

        {/* Next Due Banner */}
        {nextDue && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="bg-gradient-to-r from-primary to-primary-600 border-0 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <CalendarCheck className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white/80 mb-1">
                      Your Next Compliance Due
                    </p>
                    <p className="text-2xl font-bold mb-1">
                      {nextDue.type} - {nextDue.period}
                    </p>
                    <p className="text-sm text-white/90">
                      Due on {safeFormatDate(nextDue.dueDate)} ·{' '}
                      <span className="font-semibold">
                        {daysRemaining > 0 ? `${daysRemaining} days remaining` : 'Overdue'}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="accent"
                    icon={<Upload className="w-4 h-4" />}
                    onClick={() => {
                      setSelectedCompliance(nextDue)
                      setShowUploadModal(true)
                    }}
                  >
                    Upload Documents
                  </Button>
                  <Button
                    variant="secondary"
                    icon={<MessageSquare className="w-4 h-4" />}
                  >
                    Message CA
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"
        >
          <Card hover>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.filed}</p>
                <p className="text-xs font-medium text-gray-600">Filed</p>
              </div>
            </div>
          </Card>
          <Card hover>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.inProgress}</p>
                <p className="text-xs font-medium text-gray-600">In Progress</p>
              </div>
            </div>
          </Card>
          <Card hover>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
                <p className="text-xs font-medium text-gray-600">Pending</p>
              </div>
            </div>
          </Card>
          <Card hover>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.overdue}</p>
                <p className="text-xs font-medium text-gray-600">Overdue</p>
              </div>
            </div>
          </Card>
          <Card hover className="bg-gradient-to-br from-green-50 to-emerald-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{onTimePercentage}%</p>
                <p className="text-xs font-medium text-gray-600">On-Time Rate</p>
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
              <Filter className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">Filter:</span>
              {['all', 'pending', 'in-progress', 'overdue', 'filed'].map((filter) => (
                <Button
                  key={filter}
                  variant={selectedFilter === filter ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedFilter(filter)}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1).replace('-', ' ')}
                </Button>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Compliance Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card padding="none">
            <Table
              data={filteredData}
              columns={columns}
              keyExtractor={(item) => item.id}
              emptyMessage="No compliance items found"
            />
          </Card>
        </motion.div>

        {/* Upload Modal */}
        <Modal
          isOpen={showUploadModal}
          onClose={() => setShowUploadModal(false)}
          title="Upload Compliance Documents"
          size="md"
        >
          <div className="p-6 space-y-4">
            {selectedCompliance && (
              <div className="p-4 bg-gray-50 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-1">
                  {selectedCompliance.type}
                </h3>
                <p className="text-sm text-gray-600">{selectedCompliance.period}</p>
              </div>
            )}
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-primary transition-colors cursor-pointer">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-sm font-medium text-gray-900 mb-1">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 10MB</p>
            </div>
            <div className="flex gap-3">
              <Button variant="primary" className="flex-1">
                Upload
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowUploadModal(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal>
      </div>
  )
}

