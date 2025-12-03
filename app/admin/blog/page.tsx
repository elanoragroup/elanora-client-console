'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

interface BlogPost {
    id: string
    slug: string
    title: string
    excerpt: string
    category: string
    published: boolean
    featured: boolean
    created_at: string
    updated_at: string
}

export default function AdminBlogPage() {
    const { user } = useAuth()
    const [posts, setPosts] = useState<BlogPost[]>([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all')
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        fetchPosts()
    }, [])

    const fetchPosts = async () => {
        const supabase = createClient(supabaseUrl, supabaseKey)

        try {
            const { data, error } = await supabase
                .from('blog_posts')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) throw error
            setPosts(data || [])
        } catch (error) {
            console.error('Error fetching posts:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (slug: string) => {
        if (!confirm('Are you sure you want to delete this post?')) return

        const supabase = createClient(supabaseUrl, supabaseKey)
        const { data: { session } } = await supabase.auth.getSession()

        if (!session) {
            alert('You must be logged in to delete posts')
            return
        }

        try {
            const response = await fetch(`/api/blog/${slug}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${session.access_token}`
                }
            })

            if (response.ok) {
                setPosts(posts.filter(p => p.slug !== slug))
                alert('Post deleted successfully')
            } else {
                const data = await response.json()
                alert(`Error: ${data.error}`)
            }
        } catch (error) {
            console.error('Error deleting post:', error)
            alert('Failed to delete post')
        }
    }

    const togglePublish = async (post: BlogPost) => {
        const supabase = createClient(supabaseUrl, supabaseKey)
        const { data: { session } } = await supabase.auth.getSession()

        if (!session) {
            alert('You must be logged in to update posts')
            return
        }

        try {
            const response = await fetch(`/api/blog/${post.slug}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session.access_token}`
                },
                body: JSON.stringify({
                    ...post,
                    published: !post.published,
                    published_at: !post.published ? new Date().toISOString() : null
                })
            })

            if (response.ok) {
                fetchPosts()
            } else {
                const data = await response.json()
                alert(`Error: ${data.error}`)
            }
        } catch (error) {
            console.error('Error updating post:', error)
            alert('Failed to update post')
        }
    }

    const filteredPosts = posts.filter(post => {
        const matchesFilter =
            filter === 'all' ? true :
                filter === 'published' ? post.published :
                    !post.published

        const matchesSearch =
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())

        return matchesFilter && matchesSearch
    })

    if (loading) {
        return <div className="text-center py-12">Loading...</div>
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
                <Link
                    href="/admin/blog/new"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                    + New Post
                </Link>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <div className="flex gap-4 items-center">
                    <input
                        type="text"
                        placeholder="Search posts..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="flex gap-2">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-4 py-2 rounded-lg font-medium ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            All ({posts.length})
                        </button>
                        <button
                            onClick={() => setFilter('published')}
                            className={`px-4 py-2 rounded-lg font-medium ${filter === 'published' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            Published ({posts.filter(p => p.published).length})
                        </button>
                        <button
                            onClick={() => setFilter('draft')}
                            className={`px-4 py-2 rounded-lg font-medium ${filter === 'draft' ? 'bg-yellow-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            Drafts ({posts.filter(p => !p.published).length})
                        </button>
                    </div>
                </div>
            </div>

            {/* Posts List */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                {filteredPosts.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                        No posts found. Create your first post!
                    </div>
                ) : (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Title
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Category
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredPosts.map((post) => (
                                <tr key={post.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-gray-900">{post.title}</div>
                                        <div className="text-sm text-gray-500 truncate max-w-md">{post.excerpt}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                                            {post.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${post.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {post.published ? 'Published' : 'Draft'}
                                        </span>
                                        {post.featured && (
                                            <span className="ml-2 px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                                                Featured
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(post.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end gap-2">
                                            <Link
                                                href={`/admin/blog/edit/${post.slug}`}
                                                className="text-blue-600 hover:text-blue-900"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => togglePublish(post)}
                                                className="text-green-600 hover:text-green-900"
                                            >
                                                {post.published ? 'Unpublish' : 'Publish'}
                                            </button>
                                            <button
                                                onClick={() => handleDelete(post.slug)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}
