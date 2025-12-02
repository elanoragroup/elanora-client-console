'use client'

import React, { useState, useEffect, useMemo } from 'react'
import dynamic from 'next/dynamic'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Modal from '@/components/ui/Modal'
import Table from '@/components/ui/Table'
import { safeFormatDate } from '@/lib/date-utils'
import { createClient } from '@/lib/supabase-client'
import { useAuth } from '@/contexts/AuthContext'
import {
  Briefcase,
  Plus,
  FileCheck,
  Calculator,
  Building2,
  Users,
} from 'lucide-react'

// Lazy load the service request form
const ServiceRequestForm = dynamic(() => import('@/components/services/ServiceRequestForm'), {
  loading: () => <div className="p-8 text-center">Loading form...</div>,
  ssr: false
})

interface Service {
  id: string
  name: string
  type: 'Ongoing' | 'One-time'
  assignedPerson: string
  startDate: string
  endDate?: string
  status: 'Active' | 'Completed' | 'On Hold'
  category: string
}

interface RequestedService {
  id: string
  serviceType: string
  subject: string
  priority: 'Normal' | 'Urgent'
  requestedDate: string
  status: 'Pending' | 'Under Review' | 'Approved' | 'Rejected'
  assignedPerson?: string
  estimatedCompletion?: string
  category: string
}

