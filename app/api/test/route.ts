import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'

export async function GET(request: NextRequest) {
  try {
    console.log('Test API route called')
    
    const supabase = createServerSupabaseClient()
    
    // Get the current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    console.log('Auth check result:', { user: user?.id, error: authError })
    
    if (authError) {
      console.error('Auth error:', authError)
      return NextResponse.json({ 
        error: 'Auth error', 
        details: authError.message,
        user: null 
      }, { status: 401 })
    }
    
    if (!user) {
      console.log('No user found')
      return NextResponse.json({ 
        error: 'No user', 
        user: null 
      }, { status: 401 })
    }

    console.log('User authenticated:', user.id, user.email)

    return NextResponse.json({ 
      success: true,
      user: {
        id: user.id,
        email: user.email
      },
      message: 'API is working correctly'
    })
  } catch (error) {
    console.error('Test API error:', error)
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
