import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export async function GET(request: NextRequest) {
    const supabase = createClient(supabaseUrl, supabaseKey)
    const { searchParams } = new URL(request.url)

    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const featured = searchParams.get('featured')

    try {
        let query = supabase
            .from('blog_posts')
            .select('*')
            .eq('published', true)
            .order('created_at', { ascending: false })

        if (category && category !== 'All') {
            query = query.eq('category', category)
        }

        if (search) {
            query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%`)
        }

        if (featured === 'true') {
            query = query.eq('featured', true)
        }

        const { data, error } = await query

        if (error) {
            console.error('Error fetching blog posts:', error)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json({ posts: data })
    } catch (error) {
        console.error('Error in GET /api/blog:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    const supabase = createClient(supabaseUrl, supabaseKey)

    try {
        const body = await request.json()

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

        // Insert the blog post
        const { data, error } = await supabase
            .from('blog_posts')
            .insert([{
                ...body,
                author_id: user.id,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }])
            .select()
            .single()

        if (error) {
            console.error('Error creating blog post:', error)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json({ post: data }, { status: 201 })
    } catch (error) {
        console.error('Error in POST /api/blog:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
