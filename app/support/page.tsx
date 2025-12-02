'use client'

import React from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { HeadphonesIcon, Phone, Mail, MessageSquare, Clock } from 'lucide-react'

export default function SupportPage() {
  return (
    <div className="max-w-[1200px] mx-auto space-y-6">
      {/* Page Header */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
              <HeadphonesIcon className="w-8 h-8 text-primary" />
              Support Center
            </h1>
            <p className="text-gray-600">
              Get help from our dedicated support team
            </p>
          </div>
        </div>
      </div>

      {/* Support Status */}
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">Support Status</h2>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">Available Now</span>
            </div>
          </div>
          <Badge variant="success">Online</Badge>
        </div>
      </Card>

      {/* Contact Methods */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card hover className="text-center">
          <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Phone className="w-8 h-8 text-primary" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Phone Support</h3>
          <p className="text-sm text-gray-600 mb-4">Speak directly with our team</p>
          <p className="text-primary font-semibold mb-4">+91 98765 43210</p>
          <Button variant="outline" size="sm" className="w-full">
            Call Now
          </Button>
        </Card>

        <Card hover className="text-center">
          <div className="w-16 h-16 bg-accent-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-accent" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
          <p className="text-sm text-gray-600 mb-4">Get a response within 24 hours</p>
          <p className="text-primary font-semibold mb-4">support@elanora.com</p>
          <Button variant="outline" size="sm" className="w-full">
            Send Email
          </Button>
        </Card>

        <Card hover className="text-center">
          <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Live Chat</h3>
          <p className="text-sm text-gray-600 mb-4">Instant support via chat</p>
          <p className="text-green-600 font-semibold mb-4">Available Now</p>
          <Button variant="primary" size="sm" className="w-full">
            Start Chat
          </Button>
        </Card>
      </div>

      {/* Support Hours */}
      <Card>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center">
            <Clock className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-2">Support Hours</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Monday - Friday</p>
                <p className="text-sm text-gray-600">9:00 AM - 6:00 PM IST</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Saturday</p>
                <p className="text-sm text-gray-600">10:00 AM - 4:00 PM IST</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Assigned CA */}
      <Card>
        <h3 className="font-semibold text-gray-900 mb-4">Your Assigned Chartered Accountant</h3>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-700 rounded-2xl flex items-center justify-center">
            <span className="text-white font-bold text-xl">RK</span>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-gray-900">Rajesh Kumar</p>
            <p className="text-sm text-gray-600">Senior Chartered Accountant</p>
            <p className="text-sm text-gray-500 mt-1">12+ years experience in GST & Corporate Tax</p>
          </div>
          <Button variant="primary" icon={<MessageSquare className="w-4 h-4" />}>
            Contact CA
          </Button>
        </div>
      </Card>
    </div>
  )
}

