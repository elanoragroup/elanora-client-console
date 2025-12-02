// Performance optimization utilities
import React, { memo, lazy, Suspense, ReactElement } from 'react'

// Lazy loading wrapper for better code splitting
export const createLazyComponent = (importFn: () => Promise<any>) => {
  const LazyComponent = lazy(importFn)
  
  const WrappedComponent = (props: any): ReactElement => {
    const fallbackElement = React.createElement('div', {
      className: 'animate-pulse bg-gray-200 rounded-lg h-32'
    })
    
    return React.createElement(Suspense, {
      fallback: fallbackElement
    }, React.createElement(LazyComponent, props))
  }
  
  WrappedComponent.displayName = 'LazyComponentWrapper'
  return WrappedComponent
}

// Memo wrapper for expensive components
export const memoize = <T extends React.ComponentType<any>>(Component: T) => {
  return memo(Component)
}

// Debounce utility for search and input optimization
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Throttle utility for scroll and resize optimization
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}
