import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()

    // Get the current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    console.log('Testing documents table for user:', user.id)

    // Test 1: Check if documents table exists
    const { data: tableCheck, error: tableError } = await supabase
      .from('documents')
      .select('*')
      .limit(1)

    if (tableError) {
      console.error('Table check error:', tableError)
      return NextResponse.json({
        error: 'Documents table issue',
        details: tableError.message,
        code: tableError.code
      }, { status: 500 })
    }

    // Test 2: Try a simple insert to test RLS
    const testData = {
      user_id: user.id,
      filename: 'test-file.txt',
      original_filename: 'test-file.txt',
      file_path: 'test-file.txt', // Add the missing file_path field
      file_size: 100,
      mime_type: 'text/plain',
      document_type: 'other',
      uploaded_by: user.id,
    }

    console.log('Testing insert with data:', testData)

    const { data: insertTest, error: insertError } = await supabase
      .from('documents')
      .insert(testData)
      .select()
      .single()

    if (insertError) {
      console.error('Insert test error:', insertError)
      return NextResponse.json({
        error: 'Insert test failed',
        details: insertError.message,
        code: insertError.code,
        hint: insertError.hint
      }, { status: 500 })
    }

    // Clean up test data
    await supabase
      .from('documents')
      .delete()
      .eq('id', insertTest.id)

    return NextResponse.json({
      success: true,
      message: 'Documents table is working correctly',
      testData: insertTest
    })

  } catch (error) {
    console.error('Diagnostic error:', error)
    return NextResponse.json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
