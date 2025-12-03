'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { blogPosts } from '@/lib/blog-data'
import { Calendar, Clock, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from 'lucide-react'
import Navbar from '@/components/layout/BlogNavbar'
import '../blog-post.css'
import '@/app/landing.css'

interface BlogPostPageProps {
    params: {
        slug: string
    }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
    const post = blogPosts.find((p) => p.slug === params.slug)

    if (!post) {
        notFound()
    }

    // Find related posts (same category, excluding current post)
    const relatedPosts = blogPosts
        .filter(p => p.category === post.category && p.id !== post.id)
        .slice(0, 3)

    return (
        <>
            <Navbar />
            <div className="blog-post-page">
                {/* Hero Section */}
                <section className="blog-post-hero">
                    <div className="blog-post-hero-content">
                        <div className="blog-post-category-badge">{post.category}</div>
                        <h1 className="blog-post-title">{post.title}</h1>

                        <div className="blog-post-meta">
                            <div className="blog-post-author-info">
                                <div className="blog-post-author-avatar">
                                    <Image
                                        src={post.author.avatar}
                                        alt={post.author.name}
                                        width={48}
                                        height={48}
                                    />
                                </div>
                                <div className="blog-post-author-details">
                                    <div className="blog-post-author-name">{post.author.name}</div>
                                    <div className="blog-post-author-role">{post.author.role}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <Calendar size={18} />
                                <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Clock size={18} />
                                <span>{post.readTime}</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Content */}
                <div className="blog-post-container">
                    <Link href="/blog" className="blog-post-back-link">
                        <ArrowLeft size={20} />
                        Back to Blog
                    </Link>

                    <div className="blog-post-cover-image">
                        <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            style={{ objectFit: 'cover' }}
                            priority
                        />
                    </div>

                    <div className="blog-post-content-wrapper">
                        <article className="blog-post-article">
                            <div
                                className="blog-post-content"
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />

                            <div className="blog-post-tags-section">
                                <h3 className="blog-post-tags-title">Tags</h3>
                                <div className="blog-post-tags">
                                    {post.tags.map(tag => (
                                        <span key={tag} className="blog-post-tag">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </article>

                        <aside className="blog-post-sidebar">
                            <div className="blog-post-share-widget">
                                <h3 className="blog-post-share-title">
                                    <Share2 size={20} />
                                    Share Article
                                </h3>
                                <div className="blog-post-share-buttons">
                                    <button className="blog-post-share-btn facebook" aria-label="Share on Facebook">
                                        <Facebook size={20} />
                                    </button>
                                    <button className="blog-post-share-btn twitter" aria-label="Share on Twitter">
                                        <Twitter size={20} />
                                    </button>
                                    <button className="blog-post-share-btn linkedin" aria-label="Share on LinkedIn">
                                        <Linkedin size={20} />
                                    </button>
                                </div>
                            </div>
                        </aside>
                    </div>

                    {relatedPosts.length > 0 && (
                        <div className="blog-post-related">
                            <h2 className="blog-post-related-title">Related Articles</h2>
                            <div className="blog-post-related-grid">
                                {relatedPosts.map(relatedPost => (
                                    <div key={relatedPost.id} className="blog-post-related-card">
                                        <div className="blog-post-related-image">
                                            <Image
                                                src={relatedPost.coverImage}
                                                alt={relatedPost.title}
                                                fill
                                                style={{ objectFit: 'cover' }}
                                            />
                                        </div>
                                        <div className="blog-post-related-category">{relatedPost.category}</div>
                                        <h3 className="blog-post-related-card-title">
                                            <Link href={`/blog/${relatedPost.slug}`}>
                                                {relatedPost.title}
                                            </Link>
                                        </h3>
                                        <p className="blog-post-related-excerpt">{relatedPost.excerpt}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
