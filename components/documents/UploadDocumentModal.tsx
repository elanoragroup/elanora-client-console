'use client'

import React, { useState } from 'react'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import { Upload, Folder } from 'lucide-react'

interface DocumentCategory {
    name: string
    count: number
    color: string
    bgColor: string
}

interface UploadFormData {
    files: FileList | null
    documentName: string
    category: string
    description: string
}

interface UploadDocumentModalProps {
    isOpen: boolean
    onClose: () => void
    categories: DocumentCategory[]
    onUploadSuccess: () => void
    user: any // Replace with proper User type if available
}

export default function UploadDocumentModal({
    isOpen,
    onClose,
    categories,
    onUploadSuccess,
    user
}: UploadDocumentModalProps) {
    const [isDragOver, setIsDragOver] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const [uploadForm, setUploadForm] = useState<UploadFormData>({
        files: null,
        documentName: '',
        category: 'other',
        description: ''
    })

    const resetUploadForm = () => {
        setUploadForm({
            files: null,
            documentName: '',
            category: 'other',
            description: ''
        })
    }

    const handleFileSelect = (files: FileList | null) => {
        setUploadForm(prev => ({ ...prev, files }))
        if (files && files.length > 0 && !uploadForm.documentName) {
            // Auto-fill document name with first file name (without extension)
            const firstFileName = files[0].name
            const nameWithoutExt = firstFileName.substring(0, firstFileName.lastIndexOf('.')) || firstFileName
            setUploadForm(prev => ({ ...prev, documentName: nameWithoutExt }))
        }
    }

    const handleUpload = async () => {
        if (!user) {
            alert('Please log in to upload documents')
            return
        }

        if (!uploadForm.files || uploadForm.files.length === 0) {
            alert('Please select at least one file to upload')
            return
        }

        if (!uploadForm.documentName.trim()) {
            alert('Please enter a document name')
            return
        }

        setIsUploading(true)
        console.log('Starting upload of', uploadForm.files.length, 'files')

        const uploadPromises = Array.from(uploadForm.files).map(async (file) => {
            console.log('Uploading file:', file.name, 'Size:', file.size)

            const formData = new FormData()
            formData.append('file', file)
            formData.append('document_type', uploadForm.category)
            formData.append('document_name', uploadForm.documentName)
            formData.append('description', uploadForm.description)

            try {
                const response = await fetch('/api/documents', {
                    method: 'POST',
                    body: formData,
                })

                console.log('Upload response status:', response.status)

                if (!response.ok) {
                    const errorText = await response.text()
                    console.error('Upload error response:', errorText)
                    throw new Error(`Failed to upload ${file.name}: ${response.status}`)
                }

                const result = await response.json()
                console.log('Upload successful:', result)
                return result
            } catch (error) {
                console.error(`Error uploading ${file.name}:`, error)
                throw error
            }
        })

        try {
            await Promise.all(uploadPromises)
            alert('Files uploaded successfully!')
            onClose()
            resetUploadForm()
            onUploadSuccess()
        } catch (error) {
            console.error('Upload failed:', error)
            alert('Some files failed to upload. Please try again.')
        } finally {
            setIsUploading(false)
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={() => {
                onClose()
                resetUploadForm()
            }}
            title="Upload Document"
        >
            <div className="space-y-8 p-2">
                {/* File Selection */}
                <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-700">
                        Select Files
                    </label>
                    <div
                        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${uploadForm.files && uploadForm.files.length > 0
                            ? 'border-primary bg-primary-50'
                            : 'border-gray-300 hover:border-primary hover:bg-gray-50'
                            }`}
                        onClick={() => document.getElementById('modal-file-upload')?.click()}
                    >
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 mb-2">
                            Click to select files or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">
                            PDF, DOC, DOCX, XLS, XLSX, JPG, PNG (Max 10MB each)
                        </p>
                        <input
                            type="file"
                            multiple
                            accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                            onChange={(e) => handleFileSelect(e.target.files)}
                            className="hidden"
                            id="modal-file-upload"
                        />
                    </div>
                    {uploadForm.files && uploadForm.files.length > 0 && (
                        <div className="mt-4">
                            <p className="text-sm font-medium text-gray-700 mb-3">
                                Selected Files ({uploadForm.files.length}):
                            </p>
                            <div className="space-y-2">
                                {Array.from(uploadForm.files).map((file, index) => (
                                    <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border">
                                        <span className="text-sm text-gray-700 truncate font-medium">{file.name}</span>
                                        <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded">
                                            {(file.size / 1024 / 1024).toFixed(2)} MB
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Document Name */}
                <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-700">
                        Document Name *
                    </label>
                    <input
                        type="text"
                        value={uploadForm.documentName}
                        onChange={(e) => setUploadForm(prev => ({ ...prev, documentName: e.target.value }))}
                        placeholder="Enter a name for this document"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary transition-colors"
                        required
                    />
                </div>

                {/* Category Selection */}
                <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Category *
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                        {categories.map((category) => (
                            <button
                                key={category.name}
                                type="button"
                                onClick={() => setUploadForm(prev => ({ ...prev, category: category.name.toLowerCase() }))}
                                className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${uploadForm.category === category.name.toLowerCase()
                                    ? 'border-primary bg-primary-50 shadow-sm'
                                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 ${category.bgColor} rounded-xl flex items-center justify-center`}>
                                        <Folder className={`w-5 h-5 ${category.color}`} />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">{category.name}</p>
                                        <p className="text-xs text-gray-500">{category.count} files</p>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Description */}
                <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-700">
                        Description (Optional)
                    </label>
                    <textarea
                        value={uploadForm.description}
                        onChange={(e) => setUploadForm(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Add a description for this document..."
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary resize-none transition-colors"
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                    <Button
                        variant="outline"
                        onClick={() => {
                            onClose()
                            resetUploadForm()
                        }}
                        disabled={isUploading}
                        className="px-6 py-2"
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleUpload}
                        disabled={isUploading || !uploadForm.files || !uploadForm.documentName.trim()}
                        icon={isUploading ? undefined : <Upload className="w-4 h-4" />}
                        className="px-6 py-2"
                    >
                        {isUploading ? 'Uploading...' : 'Upload Document'}
                    </Button>
                </div>
            </div>
        </Modal>
    )
}
