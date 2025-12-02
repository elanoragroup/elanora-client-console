'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigation } from '@/contexts/NavigationContext'
import ProgressLoader from '@/components/ui/ProgressLoader'

interface PageWrapperProps {
  children: React.ReactNode
  className?: string
}

export default function PageWrapper({ children, className = '' }: PageWrapperProps) {
  const [isVisible, setIsVisible] = useState(true) // Start as visible to prevent initial animation
  const [progress, setProgress] = useState(0)
  const { isLoading, isTransitioning } = useNavigation()

  useEffect(() => {
    if (!isLoading && !isTransitioning) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
      setProgress(0)
    }
  }, [isLoading, isTransitioning])

  // Simulate progress when loading - OPTIMIZED
  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval)
            return 90
          }
          return prev + Math.random() * 10
        })
      }, 200) // Optimized: 100ms -> 200ms to reduce CPU usage

      return () => clearInterval(interval)
    }
  }, [isLoading])

  return (
    <div className="relative">
      <motion.div
        initial={false} // Prevent initial animation
        animate={{
          opacity: isVisible ? 1 : 0,
          y: isVisible ? 0 : 20
        }}
        transition={{
          duration: 0.3,
          ease: 'easeOut'
        }}
        className={className}
      >
        {children}
      </motion.div>

      {/* Loading components positioned within main content area */}
      <ProgressLoader isLoading={isLoading} progress={progress} text="Loading page..." />
    </div>
  )
}
