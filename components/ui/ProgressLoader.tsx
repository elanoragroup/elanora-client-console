'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ProgressLoaderProps {
  isLoading: boolean
  progress?: number
  text?: string
}

export default function ProgressLoader({
  isLoading,
  progress = 0,
  text = 'Loading...'
}: ProgressLoaderProps) {
  const [displayProgress, setDisplayProgress] = useState(0)

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setDisplayProgress(prev => {
          if (prev >= progress) return progress
          return prev + Math.random() * 10
        })
      }, 200) // Optimized: 100ms -> 200ms

      return () => clearInterval(interval)
    } else {
      setDisplayProgress(0)
    }
  }, [isLoading, progress])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute top-0 left-0 right-0 z-40"
        >
          {/* Progress Bar */}
          <motion.div
            className="h-1 bg-primary"
            initial={{ width: '0%' }}
            animate={{ width: `${Math.min(displayProgress, 100)}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />

          {/* Loading Content */}
          <div className="bg-white/90 backdrop-blur-sm border-b border-gray-200">
            <div className="max-w-4xl mx-auto px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.div
                    className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <span className="text-sm font-medium text-gray-700">{text}</span>
                </div>
                <span className="text-sm text-gray-500">
                  {Math.round(displayProgress)}%
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
