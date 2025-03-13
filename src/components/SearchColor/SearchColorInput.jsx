import React, { useState } from 'react'
import './SearchColorInput.css'

const SearchColorInput = ({ onSearch }) => {
  const [query, setQuery] = useState('')

  const handleChange = (e) => {
    const value = e.target.value
    setQuery(value)
    onSearch(value)
  }

  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="Pretrazi boje..."
        value={query}
        onChange={handleChange}
      />
    </div>
  )
}

export default SearchColorInput
