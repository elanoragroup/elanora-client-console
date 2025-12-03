'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '@/contexts/AuthContext'

export default function Navbar() {
    const { user, signOut } = useAuth()
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const handleSignOut = async () => {
        await signOut()
        setIsDropdownOpen(false)
    }

    return (
        <nav className="navbar">
            <div className="nav-container">
                <div className="logo">
                    <Link href="/" style={{ textDecoration: 'none' }}>
                        <Image src="/elanora-logo-new.png" alt="Elanora Group" className="logo-image" width={200} height={50} priority />
                    </Link>
                </div>
                <ul className="nav-menu">
                    <li><Link href="/#home" className="nav-link">Home</Link></li>
                    <li><Link href="/#services" className="nav-link">Services</Link></li>
                    <li><Link href="/blog" className="nav-link">Blog</Link></li>
                    <li><Link href="/#about" className="nav-link">About Us</Link></li>
                    <li id="auth-nav-item">
                        {user ? (
                            <div className="user-menu">
                                <div
                                    className="user-avatar"
                                    id="user-avatar"
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                    </svg>
                                </div>
                                <div
                                    className={`user-dropdown ${isDropdownOpen ? 'active' : ''}`}
                                    id="user-dropdown"
                                >
                                    <div className="dropdown-header">
                                        <div className="user-info">
                                            <div className="user-avatar-small">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                                </svg>
                                            </div>
                                            <div className="user-details">
                                                <div className="user-name">{user.email}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="dropdown-menu">
                                        <Link href="/dashboard" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
                                            </svg>
                                            Dashboard
                                        </Link>
                                        <button className="dropdown-item" onClick={handleSignOut}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
                                            </svg>
                                            Sign Out
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Link href="/login" className="btn btn-outline">Sign In</Link>
                        )}
                    </li>
                </ul>
            </div>
        </nav>
    )
}
