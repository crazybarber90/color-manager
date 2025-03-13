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
        <h3>Dodaj Novu Boju</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="colorName">Ime Boje:</label>
            <input
              type="text"
              id="colorName"
              value={newColor.name}
              onChange={(e) =>
                setNewColor({ ...newColor, name: e.target.value })
              }
              placeholder="Unesi ime boje"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="colorHex">Hex Kod:</label>
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
              Dodaj
            </button>
            <button
              type="button"
              onClick={() => showModal(false)}
              className="cancel-btn"
            >
              Odustani
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddColorInput
