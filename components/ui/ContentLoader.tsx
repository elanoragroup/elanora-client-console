import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LoadingSpinner from './LoadingSpinner'

interface ContentLoaderProps {
  isLoading: boolean
  text?: string
}

export default function ContentLoader({ isLoading, text = 'Loading...' }: ContentLoaderProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 bg-white/60 backdrop-blur-sm z-30 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white/90 rounded-xl shadow-soft-lg p-6 border border-gray-200"
          >
            <LoadingSpinner size="md" text={text} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
