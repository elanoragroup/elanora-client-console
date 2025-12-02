'use client'

import React, { useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { HelpCircle, Search, ChevronDown, ChevronUp, BookOpen, Video, FileText } from 'lucide-react'

export default function HelpPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const faqs = [
    {
      question: 'How do I upload documents?',
      answer: 'Go to the Documents page and click on the "Upload Document" button. Select the document type and choose files from your computer. You can upload multiple files at once.',
    },
    {
      question: 'When will my GST return be filed?',
      answer: 'Your GST returns are filed as per the due dates. You can track the status in the Compliance Tracker section. Your CA will notify you 5 days before the due date.',
    },
    {
      question: 'How can I view my invoices?',
      answer: 'Navigate to the Invoices section from the sidebar. You can view all your invoices, download them as PDF, and make payments online.',
    },
    {
      question: 'How do I contact my assigned CA?',
      answer: 'You can contact your CA by clicking on "Contact Your CA" button available throughout the dashboard, or use the support section for assistance.',
    },
    {
      question: 'What should I do if I receive a compliance alert?',
      answer: 'Compliance alerts indicate upcoming deadlines or pending actions. Click on the alert to view details and required documents. Your CA will guide you through the process.',
    },
  ]

  const resources = [
    {
      title: 'Getting Started Guide',
      description: 'Learn the basics of using the client console',
      icon: BookOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Video Tutorials',
      description: 'Watch step-by-step video guides',
      icon: Video,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Documentation',
      description: 'Detailed documentation and guides',
      icon: FileText,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
  ]

  return (
    <div className="max-w-[1200px] mx-auto space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
          <HelpCircle className="w-8 h-8 text-primary" />
          Help Center
        </h1>
        <p className="text-gray-600">
          Find answers to common questions and learn how to use the platform
        </p>
      </div>

      {/* Search */}
      <Card>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for help articles, guides, and FAQs..."
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary transition-all"
          />
        </div>
      </Card>

      {/* Quick Resources */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {resources.map((resource, index) => (
          <Card key={index} hover className="cursor-pointer">
            <div className={`w-12 h-12 ${resource.bgColor} rounded-xl flex items-center justify-center mb-4`}>
              <resource.icon className={`w-6 h-6 ${resource.color}`} />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">{resource.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{resource.description}</p>
            <Button variant="ghost" size="sm">
              Learn More →
            </Button>
          </Card>
        ))}
      </div>

      {/* FAQs */}
      <Card>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-900 text-left">{faq.question}</span>
                {expandedFaq === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                )}
              </button>
              {expandedFaq === index && (
                <div className="px-4 pb-4 text-sm text-gray-600">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Still Need Help */}
      <Card className="bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="text-center py-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Still need help?
          </h3>
          <p className="text-gray-600 mb-6">
            Our support team is always ready to assist you
          </p>
          <Button variant="primary">
            Contact Support
          </Button>
        </div>
      </Card>
    </div>
  )
}

