// src/components/ColorList.js
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setError, removeColor, addColor } from '../../store/colorSlice'
import AddColorInput from '../AddColorInput/AddColorInput'
import './ColorList.css'
import { deleteColor, addColorApi } from '../../apiCalls/ApiCalls'
import SearchColorInput from '../SearchColor/SearchColorInput'
import Button from '../Button/Button'
import useFetchColors from '../../customHooks/useFetchColors'
import StatusMessage from '../StatusMessage/StatusMessage'
import { toast } from 'react-toastify'

const ColorList = () => {
  const dispatch = useDispatch()
  const { colors, status, error } = useSelector((state) => state.colors)
  const [showAddColorModal, setShowAddColorModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredColors, setFilteredColors] = useState([])

  // Custom hook inicijalno fetchovanje bolja iz db.json
  useFetchColors() // Pozivamo custom hook

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
      const addedColor = await addColorApi(newColor) // poziv api fun iz apiCalls
      if (addColor) {
        dispatch(addColor(addedColor)) // dodavanje boje u rdux state
        toast.success(`Uspesno dodata ${newColor.name} boja`)
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
      toast.success('Boja uspesno obrisana!')
    } catch (error) {
      dispatch(setError('Greska pri brisanju boje'))
      console.error('Error', error)
    }
  }

  console.log('COLORSss', colors)

  return (
    <div className="color-list-container">
      {/* Loading */}
      <StatusMessage status={status} error={error} />

      {/* Add Color Modal */}
      {showAddColorModal && (
        <AddColorInput
          onAddColor={handleAddColor}
          showModal={setShowAddColorModal}
        />
      )}

      <h2 className="title">Lista Boja</h2>

      {/* Search And AddBtn Wrapper */}
      <div className="wrapper">
        <SearchColorInput onSearch={setSearchQuery} />
        <Button
          btnFun={() => setShowAddColorModal(true)}
          btnStyle={'add-btn'}
          title={'Dodaj'}
        />
      </div>

      {/* List of Filtere Colors */}
      <ul className="color-list">
        {filteredColors.map(({ name, hex, id }) => (
          <li key={id} className="color-item" style={{ backgroundColor: hex }}>
            <span className="color-name">
              {name} - {hex}
            </span>

            <Button
              btnFun={() => handleRemoveColor(id)}
              btnStyle={'delete-btn'}
              title={'Obrisi'}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ColorList
