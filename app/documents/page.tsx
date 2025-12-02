'use client'

import React, { useState, useEffect, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { useAuth } from '@/contexts/AuthContext'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import PageTransition from '@/components/layout/PageTransition'
import { safeFormatDate } from '@/lib/date-utils'
import {
  FileText,
  Upload,
  Download,
  Eye,
  Folder,
  ChevronRight,
  File,
  Search,
} from 'lucide-react'

// Lazy load the upload modal
const UploadDocumentModal = dynamic(() => import('@/components/documents/UploadDocumentModal'), {
  loading: () => null,
  ssr: false
})

interface Document {
  id: string
  filename: string
  original_filename: string
  document_name: string
  file_size: number
  mime_type: string
  document_type: string
  description?: string
  uploaded_by: string
  created_at: string
  service_id?: string
  request_id?: string
}

interface DocumentCategory {
  name: string
  count: number
  color: string
  bgColor: string
}

export default function DocumentsPage() {
  const { user } = useAuth()
  const [documents, setDocuments] = useState<Document[]>([])
  const [categories, setCategories] = useState<DocumentCategory[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)

  const loadDocuments = React.useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      console.log('Loading documents for user:', user?.id, user?.email)

      const response = await fetch('/api/documents')
      console.log('Documents API response status:', response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Documents API error response:', errorText)
        throw new Error(`Failed to load documents: ${response.status}`)
      }

      const data = await response.json()
      console.log('Documents API response data:', data)
      setDocuments(data.documents || [])

      // Define predefined categories that should always appear
      const predefinedCategories = {
        invoice: { color: 'text-blue-600', bgColor: 'bg-blue-50' },
        receipt: { color: 'text-green-600', bgColor: 'bg-green-50' },
        contract: { color: 'text-purple-600', bgColor: 'bg-purple-50' },
        report: { color: 'text-amber-600', bgColor: 'bg-amber-50' },
        other: { color: 'text-gray-600', bgColor: 'bg-gray-50' },
      }

      // Count documents by type
      const categoryMap = new Map<string, number>()
      data.documents?.forEach((doc: Document) => {
        const count = categoryMap.get(doc.document_type) || 0
        categoryMap.set(doc.document_type, count + 1)
      })

      // Generate categories ensuring all predefined categories appear
      const generatedCategories: DocumentCategory[] = Object.entries(predefinedCategories).map(([name, colors]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        count: categoryMap.get(name) || 0,
        ...colors
      }))

      console.log('Generated categories:', generatedCategories)
      setCategories(generatedCategories)
    } catch (err) {
      console.error('Error loading documents:', err)
      setError(err instanceof Error ? err.message : 'Failed to load documents')
    } finally {
      setLoading(false)
    }
  }, [user])

  // Load documents and categories
  useEffect(() => {
    if (user) {
      loadDocuments()
    } else {
      setLoading(false)
    }
  }, [user, loadDocuments])

  const filteredDocuments = useMemo(() => {
    return documents.filter(doc => {
      const matchesCategory = !selectedCategory || doc.document_type === selectedCategory.toLowerCase()
      const matchesSearch = !searchQuery ||
        doc.document_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.original_filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.document_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (doc.description && doc.description.toLowerCase().includes(searchQuery.toLowerCase()))
      return matchesCategory && matchesSearch
    })
  }, [documents, selectedCategory, searchQuery])

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const handleDownload = async (doc: Document) => {
    try {
      const response = await fetch(`/api/documents/${doc.id}/download`)
      if (!response.ok) {
        throw new Error('Failed to download document')
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = doc.original_filename
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (err) {
      alert('Failed to download document')
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      // Pass files to modal via some state or just open modal and let user select again?
      // For simplicity in this refactor, we'll just open the modal. 
      // Ideally, we'd pass the dropped files to the modal.
      setShowUploadModal(true)
    }
  }

  if (!user) {
    return (
      <PageTransition className="max-w-[1600px] mx-auto space-y-6">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Authentication Required</h2>
            <p className="text-gray-600 mb-4">Please log in to access your documents.</p>
            <Button onClick={() => window.location.href = '/login'}>Go to Login</Button>
          </div>
        </div>
      </PageTransition>
    )
  }

  if (loading) {
    return (
      <PageTransition className="max-w-[1600px] mx-auto space-y-6">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading documents...</p>
          </div>
        </div>
      </PageTransition>
    )
  }

  if (error) {
    return (
      <PageTransition className="max-w-[1600px] mx-auto space-y-6">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={loadDocuments}>Try Again</Button>
          </div>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition className="max-w-[1600px] mx-auto space-y-6">
      {/* Page Header */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
              <FileText className="w-8 h-8 text-primary" />
              Documents
            </h1>
            <p className="text-gray-600">
              Access and manage all your documents in one place
            </p>
          </div>
          <Button
            variant="primary"
            icon={<Upload className="w-4 h-4" />}
            onClick={() => setShowUploadModal(true)}
          >
            Upload Document
          </Button>
        </div>
      </div>

      {/* Breadcrumb */}
      {selectedCategory && (
        <div>
          <div className="flex items-center gap-2 text-sm">
            <button
              onClick={() => setSelectedCategory(null)}
              className="text-primary hover:text-primary-600 font-medium"
            >
              All Documents
            </button>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 font-medium">{selectedCategory}</span>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div>
        <Card>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search documents by name, description, type, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary"
            />
          </div>
        </Card>
      </div>

      {/* Categories */}
      {!selectedCategory && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category, index) => (
              <div
                key={index}
                className="cursor-pointer"
                onClick={() => setSelectedCategory(category.name)}
              >
                <Card hover>
                  <div className="text-center">
                    <div
                      className={`w-16 h-16 ${category.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-3`}
                    >
                      <Folder className={`w-8 h-8 ${category.color}`} />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                    <p className="text-sm text-gray-600">{category.count} files</p>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Documents List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            {selectedCategory ? `${selectedCategory} Documents` : 'Recent Documents'}
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              {filteredDocuments.length} documents
            </span>
          </div>
        </div>
        <Card padding="none">
          {filteredDocuments.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No documents found</h3>
              <p className="text-gray-600 mb-4">
                {searchQuery || selectedCategory
                  ? 'No documents match your current filters'
                  : 'You haven\'t uploaded any documents yet'
                }
              </p>
              {!searchQuery && !selectedCategory && (
                <Button variant="primary" icon={<Upload className="w-4 h-4" />}>
                  Upload Your First Document
                </Button>
              )}
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredDocuments.map((doc, index) => (
                <div
                  key={doc.id}
                  className="p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center">
                        <File className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate mb-1">
                          {doc.document_name}
                        </h3>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span>{doc.mime_type}</span>
                          <span>•</span>
                          <span>{formatFileSize(doc.file_size)}</span>
                          <span>•</span>
                          <span>
                            Uploaded on {safeFormatDate(doc.created_at)}
                          </span>
                        </div>
                        {doc.description && (
                          <p className="text-xs text-gray-600 mt-1 truncate">
                            {doc.description}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 ml-4">
                      <Badge
                        variant="info"
                        size="sm"
                      >
                        {doc.document_type}
                      </Badge>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          icon={<Eye className="w-4 h-4" />}
                          onClick={() => window.open(`/api/documents/${doc.id}/view`, '_blank')}
                        >
                          View
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          icon={<Download className="w-4 h-4" />}
                          onClick={() => handleDownload(doc)}
                        >
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* Upload Area */}
      <div>
        <div
          className={`border-2 border-dashed transition-colors cursor-pointer rounded-2xl ${isDragOver
            ? 'border-primary bg-primary-50'
            : 'border-gray-300 hover:border-primary'
            }`}
          onClick={() => setShowUploadModal(true)}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Card className="border-0 shadow-none">
            <div className="text-center py-8">
              <Upload className={`w-12 h-12 mx-auto mb-4 ${isDragOver ? 'text-primary' : 'text-gray-400'}`} />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {isDragOver ? 'Drop files here' : 'Upload New Document'}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Drag and drop files here, or click to browse
              </p>
              <Button
                variant="outline"
                onClick={() => setShowUploadModal(true)}
              >
                Choose Files
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <UploadDocumentModal
          isOpen={showUploadModal}
          onClose={() => setShowUploadModal(false)}
          categories={categories}
          onUploadSuccess={loadDocuments}
          user={user}
        />
      )}
    </PageTransition>
  )
}

