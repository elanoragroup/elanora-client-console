import React from 'react'
import Card from './Card'
import { LucideIcon } from 'lucide-react'
import clsx from 'clsx'

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: {
    value: string
    isPositive: boolean
  }
  iconColor?: string
  iconBgColor?: string
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  iconColor = 'text-primary',
  iconBgColor = 'bg-primary-50',
}: StatCardProps) {
  return (
    <Card hover>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-2">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
          {trend && (
            <p className={clsx(
              'text-xs font-medium',
              trend.isPositive ? 'text-green-600' : 'text-red-600'
            )}>
              {trend.isPositive ? '↑' : '↓'} {trend.value}
            </p>
          )}
        </div>
        <div className={clsx('p-3 rounded-xl', iconBgColor)}>
          <Icon className={clsx('w-6 h-6', iconColor)} />
        </div>
      </div>
    </Card>
  )
}

