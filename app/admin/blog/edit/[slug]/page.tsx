'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const categories = ['Accounting', 'Tax', 'Legal', 'HR', 'Technology', 'Business']

interface EditBlogPostPageProps {
    params: {
        slug: string
    }
}

export default function EditBlogPostPage({ params }: EditBlogPostPageProps) {
    const router = useRouter()
    const { user } = useAuth()
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [uploading, setUploading] = useState(false)

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        cover_image: '',
        category: 'Business',
        tags: '',
        author_name: '',
        author_avatar: '',
        author_role: '',
        read_time: '',
        featured: false,
        published: false
    })

    useEffect(() => {
        fetchPost()
    }, [params.slug])

    const fetchPost = async () => {
        const supabase = createClient(supabaseUrl, supabaseKey)

        try {
            const { data, error } = await supabase
                .from('blog_posts')
                .select('*')
                .eq('slug', params.slug)
                .single()

            if (error) throw error

            setFormData({
                title: data.title,
                slug: data.slug,
                excerpt: data.excerpt,
                content: data.content,
                cover_image: data.cover_image,
                category: data.category,
                tags: data.tags?.join(', ') || '',
                author_name: data.author_name,
                author_avatar: data.author_avatar || '',
                author_role: data.author_role,
                read_time: data.read_time,
                featured: data.featured,
                published: data.published
            })
        } catch (error) {
            console.error('Error fetching post:', error)
            alert('Failed to load post')
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target

        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked
            setFormData(prev => ({ ...prev, [name]: checked }))
        } else {
            setFormData(prev => ({ ...prev, [name]: value }))
        }
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setUploading(true)
        const supabase = createClient(supabaseUrl, supabaseKey)
        const { data: { session } } = await supabase.auth.getSession()

        if (!session) {
            alert('You must be logged in to upload images')
            setUploading(false)
            return
        }

        try {
            const formData = new FormData()
            formData.append('file', file)

            const response = await fetch('/api/blog/upload', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${session.access_token}`
                },
                body: formData
            })

            if (response.ok) {
                const data = await response.json()
                setFormData(prev => ({ ...prev, cover_image: data.url }))
            } else {
                const error = await response.json()
                alert(`Upload failed: ${error.error}`)
            }
        } catch (error) {
            console.error('Error uploading image:', error)
            alert('Failed to upload image')
        } finally {
            setUploading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent, publish?: boolean) => {
        e.preventDefault()
        setSaving(true)

        const supabase = createClient(supabaseUrl, supabaseKey)
        const { data: { session } } = await supabase.auth.getSession()

        if (!session) {
            alert('You must be logged in to update posts')
            setSaving(false)
            return
        }

        try {
            const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)

            const postData = {
                ...formData,
                tags: tagsArray,
                published: publish !== undefined ? publish : formData.published,
                published_at: (publish !== undefined ? publish : formData.published) ? new Date().toISOString() : null
            }

            const response = await fetch(`/api/blog/${params.slug}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session.access_token}`
                },
                body: JSON.stringify(postData)
            })

            if (response.ok) {
                alert('Post updated successfully!')
                router.push('/admin/blog')
            } else {
                const error = await response.json()
                alert(`Error: ${error.error}`)
            }
        } catch (error) {
            console.error('Error updating post:', error)
            alert('Failed to update post')
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return <div className="text-center py-12">Loading post...</div>
    }

    return (
        <div className="max-w-4xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Edit Blog Post</h1>
                <p className="text-gray-600 mt-2">Update the details below to edit this blog post</p>
            </div>

            <form className="space-y-6">
                {/* Title */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title *
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Slug */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Slug * (URL-friendly version)
                    </label>
                    <input
                        type="text"
                        name="slug"
                        value={formData.slug}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                        disabled
                    />
                    <p className="text-sm text-gray-500 mt-1">Slug cannot be changed after creation</p>
                </div>

                {/* Excerpt */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Excerpt *
                    </label>
                    <textarea
                        name="excerpt"
                        value={formData.excerpt}
                        onChange={handleChange}
                        required
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Content */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Content * (HTML supported)
                    </label>
                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        required
                        rows={15}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                    />
                </div>

                {/* Cover Image */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cover Image *
                    </label>
                    <div className="flex gap-4">
                        <input
                            type="text"
                            name="cover_image"
                            value={formData.cover_image}
                            onChange={handleChange}
                            required
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <label className="relative">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                                disabled={uploading}
                            />
                            <span className="inline-block px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer">
                                {uploading ? 'Uploading...' : 'Upload'}
                            </span>
                        </label>
                    </div>
                    {formData.cover_image && (
                        <img src={formData.cover_image} alt="Cover preview" className="mt-4 w-full h-48 object-cover rounded-lg" />
                    )}
                </div>

                {/* Category & Tags */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Category *
                        </label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tags (comma-separated)
                        </label>
                        <input
                            type="text"
                            name="tags"
                            value={formData.tags}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* Author Info */}
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Author Name
                        </label>
                        <input
                            type="text"
                            name="author_name"
                            value={formData.author_name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Author Role
                        </label>
                        <input
                            type="text"
                            name="author_role"
                            value={formData.author_role}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Read Time
                        </label>
                        <input
                            type="text"
                            name="read_time"
                            value={formData.read_time}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* Checkboxes */}
                <div className="flex gap-6">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            name="featured"
                            checked={formData.featured}
                            onChange={handleChange}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Featured Post</span>
                    </label>
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-6 border-t">
                    <button
                        type="button"
                        onClick={(e) => handleSubmit(e, false)}
                        disabled={saving}
                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                    >
                        Save as Draft
                    </button>
                    <button
                        type="button"
                        onClick={(e) => handleSubmit(e, true)}
                        disabled={saving}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    >
                        {saving ? 'Saving...' : 'Publish'}
                    </button>
                    <button
                        type="button"
                        onClick={() => router.push('/admin/blog')}
                        className="px-6 py-2 text-gray-600 hover:text-gray-800"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}
