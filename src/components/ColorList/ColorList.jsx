// src/components/ColorList.js
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  setColors,
  setStatus,
  setError,
  removeColor,
  addColor,
} from '../../store/colorSlice'
import AddColorInput from '../AddColorInput/AddColorInput'
import './ColorList.css'
import { fetchColors, deleteColor, addColorApi } from '../../apiCalls/ApiCalls'
import SearchColorInput from '../SearchColor/SearchColorInput'

const ColorList = () => {
  const dispatch = useDispatch()
  const { colors, status, error } = useSelector((state) => state.colors)
  const [showAddColorModal, setShowAddColorModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredColors, setFilteredColors] = useState([])

  // inicijalno fetchovanje bolja iz db.json
  useEffect(() => {
    const loaColors = async () => {
      dispatch(setStatus('loading'))
      try {
        const data = await fetchColors()
        dispatch(setColors(data))
        dispatch(setStatus('idle'))
      } catch (err) {
        dispatch(setError('Došlo je do greške'))
        dispatch(setStatus('failed'))
        console.error('Error', err)
      }
    }
    if (status === 'idle') {
      loaColors()
    }
  }, [dispatch])

  // filtriranje boje na osnovu pretrage
  useEffect(() => {
    setFilteredColors(
      colors.filter(
        (color) =>
          color.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          color.hex.includes(searchQuery)
      )
    )
  }, [searchQuery, colors])

  // dodavanje nove boje u redux i db.json
  const handleAddColor = async (newColor) => {
    try {
      const addedColor = await addColorApi(newColor) // poziv api fun
      if (addColor) {
        dispatch(addColor(addedColor)) // dodavanje boje u redux
      }
    } catch (error) {
      console.error('Error adding color:', error)
    }
    setShowAddColorModal(false)
  }

  // brisanje boje
  const handleRemoveColor = async (colorId) => {
    try {
      await deleteColor(colorId)
      dispatch(removeColor(colorId))
    } catch (error) {
      dispatch(setError('Greška pri brisanju boje'))
      console.error('Error', error)
    }
  }

  // loading
  if (status === 'loading') return <p className="loading">Ucitavanje...</p>
  if (status === 'failed') return <p className="error">Greska: {error}</p>

  console.log('COLORS', colors)
  return (
    <div className="color-list-container">
      {showAddColorModal && (
        <AddColorInput
          onAddColor={handleAddColor}
          showModal={setShowAddColorModal}
        />
      )}

      <h2 className="title">Lista Boja</h2>

      <div className="wrapper">
        <SearchColorInput onSearch={setSearchQuery} />
        <button className="add-btn" onClick={() => setShowAddColorModal(true)}>
          Dodaj Boju
        </button>
      </div>
      <ul className="color-list">
        {filteredColors.map(({ name, hex, id }) => (
          <li key={id} className="color-item" style={{ backgroundColor: hex }}>
            <span className="color-name">
              {name} - {hex}
            </span>
            <button
              className="delete-btn"
              onClick={() => handleRemoveColor(id)}
            >
              Obrisi
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ColorList
