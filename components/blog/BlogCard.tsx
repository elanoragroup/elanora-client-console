'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { BlogPost } from '@/lib/blog-data'
import { Calendar, Clock, ArrowRight } from 'lucide-react'

interface BlogCardProps {
    post: BlogPost
}

export default function BlogCard({ post }: BlogCardProps) {
    return (
        <div className="blog-card">
            <div className="blog-card-image-wrapper">
                <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="blog-card-image"
                />
                <div className="blog-card-category">{post.category}</div>
            </div>

            <div className="blog-card-content">
                <div className="blog-card-meta">
                    <div className="flex items-center gap-1">
                        <Calendar size={16} />
                        <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock size={16} />
                        <span>{post.readTime}</span>
                    </div>
                </div>

                <h3 className="blog-card-title">
                    <Link href={`/blog/${post.slug}`}>
                        {post.title}
                    </Link>
                </h3>

                <p className="blog-card-excerpt">{post.excerpt}</p>

                <div className="blog-card-footer">
                    <div className="blog-card-author">
                        <div className="author-avatar">
                            <Image
                                src={post.author.avatar}
                                alt={post.author.name}
                                width={40}
                                height={40}
                            />
                        </div>
                        <span className="author-name">{post.author.name}</span>
                    </div>

                    <Link href={`/blog/${post.slug}`} className="read-more-link">
                        Read More <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </div>
    )
}
