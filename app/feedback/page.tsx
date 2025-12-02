'use client'

import React, { useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { motion } from 'framer-motion'
import { safeFormatDate } from '@/lib/date-utils'
import {
  MessageCircle,
  Star,
  Send,
  CheckCircle2,
  ThumbsUp,
} from 'lucide-react'

export default function FeedbackPage() {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [allowTestimonial, setAllowTestimonial] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    setSubmitted(true)
  }

  const recentServices = [
    {
      id: '1',
      name: 'Annual Audit FY 2023-24',
      completedDate: '2024-09-30',
      assignedPerson: 'Rajesh Kumar',
    },
    {
      id: '2',
      name: 'Income Tax Return Filing',
      completedDate: '2024-07-31',
      assignedPerson: 'Priya Sharma',
    },
    {
      id: '3',
      name: 'GST Audit FY 2023-24',
      completedDate: '2024-08-15',
      assignedPerson: 'Amit Patel',
    },
  ]

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="text-center py-12">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Thank You for Your Feedback!
              </h2>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                We truly appreciate you taking the time to share your experience with us.
                Your feedback helps us serve you better.
              </p>
              <Button
                variant="primary"
                onClick={() => setSubmitted(false)}
              >
                Submit Another Feedback
              </Button>
            </Card>
          </motion.div>
        </div>
    )
  }

  return (
    <div className="max-w-[1200px] mx-auto space-y-6">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                <MessageCircle className="w-8 h-8 text-primary" />
                Feedback & Testimonials
              </h1>
              <p className="text-gray-600">
                Help us improve by sharing your experience
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Feedback Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Share Your Experience
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Rating */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Overall Satisfaction
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoveredRating(star)}
                          onMouseLeave={() => setHoveredRating(0)}
                          className="transition-transform hover:scale-110"
                        >
                          <Star
                            className={`w-10 h-10 ${
                              star <= (hoveredRating || rating)
                                ? 'fill-accent text-accent'
                                : 'fill-gray-200 text-gray-200'
                            } transition-colors`}
                          />
                        </button>
                      ))}
                      {rating > 0 && (
                        <span className="ml-3 text-sm font-medium text-gray-700">
                          {rating === 5
                            ? 'Excellent'
                            : rating === 4
                            ? 'Very Good'
                            : rating === 3
                            ? 'Good'
                            : rating === 2
                            ? 'Fair'
                            : 'Needs Improvement'}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Service Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Service
                    </label>
                    <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-200">
                      <option value="">Choose a completed service</option>
                      {recentServices.map((service) => (
                        <option key={service.id} value={service.id}>
                          {service.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Feedback Text */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Feedback
                    </label>
                    <textarea
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      rows={6}
                      placeholder="Tell us about your experience with our services..."
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 resize-none"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Minimum 50 characters
                    </p>
                  </div>

                  {/* Testimonial Checkbox */}
                  <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl">
                    <input
                      type="checkbox"
                      id="testimonial"
                      checked={allowTestimonial}
                      onChange={() => setAllowTestimonial(!allowTestimonial)}
                      className="mt-1 w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary-200"
                    />
                    <label htmlFor="testimonial" className="flex-1 text-sm">
                      <span className="font-medium text-gray-900 block mb-1">
                        Use as testimonial
                      </span>
                      <span className="text-gray-600">
                        Allow Elanora to use this feedback as a testimonial on our
                        website and marketing materials
                      </span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="primary"
                    icon={<Send className="w-4 h-4" />}
                    className="w-full"
                  >
                    Submit Feedback
                  </Button>
                </form>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Why Feedback Matters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="bg-gradient-to-br from-primary-50 to-blue-50">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                    <ThumbsUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Why Your Feedback Matters
                    </h3>
                    <p className="text-sm text-gray-600">
                      Your insights help us continuously improve our services and better
                      serve your needs.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Recent Completed Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Recently Completed
                </h3>
                <div className="space-y-3">
                  {recentServices.map((service) => (
                    <div
                      key={service.id}
                      className="p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <h4 className="font-semibold text-sm text-gray-900 mb-1">
                        {service.name}
                      </h4>
                      <p className="text-xs text-gray-600 mb-1">
                        By {service.assignedPerson}
                      </p>
                      <p className="text-xs text-gray-500">
                        Completed: {safeFormatDate(service.completedDate)}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Quick Tips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Feedback Tips
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Be specific about your experience</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Mention what worked well</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Suggest areas for improvement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Be constructive and honest</span>
                  </li>
                </ul>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
  )
}

