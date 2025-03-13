import axios from 'axios'

const API_URL = '/colors'

// inicijalno fetchovanje boja
export const fetchColors = async () => {
  try {
    const response = await axios.get('/colors')
    return response.data
  } catch (error) {
    console.error('Greška pri dobavljanju boja:', error)
    throw error
  }
}

// dodavanje nove boje
export const addColorApi = async (newColor) => {
  try {
    const response = await axios.post('/colors', newColor)
    return response.data
  } catch (error) {
    console.error('Greška pri dodavanju boje:', error)
    throw error
  }
}

// brisanje boje
export const deleteColor = async (colorId) => {
  try {
    const response = await axios.delete(`/colors/${colorId}`)
    return response.data
  } catch (error) {
    console.error('Greška pri brisanju boje:', error)
    throw error
  }
}
