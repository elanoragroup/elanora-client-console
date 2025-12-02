'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '@/contexts/AuthContext'
import './landing.css'

export default function LandingPage() {
  const { user, signOut } = useAuth()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    message: ''
  })

  const handleSignOut = async () => {
    await signOut()
    setIsDropdownOpen(false)
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Add form submission logic here
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.user-menu')) {
        setIsDropdownOpen(false)
      }
    }

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropdownOpen])

  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            <Link href="/" style={{ textDecoration: 'none' }}>
              <Image src="/elanora-logo-new.png" alt="Elanora Group" className="logo-image" width={200} height={50} priority />
            </Link>
          </div>
          <ul className="nav-menu">
            <li><a href="#home" className="nav-link">Home</a></li>
            <li><a href="#services" className="nav-link">Services</a></li>
            <li><a href="#blog" className="nav-link">Blog</a></li>
            <li><a href="#about" className="nav-link">About Us</a></li>
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

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-background-wrapper">
          <Image src="/plane-illustration.png" alt="Business Solutions Illustration" className="hero-background-image" fill style={{ objectFit: 'cover' }} priority />
        </div>
        <div className="hero-content-overlay">
          <h1 className="hero-headline">
            Behind every strong business is a trusted advisor
          </h1>
          <p className="hero-tagline">
            Let Elanora be yours!
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-section" id="contact">
        <div className="contact-container">
          <div className="contact-form-wrapper">
            <h2 className="contact-heading">Contact Form</h2>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="mobile">Mobile no.</label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Leave a message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleFormChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn-submit">Submit</button>
              <p className="form-disclaimer">Your name won&apos;t be shared. Never submit passwords.</p>
            </form>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-portfolio" id="services">
        <div className="services-container">
          <h2 className="section-heading">Our Service Portfolio</h2>
          <div className="services-grid">
            <div className="service-item">
              <div className="service-icon">
                <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="8" y="12" width="48" height="40" rx="2" />
                  <line x1="8" y1="20" x2="56" y2="20" />
                  <line x1="20" y1="30" x2="44" y2="30" />
                  <line x1="20" y1="38" x2="44" y2="38" />
                </svg>
              </div>
              <h3>Accounting & Bookkeeping</h3>
            </div>
            <div className="service-item">
              <div className="service-icon">
                <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="12" y="8" width="40" height="48" rx="2" />
                  <line x1="20" y1="20" x2="44" y2="20" />
                  <line x1="20" y1="28" x2="44" y2="28" />
                  <line x1="20" y1="36" x2="36" y2="36" />
                </svg>
              </div>
              <h3>Tax Consultation</h3>
            </div>
            <div className="service-item">
              <div className="service-icon">
                <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="32" cy="32" r="20" />
                  <path d="M32 22v10l6 6" />
                </svg>
              </div>
              <h3>Payroll</h3>
            </div>
            <div className="service-item">
              <div className="service-icon">
                <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="10" y="16" width="44" height="32" rx="2" />
                  <circle cx="32" cy="32" r="8" />
                  <line x1="18" y1="24" x2="22" y2="24" />
                </svg>
              </div>
              <h3>Finance</h3>
            </div>
            <div className="service-item">
              <div className="service-icon">
                <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="32" cy="20" r="8" />
                  <path d="M16 48c0-8.8 7.2-16 16-16s16 7.2 16 16" />
                </svg>
              </div>
              <h3>HR Solutions</h3>
            </div>
            <div className="service-item">
              <div className="service-icon">
                <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M32 12l-20 12v20l20 12 20-12V24z" />
                  <path d="M32 32v12" />
                  <path d="M12 24l20 12 20-12" />
                </svg>
              </div>
              <h3>Legal</h3>
            </div>
            <div className="service-item">
              <div className="service-icon">
                <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="12" y="12" width="40" height="40" rx="2" />
                  <path d="M22 32l8 8 12-16" />
                </svg>
              </div>
              <h3>Compliance</h3>
            </div>
            <div className="service-item service-item-highlight">
              <div className="service-icon">
                <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="32" cy="32" r="20" />
                  <line x1="32" y1="24" x2="32" y2="32" />
                  <line x1="32" y1="38" x2="32" y2="40" />
                </svg>
              </div>
              <h3>Accounting Software</h3>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section" id="about">
        <div className="about-container">
          <div className="about-content">
            <h2 className="about-heading">About Elanora Group</h2>
            <p className="about-text">
              At Elanora Group, we are a team of highly skilled and experienced professionals dedicated to providing top-notch Accounting, Legal, Taxation, and Technology solutions. Our mission is to empower businesses with reliable expertise, Real results.
            </p>
            <p className="about-text">
              We pride ourselves on our commitment to excellence, integrity, and client satisfaction. Whether you&apos;re a startup or an established enterprise, we tailor our services to meet your unique needs.
            </p>
          </div>
          <div className="about-image">
            <Image src="/elanora-logo.png.png" alt="Elanora Building" width={500} height={400} />
          </div>
        </div>
      </section>

      {/* Accounting Section */}
      <section className="accounting-section">
        <div className="accounting-container">
          <h2 className="section-heading">Accounting</h2>
          <div className="accounting-content">
            <div className="accounting-info">
              <div className="accounting-card">
                <h3>Background</h3>
                <p>
                  Our accounting services are designed to provide comprehensive financial management solutions. We handle everything from basic bookkeeping to complex financial analysis, ensuring your business stays compliant and profitable.
                </p>
              </div>
              <div className="accounting-card">
                <h3>Services</h3>
                <p>
                  • Financial Statement Preparation<br />
                  • Monthly Bookkeeping<br />
                  • Tax Planning & Preparation<br />
                  • Audit Support<br />
                  • Financial Consulting
                </p>
              </div>
            </div>
            <div className="accounting-image">
              <Image src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop" alt="Accounting Services" width={800} height={600} />
            </div>
          </div>
        </div>
      </section>

      {/* Quality Section */}
      <section className="quality-section">
        <div className="quality-container">
          <div className="quality-image">
            <Image src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop" alt="Quality Assurance" width={800} height={600} />
          </div>
          <div className="quality-content">
            <div className="quality-stars">
              ⭐⭐⭐⭐⭐
            </div>
            <h2>Quality You Can Trust</h2>
            <p>
              We maintain the highest standards of quality in all our services. Our team of certified professionals ensures accuracy, compliance, and excellence in every engagement.
            </p>
          </div>
        </div>
      </section>

      {/* HR Solutions Section */}
      <section className="hr-section">
        <div className="hr-container">
          <h2 className="section-heading">HR Solutions</h2>
          <div className="hr-content">
            <div className="hr-info">
              <div className="hr-card">
                <h3>Background</h3>
                <p>
                  Our HR solutions are tailored to help businesses manage their most valuable asset - their people. We provide comprehensive HR services that streamline operations and enhance employee satisfaction.
                </p>
              </div>
              <div className="hr-card">
                <h3>Services</h3>
                <p>
                  • Recruitment & Staffing<br />
                  • Payroll Management<br />
                  • Employee Benefits Administration<br />
                  • Performance Management<br />
                  • HR Compliance
                </p>
              </div>
            </div>
            <div className="hr-image">
              <Image src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop" alt="HR Solutions" width={800} height={600} />
            </div>
          </div>
        </div>
      </section>

      {/* Innovation Section */}
      <section className="innovation-section">
        <div className="innovation-container">
          <div className="innovation-content">
            <h2>Empowering Businesses through Innovative Solutions</h2>
            <div className="innovation-features">
              <h3>OUR SERVICES</h3>
              <ul>
                <li>✓ HR Consulting</li>
                <li>✓ IT Consulting</li>
                <li>✓ Legal Services</li>
                <li>✓ Compliance Management</li>
                <li>✓ Financial Advisory</li>
              </ul>
            </div>
          </div>
          <div className="innovation-image">
            <Image src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=600&fit=crop" alt="Team Collaboration" width={800} height={600} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-column">
            <h4>About</h4>
            <p>
              Elanora Group delivers trusted Accounting, Legal, Taxation and Technology solutions designed for growing businesses. Reliable expertise. Real results.
            </p>
          </div>

          <div className="footer-column">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#blog">Blog</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Contact</h4>
            <p>Pune, Maharashtra, India</p>
            <p><a href="tel:+919322114675">+91 9322114675</a></p>
            <p><a href="mailto:kalpak.elanora@gmail.com">kalpak.elanora@gmail.com</a></p>
          </div>

          <div className="footer-column">
            <div className="footer-cta">
              <button className="btn-callback">Get a free callback</button>
            </div>
            <div className="footer-social">
              <a href="#" aria-label="Instagram">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
                  <path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="#" aria-label="Twitter">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025 Elanora Group. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}