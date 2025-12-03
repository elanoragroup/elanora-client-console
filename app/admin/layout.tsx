'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { user, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        console.log('Admin Layout - Loading:', loading, 'User:', user?.email)

        if (!loading) {
            // Redirect to login if not authenticated
            if (!user) {
                console.log('No user found, redirecting to login')
                router.push('/login?redirect=/admin/blog')
                return
            }

            // Check if user is admin
            if (user.email !== 'kalpak.elanora@gmail.com') {
                console.log('User is not admin:', user.email)
                router.push('/')
                return
            }

            console.log('User is admin, showing admin console')
        }
    }, [user, loading, router])

    // Show loading state
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        )
    }

    // Don't render admin content if not authenticated or not admin
    if (!user || user.email !== 'kalpak.elanora@gmail.com') {
        return null
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Admin Navbar */}
            <nav className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <h1 className="text-xl font-bold text-gray-900">Elanora Admin Console</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-600">{user.email}</span>
                            <a
                                href="/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-blue-600 hover:text-blue-800"
                            >
                                View Site
                            </a>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Admin Sidebar + Content */}
            <div className="flex">
                {/* Sidebar */}
                <aside className="w-64 bg-white shadow-sm min-h-[calc(100vh-4rem)]">
                    <nav className="p-4 space-y-2">
                        <a
                            href="/admin/blog"
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium"
                        >
                            📝 Blog Posts
                        </a>
                        <a
                            href="/dashboard"
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                        >
                            📊 Dashboard
                        </a>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-8">
                    {children}
                </main>
            </div>
        </div>
    )
}
