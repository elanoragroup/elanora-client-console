'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { motion } from 'framer-motion'
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building2,
  CreditCard,
  FileText,
  MessageSquare,
  Edit3,
  CheckCircle2,
  Shield,
} from 'lucide-react'

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [companyName, setCompanyName] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const { user, completeProfile } = useAuth()

  // Initialize company name from user data
  useEffect(() => {
    if (user?.company_name) {
      setCompanyName(user.company_name)
    }
  }, [user])

  const clientData = {
    companyName: companyName || user?.company_name || 'Company Name',
    gstin: '27AABCU9603R1ZM', // This would come from user data in a real app
    pan: 'AABCU9603R', // This would come from user data in a real app
    cin: 'U74999MH2015PTC268835', // This would come from user data in a real app
    address: '123 Business Park, Andheri East, Mumbai - 400069, Maharashtra', // This would come from user data in a real app
    email: user?.email || 'user@example.com',
    phone: user?.phone || '+91 98765 43210',
    yearOfIncorporation: '2015', // This would come from user data in a real app
    industry: 'Information Technology', // This would come from user data in a real app
  }

  const handleSave = async () => {
    if (!companyName.trim()) {
      alert('Company name cannot be empty')
      return
    }

    setIsSaving(true)
    try {
      const { error } = await completeProfile({
        company_name: companyName.trim()
      })

      if (error) {
        alert(`Failed to update profile: ${error}`)
      } else {
        setIsEditing(false)
        alert('Profile updated successfully!')
      }
    } catch (error) {
      alert('An unexpected error occurred')
    } finally {
      setIsSaving(false)
    }
  }

  const assignedCA = {
    name: 'Rajesh Kumar',
    designation: 'Senior Chartered Accountant',
    email: 'rajesh.kumar@elanora.com',
    phone: '+91 98123 45678',
    experience: '12 years',
    specialization: 'GST & Corporate Tax',
  }

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
                <User className="w-8 h-8 text-primary" />
                Client Profile
              </h1>
              <p className="text-gray-600">Manage your company information and settings</p>
            </div>
            <div className="flex gap-3">
              <Button
                variant={isEditing ? 'primary' : 'outline'}
                icon={isEditing ? <CheckCircle2 className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                onClick={isEditing ? handleSave : () => setIsEditing(true)}
                disabled={isSaving}
              >
                {isSaving ? 'Saving...' : isEditing ? 'Save Changes' : 'Edit Profile'}
              </Button>
              {isEditing && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false)
                    setCompanyName(user?.company_name || '')
                  }}
                  disabled={isSaving}
                >
                  Cancel
                </Button>
              )}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Company Profile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Company Logo & Name */}
            <Card>
              <div className="flex items-start gap-6">
                <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary-700 rounded-2xl flex items-center justify-center shadow-soft-lg">
                  <span className="text-white font-bold text-4xl">A</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-900 mb-1">
                        {isEditing ? (
                          <input
                            type="text"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-300"
                            placeholder="Enter company name"
                          />
                        ) : (
                          clientData.companyName
                        )}
                      </h2>
                      <p className="text-sm text-gray-600">{clientData.industry}</p>
                    </div>
                    <Badge variant="success" dot>
                      <Shield className="w-3 h-3" />
                      Verified
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <p className="text-xs font-medium text-gray-500 mb-1">Year of Incorporation</p>
                      <p className="text-sm font-semibold text-gray-900">{clientData.yearOfIncorporation}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 mb-1">Client Since</p>
                      <p className="text-sm font-semibold text-gray-900">January 2022</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Company Details */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Company Information</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-2">
                      <CreditCard className="w-4 h-4" />
                      GSTIN
                    </label>
                    <input
                      type="text"
                      value={clientData.gstin}
                      disabled={!isEditing}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary-200 disabled:opacity-60"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-2">
                      <CreditCard className="w-4 h-4" />
                      PAN
                    </label>
                    <input
                      type="text"
                      value={clientData.pan}
                      disabled={!isEditing}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary-200 disabled:opacity-60"
                    />
                  </div>
                </div>
                <div>
                  <label className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-2">
                    <FileText className="w-4 h-4" />
                    CIN
                  </label>
                  <input
                    type="text"
                    value={clientData.cin}
                    disabled={!isEditing}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary-200 disabled:opacity-60"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-2">
                    <MapPin className="w-4 h-4" />
                    Registered Address
                  </label>
                  <textarea
                    value={clientData.address}
                    disabled={!isEditing}
                    rows={2}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 disabled:opacity-60 resize-none"
                  />
                </div>
              </div>
            </Card>

            {/* Contact Information */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={clientData.email}
                    disabled={!isEditing}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 disabled:opacity-60"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-2">
                    <Phone className="w-4 h-4" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={clientData.phone}
                    disabled={!isEditing}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 disabled:opacity-60"
                  />
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Assigned CA */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Assigned CA</h3>
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary-700 rounded-full flex items-center justify-center mx-auto mb-3 shadow-soft-lg">
                  <span className="text-white font-bold text-2xl">
                    {assignedCA.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h4 className="font-bold text-gray-900 mb-1">{assignedCA.name}</h4>
                <p className="text-sm text-gray-600 mb-1">{assignedCA.designation}</p>
                <Badge variant="info" size="sm">{assignedCA.experience} experience</Badge>
              </div>
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{assignedCA.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{assignedCA.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Building2 className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{assignedCA.specialization}</span>
                </div>
              </div>
              <Button
                variant="primary"
                className="w-full"
                icon={<MessageSquare className="w-4 h-4" />}
              >
                Send Message
              </Button>
            </Card>

            {/* Quick Stats */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Summary</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Active Services</span>
                  <span className="text-lg font-bold text-gray-900">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Documents Uploaded</span>
                  <span className="text-lg font-bold text-gray-900">47</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Compliance Filed</span>
                  <span className="text-lg font-bold text-gray-900">28</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Member Since</span>
                  <span className="text-lg font-bold text-gray-900">3 years</span>
                </div>
              </div>
            </Card>

            {/* KYC Status */}
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-green-900 mb-1">KYC Verified</h4>
                  <p className="text-xs text-green-700">
                    All your documents have been verified and approved.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
  )
}