export default function ServicesPage() {
  const { user, loading: authLoading } = useAuth()
  const supabase = createClient()
  const [showRequestModal, setShowRequestModal] = useState(false)
  const [activeTab, setActiveTab] = useState<'active' | 'completed' | 'requested'>('active')
  const [services, setServices] = useState<Service[]>([])
  const [serviceRequests, setServiceRequests] = useState<RequestedService[]>([])
  const [loading, setLoading] = useState(true)

  // Load services from Supabase
  const loadServices = React.useCallback(async () => {
    try {
      setLoading(true)

      // Load active services
      const { data: servicesData, error: servicesError } = await supabase
        .from('services')
        .select(`
          *,
          category:service_categories(*),
          assigned_ca:users!assigned_ca_id(*)
        `)
        .order('created_at', { ascending: false })

      if (servicesError) {
        console.error('Error loading services:', servicesError)
      } else {
        // Transform data to match our interface
        const transformedServices: Service[] = servicesData?.map(service => ({
          id: service.id,
          name: service.title,
          type: service.category?.name || 'Service',
          assignedPerson: service.assigned_ca?.full_name || 'Unassigned',
          startDate: service.actual_start_date || service.created_at,
          endDate: service.actual_completion_date,
          status: service.status === 'active' ? 'Active' : service.status === 'completed' ? 'Completed' : 'On Hold',
          category: service.category?.name || 'Other'
        })) || []

        setServices(transformedServices)
      }

      // Load service requests
      const { data: requestsData, error: requestsError } = await supabase
        .from('service_requests')
        .select(`
          *,
          assigned_ca:users!assigned_ca_id(*)
        `)
        .order('created_at', { ascending: false })

      if (requestsError) {
        console.error('Error loading requests:', requestsError)
      } else {
        // Transform data to match our interface
        const transformedRequests: RequestedService[] = requestsData?.map(request => ({
          id: request.id,
          serviceType: request.service_type,
          subject: request.subject,
          priority: request.priority === 'urgent' ? 'Urgent' : 'Normal',
          requestedDate: request.created_at,
          category: request.service_type,
          status: request.status === 'pending' ? 'Under Review' : request.status === 'approved' ? 'Approved' : request.status === 'rejected' ? 'Rejected' : 'Pending',
          assignedPerson: request.assigned_ca?.full_name || 'Unassigned',
          estimatedCompletion: request.preferred_completion_date
        })) || []

        setServiceRequests(transformedRequests)
      }
    } catch (error) {
      console.error('Unexpected error loading services:', error)
    } finally {
      setLoading(false)
    }
  }, [supabase])

  useEffect(() => {
    if (!authLoading && user) {
      loadServices()
    }
  }, [authLoading, user, loadServices])

  const filteredServices = useMemo(() => {
    return services.filter((s) =>
      activeTab === 'active' ? s.status === 'Active' : s.status === 'Completed'
    )
  }, [services, activeTab])

  const columns = useMemo(() => [
    {
      key: 'name',
      label: 'Service Name',
      render: (item: Service) => (
        <div>
          <p className="font-semibold text-gray-900">{item.name}</p>
          <p className="text-xs text-gray-500 mt-0.5">{item.category}</p>
        </div>
      ),
    },
    {
      key: 'type',
      label: 'Type',
      render: (item: Service) => (
        <Badge variant={item.type === 'Ongoing' ? 'info' : 'neutral'}>
          {item.type}
        </Badge>
      ),
    },
    {
      key: 'assignedPerson',
      label: 'Assigned Person',
      render: (item: Service) => (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
            <span className="text-xs font-semibold text-primary">
              {item.assignedPerson.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <span className="text-gray-900">{item.assignedPerson}</span>
        </div>
      ),
    },
    {
      key: 'dates',
      label: 'Timeline',
      render: (item: Service) => (
        <div className="text-sm">
          <p className="text-gray-900">
            Start: {safeFormatDate(item.startDate)}
          </p>
          {item.endDate && (
            <p className="text-gray-600 text-xs mt-0.5">
              End: {safeFormatDate(item.endDate)}
            </p>
          )}
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (item: Service) => (
        <Badge
          variant={
            item.status === 'Active'
              ? 'success'
              : item.status === 'Completed'
                ? 'neutral'
                : 'warning'
          }
          dot
        >
          {item.status}
        </Badge>
      ),
    },
  ], [])

  const requestedServicesColumns = useMemo(() => [
    {
      key: 'serviceType',
      label: 'Service Type',
      render: (item: RequestedService) => (
        <div>
          <p className="font-semibold text-gray-900">{item.serviceType}</p>
          <p className="text-xs text-gray-500 mt-0.5">{item.subject}</p>
        </div>
      ),
    },
    {
      key: 'priority',
      label: 'Priority',
      render: (item: RequestedService) => (
        <Badge variant={item.priority === 'Urgent' ? 'warning' : 'neutral'}>
          {item.priority}
        </Badge>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (item: RequestedService) => (
        <Badge
          variant={
            item.status === 'Approved'
              ? 'success'
              : item.status === 'Under Review'
                ? 'info'
                : item.status === 'Rejected'
                  ? 'danger'
                  : 'neutral'
          }
          dot
        >
          {item.status}
        </Badge>
      ),
    },
    {
      key: 'assignedPerson',
      label: 'Assigned To',
      render: (item: RequestedService) => (
        <div>
          {item.assignedPerson ? (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-xs font-semibold text-primary">
                  {item.assignedPerson.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <span className="text-gray-900">{item.assignedPerson}</span>
            </div>
          ) : (
            <span className="text-gray-500 text-sm">Not assigned</span>
          )}
        </div>
      ),
    },
    {
      key: 'dates',
      label: 'Timeline',
      render: (item: RequestedService) => (
        <div className="text-sm">
          <p className="text-gray-900">
            Requested: {safeFormatDate(item.requestedDate)}
          </p>
          {item.estimatedCompletion && (
            <p className="text-gray-600 text-xs mt-0.5">
              Est. Completion: {safeFormatDate(item.estimatedCompletion)}
            </p>
          )}
        </div>
      ),
    },
  ], [])

  const serviceCategories = [
    { name: 'Tax Compliance', icon: Calculator, count: 8, color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { name: 'Audit & Assurance', icon: FileCheck, count: 3, color: 'text-green-600', bgColor: 'bg-green-50' },
    { name: 'Corporate Compliance', icon: Building2, count: 5, color: 'text-purple-600', bgColor: 'bg-purple-50' },
    { name: 'HR & Payroll', icon: Users, count: 2, color: 'text-amber-600', bgColor: 'bg-amber-50' },
  ]

  if (authLoading) {
    return (
      <div className="max-w-[1600px] mx-auto space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="max-w-[1600px] mx-auto space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Authentication Required</h2>
            <p className="text-gray-600">Please log in to view services and submit requests.</p>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="max-w-[1600px] mx-auto space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      {/* Page Header */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
              <Briefcase className="w-8 h-8 text-primary" />
              Services Undertaken
            </h1>
            <p className="text-gray-600">
              Manage all your active and completed services
            </p>
          </div>
          <Button
            variant="primary"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => setShowRequestModal(true)}
          >
            Request New Service
          </Button>
        </div>
      </div>

      {/* Service Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {serviceCategories.map((category, index) => {
          const Icon = category.icon
          return (
            <Card key={index} hover>
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 ${category.bgColor} rounded-xl flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${category.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{category.count}</p>
                  <p className="text-xs font-medium text-gray-600">{category.name}</p>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Tabs */}
      <div>
        <Card>
          <div className="flex items-center gap-3">
            <Button
              variant={activeTab === 'active' ? 'primary' : 'ghost'}
              onClick={() => setActiveTab('active')}
            >
              Active Services
            </Button>
            <Button
              variant={activeTab === 'requested' ? 'primary' : 'ghost'}
              onClick={() => setActiveTab('requested')}
            >
              Requested Services
            </Button>
            <Button
              variant={activeTab === 'completed' ? 'primary' : 'ghost'}
              onClick={() => setActiveTab('completed')}
            >
              Completed Services
            </Button>
          </div>
        </Card>
      </div>

      {/* Services Table */}
      <div>
        <Card padding="none">
          {activeTab === 'requested' ? (
            <Table
              key="requested-services"
              data={serviceRequests}
              columns={requestedServicesColumns}
              keyExtractor={(item) => item.id}
              emptyMessage="No requested services found"
            />
          ) : (
            <Table
              key={`${activeTab}-services`}
              data={filteredServices}
              columns={columns}
              keyExtractor={(item) => item.id}
              emptyMessage={`No ${activeTab} services found`}
            />
          )}
        </Card>
      </div>

      {/* Request Service Modal */}
      <Modal
        isOpen={showRequestModal}
        onClose={() => setShowRequestModal(false)}
        title="Request New Service"
        size="lg"
      >
        {showRequestModal && (
          <ServiceRequestForm onClose={() => setShowRequestModal(false)} />
        )}
      </Modal>
    </div>
  )
}


