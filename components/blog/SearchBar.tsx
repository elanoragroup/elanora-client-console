'use client'

import React, { useState } from 'react'
import { Search } from 'lucide-react'

interface SearchBarProps {
    onSearch: (query: string) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
    const [query, setQuery] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSearch(query)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = e.target.value
        setQuery(newQuery)
        onSearch(newQuery)
    }

    return (
        <form onSubmit={handleSubmit} className="search-bar-container">
            <div className="search-input-wrapper">
                <Search className="search-icon" size={20} />
                <input
                    type="text"
                    placeholder="Search articles..."
                    value={query}
                    onChange={handleChange}
                    className="search-input"
                />
            </div>
        </form>
    )
}
