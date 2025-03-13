import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  colors: [],
  status: 'idle', // 'loading', 'failed', 'idle'
  error: null,
}

const colorSlice = createSlice({
  name: 'colors',
  initialState,
  reducers: {
    setColors: (state, action) => {
      state.colors = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    setStatus: (state, action) => {
      state.status = action.payload
    },
    addColor: (state, action) => {
      state.colors.push(action.payload)
    },
    removeColor: (state, action) => {
      state.colors = state.colors.filter((color) => color.id !== action.payload)
    },
  },
})

export const { setColors, setError, setStatus, addColor, removeColor } =
  colorSlice.actions

export default colorSlice.reducer
