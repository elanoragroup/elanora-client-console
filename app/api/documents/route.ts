import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()

    // Get the current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      console.error('Auth error:', authError)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    console.log('User authenticated:', user.id, user.email)

    // Fetch documents for the user
    const { data: documents, error } = await supabase
      .from('documents')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching documents:', error)
      return NextResponse.json({ error: 'Failed to fetch documents' }, { status: 500 })
    }

    console.log('Documents fetched successfully:', documents?.length || 0)
    return NextResponse.json({ documents })
  } catch (error) {
    console.error('Documents API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()

    // Get the current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      console.error('Auth error:', authError)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    console.log('User authenticated for upload:', user.id, user.email)

    const formData = await request.formData()
    const file = formData.get('file') as File
    const documentType = formData.get('document_type') as string
    const documentName = formData.get('document_name') as string
    const description = formData.get('description') as string
    const serviceId = formData.get('service_id') as string
    const requestId = formData.get('request_id') as string

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size too large (max 10MB)' }, { status: 400 })
    }

    // Generate unique filename
    const fileExt = file.name.split('.').pop()
    const fileName = `${user.id}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`

    console.log('Uploading file:', fileName, 'Size:', file.size)

    // Upload file to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('documents')
      .upload(fileName, file)

    if (uploadError) {
      console.error('Error uploading file:', uploadError)
      return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 })
    }

    console.log('File uploaded successfully:', uploadData)

    // Save document metadata to database
    console.log('Attempting to save document metadata:', {
      user_id: user.id,
      filename: fileName,
      original_filename: file.name,
      document_name: documentName || file.name,
      file_size: file.size,
      mime_type: file.type,
      document_type: documentType || 'other',
      description: description || null,
      uploaded_by: user.id,
      service_id: serviceId || null,
      request_id: requestId || null,
    })

    const { data: document, error: dbError } = await supabase
      .from('documents')
      .insert({
        user_id: user.id,
        filename: fileName,
        original_filename: file.name,
        document_name: documentName || file.name,
        file_path: fileName,
        file_size: file.size,
        mime_type: file.type,
        document_type: documentType || 'other',
        description: description || null,
        uploaded_by: user.id,
        service_id: serviceId || null,
        request_id: requestId || null,
      })
      .select()
      .single()

    if (dbError) {
      console.error('Error saving document metadata:', dbError)
      console.error('Database error details:', {
        code: dbError.code,
        message: dbError.message,
        details: dbError.details,
        hint: dbError.hint
      })
      // Clean up uploaded file if database insert fails
      await supabase.storage.from('documents').remove([fileName])
      return NextResponse.json({
        error: 'Failed to save document metadata',
        details: dbError.message,
        code: dbError.code
      }, { status: 500 })
    }

    console.log('Document metadata saved successfully:', document)
    return NextResponse.json({ document })
  } catch (error) {
    console.error('Document upload error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
