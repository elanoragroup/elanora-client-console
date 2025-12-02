import React from 'react'
import clsx from 'clsx'

interface ProgressBarProps {
  value: number
  max?: number
  showLabel?: boolean
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'accent' | 'success' | 'warning' | 'danger'
}

export default function ProgressBar({
  value,
  max = 100,
  showLabel = false,
  size = 'md',
  color = 'primary',
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100)

  const heightClasses = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3',
  }

  const colorClasses = {
    primary: 'bg-primary',
    accent: 'bg-accent',
    success: 'bg-green-500',
    warning: 'bg-amber-500',
    danger: 'bg-red-500',
  }

  return (
    <div className="w-full">
      <div className={clsx('w-full bg-gray-200 rounded-full overflow-hidden', heightClasses[size])}>
        <div
          className={clsx('h-full rounded-full transition-all duration-500', colorClasses[color])}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <p className="text-xs text-gray-600 mt-1 text-right">{Math.round(percentage)}%</p>
      )}
    </div>
  )
}

