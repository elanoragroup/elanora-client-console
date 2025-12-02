'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useNavigation } from '@/contexts/NavigationContext'

export default function LoadingBar() {
  const pathname = usePathname()
  const { isLoading } = useNavigation()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isLoading) {
      setLoading(true)
    } else {
      // Add a small delay to prevent flash
      const timeout = setTimeout(() => setLoading(false), 150)
      return () => clearTimeout(timeout)
    }
  }, [isLoading])

  if (!loading) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-1 bg-primary-100">
      <div 
        className="h-full bg-primary animate-[loading_0.3s_ease-in-out]"
        style={{
          width: '100%',
          animation: 'loading 0.3s ease-in-out'
        }}
      />
      <style jsx>{`
        @keyframes loading {
          0% { width: 0; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  )
}

