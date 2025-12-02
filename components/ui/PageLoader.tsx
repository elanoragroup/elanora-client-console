import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LoadingSpinner from './LoadingSpinner'

interface PageLoaderProps {
  isLoading: boolean
  text?: string
}

export default function PageLoader({ isLoading, text = 'Loading...' }: PageLoaderProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 bg-white/80 backdrop-blur-sm z-40 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-soft-lg p-8 border border-gray-200"
          >
            <LoadingSpinner size="lg" text={text} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
