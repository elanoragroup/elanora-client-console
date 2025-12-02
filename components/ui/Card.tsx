import React from 'react'
import clsx from 'clsx'

interface CardProps {
  children: React.ReactNode
  className?: string
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hover?: boolean
}

export default function Card({ 
  children, 
  className, 
  padding = 'md',
  hover = false 
}: CardProps) {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }

  return (
    <div
      className={clsx(
        'bg-white rounded-2xl border border-gray-200 shadow-soft',
        paddingClasses[padding],
        hover && 'transition-all duration-200 hover:shadow-soft-lg hover:border-gray-300',
        className
      )}
    >
      {children}
    </div>
  )
}

