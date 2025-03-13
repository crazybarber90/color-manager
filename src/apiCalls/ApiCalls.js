import axios from 'axios'

const API_URL = '/colors'

// initiial fetch api call
export const fetchColors = async () => {
  try {
    const response = await axios.get('/colors')
    return response.data
  } catch (error) {
    console.error('Error while loading all colors:', error)
    throw error
  }
}

// add new color api call
export const addColorApi = async (newColor) => {
  try {
    const response = await axios.post('/colors', newColor)
    return response.data
  } catch (error) {
    console.error('Error while adding color:', error)
    throw error
  }
}

// delete color api call
export const deleteColor = async (colorId) => {
  try {
    const response = await axios.delete(`/colors/${colorId}`)
    return response.data
  } catch (error) {
    console.error('Error while deleting color:', error)
    throw error
  }
}
