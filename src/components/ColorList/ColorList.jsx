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

  // Custom hook initial fetch of colors
  useFetchColors()

  // filtering on search
  useEffect(() => {
    setFilteredColors(
      colors.filter(
        (color) =>
          color.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          color.hex.includes(searchQuery)
      )
    )
  }, [searchQuery, colors])

  // adding new color in redux and db with validation
  const handleAddColor = async (newColor) => {
    if (
      colors.find(
        (color) => color.name === newColor.name || color.hex === newColor.hex
      )
    ) {
      toast.warning('This color allready exist')
    } else {
      try {
        const addedColor = await addColorApi(newColor) // apiCall fun

        if (addColor) {
          dispatch(addColor(addedColor)) // adding in redux state
          toast.success(`Added color  ${newColor.name}`)
          setShowAddColorModal(false)
        }
      } catch (error) {
        console.error('Error adding color:', error)
      }
    }
  }

  // deleting color fun
  const handleRemoveColor = async (colorId) => {
    try {
      await deleteColor(colorId)
      dispatch(removeColor(colorId))
      toast.success('Color deleted!')
    } catch (error) {
      dispatch(setError('Error while deleting color'))
      console.error('Error', error)
    }
  }

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

      <h2 className="title">Color List</h2>

      {/* Search And AddBtn Wrapper */}
      <div className="wrapper">
        <SearchColorInput onSearch={setSearchQuery} />
        <Button
          btnFun={() => setShowAddColorModal(true)}
          btnStyle={'add-btn'}
          title={'Add Color'}
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
              title={'Delete'}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ColorList
