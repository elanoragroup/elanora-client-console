'use client'

import React, { useState, useMemo } from 'react'
import { blogPosts, categories } from '@/lib/blog-data'
import BlogCard from '@/components/blog/BlogCard'
import CategoryFilter from '@/components/blog/CategoryFilter'
import SearchBar from '@/components/blog/SearchBar'
import Navbar from '@/components/layout/BlogNavbar'
import './blog.css'
import '@/app/landing.css'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function BlogPage() {
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [searchQuery, setSearchQuery] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const postsPerPage = 6

    // Filter posts based on category and search query
    const filteredPosts = useMemo(() => {
        return blogPosts.filter((post) => {
            const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory
            const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())

            return matchesCategory && matchesSearch
        })
    }, [selectedCategory, searchQuery])

    // Pagination logic
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
    const currentPosts = filteredPosts.slice(
        (currentPage - 1) * postsPerPage,
        currentPage * postsPerPage
    )

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category)
        setCurrentPage(1) // Reset to first page on filter change
    }

    const handleSearch = (query: string) => {
        setSearchQuery(query)
        setCurrentPage(1) // Reset to first page on search
    }

    return (
        <>
            <Navbar />
            <div className="blog-page">
                {/* Hero Section */}
                <section className="blog-hero">
                    <div className="blog-hero-content">
                        <h1 className="blog-hero-title">Insights & Expertise</h1>
                        <p className="blog-hero-subtitle">
                            Discover the latest trends, expert advice, and practical tips to help your business thrive in today&apos;s dynamic landscape.
                        </p>
                    </div>
                </section>

                <div className="blog-container">
                    {/* Filters Section */}
                    <div className="blog-filters">
                        <div className="filters-container">
                            <div className="filter-group">
                                <h3 className="filter-label">Search Articles</h3>
                                <SearchBar onSearch={handleSearch} />
                            </div>

                            <div className="filter-group">
                                <h3 className="filter-label">Filter by Category</h3>
                                <CategoryFilter
                                    categories={categories}
                                    selectedCategory={selectedCategory}
                                    onSelectCategory={handleCategoryChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Blog Grid */}
                    <main className="blog-main">
                        {filteredPosts.length > 0 ? (
                            <>
                                <div className="blog-grid">
                                    {currentPosts.map((post) => (
                                        <BlogCard key={post.id} post={post} />
                                    ))}
                                </div>

                                {totalPages > 1 && (
                                    <div className="pagination">
                                        <button
                                            className="page-btn"
                                            disabled={currentPage === 1}
                                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                        >
                                            <ChevronLeft size={20} />
                                        </button>

                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                            <button
                                                key={page}
                                                className={`page-btn ${currentPage === page ? 'active' : ''}`}
                                                onClick={() => setCurrentPage(page)}
                                            >
                                                {page}
                                            </button>
                                        ))}

                                        <button
                                            className="page-btn"
                                            disabled={currentPage === totalPages}
                                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                        >
                                            <ChevronRight size={20} />
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="no-results">
                                <h3>No articles found</h3>
                                <p>Try adjusting your search or filter criteria to find what you&apos;re looking for.</p>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </>
    )
}
