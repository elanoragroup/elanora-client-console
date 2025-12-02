'use client'

import React, { useState } from 'react'
import { createClient } from '@/lib/supabase-client'
import { useAuth } from '@/contexts/AuthContext'
import Button from '@/components/ui/Button'
import { CheckCircle } from 'lucide-react'

interface ServiceRequestFormProps {
    onClose: () => void
}

interface UploadedFile {
    id: string
    name: string
    size: number
    type: string
    file: File
}

export default function ServiceRequestForm({ onClose }: ServiceRequestFormProps) {
    const { user } = useAuth()
    const supabase = createClient()
    const [formData, setFormData] = useState({
        serviceType: '',
        financialYear: '',
        quarter: '',
        completionDate: '',
        priority: 'Normal',
        subject: '',
        description: '',
    })
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const serviceOptions = [
        {
            group: 'Income Tax',
            options: [
                'ITR Filing (Individual)',
                'ITR Filing (Company/Firm)',
                'Tax Notice Reply',
                'Tax Audit Support'
            ]
        },
        {
            group: 'GST',
            options: [
                'GST Registration',
                'Monthly/Quarterly Return Filing',
                'Annual Return (GSTR-9/9C)',
                'Cancellation / Amendment',
                'Reconciliation Assistance'
            ]
        },
        {
            group: 'Accounting',
            options: [
                'Monthly Bookkeeping',
                'Ledger Review',
                'Finalization of Accounts',
                'TDS Return Filing'
            ]
        },
        {
            group: 'MCA / ROC',
            options: [
                'Company Incorporation',
                'Annual Return (AOC-4 / MGT-7)',
                'Director KYC (DIR-3 KYC)',
                'Change in Directors / Registered Office'
            ]
        },
        {
            group: 'Other Services',
            options: [
                'PAN/TAN Application',
                'Professional Tax',
                'MSME Registration',
                'Custom Request'
            ]
        }
    ]

    const financialYears = [
        'FY 2023-24',
        'FY 2024-25',
        'FY 2025-26',
        'Not Applicable'
    ]

    const quarters = [
        'Q1 (Apr - Jun)',
        'Q2 (Jul - Sep)',
        'Q3 (Oct - Dec)',
        'Q4 (Jan - Mar)',
        'Not Applicable'
    ]

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || [])
        const newFiles: UploadedFile[] = files.map(file => ({
            id: Math.random().toString(36).substr(2, 9),
            name: file.name,
            size: file.size,
            type: file.type,
            file: file
        }))
        setUploadedFiles(prev => [...prev, ...newFiles])
    }

    const removeFile = (fileId: string) => {
        setUploadedFiles(prev => prev.filter(file => file.id !== fileId))
    }

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes'
        const k = 1024
        const sizes = ['Bytes', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            // Check if user is authenticated using AuthContext
            if (!user) {
                alert('Please log in to submit a service request')
                setIsSubmitting(false)
                return
            }

            console.log('User authenticated:', user.id, user.email) // Debug log

            // Validate required fields
            if (!formData.serviceType.trim()) {
                alert('Please select a service type')
                setIsSubmitting(false)
                return
            }

            if (!formData.subject.trim()) {
                alert('Please enter a subject')
                setIsSubmitting(false)
                return
            }

            if (!formData.description.trim()) {
                alert('Please enter a description')
                setIsSubmitting(false)
                return
            }

            // Prepare service request data
            const serviceRequestData = {
                user_id: user.id,
                service_type: formData.serviceType.trim(),
                financial_year: formData.financialYear.trim() || null,
                quarter: formData.quarter.trim() || null,
                preferred_completion_date: formData.completionDate || null,
                priority: formData.priority.toLowerCase() === 'urgent' ? 'urgent' : 'normal', // Ensure only valid values
                subject: formData.subject.trim(),
                description: formData.description.trim(),
                status: 'pending' as const
            }

            console.log('Submitting service request:', serviceRequestData) // Debug log

            // Submit to Supabase
            const { data, error } = await supabase
                .from('service_requests')
                .insert(serviceRequestData)
                .select()
                .single()

            if (error) {
                console.error('Service request submission error:', error) // Debug log
                alert(`Failed to submit service request: ${error.message}`)
                setIsSubmitting(false)
                return
            }

            console.log('Service request submitted successfully:', data) // Debug log

            // Upload files if any
            if (uploadedFiles.length > 0) {
                for (const file of uploadedFiles) {
                    const formData = new FormData()
                    formData.append('file', file.file)
                    formData.append('requestId', data.id)

                    const uploadResponse = await fetch('/api/upload', {
                        method: 'POST',
                        body: formData
                    })

                    if (!uploadResponse.ok) {
                        // Handle upload error silently or log it
                    }
                }
            }

            setIsSubmitting(false)
            setIsSubmitted(true)

            // Refresh the data to show the new request
            setTimeout(() => {
                window.location.reload()
            }, 1000)
        } catch (error) {
            alert('Failed to submit service request. Please try again.')
            setIsSubmitting(false)
        }
    }

    if (isSubmitted) {
        return (
            <div className="p-6 text-center">
                <div className="space-y-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">Request Submitted Successfully!</h3>
                    <p className="text-gray-600">
                        ✅ Your service request has been submitted successfully. Our team will reach out within 24 hours.
                    </p>
                    <Button
                        variant="primary"
                        onClick={onClose}
                        className="mt-4"
                    >
                        Close
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Service Type */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Service Type *
                </label>
                <select
                    value={formData.serviceType}
                    onChange={(e) => handleInputChange('serviceType', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-300 transition-colors"
                    required
                >
                    <option value="">Choose a service...</option>
                    {serviceOptions.map((group) => (
                        <optgroup key={group.group} label={group.group}>
                            {group.options.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </optgroup>
                    ))}
                </select>
            </div>

            {/* Financial Year and Quarter */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Financial Year / Period
                    </label>
                    <select
                        value={formData.financialYear}
                        onChange={(e) => handleInputChange('financialYear', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-300 transition-colors"
                    >
                        <option value="">Select FY...</option>
                        {financialYears.map((fy) => (
                            <option key={fy} value={fy}>{fy}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Quarter
                    </label>
                    <select
                        value={formData.quarter}
                        onChange={(e) => handleInputChange('quarter', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-300 transition-colors"
                    >
                        <option value="">Select Quarter...</option>
                        {quarters.map((quarter) => (
                            <option key={quarter} value={quarter}>{quarter}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Completion Date */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Completion Date
                </label>
                <input
                    type="date"
                    value={formData.completionDate}
                    onChange={(e) => handleInputChange('completionDate', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-300 transition-colors"
                />
            </div>

            {/* Priority */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority
                </label>
                <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="priority"
                            value="Normal"
                            checked={formData.priority === 'Normal'}
                            onChange={(e) => handleInputChange('priority', e.target.value)}
                            className="w-4 h-4 text-primary focus:ring-primary"
                        />
                        <span className="text-sm text-gray-700">Normal</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="priority"
                            value="Urgent"
                            checked={formData.priority === 'Urgent'}
                            onChange={(e) => handleInputChange('priority', e.target.value)}
                            className="w-4 h-4 text-red-600 focus:ring-red-600"
                        />
                        <span className="text-sm text-gray-700">Urgent</span>
                    </label>
                </div>
            </div>

            {/* Subject */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                </label>
                <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    placeholder="Brief subject of your request"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-300 transition-colors"
                    required
                />
            </div>

            {/* Description */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                </label>
                <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Detailed description of your request..."
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-300 resize-none transition-colors"
                    required
                />
            </div>

            {/* File Upload */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Attachments (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-primary transition-colors">
                    <input
                        type="file"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                        <p className="text-sm text-gray-600">
                            Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                            PDF, JPG, PNG up to 10MB
                        </p>
                    </label>
                </div>

                {/* Uploaded Files List */}
                {uploadedFiles.length > 0 && (
                    <div className="mt-4 space-y-2">
                        {uploadedFiles.map((file) => (
                            <div key={file.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-white rounded flex items-center justify-center border border-gray-200">
                                        <span className="text-xs font-medium text-gray-500">
                                            {file.name.split('.').pop()?.toUpperCase()}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900 truncate max-w-[200px]">
                                            {file.name}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {formatFileSize(file.size)}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => removeFile(file.id)}
                                    className="text-gray-400 hover:text-red-500 transition-colors"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
                <Button
                    variant="ghost"
                    onClick={onClose}
                    disabled={isSubmitting}
                >
                    Cancel
                </Button>
                <Button
                    variant="primary"
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Request'}
                </Button>
            </div>
        </form>
    )
}
