import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export async function GET(
    request: NextRequest,
    { params }: { params: { slug: string } }
) {
    const supabase = createClient(supabaseUrl, supabaseKey)

    try {
        const { data, error } = await supabase
            .from('blog_posts')
            .select('*')
            .eq('slug', params.slug)
            .eq('published', true)
            .single()

        if (error) {
            if (error.code === 'PGRST116') {
                return NextResponse.json({ error: 'Post not found' }, { status: 404 })
            }
            console.error('Error fetching blog post:', error)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json({ post: data })
    } catch (error) {
        console.error('Error in GET /api/blog/[slug]:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { slug: string } }
) {
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

        // Update the blog post
        const { data, error } = await supabase
            .from('blog_posts')
            .update({
                ...body,
                updated_at: new Date().toISOString()
            })
            .eq('slug', params.slug)
            .select()
            .single()

        if (error) {
            console.error('Error updating blog post:', error)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json({ post: data })
    } catch (error) {
        console.error('Error in PUT /api/blog/[slug]:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { slug: string } }
) {
    const supabase = createClient(supabaseUrl, supabaseKey)

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

        // Delete the blog post
        const { error } = await supabase
            .from('blog_posts')
            .delete()
            .eq('slug', params.slug)

        if (error) {
            console.error('Error deleting blog post:', error)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json({ message: 'Post deleted successfully' })
    } catch (error) {
        console.error('Error in DELETE /api/blog/[slug]:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
