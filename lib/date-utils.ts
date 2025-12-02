// Date utility functions to prevent hydration errors
import { format, isValid, parseISO } from 'date-fns'

// Consistent date formatting to prevent hydration errors
export const formatDate = (date: string | Date, formatString: string = 'dd/MM/yyyy'): string => {
  try {
    let dateObj: Date
    
    if (typeof date === 'string') {
      // Try to parse ISO string first, then fallback to Date constructor
      dateObj = parseISO(date)
      if (!isValid(dateObj)) {
        dateObj = new Date(date)
      }
    } else {
      dateObj = date
    }
    
    if (!isValid(dateObj)) {
      return 'Invalid Date'
    }
    
    return format(dateObj, formatString)
  } catch (error) {
    console.error('Date formatting error:', error)
    return 'Invalid Date'
  }
}

// Common date formats
export const dateFormats = {
  short: 'dd/MM/yyyy',
  long: 'dd MMMM yyyy',
  time: 'dd/MM/yyyy HH:mm',
  monthYear: 'MMM yyyy',
} as const

// Safe date formatting that works on both server and client
export const safeFormatDate = (date: string | Date, formatString: string = 'dd/MM/yyyy'): string => {
  if (typeof window === 'undefined') {
    // Server-side: use consistent formatting
    return formatDate(date, formatString)
  } else {
    // Client-side: use the same formatting
    return formatDate(date, formatString)
  }
}
