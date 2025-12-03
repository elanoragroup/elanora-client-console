import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export async function POST(request: NextRequest) {
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    try {
        // Get the authorization header
        const authHeader = request.headers.get('authorization')
        if (!authHeader) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // Verify the user is authenticated and is admin
        const { data: { user }, error: authError } = await supabase.auth.getUser(
            authHeader.replace('Bearer ', '')
        )

        if (authError || !user || user.email !== 'kalpak.elanora@gmail.com') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const formData = await request.formData()
        const file = formData.get('file') as File

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 })
        }

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json({ error: 'Invalid file type. Only images are allowed.' }, { status: 400 })
        }

        // Validate file size (max 5MB)
        const maxSize = 5 * 1024 * 1024 // 5MB
        if (file.size > maxSize) {
            return NextResponse.json({ error: 'File size exceeds 5MB limit' }, { status: 400 })
        }

        // Generate unique filename
        const fileExt = file.name.split('.').pop()
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
        const filePath = `blog/${fileName}`

        // Convert file to buffer
        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        // Upload to Supabase Storage
        const { data: uploadData, error: uploadError } = await supabase.storage
            .from('blog-images')
            .upload(filePath, buffer, {
                contentType: file.type,
                upsert: false
            })

        if (uploadError) {
            console.error('Error uploading file:', uploadError)
            return NextResponse.json({ error: uploadError.message }, { status: 500 })
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
            .from('blog-images')
            .getPublicUrl(filePath)

        // Save image metadata to database
        const { data: imageData, error: dbError } = await supabase
            .from('blog_images')
            .insert([{
                filename: fileName,
                url: publicUrl,
                size: file.size,
                uploaded_by: user.id
            }])
            .select()
            .single()

        if (dbError) {
            console.error('Error saving image metadata:', dbError)
            // Still return the URL even if metadata save fails
        }

        return NextResponse.json({
            url: publicUrl,
            filename: fileName,
            size: file.size
        }, { status: 201 })

    } catch (error) {
        console.error('Error in POST /api/blog/upload:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
