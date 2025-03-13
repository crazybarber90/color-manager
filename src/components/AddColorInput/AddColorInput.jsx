import React, { useState } from 'react'
import './AddColorInput.css'

const AddColorInput = ({ onAddColor, showModal }) => {
  const [newColor, setNewColor] = useState({
    name: '',
    hex: '',
  })

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault()
    if (newColor.name && newColor.hex) {
      onAddColor({ id: Date.now(), ...newColor })
    }
  }

  return (
    <div className="add-color-container">
      <div className="add-color-card">
        <h3>Add new color</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="colorName">Color Name:</label>
            <input
              type="text"
              id="colorName"
              value={newColor.name}
              onChange={(e) =>
                setNewColor({ ...newColor, name: e.target.value })
              }
              placeholder="Enter color name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="colorHex">Hex Code:</label>
            <input
              type="text"
              id="colorHex"
              value={newColor.hex}
              onChange={(e) =>
                setNewColor({ ...newColor, hex: e.target.value })
              }
              placeholder="#FFFFFF"
              required
            />
          </div>

          <div className="button-group">
            <button type="submit" className="add-btn">
              Add Color
            </button>
            <button
              type="button"
              onClick={() => showModal(false)}
              className="cancel-btn"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddColorInput
